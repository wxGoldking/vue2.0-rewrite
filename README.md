# vue2.0-rewrite
vue-study-2.0 rewrite
1. 初始化数据劫持--init.js--initState
  ---代理data到实例，以便this.xx直接访问data
  ---数据劫持data, 区分数组和对象
    ---对象：递归遍历
    ---数组：重写数组的操作方法，替换__proto__，递归遍历

2. complier分支 
  ## template -> 编译 .... -> 形成真实DOM

  $mount的工作
- 1、获取到template --init.js -- $mount
- 2、template -> AST树 -- $mount -- complierToRenderFunction

-    AST Abstract syntax tree  抽象语法树
-    源代码的抽象语法结构的树状描述

- 3、AST -> render函数 ->  _c   _v _s $mount -- complierToRenderFunction
- 4、render函数 -> 虚拟节点 mountComponent--— vm._render()获取到vnode
- 5、设置PATCH -> 打补丁到真实DOM mountComponent -- vm._update()将vnode转化为真实dom并挂载

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;