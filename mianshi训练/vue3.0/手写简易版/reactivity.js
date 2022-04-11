let activeEffect;
function effect(fn) {
  activeEffect = fn;
  // 默认先执行一次
  fn();
  activeEffect = null; // 页面渲染完毕要清空 effect
}

function reactive(target) {
  return new Proxy(target, { // proxy 不用重写每一个属性
    set(target, key, value, receiver) { // 拦截器, 性能更高
      // target[key] = value;
      const res = Reflect.set(target, key, value, receiver)
      // res && activeEffect()
      trigger(target, key); // 触发依赖/更新
      return res;
      // proxy 中的 set 方法需要返回值
    },
    get(target, key, receiver) {
      // 只有取值的时候才会做依赖收集
      let res = Reflect.get(target, key, receiver); // 等价于 target[key]
      track(target, key); // 收集依赖
      return res;
      // if (typeof target[key] === 'object') {
      //   return reactive(target[key]) // 递归代理
      // } else {
      //   return target[key]
      // }
    }
  })
}
/**
 * Map 可以用对象作为 key, 但 Map 中的数据一直不释放可能会造成内存泄漏，所以用 WeakMap
 * WeakMap 可以自动去进行垃圾回收
*/
const targetMap = new WeakMap();
// 收集依赖
function track(target, key) {
  // target 的某个 key 可能依赖多个 effect
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  if (activeEffect && !deps.has(activeEffect)) {
    deps.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  effects && effects.forEach(effect => effect());
}

/**
 * 依赖收集，要切记是某个属性变了要进行更新，而不是整个对象变了就更新，一个属性要收集对应的
 * effect
 * 
*/


window.effect = effect;
window.reactive = reactive;