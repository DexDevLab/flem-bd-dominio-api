import executeQuery from "services/database/executeQuery";
import { getAllFuncRhDataQuery } from "services/database/queries";
import { queryComposer } from "services/database/queryComposer";
import { unmaskCPF } from "utils";

/**
 * Lista todos os dados gerais de um funcionário, baseado em um critério de pesquisa.
 *
 * @param {String} filter String contendo os critérios de pesquisa informados
 * na query da requisição, no formato de Query String para consulta no BD.
 *
 * @param {Object} limit Define uma quantidade máxima de resultados.
 * Se este parâmetro for omitido, ele segue com uma quantidade máxima
 * padrão, definida pela query em queryParameters.
 *
 * @returns {Object} Objeto contendo o resultado da pesquisa no BD.
 * As colunas do resultado da query podem ser encontradas em
 * getAllFuncRhDataQuery().
 *
 */
export async function getFuncRhByFilter(params) {
  const { limit, ...criteria } = params;
  const queryStr = getAllFuncRhDataQuery(queryComposer(criteria, false), limit);
  return await executeQuery(queryStr);
}
