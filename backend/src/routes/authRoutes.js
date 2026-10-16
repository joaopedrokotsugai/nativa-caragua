
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
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
}

// POST /auth/cadastro
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

    const [existentes] = await db.execute(
      "SELECT id FROM usuarios WHERE email = ?",
      [emailNormalizado]
    );

    if (existentes.length > 0) {
      return res.status(409).json({
        erro: "E-mail já cadastrado.",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [resultado] = await db.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome.trim(), emailNormalizado, senhaHash]
    );

    const usuario = {
      id: resultado.insertId,
      email: emailNormalizado,
    };

    return res.status(201).json({
      token: gerarToken(usuario),
    });
  } catch (erro) {
    if (erro.code === "ER_DUP_ENTRY") {
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

    const [usuarios] = await db.execute(
      "SELECT id, nome, email, senha FROM usuarios WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        erro: "E-mail ou senha incorretos.",
      });
    }

    const usuario = usuarios[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: "E-mail ou senha incorretos.",
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
