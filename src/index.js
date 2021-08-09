import { initMixin } from './init';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './vdom';

function Vue (options) {
  this._init(options);

}

initMixin(Vue);
// 为实例挂载_update方法
lifecycleMixin(Vue);
// 为实例挂载_c, _s, _v, _render方法
renderMixin(Vue);

export default Vue;

