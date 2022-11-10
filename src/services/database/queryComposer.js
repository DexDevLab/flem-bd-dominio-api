/**
 * Função para compor o filtro da query. Caso a requisição faça uma solicitação
 * ao BD utilizando critérios de pesquisa ("condition") e um objeto de filtro,
 * aplica a alteração a um objeto de filtro para realizar a pesquisa corretamente.
 * 
 * @param {Boolean} includeAfastamentos Se a query deverá mencionar ou incluir critérios
 * sobre Afastamento de Funcionários, marque TRUE nesta variável; caso contrário, marque
 * como FALSE
 * 
 * @param {Object} criteria Conjunto de critérios de pesquisa(ver abaixo)
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
 * "columns" pode ser definido no formato de Array[].
 *
 * @param {Object} req HTTP request.
 * @returns Objeto contendo o fragmento da Query String para requisitar ao BD.
 */
export function queryComposer(criteria, includeAfastamentos) {
  const { condition, ativo, orderBy, limit, ...columns } = criteria;
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
            idx > 0
              ? ` ${condition.replaceAll('"', "").replaceAll("'", "")} `
              : " AND ("
          }${key} LIKE ${parseArrayToQueryString(columns[key], key)}`
        );
        break;
      case "idSituacao":
      case "matriculaDominio":
      case "codDepto":
        filter.push(
          `${
            idx > 0
              ? ` ${condition.replaceAll('"', "").replaceAll("'", "")} `
              : " AND "
          }${key} IN ${parseArrayToQueryStringEquals(columns[key], key)}`
        );
        break;
      case "cpf":
        filter.push(
          `${
            idx > 0
              ? ` ${condition.replaceAll('"', "").replaceAll("'", "")} `
              : " AND "
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
    if (includeAfastamentos) {
      filter.push(` ORDER BY matriculaDominio ASC, afastamentoDataReal DESC`);
    } else {
      filter.push(` ORDER BY matriculaDominio ASC`);
    }
  }
  return filter;
}
