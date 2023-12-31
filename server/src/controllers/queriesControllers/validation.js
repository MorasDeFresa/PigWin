const { query } = require("../../models/query");

const paramsValidation = async ({ condition, table, values }) => {
  let validation = 0;
  try {
    const sql = `SELECT * FROM ${table}`;
    const resultQuery = await query(sql);
    for (let keyCondition in condition ? condition : values) {
      for (let keyRegister in resultQuery[0]) {
        if (keyCondition.toLowerCase() === `id_${table}`)
          throw new Error("No se puede establecer o actualizar el ID");
        if (keyRegister.toLowerCase() === keyCondition.toLowerCase())
          validation++;
      }
      if (
        keyCondition.toLowerCase() === "fecha inicio" ||
        keyCondition.toLowerCase() === "fecha final"
      ) {
        validation++;
      }
    }
    if (validation !== Object.keys(condition ? condition : values).length)
      throw new Error("Hay un valor invalido");
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  paramsValidation,
};
