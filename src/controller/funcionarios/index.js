import executeQuery from "services/database/executeQuery";
import {
  getAllAfastamentosDataQuery,
  getAllBenefDataQuery,
  getAllFuncRhDataQuery,
} from "services/database/queries";

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
export async function getFuncRhByFilter(filter, limit) {
  const queryStr = getAllFuncRhDataQuery(filter, limit);
  return await executeQuery(queryStr);
}

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
export async function getFuncBenefByFilter(filter, limit) {
  const queryStr = getAllBenefDataQuery(filter, limit);
  return await executeQuery(queryStr);
}

/**
 * Lista todos os dados de um funcionário, no escopo dos seus afastamentos,
 * baseado em um critério de pesquisa.
 *
 * @param {String} filter String contendo os critérios de pesquisa informados
 * na query da requisição, no formato de Query String para consulta no BD.
 *
 * @param {Object} limit - Define uma quantidade máxima de resultados.
 * Se este parâmetro for omitido, ele segue com uma quantidade máxima
 * padrão, definida pela query em queryParameters.
 *
 * @returns {Object} Objeto contendo o resultado da pesquisa no BD.
 * As colunas do resultado da query podem ser encontradas em
 * getAllAfastamentosDataQuery().
 */
export async function getFuncAfastamentosByFilter(filter, limit) {
  const queryStr = getAllAfastamentosDataQuery(filter, limit);
  const dbQuery = await executeQuery(queryStr);
  const query = dbQuery
    .map((item, k) => {
      // AGRUPA AFASTAMENTOS POR FUNCIONÁRIO
      const afastamentos = [];
      for (let i = 0; i < dbQuery.length; i++) {
        if (dbQuery[k].matriculaDominio === dbQuery[i].matriculaDominio) {
          afastamentos.push({
            index: afastamentos.length,
            situacao: dbQuery[i].situacao,
            afastamentoDataReal: dbQuery[i].afastamentoDataReal,
            afastamentoNumDias: dbQuery[i].afastamentoNumDias,
          });
        }
      }
      return {
        nome: item.nome,
        matriculaDominio: item.matriculaDominio,
        cpf: item.cpf,
        cargo: item.cargo,
        codDepto: item.codDepto,
        departamento: item.departamento,
        dataAdmissao: item.dataAdmissao,
        idSituacao: item.idSituacao,
        desligado: item.desligado,
        afastamentos: afastamentos
      };
    })
    // IMPEDE CAMPOS NULOS NA QUERY
    .filter((item, k) => {
      return (
        item.matriculaDominio !==
          dbQuery[k < dbQuery.length - 1 ? k + 1 : k].matriculaDominio ||
        k === dbQuery.length - 1
      );
    })
    // RELACIONA NÚMERO DE LINHAS DA QUERY
    .map((item, k) => {
      return { queryRow: k, ...item };
    });
  return query;
}
