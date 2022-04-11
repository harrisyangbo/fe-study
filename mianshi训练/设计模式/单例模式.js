/**
 * 单例模式比较常用，比如全局缓存等等，
 * 单例模式的核心就是全局只有一个对象可以访问
*/

class Singleton {
  constructor() {}
}

Singleton.getInstance = (function() {
  let instance
  return function() {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()

let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()
console.log(s1 === s2) // true

/**
 * Vuex 中使用了单例模式来确保只安装一次 vuex
 * 
*/
let Vue // bind on install

export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    // 如果发现 Vue 有值，就不重新创建实例了
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}