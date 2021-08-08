/**
 * 处理arr数据的响应式
 * 
 * */ 
import {ARR_METHODS} from './config';
import observeArr from './observeArr';
var originArrMethods = Array.prototype,
// 从数组的原型对象上生成新的原型对象，覆盖对应的数组方法
    arrMethods = Object.create(originArrMethods);

ARR_METHODS.map(function(m) {
  arrMethods[m] = function () {
    var args = Array.prototype.slice.call(arguments),
     reslult = originArrMethods[m].apply(this, args);
    // 保存数组方法新增的项newArr
    var newArr;
    switch (m) {
      case 'push':
      case 'unshift':
        // push和unshift的args就是数组新增项
        newArr = args;
        break;
      case 'splice':
        // slice的args从第二项起就是数组新增项
        newArr = args.slice(2);
        break;
      default:
        break;
    }

    newArr && observeArr(newArr);

    return reslult;
  }
})

export {
  arrMethods
}