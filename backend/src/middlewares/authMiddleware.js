const jwt = require("jsonwebtoken");
const db = require("../config/database");

async function autenticar(req, res, next) {
  const autorizacao = req.headers.authorization;

  if (!autorizacao || !autorizacao.startsWith("Bearer ")) {
    return res.status(401).json({
      erro: "Você precisa estar logado.",
    });
  }

  const token = autorizacao.slice(7);

  let dados;

  try {
    dados = jwt.verify(token, process.env.JWT_SECRET);
  } catch (erro) {
    return res.status(401).json({
      erro: "Sessão inválida ou expirada. Entre novamente.",
    });
  }

  try {
    const resultado = await db.query(
      `SELECT id, status
       FROM usuarios
       WHERE id = $1`,
      [dados.id]
    );

    if (
      resultado.rows.length === 0 ||
      resultado.rows[0].status !== "ativa"
    ) {
      return res.status(403).json({
        erro: "Esta conta está desativada ou não existe.",
      });
    }

    req.usuario = dados;
    next();
  } catch (erro) {
    console.error("Erro ao verificar conta:", erro.message);

    return res.status(500).json({
      erro: "Não foi possível verificar sua conta.",
    });
  }
}

module.exports = autenticar;