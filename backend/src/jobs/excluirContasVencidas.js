
const db = require("../config/database");

async function excluirContasVencidas() {
  const cliente = await db.connect();

  try {
    await cliente.query("BEGIN");

    // Busca contas desativadas há 30 dias ou mais.
    const resultado = await cliente.query(`
      SELECT id
      FROM usuarios
      WHERE status = 'desativa'
        AND exclusao_solicitada_em IS NOT NULL
        AND exclusao_solicitada_em <=
            CURRENT_TIMESTAMP - INTERVAL '30 days'
      FOR UPDATE
    `);

    const ids = resultado.rows.map((usuario) => usuario.id);

    if (ids.length === 0) {
      await cliente.query("COMMIT");
      return;
    }

    // Remove os registros relacionados às contas vencidas.
    await cliente.query(
      "DELETE FROM participacoes WHERE id_usuario = ANY($1::int[])",
      [ids]
    );

    await cliente.query(
      "DELETE FROM doacoes WHERE id_usuario = ANY($1::int[])",
      [ids]
    );

    await cliente.query(
      "DELETE FROM denuncias WHERE id_usuario = ANY($1::int[])",
      [ids]
    );

    // Exclui definitivamente as contas.
    await cliente.query(
      "DELETE FROM usuarios WHERE id = ANY($1::int[])",
      [ids]
    );

    await cliente.query("COMMIT");

    console.log(
      `${ids.length} conta(s) excluída(s) definitivamente.`
    );
  } catch (erro) {
    await cliente.query("ROLLBACK");
    console.error("Erro ao excluir contas vencidas:", erro.message);
  } finally {
    cliente.release();
  }
}

module.exports = excluirContasVencidas;
