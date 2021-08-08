// 属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// 标签名 <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
// <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`)
// > />
const startTagClose = /^\s*(\/?)>/
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

/*
  <div id="app" style="color: red;font-size: 20px;">
    你好,
    {{name}}
    <span class="text" style="color: green">{{age}}</span>
  </div>
*/ 

function parseHtmlToAst(html) {
  console.log(html)
}

export {
  parseHtmlToAst
}