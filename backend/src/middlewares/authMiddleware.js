
const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
  const autorizacao = req.headers.authorization;

  if (!autorizacao || !autorizacao.startsWith("Bearer ")) {
    return res.status(401).json({
      erro: "Você precisa estar logado.",
    });
  }

  const token = autorizacao.slice(7);

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = dados;
    next();
  } catch (erro) {
    return res.status(401).json({
      erro: "Sessão inválida ou expirada. Entre novamente.",
    });
  }
}

module.exports = autenticar;
