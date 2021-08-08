import { parseHtmlToAst } from "./astParser"

function complierToRenderFunction(html) {
  const ast = parseHtmlToAst(html)
}

export {
  complierToRenderFunction
}