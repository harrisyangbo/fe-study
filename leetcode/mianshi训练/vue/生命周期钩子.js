// 生命周期钩子就是回调函数而已，创建组件实例的过程中会调用钩子方法

// 简易实现
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
  vm.options[hookName] && vm.options[hookName].forEach(h => h())
}
function Vue(options) {
  // 核心是合并,内部会将钩子函数转换为数组
  this.options = mergeOptions(this.constructor.options, options);


  callHook(this, 'beforeCreate');
  callHook(this, 'mounted');
}
// 全局组件，全局过滤器
Vue.options = {}
new Vue({
  beforeCreate() {
    console.log('beforeCreate')
  },
  mounted() {
    console.log('mounted')
  }
})

/**
 * vue 各生命周期在什么时候调用都干了啥？
 * beforeCreated
 * 这时实例还没有被创建，所以你无法知道data，也不能用watch监听
 * created
 * 这时实例已经创建，可以得到data，调用watch，但是页面还是空白的
 * beforeMounted
 * 页面挂载前，此时页面依然是空白的。这时render函数首次被调用。
 * mounted
 * 页面挂载了，这时你可以看到页面的内容，也可以访问到dom
 * beforeUpdate
 * 数据更新前，也就是虚拟DOM打补丁之前。这时访问到的DOM还有原有的DOM
 * update
 * 数据更新完毕后。注意，如果当前页面有挂载子组件，子组件更新时它并不能保证子组件也重绘了。
 * 如果你想确定是整个dom都更新可以使用 this.$nextTick()
 * activated和deactivated
 * keep-alive特有的钩子函数，当被这个标签包裹的组件被激活或停用时触发
 * bedoreDestroy
 * 当你离开这个页面前被调用。例如说取消定时器，使用了第三方库留下了多余的DOM结构，都可以在
 * 这个时机删除，避免内存泄漏。
 * destroy
 * 这时候实例已经被完全销毁
 * 
 * 见源码：vue/src/core/instance/init.js
 * */ 