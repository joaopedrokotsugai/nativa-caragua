
import { supabase } from "../lib/supabaseClient";

export async function registrarDoacao(idProjeto, valor) {
  const { error } = await supabase.rpc("registrar_doacao", {
    p_id_projeto: Number(idProjeto),
    p_valor: valor,
  });

  if (error) throw error;
}
