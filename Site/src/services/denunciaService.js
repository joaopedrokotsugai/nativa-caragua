
import { supabase } from "../lib/supabaseClient";

const TIPOS_PERMITIDOS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const TAMANHO_MAXIMO = 5 * 1024 * 1024;

export async function registrarDenuncia({
  titulo,
  local,
  descricao,
  imagem,
}) {
  const { data: usuarioData, error: usuarioErro } =
    await supabase.auth.getUser();

  if (usuarioErro) throw usuarioErro;

  const usuario = usuarioData.user;

  if (!usuario) {
    throw new Error("Você precisa estar autenticado.");
  }

  let caminhoImagem = null;

  if (imagem) {
    if (!TIPOS_PERMITIDOS[imagem.type]) {
      throw new Error("Formato inválido. Envie JPG, PNG ou WebP.");
    }

    if (imagem.size > TAMANHO_MAXIMO) {
      throw new Error("A imagem deve ter no máximo 5 MB.");
    }

    const extensao = TIPOS_PERMITIDOS[imagem.type];
    caminhoImagem = `${usuario.id}/${crypto.randomUUID()}.${extensao}`;

    const { error: uploadErro } = await supabase.storage
      .from("denuncias")
      .upload(caminhoImagem, imagem, {
        contentType: imagem.type,
        upsert: false,
      });

    if (uploadErro) throw uploadErro;
  }

  const { error: denunciaErro } = await supabase
    .from("denuncias")
    .insert({
      id_usuario: usuario.id,
      titulo,
      local,
      descricao,
      imagem: caminhoImagem,
      data: new Date().toISOString(),
    });

  if (denunciaErro) {
    if (caminhoImagem) {
      await supabase.storage
        .from("denuncias")
        .remove([caminhoImagem]);
    }

    throw denunciaErro;
  }
}
