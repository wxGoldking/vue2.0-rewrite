function patch(oldNode, vNode) {
    const el = createElement(vNode),
          parentNode = oldNode.parentNode;
    parentNode.insertBefore(el, oldNode.nextSibling);
    parentNode.removeChild(oldNode);
}


function createElement(vnode) {
    const {tag, props, children, text} = vnode;
    if(typeof tag === 'string') {
        vnode.el = document.createElement(tag);
        updateProps(vnode);
        if(children) {
            children.map(child => {
                vnode.el.appendChild(createElement(child));
            })
        }
    } else {
        vnode.el = document.createTextNode(text);
    }

    return vnode.el;
}

function updateProps(vnode) {
    const props = vnode.props || {}, el = vnode.el;

    for (const key in props) {
        if (key === 'class') {
            el.className = props[key];
        } else if (key === 'style') {
            for (const sKey in props[key]) {
                el.style[sKey] = props[key][sKey];
            }
        } else {
            el.setAttribute(key, props[key]);
        }
    }
}

export {
    patch
}