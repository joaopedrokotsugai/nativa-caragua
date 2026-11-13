
import { supabase } from "../lib/supabaseClient";

export async function listarProjetos() {
  const { data, error } = await supabase
    .from("projetos")
    .select("id, titulo, descricao, meta, valor_arrecadado, imagem")
    .order("data_criacao", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((projeto) => ({
    id: String(projeto.id),
    titulo: projeto.titulo,
    descricao: projeto.descricao,
    meta: Number(projeto.meta),
    arrecadado: Number(projeto.valor_arrecadado ?? 0),
    imagem: projeto.imagem,
  }));
}
