# O que o front-end espera do back-end

Este documento é para quem está fazendo o **back-end e o banco**. O front já está pronto e conversa com a API **somente** pelo arquivo [`src/services/api.js`](src/services/api.js). Se o back usar rotas ou nomes diferentes, ajuste só lá (nas chamadas `request(...)` e nos "adaptadores"), sem mexer nas telas.

Base da API: `VITE_API_URL` (no `.env`, hoje `http://localhost:3333`).

Os campos seguem o `database/schema.sql` da branch `develop`.

## Como ligar o front na API

1. No `Site/.env`, troque `VITE_USE_MOCK=true` por `VITE_USE_MOCK=false`.
2. Reinicie o `npm run dev`.

Com `VITE_USE_MOCK=true` o site usa dados de exemplo guardados no navegador (arquivo `src/services/mock.js`), só para dar para navegar sem back-end.

## Requisitos gerais

- **CORS**: liberar a origem do front (`http://localhost:5173` em desenvolvimento). Com Express: pacote `cors`.
- **JSON** em tudo, exceto `POST /denuncias`, que é `multipart/form-data` (pode ter foto).
- **Autenticação**: o login devolve um `token`. O front envia `Authorization: Bearer <token>` nas rotas marcadas com 🔒.
- **Erros**: resposta com status HTTP adequado e corpo `{ "erro": "mensagem em português" }`. O front mostra essa mensagem ao usuário. (Também aceita `{ "message": "..." }`.)
- **Senha**: nunca guardar em texto puro (ex.: `bcrypt`). A coluna `usuarios.senha` já tem 255 caracteres.

## Rotas

| Método e rota | Auth | Envia | Resposta de sucesso |
|---|---|---|---|
| `POST /auth/cadastro` | | `{ nome, email, senha }` | `{ token }` |
| `POST /auth/login` | | `{ email, senha }` | `{ token }` |
| `GET /usuarios/me` | 🔒 | | usuário (ver abaixo) |
| `DELETE /usuarios/me` | 🔒 | | `{ ok: true }` |
| `GET /campanhas` | | | lista de campanhas |
| `POST /campanhas/:id/participacao` | 🔒 | | `{ ok: true }` |
| `DELETE /campanhas/:id/participacao` | 🔒 | | `{ ok: true }` |
| `GET /projetos` | | | lista de projetos |
| `POST /doacoes` | 🔒 | `{ id_projeto, valor }` | `{ ok: true }` |
| `POST /denuncias` | 🔒 | form-data: `titulo`, `descricao`, `local`, `imagem` (opcional) | `{ ok: true }` |

Erros que o front trata com mensagem própria: `409` e-mail já cadastrado (cadastro) e campanha sem vagas (participação); `401` senha incorreta ou token expirado; `404` e-mail não encontrado.

## Formatos

**Usuário** (`GET /usuarios/me`):

```json
{
  "id": 1,
  "nome": "Maria da Silva",
  "email": "maria@exemplo.com",
  "data_criacao": "2026-10-01T10:00:00.000Z",
  "participacoes": [1, 4],
  "total_doacoes": 3,
  "total_denuncias": 1
}
```

- `participacoes` = ids das campanhas em que o usuário está inscrito (tabela `participacoes`).
- `total_doacoes` e `total_denuncias` = contagens (tabelas `doacoes` e `denuncias`). **Nunca** devolver a senha.

**Campanha** (`GET /campanhas`):

```json
{ "id": 1, "titulo": "Mutirão de limpeza da praia", "data": "2026-10-17T08:00:00", "local": "Praia do Massaguaçu", "vagas": 49, "imagem": "uploads/campanhas/1.jpg", "categoria": "limpeza" }
```

- `vagas` = **vagas ainda disponíveis** (total menos inscritos). O front mostra esse número e desabilita o botão quando chega a 0.
- `imagem` = caminho do arquivo. Se for relativo, o front monta `VITE_API_URL + "/" + caminho`, então o back precisa servir essa pasta (ex.: `express.static`). Pode ser `null`.
- `categoria` é **opcional** (ver "Sugestões").

**Projeto** (`GET /projetos`):

```json
{ "id": 1, "titulo": "Restauração de mata ciliar", "descricao": "…", "meta": "8000.00", "valor_arrecadado": "3200.00", "imagem": null }
```

- `meta` e `valor_arrecadado` podem vir como string (o `DECIMAL` do MySQL costuma vir assim); o front converte.
- `valor_arrecadado` deve **somar as doações** (atualizar ao criar uma doação, ou calcular na consulta). O front mostra a barra de progresso com isso.

## Regras que o front assume

- **Doação e denúncia exigem login** (`id_usuario` é `NOT NULL` no banco). O front leva a pessoa para o login antes e volta depois. O `id_usuario` deve vir do token, nunca do corpo da requisição.
- Participar de campanha também exige login. Participar duas vezes na mesma campanha não deve duplicar (chave primária composta já cobre) nem dar erro.
- Valor mínimo de doação no front: R$ 5,00 (validar também no back).
- Foto da denúncia: o front limita a 5 MB, apenas imagens.
- Excluir conta: remover também (ou usar `ON DELETE CASCADE` em) participações, doações e denúncias do usuário, senão as chaves estrangeiras impedem o `DELETE`.

## Sugestões de ajuste no banco

O front funciona sem elas, mas melhoram o site:

| Sugestão | Para quê |
|---|---|
| `campanhas.categoria VARCHAR(30)` com valores `limpeza`, `reflorestamento`, `educacao` | Ativa os filtros "Limpeza / Reflorestamento / Educação ambiental" da tela de campanhas. Sem esse campo, os botões de filtro **não aparecem** (a busca por texto continua). |
| `usuarios.bio TEXT` e `usuarios.usuario VARCHAR(50)` | O design do perfil previa "@usuario" e uma descrição editável. Foram deixados de fora porque não existem no banco. |
| Tabela de contatos | O design tinha "Contato" como página. Foi feita com e-mail e link para denúncia, sem formulário, porque não há tabela para guardar mensagens. |
| `denuncias.status` (ex.: `recebida`, `em_analise`, `resolvida`) | Permite mostrar o andamento das denúncias no perfil depois. |

## Checklist para testar a integração

1. Cadastrar uma conta e ver o nome no canto do header.
2. Em `/campanhas`, clicar em **Participe!**: o botão vira "Inscrito" e as vagas diminuem.
3. Em `/projetos`, apoiar um projeto: a doação aparece no perfil e a barra de progresso aumenta.
4. Em `/denuncia`, enviar com e sem foto.
5. Em `/perfil`, conferir as três contagens.
6. Sair, entrar de novo e **Excluir conta**.
