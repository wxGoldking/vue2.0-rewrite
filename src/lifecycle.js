function mountComponent(vm) {
    vm._update(vm._render());
}

function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
    }
}

export {
    lifecycleMixin,
    mountComponent
}