const express = require("express");
const db = require("../config/database");
const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

// GET /usuarios/me
router.get("/me", autenticar, async (req, res) => {
  try {
    const idUsuario = req.usuario.id;

    const resultadoUsuario = await db.query(
      `SELECT id, nome, email, data_criacao, status, role
       FROM usuarios
       WHERE id = $1`,
      [idUsuario]
    );

    if (resultadoUsuario.rows.length === 0) {
      return res.status(404).json({
        erro: "Usuário não encontrado.",
      });
    }

    const usuario = resultadoUsuario.rows[0];

    if (usuario.status !== "ativa") {
      return res.status(403).json({
        erro: "Esta conta está desativada.",
      });
    }

    const participacoes = await db.query(
      `SELECT id_campanha
       FROM participacoes
       WHERE id_usuario = $1`,
      [idUsuario]
    );

    const doacoes = await db.query(
      `SELECT COALESCE(SUM(valor), 0) AS total
       FROM doacoes
       WHERE id_usuario = $1`,
      [idUsuario]
    );

    const denuncias = await db.query(
      `SELECT COUNT(*) AS total
       FROM denuncias
       WHERE id_usuario = $1`,
      [idUsuario]
    );

    return res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      data_criacao: usuario.data_criacao,
      participacoes: participacoes.rows.map(item => item.id_campanha),
      total_doacoes: Number(doacoes.rows[0].total),
      total_denuncias: Number(denuncias.rows[0].total)
    });
  } catch (erro) {
    console.error("Erro ao buscar perfil:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível carregar o perfil.",
    });
  }
});

// DELETE /usuarios/me
// Solicita a exclusão: a conta fica desativada por 30 dias.
router.delete("/me", autenticar, async (req, res) => {
  try {
    const resultado = await db.query(
      `UPDATE usuarios
       SET status = 'desativa',
           exclusao_solicitada_em = CURRENT_TIMESTAMP
       WHERE id = $1
         AND status = 'ativa'
       RETURNING id`,
      [req.usuario.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Conta não encontrada ou já desativada.",
      });
    }

    return res.json({
      mensagem: "Conta desativada. A exclusão definitiva está prevista para daqui a 30 dias.",
      prazo_dias: 30,
    });
  } catch (erro) {
    console.error("Erro ao desativar conta:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível solicitar a exclusão da conta.",
    });
  }
});

module.exports = router;