/*
 * ÚNICO lugar do front que fala com o back-end.
 * O que o back precisa expor está descrito em Site/API.md.
 * Se o back-end usar nomes ou formatos diferentes, ajuste só aqui (requests e "adaptadores").
 */
import { ApiError } from "./ApiError";
import { getToken } from "./token";
import * as mock from "./mock";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";
// true (padrão) = usa dados de exemplo no navegador, sem back-end. Use false para falar com a API.
export const MODO_DEMO = import.meta.env.VITE_USE_MOCK !== "false";

async function request(path, { method = "GET", body } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload = body;
  if (body && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new ApiError("Não foi possível falar com o servidor. Confira se o back-end está rodando.");
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(
      data?.erro ?? data?.message ?? "Não foi possível concluir a ação. Tente novamente.",
      response.status
    );
  }
  return data;
}

/* ---------- chamadas reais ---------- */
const real = {
  listarCampanhas: () => request("/campanhas"),
  listarProjetos: () => request("/projetos"),
  cadastrar: (dados) => request("/auth/cadastro", { method: "POST", body: dados }),
  entrar: (dados) => request("/auth/login", { method: "POST", body: dados }),
  perfil: () => request("/usuarios/me"),
  excluirConta: () => request("/usuarios/me", { method: "DELETE" }),
  participar: (id) => request(`/campanhas/${id}/participacao`, { method: "POST" }),
  cancelarParticipacao: (id) => request(`/campanhas/${id}/participacao`, { method: "DELETE" }),
  doar: ({ idProjeto, valor }) =>
    request("/doacoes", { method: "POST", body: { id_projeto: Number(idProjeto), valor } }),
  denunciar: ({ titulo, descricao, local, imagem }) => {
    const form = new FormData(); // multipart, porque pode ir uma foto
    form.append("titulo", titulo);
    form.append("descricao", descricao);
    form.append("local", local);
    if (imagem) form.append("imagem", imagem);
    return request("/denuncias", { method: "POST", body: form });
  },
};

const backend = MODO_DEMO ? mock : real;

/* ---------- adaptadores: formato do banco -> formato usado pelas telas ---------- */
function imagemUrl(caminho) {
  if (!caminho) return null;
  if (/^(https?:|data:)/.test(caminho)) return caminho;
  return `${API_URL}/${caminho.replace(/^\/+/, "")}`;
}

const campanhaDaApi = (c) => ({
  id: String(c.id),
  titulo: c.titulo,
  data: c.data,
  local: c.local,
  vagas: Number(c.vagas),
  imagem: imagemUrl(c.imagem),
  categoria: c.categoria ?? null, // opcional: ver API.md
});

const projetoDaApi = (p) => ({
  id: String(p.id),
  titulo: p.titulo,
  descricao: p.descricao,
  meta: Number(p.meta),
  arrecadado: Number(p.valor_arrecadado ?? 0),
  imagem: imagemUrl(p.imagem),
});

const usuarioDaApi = (u) => ({
  id: String(u.id),
  nome: u.nome,
  email: u.email,
  criadoEm: u.data_criacao,
  participacoes: (u.participacoes ?? []).map(String), // ids das campanhas em que está inscrito
  totalDoacoes: Number(u.total_doacoes ?? 0),
  totalDenuncias: Number(u.total_denuncias ?? 0),
});

/* ---------- o que as telas usam ---------- */
export const api = {
  listarCampanhas: async () => (await backend.listarCampanhas()).map(campanhaDaApi),
  listarProjetos: async () => (await backend.listarProjetos()).map(projetoDaApi),
  perfil: async () => usuarioDaApi(await backend.perfil()),
  cadastrar: backend.cadastrar, // -> { token }
  entrar: backend.entrar, // -> { token }
  excluirConta: backend.excluirConta,
  participar: backend.participar,
  cancelarParticipacao: backend.cancelarParticipacao,
  doar: backend.doar,
  denunciar: backend.denunciar,
};
