## Promise 介绍
> 摘自 MDN

Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。

一个 Promise 对象代表一个在这个 promise 被创建出来时不一定已知的值。它让您能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。

一个 Promise 必然处于以下几种状态之一：

- 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
- 已兑现（fulfilled）: 意味着操作成功完成。
- 已拒绝（rejected）: 意味着操作失败。

待定状态的 Promise 对象要么会通过一个值被兑现（fulfilled），要么会通过一个原因（错误）被拒绝（rejected）。当这些情况之一发生时，我们用 promise 的 then 方法排列起来的相关处理程序就会被调用。如果 promise 在一个相应的处理程序被绑定时就已经被兑现或被拒绝了，那么这个处理程序就会被调用，因此在完成异步操作和绑定处理方法之间不会存在竞争状态。

因为 Promise.prototype.then 和  Promise.prototype.catch 方法返回的是 promise， 所以它们可以被链式调用。

<img src="./promises.png" />

## 约定

不同于“老式”的传入回调，在使用 Promise 时，会有以下约定：

- 在本轮 事件循环 运行完成之前，回调函数是不会被调用的。
- 即使异步操作已经完成（成功或失败），在这之后通过 then() 添加的回调函数也会被调用。
- 通过多次调用 then() 可以添加多个回调函数，它们会按照插入顺序进行执行。

## 链式调用

Promise 很棒的一点就是**链式调用（chaining）**。

连续执行两个或者多个异步操作是一个常见的需求，在上一个操作执行成功之后，开始下一个的操作，并带着上一步操作所返回的结果。我们可以通过创造一个 Promise 链来实现这种需求。

解决使用回调的回调地狱问题。

有可能会在一个回调失败之后继续使用链式操作，即，使用一个 catch，这对于在链式操作中抛出一个失败之后，再次进行新的操作会很有用。

## Promise 拒绝事件

当 Promise 被拒绝时，会有下面两个事件之一被派发到全局作用域（通常而言，就是window；如果是在 web worker 中使用的话，就是 Worker 或者其他 worker-based 接口）。这两个事件如下所示：

rejectionhandled
当 Promise 被拒绝、并且在 reject 函数处理该 rejection 之后会派发此事件。

unhandledrejection
当 Promise 被拒绝，但没有提供 reject 函数来处理该 rejection 时，会派发此事件。

以上两种情况中，PromiseRejectionEvent 事件都有两个属性，**一个是 promise 属性，该属性指向被驳回的 Promise，另一个是 reason (en-US) 属性，该属性用来说明 Promise 被驳回的原因**。

PromiseRejectionEvent 接口表示出现在JavaScript Promises 被rejecte (拒绝) 时触发的事件。这些事件对遥测(远程测试)和调试特别的有用。 我们可以利用这个来在全局捕获 Promise 的错误。

```javascript
window.onunhandledrejection = function(e) {
  console.log(e.reason);
}
```