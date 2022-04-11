/**
 * 在NodeJS中，中间件主要是指封装所有Http请求细节处理的方法。
 * 一次Http请求通常包含很多工作，如记录日志、Cookie处理、等，
 * 但对于Web应用而言，并不希望接触到这么多细节性的处理，因此引入中间件来简化和隔离这些基础
 * 设施与业务逻辑之间的细节。
 * 
*/

/**
 * 中间件是从Http请求发起到响应结束过程中的处理方法，通常需要对请求和响应进行处理，因此一个
 * 基本的中间件的形式如下：
 * */ 

// const middlewares = (req, res, next) => {
//   // TODO
//   next()
// }

/**
 * 简单实现一个中间件
 * 方式一：类似 express 中间件的实现方式
 * 全局中间件和内置路由中间件中根据请求路径定义的中间件共同作用，不过无法在业务处理结束后再
 * 调用当前中间件中的代码。
*/
const middleware1 = (req, res, next) => {
  // TODO
  console.log('middle1')
  next()
}
const middleware2 = (req, res, next) => {
  // TODO
  console.log('middle2')
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  }).then(() => {
    next()
  })
}
const middleware3 = (req, res, next) => {
  // TODO
  console.log('middle3')
  next()
}
let middles = [middleware1, middleware2, middleware3]
function middleware(req, res) {
  const next = () => {
    const middle1 = middles.shift(); // 第一个中间件
    if (middle1) {
      middle1(req, res, next)
    }
  }
  next();
}
middleware();

/**
 * 简单实现一个中间件
 * 方式二：
 * koa2框架中中间件的实现方式，将next()方法返回值封装成一个Promise，便于后续中间
 * 件的异步流程控制，实现了koa2框架提出的洋葱圈模型，即每一层中间件相当于一个球面，当贯穿整
 * 个模型时，实际上每一个球面会穿透两次。
 * 所有的中间件都应返回一个Promise对象
*/