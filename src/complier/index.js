import { parseHtmlToAst } from "./astParser"
import { generate } from "./generate";

function complierToRenderFunction(html) {
  const ast = parseHtmlToAst(html),
        code = generate(ast),
        render = new Function(`
          with(this){ return ${code}}
        `)
        return render;
}

export {
  complierToRenderFunction
}