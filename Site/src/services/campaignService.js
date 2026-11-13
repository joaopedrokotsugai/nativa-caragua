
import { supabase } from "../lib/supabaseClient";

export async function listarCampanhas() {
  const { data, error } = await supabase.rpc(
    "listar_campanhas_com_vagas"
  );

  if (error) throw error;

  return (data ?? []).map((campanha) => ({
    id: String(campanha.id),
    titulo: campanha.titulo,
    data: campanha.data,
    local: campanha.local,
    vagas: Number(campanha.vagas),
    imagem: campanha.imagem,
    categoria: null,
  }));
}

export async function participarCampanha(id) {
  const { error } = await supabase.rpc("participar_campanha", {
    p_id_campanha: Number(id),
  });

  if (error) throw error;
}

export async function cancelarParticipacao(id) {
  const { error } = await supabase.rpc(
    "cancelar_participacao_campanha",
    {
      p_id_campanha: Number(id),
    }
  );

  if (error) throw error;
}
