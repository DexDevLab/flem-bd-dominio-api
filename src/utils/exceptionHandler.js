import _ from "lodash";

/**
 * Utilitário que funciona como um handler para exceções tratadas
 * e não-tratadas na aplicação. Realiza um console.log como padrão,
 * tanto ao receber a Exceção quanto ao tratá-la e, no caso do Backend,
 * pode devolver intuitivamente ao usuário como um Toast (notificação).
 * @method exceptionHandler
 * @memberof module:utils
 * @param {Error} exception o Erro da Exceção
 * @param {Response} res HTTP Response, caso esteja tratando diretamente
 * uma requisição. Para devolver o erro sem uma notificação visual (em caso
 * de funções ou exceções de handlers internos), pode ser utilizado um número
 * para substituir este parâmetro (por exemplo, excepcionHandler(exception, 0))
 * @returns {Response} HTTP Response, caso esta função não tenha Exceção como um dos
 * parâmetros, mas tenha um HTTP Response como parâmetro. Neste caso, retorna
 * um erro com status HTTP 405.
 *
 * Exemplo:
 *
 * return exceptionHandler(null, res);
 *
 * @returns {Object} Propriedades de um Toast para ser usado como notificação
 * ao usuário, caso esta função tenha uma Exceção como parâmetro, e não tenha
 * um HTTP Response como parâmetro.
 *
 * Exemplo:
 *
 * } catch (error) {
 *
 *    const exception = exceptionHandler(error);
 *
 *    if (exception.code == 409) {
 *
 *        demandanteFormSubmit.onClose();
 *
 *        exception.title = "Demandante já existe";
 *
 *        exception.description = "";
 *
 *        exception.duration = 5000;
 *
 *    }
 *
 *    toast(exception);
 *
 * }
 *
 * @returns {Response} HTTP Response, caso esta função tenha uma Exceção e simultaneamente
 * uma HTTP Response como parâmetro. Neste caso, retorna um erro com o status
 * da Exceção e a mensagem do erro.
 *
 * Exemplo:
 *
 * try {
 *
 *       return res.status(200).json(query);
 *
 *     } catch (e) {
 *
 *       return exceptionHandler(e, res);
 *
 *     }
 *
 * @returns {Error} um Erro com o status, mensagem e demais informações da
 * Exceção, caso esta função tenha uma Exceção e simultaneamente um número como
 * parâmetro substituindo o parâmetro 'res'.
 *
 * Exemplo:
 *
 *     } catch (e) {
 *
 *       throw exceptionHandler(err, 0);
 *
 *     }
 *
 * Use THROW quando precisar que o caller dispare o erro;
 *
 * Use RETURN quando o erro for tratado ou manipulado pelo caller;
 *
 * Use sem keywork nenhuma quando o bloco tratar o retorno na próxima linha,
 * ou quando quiser apenas deixar registrado o erro pelo console.log.
 *
 */
export function exceptionHandler(exception, res) {
  const returnToast = _.isUndefined(res) || _.isNull(res);
  if (_.isUndefined(exception) || _.isNull(exception)) {
    console.log(
      "Exception Output: ",
      `Portal PPE - Aplicação Backend - Erro 405 - Method not Allowed`
    );
    return res
      .status(405)
      .json(`Portal PPE - Aplicação Backend - Erro 405 - Method not Allowed`);
  } else {
    console.log("Exception Handler ", exception);
    const errorData = {
      status: 500,
      message: "",
      error: "",
    };
    if (!_.isUndefined(exception.response) && !_.isNull(exception.response)) {
      const { response } = exception;
      errorData.status = response.status;
      errorData.error = response;
      !_.isUndefined(response.data) && !_.isNull(response.data)
        ? (errorData.message = response.data)
        : (errorData.message = exception);
    } else {
      errorData.status = exception.status || exception.code || 500;
      errorData.message = exception;
    }
    const error = new Error();
    error.name = "";
    error.message = errorData.message;
    error.status = errorData.status;
    error.error = errorData.error;
    if (errorData.status === 500) {
      if (
        !_.isNull(errorData.message.toString().match(/\d{3}$/)) &&
        errorData.message.toString().match(/\d{3}$/)[0].length > 0
      ) {
        error.status = errorData.message.toString().match(/\d{3}$/)[0];
      }
    }
    console.log("Exception Output: ", error);
    console.log("Exception Output - Status: ", error.status);
    console.log("Exception Output - Message: ", error.message);
    if (returnToast) {
      const toast = {
        title: `Falha na Aplicação`,
        description: `(HTTP ${error.status})`,
        status: "error",
        duration: 10000,
        isClosable: false,
        code: error.status,
        position: "top-right",
        containerStyle: {
          width: "300px",
        },
      };
      if (error.message.toString().includes("Network Error")) {
        toast.title =
          "Erro de comunicação com a rede. Favor entrar em contato com o Suporte.";
      }
      return toast;
    } else {
      if (typeof res === "number") {
        return error;
      } else {
        return res.status(error.status).json(error.message.toString());
      }
    }
  }
}
