// nextTick 在哪里使用？原理是？

const { nextTick } = require("vue/types/umd")

/**
 * 核心回答：
 * nextTick中的回调是在下次DOM更新循环结束之后执行的延迟回调，在修改
 * 数据之后立即使用这个方法获取更新后的DOM. 原理就是异步方法，也就是事件环。
 * **/

// 简易实现
let cbs = []
let pendings = false;

function render() {
  console.log('渲染')
}
function flushCallbacks() {
  cbs.forEach(fn => fn());
  pendings = false;
}

function nextTick(fn) {
  cbs.push(fn);
  if (!pendings) {
    pendings = true
    Promise.resolve().then(flushCallbacks)
  }
  
}
// 延迟调用三次渲染
nextTick(render)
nextTick(render)
nextTick(render)
console.log('更改状态')
console.log('更改状态')
console.log('更改状态')
