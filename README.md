# vue2.0-rewrite
vue-study-2.0 rewrite
1. 初始化数据劫持
  ---代理data到实例，以便this.xx直接访问data
  ---数据劫持data, 区分数组和对象
    ---对象：递归遍历
    ---数组：重写数组的操作方法，替换__proto__，递归遍历
