import { complierToRenderFunction } from "./complier";
import { initState } from "./state";

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    vm.$options = options;

    initState(vm);

    if (vm.$options.el) {
      // 挂载函数   Vue.prototype.$mount
      vm.$mount(vm.$options.el);
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this,
          options = vm.$options;
    el = document.querySelector(el)
    vm.$el = el;

    if(!options.render) {
      let template = options.template;

      if(!template && el) {
        template = el.outerHTML;
      }
      vm.render = complierToRenderFunction(template)
    }
  } 
}

export {
  initMixin
}