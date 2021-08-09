/*
<div id="app" style="color: red;font-size: 20px;">
    你好,{{name}}
    <span class="text" style="color: green">{{age}}</span>
</div>

_c() => createElement() // 创建元素节点
_v() => createTextNode() // 创建文本节点
_s() => {{name}} => _s(name) // 处理{{}}数据

render() {
    reutrn `
        _c(
            "div", 
            {
                id: "app",
                style: {
                    color: "red",
                    font-size: "20px"
                }
            }
            _v("你好，"+_s(name)), 
            _c(
                "span",
                {
                    class: "text",
                    style: {
                        color: "green"
                    }
                },
                _v(_s(age))
            )
        ) 
    `
}

*/

// match正则
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/;

// exec捕获对应正则
// const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function formatProps (attrs) {
    let attrStrArr = [];

    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        
        if(attr.name === 'style') {
            let styleAttrs = {};

            attr.value.split(';').map(styleAttr => {
                let [key, value] = styleAttr.split(':');
                key && (styleAttrs[key] = value.trim());
            })
            attr.value = styleAttrs;
        }

        attrStrArr.push(`${attr.name}:${JSON.stringify(attr.value)}`);
        
    }
    return `{${attrStrArr.join()}}`;
}

function generateChild(node) {
    if(node.type === 1) {
        return generate(node);
    } else if (node.type === 3) {
        let text = node.text;
        
        // 处理纯文本
        if(!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`
        }
        // 处理带{{}}模板的文本
        let match,
            index,
            lastIndex = defaultTagRE.lastIndex = 0,
            textArr = [];
        // 用match匹配{{}}
         while(match = text.match(defaultTagRE)) {
            index = match.index;
            // 保存{{}} 前的数据 
            index > 0 && textArr.push(JSON.stringify(text.slice(0, index)));
            textArr.push(`_s(${match[1].trim()})`);
            text = text.slice(index + match[0].length);
        }
        // {{}} 匹配结束后的剩余字符串
        text && textArr.push(JSON.stringify(text))


        // 使用exec捕获
        // while(match = defaultTagRE.exec(text)) {
        //     index = match.index;
        //     if (index > lastIndex) {
        //         textArr.push(JSON.stringify(text.slice(lastIndex, index)));
        //     }
        //     textArr.push(`_s(${match[1].trim()})`);
        //     lastIndex = index + match[0].length;
        // }
        // if(lastIndex < text.length) {
        //     textArr.push(JSON.stringify(text.slice(lastIndex)))
        // }

        // console.log(`_v(${textArr.join('+')})`);
        return `_v(${textArr.join('+')})`;
    }
}

function getChildren(el) {
    const children = el.children;

    if(children) {
        return children.map(c => generateChild(c)).join();
    }
}

function generate (el) {
    let children = getChildren(el);
    let code = `
        _c(
            "${ el.tag }",
            ${
                el.attrs.length > 0
                ?
                `${ formatProps(el.attrs) }`
                :
                'undefined'
            }${ 
                children ? `, ${children}` : ''
            })
    `;
    return code;
}

export {
    generate
}