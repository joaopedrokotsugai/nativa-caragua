
const express = require("express");
const db = require("../config/database");
const autenticar = require("../middlewares/authMiddleware");
const verificarAdmin = require("../middlewares/verificarAdmin");

const router = express.Router();

// Todas as rotas deste arquivo exigem administrador.
router.use(autenticar, verificarAdmin);

// ==========================================
// CAMPANHAS
// ==========================================

// Cadastrar campanha
router.post("/campanhas", async (req, res) => {
  const { titulo, data, local, vagas, imagem } = req.body;

  if (
    !titulo?.trim() ||
    !data ||
    !local?.trim() ||
    !Number.isInteger(Number(vagas)) ||
    Number(vagas) <= 0
  ) {
    return res.status(400).json({
      erro: "Preencha título, data, local e uma quantidade válida de vagas.",
    });
  }

  try {
    const resultado = await db.query(
      `INSERT INTO campanhas (titulo, data, local, vagas, imagem)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [titulo.trim(), data, local.trim(), Number(vagas), imagem || null]
    );

    return res.status(201).json({
      mensagem: "Campanha cadastrada com sucesso.",
      campanha: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao cadastrar campanha:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível cadastrar a campanha.",
    });
  }
});

// Editar campanha
router.put("/campanhas/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, data, local, vagas, imagem } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  if (
    !titulo?.trim() ||
    !data ||
    !local?.trim() ||
    !Number.isInteger(Number(vagas)) ||
    Number(vagas) <= 0
  ) {
    return res.status(400).json({
      erro: "Preencha título, data, local e uma quantidade válida de vagas.",
    });
  }

  try {
    const resultado = await db.query(
      `UPDATE campanhas
       SET titulo = $1,
           data = $2,
           local = $3,
           vagas = $4,
           imagem = $5
       WHERE id = $6
       RETURNING *`,
      [titulo.trim(), data, local.trim(), Number(vagas), imagem || null, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Campanha não encontrada.",
      });
    }

    return res.json({
      mensagem: "Campanha atualizada com sucesso.",
      campanha: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao editar campanha:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível editar a campanha.",
    });
  }
});

// Excluir campanha
router.delete("/campanhas/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  try {
    const resultado = await db.query(
      `DELETE FROM campanhas
       WHERE id = $1
       RETURNING id`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Campanha não encontrada.",
      });
    }

    return res.json({
      mensagem: "Campanha excluída com sucesso.",
    });
  } catch (erro) {
    if (erro.code === "23503") {
      return res.status(409).json({
        erro: "Não é possível excluir esta campanha porque existem inscrições vinculadas a ela.",
      });
    }

    console.error("Erro ao excluir campanha:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível excluir a campanha.",
    });
  }
});

// ==========================================
// PROJETOS
// ==========================================

// Cadastrar projeto
router.post("/projetos", async (req, res) => {
  const { titulo, descricao, meta, imagem, data_encerramento } = req.body;

  if (
    !titulo?.trim() ||
    !descricao?.trim() ||
    !Number.isFinite(Number(meta)) ||
    Number(meta) <= 0
  ) {
    return res.status(400).json({
      erro: "Preencha título, descrição e uma meta válida.",
    });
  }

  try {
    const resultado = await db.query(
      `INSERT INTO projetos
       (titulo, descricao, meta, imagem, data_encerramento)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        titulo.trim(),
        descricao.trim(),
        Number(meta),
        imagem || null,
        data_encerramento || null,
      ]
    );

    return res.status(201).json({
      mensagem: "Projeto cadastrado com sucesso.",
      projeto: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao cadastrar projeto:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível cadastrar o projeto.",
    });
  }
});

// Editar projeto
router.put("/projetos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, descricao, meta, imagem, data_encerramento } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  if (
    !titulo?.trim() ||
    !descricao?.trim() ||
    !Number.isFinite(Number(meta)) ||
    Number(meta) <= 0
  ) {
    return res.status(400).json({
      erro: "Preencha título, descrição e uma meta válida.",
    });
  }

  try {
    const resultado = await db.query(
      `UPDATE projetos
       SET titulo = $1,
           descricao = $2,
           meta = $3,
           imagem = $4,
           data_encerramento = $5
       WHERE id = $6
       RETURNING *`,
      [
        titulo.trim(),
        descricao.trim(),
        Number(meta),
        imagem || null,
        data_encerramento || null,
        id,
      ]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Projeto não encontrado.",
      });
    }

    return res.json({
      mensagem: "Projeto atualizado com sucesso.",
      projeto: resultado.rows[0],
    });
  } catch (erro) {
    console.error("Erro ao editar projeto:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível editar o projeto.",
    });
  }
});

// Excluir projeto
router.delete("/projetos/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: "ID inválido." });
  }

  try {
    const resultado = await db.query(
      `DELETE FROM projetos
       WHERE id = $1
       RETURNING id`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        erro: "Projeto não encontrado.",
      });
    }

    return res.json({
      mensagem: "Projeto excluído com sucesso.",
    });
  } catch (erro) {
    if (erro.code === "23503") {
      return res.status(409).json({
        erro: "Não é possível excluir este projeto porque existem doações vinculadas a ele.",
      });
    }

    console.error("Erro ao excluir projeto:", erro.message);
    return res.status(500).json({
      erro: "Não foi possível excluir o projeto.",
    });
  }
});

module.exports = router;
