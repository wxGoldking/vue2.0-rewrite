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
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

/*
  <div id="app" style="color: red;font-size: 20px;">
    你好,
    {{name}}
    <span class="text" style="color: green">{{age}}</span>
  </div>
*/ 

function parseHtmlToAst(html) {
  let text,
      root,
      currentParent,
      stack = []
  // console.log(html)

  while(html) {
    let textEnd = html.indexOf('<'); 
    if(textEnd === 0) {
      const startTagMatch = parseStartTag();

      if(startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }

      const endTagMatch = html.match(endTag);

      if(endTagMatch) {
        // console.log(endTagMatch);
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    if(textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    if(text) {
      advance(text.length)
      chars(text)
    }
    // break;
  }

  function parseStartTag() {
    // 匹配开始标签
    const start = html.match(startTagOpen);
    
    // 标签闭合和属性
    let end,
        attr;
    if(start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 匹配到属性
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5] // 对应属性值双引号、单引号、无引号
        })
        advance(attr[0].length)
      }

      if(end) {
          advance(end[0].length);
          return match;
      }

    }
  }

  function advance(n) {
    html = html.substring(n);
  }

  function start (tagName, attrs) {
    const element = createASTElement(tagName, attrs);
    
    if(!root) {
      // 保存根节点
      root = element;
    }
    // 保存当前节点
    currentParent = element; 
    // 由外层到内层保存节点队列
    stack.push(element);
  }
  
  function end (tagName) {
    // 匹配到结束标签时，从队列取出队尾的节点
    const element = stack.pop();
    // 更新当前节点
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      // 更新元素的parent
      element.parent = currentParent;
      // 添加到当前节点的children中
      currentParent.children.push(element);
    }
  }
  
  function chars(text) {
    text = text.trim();
    if(text.length > 0) {
      // 文本节点属于当前节点的children
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }
  
  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent
    }
  }

  return root;
}


export {
  parseHtmlToAst
}