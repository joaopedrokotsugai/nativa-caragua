require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");

const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");
const catalogoRoutes = require("./routes/catalogoRoutes");
const excluirContasVencidas = require("./jobs/excluirContasVencidas");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Verifica se o servidor consegue acessar o PostgreSQL.
app.get("/status", async (req, res) => {
  try {
    await db.query("SELECT 1");

    return res.status(200).json({
      status: "Online",
      banco: "PostgreSQL conectado",
    });
  } catch (erro) {
    console.error("Erro ao conectar ao PostgreSQL:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível conectar ao banco de dados.",
    });
  }
});

// Registra cada conjunto de rotas uma única vez.
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/admin", adminRoutes);
app.use("/", catalogoRoutes);

const PORTA = process.env.PORT || 3333;

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);

  // Verifica as contas vencidas ao iniciar o servidor.
  excluirContasVencidas();

  // Repete a verificação a cada hora.
  setInterval(() => {
    excluirContasVencidas();
  }, 60 * 60 * 1000);
});
