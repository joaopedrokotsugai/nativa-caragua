
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "nativa_caragua",
});

pool.on("error", (erro) => {
  console.error("Erro inesperado no pool PostgreSQL:", erro.message);
});

module.exports = pool;
