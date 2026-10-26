
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const router = express.Router();

function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
}

// POST /auth/cadastro
// Cadastro de usuário comum
router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (
      typeof nome !== "string" ||
      typeof email !== "string" ||
      typeof senha !== "string" ||
      !nome.trim() ||
      !email.trim() ||
      !senha
    ) {
      return res.status(400).json({
        erro: "Informe nome, e-mail e senha.",
      });
    }

    if (senha.length < 8) {
      return res.status(400).json({
        erro: "A senha deve ter pelo menos 8 caracteres.",
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await db.query(
      `INSERT INTO usuarios (nome, email, senha)
       VALUES ($1, $2, $3)
       RETURNING id, email, role`,
      [nome.trim(), emailNormalizado, senhaHash]
    );

    const usuario = resultado.rows[0];

    return res.status(201).json({
      token: gerarToken(usuario),
    });
  } catch (erro) {
    if (erro.code === "23505") {
      return res.status(409).json({
        erro: "E-mail já cadastrado.",
      });
    }

    console.error("Erro no cadastro:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível realizar o cadastro.",
    });
  }
});

// POST /auth/cadastro-admin
// Cadastro de administrador mediante senha administrativa
router.post("/cadastro-admin", async (req, res) => {
  try {
    const { nome, email, senha, senhaAdmin } = req.body;

    const senhaConfigurada = process.env.ADMIN_CADASTRO_SENHA;

    if (!senhaConfigurada) {
      return res.status(500).json({
        erro: "Cadastro administrativo não configurado no servidor.",
      });
    }

    if (
      typeof senhaAdmin !== "string" ||
      senhaAdmin.length === 0 ||
      senhaAdmin !== senhaConfigurada
    ) {
      return res.status(403).json({
        erro: "Senha administrativa incorreta.",
      });
    }

    if (
      typeof nome !== "string" ||
      typeof email !== "string" ||
      typeof senha !== "string" ||
      !nome.trim() ||
      !email.trim() ||
      !senha
    ) {
      return res.status(400).json({
        erro: "Informe nome, e-mail e senha.",
      });
    }

    if (senha.length < 8) {
      return res.status(400).json({
        erro: "A senha deve ter pelo menos 8 caracteres.",
      });
    }

    const emailNormalizado = email.trim().toLowerCase();
    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await db.query(
      `INSERT INTO usuarios (nome, email, senha, role)
       VALUES ($1, $2, $3, 'admin')
       RETURNING id, email, role`,
      [nome.trim(), emailNormalizado, senhaHash]
    );

    const usuario = resultado.rows[0];

    return res.status(201).json({
      mensagem: "Conta administrativa criada com sucesso.",
      token: gerarToken(usuario),
    });
  } catch (erro) {
    if (erro.code === "23505") {
      return res.status(409).json({
        erro: "E-mail já cadastrado.",
      });
    }

    console.error("Erro no cadastro administrativo:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível criar a conta administrativa.",
    });
  }
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (
      typeof email !== "string" ||
      typeof senha !== "string" ||
      !email.trim() ||
      !senha
    ) {
      return res.status(400).json({
        erro: "Informe e-mail e senha.",
      });
    }

    const resultado = await db.query(
      `SELECT id, nome, email, senha, status, role
       FROM usuarios
       WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        erro: "E-mail ou senha incorretos.",
      });
    }

    const usuario = resultado.rows[0];

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: "E-mail ou senha incorretos.",
      });
    }

    if (usuario.status !== "ativa") {
      return res.status(403).json({
        erro: "Esta conta está desativada.",
      });
    }

    return res.status(200).json({
      token: gerarToken(usuario),
    });
  } catch (erro) {
    console.error("Erro no login:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível realizar o login.",
    });
  }
});

module.exports = router;
