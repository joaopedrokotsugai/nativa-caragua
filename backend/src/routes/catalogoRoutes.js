
const express = require("express");
const db = require("../config/database");

const router = express.Router();

// GET /campanhas
router.get("/campanhas", async (req, res) => {
  try {
    const [campanhas] = await db.execute(`
      SELECT
        id,
        titulo,
        data,
        local,
        vagas,
        imagem
      FROM campanhas
      ORDER BY data ASC
    `);

    return res.json(campanhas);
  } catch (erro) {
    console.error("Erro ao listar campanhas:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível listar as campanhas.",
    });
  }
});

// GET /projetos
router.get("/projetos", async (req, res) => {
  try {
    const [projetos] = await db.execute(`
      SELECT
        id,
        titulo,
        descricao,
        meta,
        valor_arrecadado,
        imagem
      FROM projetos
      ORDER BY id DESC
    `);

    return res.json(projetos);
  } catch (erro) {
    console.error("Erro ao listar projetos:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível listar os projetos.",
    });
  }
});

module.exports = router;
