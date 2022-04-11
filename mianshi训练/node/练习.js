/**
 * 中间件的简单实现
 * 
*/

let m1 = function(req, res, next) {
  console.log('m1')
  next()
}
let m2 = function(req, res, next) {
  setTimeout(() => {
    console.log('m2')
  }, 300)
  next()
}
let m3 = function(req, res, next) {
  console.log('m3')
  next()
}
let ms = [m1,m2,m3]

function middleWare(req, res) {
  const next = () => {
    let middle1 = ms.shift();
    if (middle1) {
      middle1(req, res, next)
    }
  }
  next();
}

middleWare()