import { parseHtmlToAst } from "./astParser"

function complierToRenderFunction(html) {
  const ast = parseHtmlToAst(html)
  console.log(ast)
}

export {
  complierToRenderFunction
}