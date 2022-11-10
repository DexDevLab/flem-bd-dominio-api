/**
 * Converte um Array de objetos para um Array de Inteiros. Utilizado
 * para criar os objetos de critério de pesquisa ao BD utilizando
 * queries do Prisma.
 * @param {Array} raw Array contendo valores a serem
 * convertidos para um Array de objetos do tipo Inteiro.
 * @returns Array de objetos do tipo Inteiro.
 */
const parseArrayToInteger = (raw) => {
  try {
    const initialParse = JSON.parse(raw);
    if (Array.isArray(initialParse)) {
      const dataParse = initialParse.map((data) => {
        if (Number.isInteger(parseInt(data))) {
          return parseInt(data);
        } else {
          return null;
        }
      });
      return dataParse.filter((e) => e);
    } else if (Number.isInteger(parseInt(raw))) {
      return parseInt(raw);
    }
  } catch (e) {
    if (Number.isInteger(parseInt(raw))) {
      return parseInt(raw);
    }
  }
};

export {parseArrayToInteger};

/**
 * Converte um Array de objetos para um Array de Strings. Utilizado
 * para criar os objetos de critério de pesquisa ao BD utilizando
 * queries do Prisma.
 * @param {Array} raw Array contendo valores a serem
 * convertidos para um Array de objetos do tipo String.
 * @returns Array de objetos do tipo String.
 */
const parseArrayToString = (raw, key) => {
  try {
    const initialParse = JSON.parse(raw);
    if (Array.isArray(initialParse)) {
      const dataParse = initialParse.map((data) => ({
        [key]: { contains: data },
      }));
      return dataParse.concat();
    }
  } catch (e) {
    return [{ [key]: { contains: raw } }];
  }
};
export {parseArrayToString};

/**
 * Converte um Array de objetos para Strings, devidamente formatado.
 * Utilizado para criar os objetos de critério de pesquisa ao BD utilizando
 * queries SQL.
 * @param {Array} raw Array contendo valores a serem
 * convertidos para uma String.
 * @returns String devidamente formatada para compor Query String.
 */
const parseArrayToQueryString = (raw, key) => {
  try {
    const initialParse = JSON.parse(raw);
    const quotedItems = initialParse.map((item) => `'%${item}%'`);
    return `${quotedItems.join(` OR ${key} LIKE `)})`;
  } catch (e) {
    return `'%${raw.toString().replaceAll('"', "")}%')`;
  }
};
export {parseArrayToQueryString};

/**
 * Converte um Array de objetos para Strings, devidamente formatado.
 * Utilizado para criar os objetos de critério de pesquisa ao BD utilizando
 * queries SQL.
 * @param {Array} raw Array contendo valores a serem
 * convertidos para uma String.
 * @returns String devidamente formatada para compor Query String.
 */
const parseArrayToQueryStringEquals = (raw, key) => {
  try {
    const initialParse = JSON.parse(raw);
    const quotedItems = initialParse.map((item) => `'${item}'`);
    return `(${quotedItems.join(`,`)})`
  } catch (e) {
    return `('${raw.toString().replaceAll('"', "")}')`;
  }
};

export {parseArrayToQueryStringEquals};
