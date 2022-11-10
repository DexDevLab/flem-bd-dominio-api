import executeQuery from "services/database/executeQuery";
import { getAllBenefDataQuery } from "services/database/queries";
import { unmaskCPF } from "utils";
import {
  parseArrayToQueryString,
  parseArrayToQueryStringEquals,
} from "utils/parsers";


/**
 * Lista todos os dados de um funcionário, no escopo de beneficiário,
 * baseado em um critério de pesquisa.
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
 * getAllBenefDataQuery().
 */
export async function getFuncBenefByFilter(params) {
  const { limit, ...criteria } = params;
  const queryStr = getAllBenefDataQuery(queryComposer(criteria, false), limit);
  return await executeQuery(queryStr);
}
