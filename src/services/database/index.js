import Sybase from "sybase-promised";


/**
 * Constante contendo os parâmetros para a conexão da
 * instância do Sybase-Promised
 * @constant connOptions
 * @memberof module:database
 * @returns {Object} Parâmetros do Sybase
 */
const connOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbname: process.env.DB_DBNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

/**
 * Inicializa a instância do Sybase-Promised
 * @method executeQuery
 * @memberof module:database
 * @param {String} connOptions Parâmetros para o Sybase Connector
 * @returns {Function} Instância do Sybase
 */
export const sybaseConnector = new Sybase(connOptions);
