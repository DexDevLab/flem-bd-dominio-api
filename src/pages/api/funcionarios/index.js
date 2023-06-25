import { getFuncRhByFilter } from "controller/funcionarios";
import { allowCors } from "services/apiAllowCors";
import { exceptionHandler } from "utils/exceptionHandler";

/**
 * Fornece Funcionários e lista de Funcionários, conforme critérios.
 * Os critérios servem como parâmetros para refinar a pesquisa conforme
 * necessário.
 * @method handler
 * @memberof module:funcionarios
 * Os parâmetros são:
 *
 * @param {Boolean} ativo - Se o funcionário está desligado (FALSE) ou
 * não (TRUE). Se este parâmetro for omitido, a query retornará tanto
 * funcionários ativos como desligados ou demitidos. Exemplo: ativo=false
 *
 * @param {String} orderBy - Define uma coluna da query e um sentido para definir
 * ordenamento dos resultados. Se este parâmetro for omitido, ele definirá um
 * ordenamento padrão específico de acordo com o filtro da query
 * (@see composeFilter). Exemplo: orderBy="matriculaDominio ASC"
 * As colunas podem ser encontradas nos parâmetros da query específica
 * em queryParameters.
 *
 * @param {Object} limit - Define uma quantidade máxima de resultados.
 * Se este parâmetro for omitido, ele segue com uma quantidade máxima
 * padrão, definida pela query em queryParameters.
 * Exemplo: limit=100
 *
 * @param {Object} condition - Define uma condição de pesquisa, quando
 * incluído mais de 1 coluna em "columns". Caso os critérios de pesquisa
 * envolvam informações em mais de 1 coluna, é obrigatório o uso deste
 * parâmetro. Se este parâmetro for omitido e exista mais de 1 critério
 * de pesquisa em "columns", a função disparará uma exceção.
 * Exemplo: condition="OR"
 *
 * @param {Object} columns - Define as condições de pesquisa ao relacionar
 * uma coluna da query com o resultado desejado. Em caso de mais de 1 coluna
 * informada, o uso de "condition" é obrigatório. Exemplo: matriculaDominio=1200
 * columns pode ser definido no formato de Array[].
 *
 * Exemplo de requisição completa:
 * /funcionarios?ativo=true&matriculaDominio=["1200", "600"]&codDepto="1000"&
 * condition="AND"&orderBy="nome ASC"
 *
 * @param {Object} req HTTP request. Apenas GET é aceito
 * @param {Object} res HTTP response
 * @returns {Object} HTTP response como JSON contendo a resposta da query consultada
 */
async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { condition, ativo, orderBy, limit, ...columns } = req.query;
        if (!condition && Object.keys(columns).length > 1) {
          const error = new Error(
            `BAD REQUEST - A chamada requer 'CONDITION' como parâmetro em req.query`
          );
          error.status = 400;
          error.message =
            `BAD REQUEST - A chamada requer 'CONDITION' como parâmetro em req.query` +
            ` quando se realizam pesquisas de filtro com mais de 1 critério.` +
            ` Exemplo de requisição completa: /funcionarios?ativo=true&` +
            `matriculaDominio=['1200','600']&codDepto='1000'&condition='AND'&` +
            `orderBy='nome ASC'.`;
          return exceptionHandler(error, res);
        } else {
          const query = await getFuncRhByFilter({ ...req.query });
          return res.status(200).json({ query });
        }
      } catch (e) {
        return exceptionHandler(e, res);
      }
    // SE NÃO HOUVER APLICABILIDADE PARA ESTE POST, EXCLUIR.
    // case "POST":
    //   try {
    //     const { condition, ativo, orderBy, limit, ...columns } = req.query;
    //     if (!condition && Object.keys(columns).length > 1) {
    //       return res.status(400).json({
    //         status: 400,
    //         message:
    //           `BAD REQUEST - A chamada requer 'CONDITION' como parâmetro em req.body` +
    //           ` quando se realizam pesquisas de filtro com mais de 1 critério.` +
    //           ` Exemplo de requisição completa: /funcionarios?ativo=true&` +
    //           `matriculaDominio=['1200','600']&codDepto='1000'&condition='AND'&` +
    //           `orderBy='nome ASC'.`,
    //       });
    //     } else {
    //       const query = await getFuncRhByFilter({ ...req.query, ...req.body });
    //       return res.status(200).json({ query });
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     return res
    //       .status(err.status || 500)
    //       .json(`flem-ppe-backend: ${err.message}`);
    //   }
    default:
      return exceptionHandler(null, res);
  }
}

export default allowCors(handler);
