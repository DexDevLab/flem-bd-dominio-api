import { getFuncBenefByFilter, getFuncRhByFilter } from "controller/funcionarios";
import { allowCors } from "services/apiAllowCors";
import { unmaskCPF } from "utils/masks";
import {
  parseArrayToQueryString,
  parseArrayToQueryStringEquals,
} from "utils/parsers";

/**
 * Função para compor o filtro da query. Caso a requisição faça uma solicitação
 * ao BD utilizando critérios de pesquisa ("condition") e um objeto de filtro,
 * aplica a alteração a um objeto de filtro para realizar a pesquisa corretamente.
 * 
 * @param {Boolean} ativo Se o funcionário está desligado (FALSE) ou
 * não (TRUE). Se este parâmetro for omitido, a query retornará tanto
 * funcionários ativos como desligados ou demitidos. Exemplo: ativo=false
 * 
 * @param {String} orderBy Define uma coluna da query e um sentido para definir
 * ordenamento dos resultados. Se este parâmetro for omitido, ele definirá um
 * ordenamento padrão específico de acordo com o filtro da query
 * (@see composeFilter). Exemplo: orderBy="matriculaDominio ASC"
 * As colunas podem ser encontradas nos parâmetros da query específica
 * em queryParameters.
 * 
 * @param {Object} limit Define uma quantidade máxima de resultados.
 * Se este parâmetro for omitido, ele segue com uma quantidade máxima
 * padrão, definida pela query em queryParameters.
 * Exemplo: limit=100
 * 
 * @param {Object} condition Define uma condição de pesquisa, quando
 * incluído mais de 1 coluna em "columns". Caso os critérios de pesquisa
 * envolvam informações em mais de 1 coluna, é obrigatório o uso deste
 * parâmetro. Se este parâmetro for omitido e exista mais de 1 critério
 * de pesquisa em "columns", a função disparará uma exceção.
 * Exemplo: condition="OR"
 * 
 * @param {Object} columns Define as condições de pesquisa ao relacionar
 * uma coluna da query com o resultado desejado. Em caso de mais de 1 coluna
 * informada, o uso de "condition" é obrigatório. Exemplo: matriculaDominio=1200
 * 
 * Os parâmetros podem ser definidos no formato de Array[].
 * 
 * @param {Object} req HTTP request.
 * @returns Objeto contendo o fragmento da Query String para requisitar ao BD.
 */
const composeFilter = (req) => {
  const { condition, ativo, orderBy, limit, ...columns } = req;
  const keys = Object.keys(columns);
  const filter = [];
  if (ativo) {
    if (ativo === "true") {
      filter.push(` AND desligado LIKE 'N'`);
    } else if (ativo === "false") {
      filter.push(` AND desligado LIKE 'S'`); 
  }
}
  keys.forEach((key, idx) => {
    switch (key) {
      case "nome":
        filter.push(
          `${
            idx > 0 ? ` ${condition.replaceAll('"', "")} ` : " AND ("
          }${key} LIKE ${parseArrayToQueryString(columns[key], key)}`
        );
        break;
      case "idSituacao":
      case "matriculaDominio":
      case "codDepto":
        filter.push(
          `${
            idx > 0 ? ` ${condition.replaceAll('"', "")} ` : " AND "
          }${key} IN ${parseArrayToQueryStringEquals(columns[key], key)}`
        );
        break;
      case "cpf":
        filter.push(
          `${
            idx > 0 ? ` ${condition.replaceAll('"', "")} ` : " AND "
          }${key} IN ${parseArrayToQueryStringEquals(
            unmaskCPF(columns[key]),
            key
          )}`
        );
        break;
      default:
        break;
    }
  });
  if (orderBy) {
    filter.push(` ORDER BY ${orderBy.replaceAll('"', "").replaceAll("'", "")}`);
  } else {
    filter.push(` ORDER BY matriculaDominio ASC`);
  }
  return filter;
};

/**
 * Fornece Funcionários e lista de Funcionários com dados voltados
 * para o levantamento de informações do funcionário quando beneficiário
 * do PPE, conforme critérios.
 * Os critérios servem como parâmetros para refinar a pesquisa conforme
 * necessário.
 * Os parâmetros são:
 * 
 * @param {Boolean} ativo Define se o funcionário está desligado (FALSE) ou
 * não (TRUE). Se este parâmetro for omitido, a query retornará tanto
 * funcionários ativos como desligados ou demitidos. Exemplo: ativo=false
 * 
 * @param {String} orderBy Define uma coluna da query e um sentido para definir
 * ordenamento dos resultados. Se este parâmetro for omitido, ele definirá um
 * ordenamento padrão específico de acordo com o filtro da query
 * (@see composeFilter). Exemplo: orderBy="matriculaDominio ASC"
 * As colunas podem ser encontradas nos parâmetros da query específica
 * em queryParameters.
 * 
 * @param {Object} limit Define uma quantidade máxima de resultados.
 * Se este parâmetro for omitido, ele segue com uma quantidade máxima
 * padrão, definida pela query em queryParameters.
 * Exemplo: limit=100
 * 
 * @param {Object} condition Define uma condição de pesquisa, quando
 * incluído mais de 1 coluna em "columns". Caso os critérios de pesquisa
 * envolvam informações em mais de 1 coluna, é obrigatório o uso deste
 * parâmetro. Se este parâmetro for omitido e exista mais de 1 critério
 * de pesquisa em "columns", a função disparará uma exceção.
 * Exemplo: condition="OR"
 * 
 * @param {Object} columns Define as condições de pesquisa ao relacionar
 * uma coluna da query com o resultado desejado. Em caso de mais de 1 coluna
 * informada, o uso de "condition" é obrigatório. Exemplo: matriculaDominio=1200
 * columns pode ser definido no formato de Array[].
 * 
 * Exemplo de requisição completa:
 * /beneficiarios?ativo=true&matriculaDominio=["1200", "600"]&codDepto="1000"&
 * condition="AND"&orderBy="nome ASC"
 * 
 * @param {Object} req HTTP request. Apenas GET é aceito
 * @param {Object} res HTTP response
 * @returns {Object} HTTP response como JSON contendo a resposta da query consultada
 */
async function handler(req, res) {
  try {
    const { condition, ativo, orderBy, limit, ...columns } = req.query;
    if (req.method === "GET") {
      // SOLICITAÇÕES DEVEM VIR COM UMA CONDIÇÃO LÓGICA QUANDO COM
      // MAIS DE 1 CRITÉRIO DE PESQUISA
      if (!condition && Object.keys(columns).length > 1) {
        return res.status(400).json({
          status: 400,
          message: `BAD REQUEST - A chamada requer 'CONDITION' como parâmetro em req.query` + 
            ` quando se realizam pesquisas de filtro com mais de 1 critério.` +
            ` Exemplo de requisição completa: /beneficiarios?ativo=true&` +
            `matriculaDominio=['1200','600']&codDepto='1000'&condition='AND'&`+
            `orderBy='nome ASC'.`,
        });
      } else {
        const query = await getFuncBenefByFilter(composeFilter(req.query), limit);
        return res.status(200).json({query});
      }
    } else {
      // SE FOI FEITO OUTRO MÉTODO ALÉM DE GET
      return res
        .status(403)
        .json({ status: 403, message: "METHOD NOT ALLOWED" });
    }
  } catch (error) {
    // ERRO GERAL DE REQUEST
    return res
      .status(500)
      .json({ status: 500, message: "API ERROR", error: error.message });
  }
}

export default allowCors(handler);
