
const express = require("express");
const db = require("../config/database");
const autenticar = require("../middlewares/authMiddleware");

const router = express.Router();

// Inscrever o usuário em uma campanha
router.post("/campanhas/:id/participacao", autenticar, async (req, res) => {
  const idCampanha = Number(req.params.id);
  const idUsuario = req.usuario.id;

  if (!Number.isInteger(idCampanha) || idCampanha <= 0) {
    return res.status(400).json({ erro: "ID de campanha inválido." });
  }

  try {
    const campanha = await db.query(
      `SELECT id, vagas
       FROM campanhas
       WHERE id = $1 AND data >= CURRENT_TIMESTAMP`,
      [idCampanha]
    );

    if (campanha.rows.length === 0) {
      return res.status(404).json({
        erro: "Campanha não encontrada ou já encerrada.",
      });
    }

    const resultado = await db.query(
      `INSERT INTO participacoes (id_usuario, id_campanha)
       SELECT $1, $2
       WHERE (
         SELECT COUNT(*)
         FROM participacoes
         WHERE id_campanha = $2
       ) < $3
       ON CONFLICT (id_usuario, id_campanha) DO NOTHING
       RETURNING id_usuario`,
      [idUsuario, idCampanha, campanha.rows[0].vagas]
    );

    if (resultado.rows.length === 0) {
      return res.status(409).json({
        erro: "Você já está inscrito ou não há vagas disponíveis.",
      });
    }

    return res.status(201).json({
      mensagem: "Inscrição realizada com sucesso.",
    });
  } catch (erro) {
    console.error("Erro ao inscrever em campanha:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível realizar a inscrição.",
    });
  }
});

// Cancelar inscrição
router.delete("/campanhas/:id/participacao", autenticar, async (req, res) => {
  const idCampanha = Number(req.params.id);
  const idUsuario = req.usuario.id;

  if (!Number.isInteger(idCampanha) || idCampanha <= 0) {
    return res.status(400).json({ erro: "ID de campanha inválido." });
  }

  try {
    const resultado = await db.query(
      `DELETE FROM participacoes
       WHERE id_usuario = $1 AND id_campanha = $2
       RETURNING id_usuario`,
      [idUsuario, idCampanha]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Inscrição não encontrada.",
      });
    }

    return res.json({ mensagem: "Inscrição cancelada com sucesso." });
  } catch (erro) {
    console.error("Erro ao cancelar inscrição:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível cancelar a inscrição.",
    });
  }
});

// Registrar uma doação
router.post("/doacoes", autenticar, async (req, res) => {
  const idUsuario = req.usuario.id;
  const idProjeto = Number(req.body.id_projeto);
  const valor = Number(req.body.valor);

  if (!Number.isInteger(idProjeto) || idProjeto <= 0) {
    return res.status(400).json({ erro: "ID de projeto inválido." });
  }

  if (!Number.isFinite(valor) || valor <= 0 ||
      Math.round(valor * 100) !== valor * 100) {
    return res.status(400).json({
      erro: "O valor deve ser positivo e ter no máximo duas casas decimais.",
    });
  }

  const cliente = await db.connect();

  try {
    await cliente.query("BEGIN");

    const projeto = await cliente.query(
      `SELECT id
       FROM projetos
       WHERE id = $1
         AND (
           data_encerramento IS NULL
           OR data_encerramento >= CURRENT_DATE
         )
       FOR UPDATE`,
      [idProjeto]
    );

    if (projeto.rows.length === 0) {
      await cliente.query("ROLLBACK");
      return res.status(400).json({
        erro: "Projeto não encontrado ou prazo de doações encerrado.",
      });
    }

    await cliente.query(
      `INSERT INTO doacoes (id_usuario, id_projeto, valor)
       VALUES ($1, $2, $3)`,
      [idUsuario, idProjeto, valor]
    );

    await cliente.query(
      `UPDATE projetos
       SET valor_arrecadado = valor_arrecadado + $1
       WHERE id = $2`,
      [valor, idProjeto]
    );

    await cliente.query("COMMIT");

    return res.status(201).json({
      mensagem: "Doação registrada com sucesso.",
    });
  } catch (erro) {
    await cliente.query("ROLLBACK");
    console.error("Erro ao registrar doação:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível registrar a doação.",
    });
  } finally {
    cliente.release();
  }
});

// Listar campanhas futuras
router.get("/campanhas", async (req, res) => {
  try {
    const resultado = await db.query(`
      SELECT id, titulo, data, local, vagas, imagem
      FROM campanhas
      WHERE data >= CURRENT_TIMESTAMP
      ORDER BY data ASC
    `);

    return res.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao listar campanhas:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível listar as campanhas.",
    });
  }
});

// Listar projetos disponíveis para doações
router.get("/projetos", async (req, res) => {
  try {
    const resultado = await db.query(`
      SELECT id, titulo, descricao, meta, valor_arrecadado,
             imagem, data_encerramento
      FROM projetos
      WHERE data_encerramento IS NULL
         OR data_encerramento >= CURRENT_DATE
      ORDER BY id DESC
    `);

    return res.json(resultado.rows);
  } catch (erro) {
    console.error("Erro ao listar projetos:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível listar os projetos.",
    });
  }
});

module.exports = router;
