/*****Vue 2.0 实现响应式的简易版*****/

/*****object实现响应式，通过数据劫持*****/
const state = {a: 2}
let active;
const watcher = (fn) => {
  active = fn;
  fn();
  active = null;
}
defineReactive(state);
// 数据劫持
function defineReactive(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
      defineReactive(obj[key])
    } else {
      let value = obj[key]
      let dep = []
      Object.defineProperty(obj, key, {
        get() {
          if (active) {
            dep.push(active); // 依赖收集
          }
          return value;
        },
        set(newVal) {
          value = newVal;
          dep.forEach((watch) => {
            watch();// 触发更新
          })
        }
      })
    }
  }
}

watcher(() => {
  console.log(state.a)
})

/*****
 * 数组实现响应式，通过改写数组方法
 * 这里仅改写push 方法为例
 * *****/
const aDatas = [1,2,3,4,5]
const originArray = Array.prototype; // 数组原方法
const arrayMethods = Object.create(originArray);

function defineArray(arr) {
  arrayMethods.push = function(...args) {
    originArray.push.call(this, ...args);
    render();
  }
  arr.__proto__ = arrayMethods;
}
defineArray(aDatas);
function render() {
  console.log('数组变了就执行')
  console.log(aDatas);
}
render();//默认先执行一次
