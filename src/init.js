import observe from "./observe";
import proxyData from "./proxy";


function initState(vm) {
  var options = vm.$options;

  if(options.data) {
    initData(vm)
  }
}

function initData(vm) {
  var data = vm.$options.data;
  
  vm._data = data = typeof data === 'function' ? data.call(vm) : data || {};
  
  for (const key in data) {
    // 代理_data到vm上, 以便使用this.xxx直接访问data
    proxyData(vm, '_data', key);
  }
  // 数据劫持
  observe(vm._data);
}

export {
  initState
}