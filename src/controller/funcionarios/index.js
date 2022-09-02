import executeQuery from "services/database/executeQuery";

/**
 * Realiza uma query retornando todos os funcionários, ou apenas
 * os ativos/inativos.
 * @param {String} ativo String contendo a parte da Query String
 * que busca por funcionários ativos, inativos ou ambos dentro do BD.
 * @returns Objeto contendo o resultado da pesquisa no BD.
 */
export async function getFunc(ativo) {
  const queryLimit = 500;
  const queryStr = `
    SELECT TOP ${queryLimit} *
    FROM bethadba.foempregados e
    OUTER APPLY 
    (
      SELECT TOP 1 *
      FROM [bethadba].[foafastamentos] a 
      WHERE a.codi_emp = 1 AND e.i_empregados = a.i_empregados and e.i_depto != 1
      ORDER BY nome ASC
    ) a
      WHERE e.codi_emp = 1 and e.i_depto != 1${ativo}
    `;
  return await executeQuery(queryStr);
}

/**
 * Lista todos os funcionários baseado em um critério de pesquisa.
 * @param {String} filter String contendo os critérios de pesquisa informados
 * na query da requisição, no formato de Query String para consulta no BD.
 * @returns Objeto contendo o resultado da pesquisa no BD.
 */
export async function getFuncByFilter(filter) {
  const queryStr = `
      SELECT *
          FROM bethadba.foempregados e
          OUTER APPLY 
  (
      SELECT TOP 1 *
      FROM [bethadba].[foafastamentos] a 
      WHERE a.codi_emp = 1 AND e.i_empregados = a.i_empregados and e.i_depto != 1
      ORDER BY nome ASC
  ) a
      WHERE e.codi_emp = 1 and e.i_depto != 1 ${filter.join("")}`;
  return await executeQuery(queryStr);
}
