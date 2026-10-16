
const express = require("express");
const db = require("../config/database");
const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

// GET /usuarios/me
router.get("/me", autenticar, async (req, res) => {
  try {
    const idUsuario = req.usuario.id;

    const [usuarios] = await db.execute(
      `SELECT id, nome, email, data_criacao
       FROM usuarios
       WHERE id = ?`,
      [idUsuario]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({
        erro: "Usuário não encontrado.",
      });
    }

    const usuario = usuarios[0];

    const [participacoes] = await db.execute(
      `SELECT id_campanha
       FROM participacoes
       WHERE id_usuario = ?`,
      [idUsuario]
    );

    const [doacoes] = await db.execute(
      `SELECT COALESCE(SUM(valor), 0) AS total
       FROM doacoes
       WHERE id_usuario = ?`,
      [idUsuario]
    );

    const [denuncias] = await db.execute(
      `SELECT COUNT(*) AS total
       FROM denuncias
       WHERE id_usuario = ?`,
      [idUsuario]
    );

    return res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      data_criacao: usuario.data_criacao,
      participacoes: participacoes.map(
        (item) => item.id_campanha
      ),
      total_doacoes: Number(doacoes[0].total),
      total_denuncias: Number(denuncias[0].total),
    });
  } catch (erro) {
    console.error("Erro ao buscar perfil:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível carregar o perfil.",
    });
  }
});

module.exports = router;
