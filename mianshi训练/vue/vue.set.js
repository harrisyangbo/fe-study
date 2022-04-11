// vue.set 方法是如何实现的？

/**
 * 核心回答：
 * 为什么 $set 可以触发更新，我们给对象和数组本身都增加了dep 属性，当给对象新增不存在
 * 的属性则触发对象依赖的 watcher 去更新，当修改数组索引时我们调用数组本身的 splice 方法
 * 去更新数组
 * 
 * set 方法底层 对于数组来说直接调用 splice 方法来改变数组
 * 对象直接使用 defineReactive 方法 也就是 Object.definePrototy 
 * 最后在更新视图
 * 
*/