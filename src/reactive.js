import observe from "./observe";

function defineReactiveData(data, key, value) {
  // 关键的一步递归处理，保证对象深层次key的响应式
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      // 返回value而不是data[key]
      console.log('value get', value)
      return value;
    },
    set(newVal) {
      if(newVal === value) return;
      console.log('value setting', value, newVal)
      observe(newVal);
      // value的值已经保存在闭包中, 每次set将其更新
      value = newVal;
    }
  })
}

export default defineReactiveData;