import {initState} from './init'

function Vue(options) {
  this._init(options);
}

// 初始化方法
Vue.prototype._init = function(options) {
  var vm = this;
  vm.$options = options;
  // 初始化数据
  initState(vm);
}


export default Vue;