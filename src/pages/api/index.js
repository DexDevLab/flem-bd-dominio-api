/**
 * Rota de redirecionamento para a documentação
 * do jsdoc. Altera o título do documento, visto que
 * a biblioteca jsdoc não possui suporte nativo para
 * esta função.
 * @method api
 * @memberof module:api
 * @param {Object} req HTTP request.
 * @param {Object} res HTTP response.
 */
export default async function api(req, res) {
  const fs = require("fs").promises;
  const docsIndex = "public/index.html";
  const fileDocsIndex = await fs.readFile(docsIndex, "utf8");
  // const docsTitle = "FLEM PPE Frontend";
  
  // const formattedDocsIndex = fileDocsIndex
  //   .replace(/Home/g, docsTitle)
  //   .replace(/Global/g, "Geral");
  // await fs.writeFile(docsIndex, formattedDocsIndex, "utf-8");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(fileDocsIndex);
  res.end();
}
