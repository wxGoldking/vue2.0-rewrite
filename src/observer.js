import observeArr from "./observeArr";
import defineReactiveData from "./reactive";
import { arrMethods } from './array';

// 处理数据成为响应式
function Observer(data) {
  if(Array.isArray(data)) {
    // 数组时更改其原型对象指向
    data.__proto__ = arrMethods;
    observeArr(data);
  }else {
    this.walk(data)
  }
}

Observer.prototype.walk = function(data) {
  var keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    var key = keys[i],
        value = data[key];
    defineReactiveData(data, key, value);
  }
}

export default Observer;