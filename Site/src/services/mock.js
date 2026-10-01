/*
 * MODO DEMO: imita o back-end usando o localStorage do navegador, só para o site funcionar
 * enquanto a API real não existe. Responde no mesmo formato do banco (ver database/schema.sql).
 * Nada daqui vai para produção: com VITE_USE_MOCK=false este arquivo não é usado.
 */
import { ApiError } from "./ApiError";
import { getToken } from "./token";

const KEY = "nativa:mock-db";
const espera = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const campanhasBase = [
  { id: 1, titulo: "Mutirão de limpeza da praia", data: "2026-10-17T08:00:00", local: "Praia do Massaguaçu", vagas: 50, categoria: "limpeza" },
  { id: 2, titulo: "Plantio de mudas nativas", data: "2026-10-24T08:00:00", local: "Margem do Rio Juqueriquerê", vagas: 30, categoria: "reflorestamento" },
  { id: 3, titulo: "Oficina de aves da restinga", data: "2026-10-31T14:00:00", local: "Praia de Cocanha", vagas: 25, categoria: "educacao" },
  { id: 4, titulo: "Limpeza da Praia Martim de Sá", data: "2026-11-07T09:00:00", local: "Praia Martim de Sá", vagas: 40, categoria: "limpeza" },
  { id: 5, titulo: "Replantio da restinga", data: "2026-11-14T08:00:00", local: "Praia do Indaiá", vagas: 35, categoria: "reflorestamento" },
  { id: 6, titulo: "Roda de conversa: lixo zero", data: "2026-11-21T15:00:00", local: "Praça Cândido Mota", vagas: 60, categoria: "educacao" },
];

const projetosBase = [
  { id: 1, titulo: "Restauração de mata ciliar", descricao: "Plantio de mudas nativas nas margens de rios e córregos.", meta: 8000, valor_arrecadado: 3200 },
  { id: 2, titulo: "Viveiro de mudas nativas", descricao: "Produção de mudas da Mata Atlântica para os mutirões de plantio.", meta: 5000, valor_arrecadado: 1750 },
  { id: 3, titulo: "Aves da restinga", descricao: "Monitoramento e proteção de aves que vivem perto das praias.", meta: 4000, valor_arrecadado: 900 },
  { id: 4, titulo: "Praias limpas", descricao: "Materiais e transporte para os mutirões de limpeza das praias.", meta: 3000, valor_arrecadado: 2400 },
  { id: 5, titulo: "Cuidando das nascentes", descricao: "Cercamento e recuperação de nascentes na zona rural.", meta: 10000, valor_arrecadado: 1200 },
  { id: 6, titulo: "Natureza na escola", descricao: "Oficinas de educação ambiental e trilhas guiadas para estudantes.", meta: 6000, valor_arrecadado: 2100 },
];

function carregar() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? novoBanco();
  } catch {
    return novoBanco();
  }
}
const novoBanco = () => ({ proximoId: 1, usuarios: [], participacoes: [], doacoes: [], denuncias: [] });
const salvar = (db) => localStorage.setItem(KEY, JSON.stringify(db));

async function hash(texto) {
  if (globalThis.crypto?.subtle) {
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
  }
  return btoa(unescape(encodeURIComponent(texto)));
}

function usuarioLogado(db) {
  const id = Number((getToken() ?? "").replace("mock:", ""));
  const usuario = db.usuarios.find((u) => u.id === id);
  if (!usuario) throw new ApiError("Sua sessão expirou. Entre novamente.", 401);
  return usuario;
}

export async function listarCampanhas() {
  await espera();
  const db = carregar();
  return campanhasBase.map((c) => ({
    ...c,
    vagas: c.vagas - db.participacoes.filter((p) => p.id_campanha === c.id).length,
  }));
}

export async function listarProjetos() {
  await espera();
  const db = carregar();
  return projetosBase.map((p) => ({
    ...p,
    valor_arrecadado:
      p.valor_arrecadado +
      db.doacoes.filter((d) => d.id_projeto === p.id).reduce((soma, d) => soma + d.valor, 0),
  }));
}

export async function cadastrar({ nome, email, senha }) {
  await espera();
  const db = carregar();
  const chave = email.trim().toLowerCase();
  if (db.usuarios.some((u) => u.email === chave)) {
    throw new ApiError("Já existe uma conta com esse e-mail. Tente entrar.", 409);
  }
  const usuario = {
    id: db.proximoId++,
    nome: nome.trim(),
    email: chave,
    senha: await hash(`${chave}:${senha}`),
    data_criacao: new Date().toISOString(),
  };
  db.usuarios.push(usuario);
  salvar(db);
  return { token: `mock:${usuario.id}` };
}

export async function entrar({ email, senha }) {
  await espera();
  const db = carregar();
  const chave = email.trim().toLowerCase();
  const usuario = db.usuarios.find((u) => u.email === chave);
  if (!usuario) throw new ApiError("Não encontramos uma conta com esse e-mail. Crie a sua conta.", 404);
  if (usuario.senha !== (await hash(`${chave}:${senha}`))) {
    throw new ApiError("Senha incorreta. Confira e tente de novo.", 401);
  }
  return { token: `mock:${usuario.id}` };
}

export async function perfil() {
  await espera(150);
  const db = carregar();
  const usuario = usuarioLogado(db);
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    data_criacao: usuario.data_criacao,
    participacoes: db.participacoes.filter((p) => p.id_usuario === usuario.id).map((p) => p.id_campanha),
    total_doacoes: db.doacoes.filter((d) => d.id_usuario === usuario.id).length,
    total_denuncias: db.denuncias.filter((d) => d.id_usuario === usuario.id).length,
  };
}

export async function excluirConta() {
  await espera();
  const db = carregar();
  const { id } = usuarioLogado(db);
  db.usuarios = db.usuarios.filter((u) => u.id !== id);
  db.participacoes = db.participacoes.filter((p) => p.id_usuario !== id);
  db.doacoes = db.doacoes.filter((d) => d.id_usuario !== id);
  db.denuncias = db.denuncias.filter((d) => d.id_usuario !== id);
  salvar(db);
  return { ok: true };
}

export async function participar(idCampanha) {
  await espera(200);
  const db = carregar();
  const { id } = usuarioLogado(db);
  const campanha = campanhasBase.find((c) => c.id === Number(idCampanha));
  if (!campanha) throw new ApiError("Campanha não encontrada.", 404);
  const inscritos = db.participacoes.filter((p) => p.id_campanha === campanha.id).length;
  if (inscritos >= campanha.vagas) throw new ApiError("Essa campanha não tem mais vagas.", 409);
  if (!db.participacoes.some((p) => p.id_usuario === id && p.id_campanha === campanha.id)) {
    db.participacoes.push({ id_usuario: id, id_campanha: campanha.id });
    salvar(db);
  }
  return { ok: true };
}

export async function cancelarParticipacao(idCampanha) {
  await espera(200);
  const db = carregar();
  const { id } = usuarioLogado(db);
  db.participacoes = db.participacoes.filter(
    (p) => !(p.id_usuario === id && p.id_campanha === Number(idCampanha))
  );
  salvar(db);
  return { ok: true };
}

export async function doar({ idProjeto, valor }) {
  await espera();
  const db = carregar();
  const { id } = usuarioLogado(db);
  if (!projetosBase.some((p) => p.id === Number(idProjeto))) throw new ApiError("Projeto não encontrado.", 404);
  db.doacoes.push({ id_usuario: id, id_projeto: Number(idProjeto), valor: Number(valor) });
  salvar(db);
  return { ok: true };
}

export async function denunciar({ titulo, descricao, local }) {
  await espera();
  const db = carregar();
  const { id } = usuarioLogado(db);
  db.denuncias.push({ id_usuario: id, titulo, descricao, local });
  salvar(db);
  return { ok: true };
}
