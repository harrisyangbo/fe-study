// mixin 的使用场景和原理

/**
 * 核心回答：
 * Vue.mixin 的作用就是抽离公共的业务逻辑，原理类似对象的继承，当组件初始化时会调用方法进行
 * options 合并，采用策略模式针对不同的属性进行合并，如mixin 中的数据和组件本身的数据冲突，
 * 则会采取就近原则使用组件的数据
 * mixin 会有命名冲突问题，数据来源问题
 * 
 * mixin 的钩子将在组件自身钩子之前调用
 * **/

// 简单实现
function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal]; // 将钩子函数包装为数组
    }
  } else {
    return parentVal
  } 
}
function mergeOptions(parent, child) {
  let opts = {}
  for (let key in child) {
    // 合并钩子方法 
    opts[key] = mergeHook(parent[key], child[key])
  }
  return opts;
}
function callHook(vm, hookName) {
  vm.options[hookName] && nvm.options[hookName].forEach(h => h())
}
function Vue(options) {
  // 核心是合并,内部会将钩子函数转换为数组
  this.options = mergeOptions(this.constructor.options, options);


  callHook(this, 'beforeCreate');
  callHook(this, 'mounted');
}
// 全局组件，全局过滤器
Vue.options = {}
// mixin 可提供全局数据，但数据不是共享的
Vue.mixin = function(obj) {
  // 把 beforeCreate() 变成了数组
  this.options = mergeOptions(this.options, obj)
  console.log(this.options)
}
Vue.mixin({
  beforeCreate() {
    console.log('beforeCreate')
  }
});
new Vue({
  beforeCreate() {
    console.log('beforeCreate')
  },
  mounted() {
    console.log('mounted')
  }
})

// 源码位置 vue/src/instance/util/options.js