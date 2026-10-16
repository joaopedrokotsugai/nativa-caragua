
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.get("/status", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.status(200).json({
      status: "Online",
      banco: "Conectado",
    });
  } catch (erro) {
    console.error("Erro ao conectar ao MySQL:", erro.message);

    res.status(500).json({
      erro: "Não foi possível conectar ao banco de dados.",
    });
  }
});

app.use("/auth", authRoutes);

const PORTA = process.env.PORT || 3333;

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

const usuariosRoutes = require("./routes/usuariosRoutes");
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);

const catalogoRoutes = require("./routes/catalogoRoutes");
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/", catalogoRoutes);