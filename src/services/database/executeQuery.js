import { sybaseConnector } from ".";
import { exceptionHandler } from "utils/exceptionHandler";

/**
 * Realiza a conexão com o BD e consulta o Banco de Dados Sybase 
 * utilizando uma Query String.
 * @method executeQuery
 * @memberof module:database
 * @param {String} queryStr Query String a ser requisitada no BD.
 * @returns {Promise} Promise contendo o resultado da query.
 */
async function executeQuery(queryStr) {
  try {
    if (!(await sybaseConnector.sybase.isConnected())){
      await sybaseConnector.connect();
      //console.log('Sybase Connected');
    }
    const query = await sybaseConnector.query(queryStr);
    return query;
  } catch (e) {
    const error = new Error(e);
    error.status = 500;
    error.message = `API de Integração com Banco de Dados DomínioFolha - Erro 500 - '${e.message}'`;
    exceptionHandler(error, 0);
    forever.restartAll();
  }
}

export default executeQuery;
