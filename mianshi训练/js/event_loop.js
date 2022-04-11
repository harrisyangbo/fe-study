// 浏览器中的 event_lop
/**
 * 宏任务：setTimeout setInterval 
 * 微任务：promise
 * 
 * 浏览器的事件循环机制是：每执行完一个宏任务就检查一次微任务队列，如果有微任务，则清空微任务后在从事件队列拿出来事件执行
 * 
 * 浏览器的一次事件循环包活：
 * 1. 检查macrotask队列是否为空，非空则到2，为空则到3
 * 2. 执行macrotask中的一个任务
 * 3. 继续检查microtask队列是否为空，若有则到4，否则到5
 * 4. 取出microtask中的任务执行，执行完成返回到步骤3
 * 5. 执行视图更新
 * 
 * 每轮事件循环分为3个步骤：
 *  a) 执行macrotask队列的一个任务
 *  b) 执行完当前microtask队列的所有任务
 *  c) UI render
 * 
 * update rendering（视图渲染）发生在本轮事件循环的microtask队列被执行完之后，也就是说
 * 执行任务的耗时会影响视图渲染的时机。通常浏览器以每秒60帧（60fps）的速率刷新页面，据说这
 * 个帧率最适合人眼交互，大概16.7ms渲染一帧，所以如果要让用户觉得顺畅，单个macrotask及它
 * 相关的所有microtask最好能在16.7ms内完成。
*/

// node 中的 event_loop

/** 
 * Node采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的libuv，libuv是一个基于事件驱动的
 * 跨平台抽象层，在node 中的每次事件循环都包含6个阶段：
 * timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
 * I/O callbacks 阶段：执行一些系统调用错误，比如网络通信的错误回调
 * idle, prepare 阶段：仅node内部使用
 * poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
 * even loop将同步执行poll队列里的回调，直到队列为空或执行的回调达到系统上限
 * ，接下来even loop会去检查有无预设的setImmediate()，分两种情况：
 * 若有预设的setImmediate(), event loop将结束poll阶段进入check阶段，并执行check阶段
 * 的任务队列,若没有预设的setImmediate()，event loop将阻塞在该阶段等待。在poll阶段、
 * event loop会有一个检查机制，检查timer队列是否为空，如果timer队列非空，event loop就
 * 开始下一轮事件循环，即重新进入到timer阶段。
 * 
 * check 阶段：执行 setImmediate() 的回调
 * close callbacks 阶段：执行 socket 的 close 事件回调
 * 
 * 
 * event loop 的每个阶段都有一个任务队列
 * 当 event loop 到达某个阶段时，将执行该阶段的任务队列，直到队列清空或执行的回调达到系统
 * 上限后，才会转入下一个阶段，当所有阶段被顺序执行一次后，称 event loop 完成了一个 tick
 * 
 * 在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去
 * 执行microtask队列的任务。
 * 
*/



// console.log('main1');
// process.nextTick(function() {
//     console.log('process.nextTick1');
// });
// setTimeout(function() {
//     console.log('setTimeout');
//     process.nextTick(function() {
//         console.log('process.nextTick2');
//     });
// }, 0);
// new Promise(function(resolve, reject) {
//     console.log('promise');
//     resolve();
// }).then(function() {
//     console.log('promise then');
// });
// console.log('main2');

// mai1 promise  mai2  process.nextTick1 promise then setTimeout process.nextTick2

setImmedia(() => {
  console.log('t1')
  Promise.resolve().then(function() {
    console.log('p1')
  })
}, 0)

setTimeout(() => {
  console.log('t2')
  Promise.resolve().then(function() {
    console.log('p2')
  })
}, 0)
