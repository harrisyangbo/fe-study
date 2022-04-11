// 手写 bind call apply

Function.prototype.apply = function(context, args) {
  context = context || window;
  args = args || []
  let key = Symbol();
  context[key] = this;
  let result = context[key](...args)
  delete context[key];
  return result;
}

Function.prototype.call = function(context, ...args) {
  context = context || window;
  let key = Symbol();
  context[key] = this;
  let result = context[key](...args)
  delete context[key];
  return result;
}

Function.prototype.bind = function(context) {
  if (typeof this !== 'function') {
    throw new Error('error')
  }
  let _selt = this
  let args = Array.prototype.slice(arguments, 1)
  return function F() {
    if (this instanceof F) {
      return new _selt(...args, ...arguments)
    }
    return _selt.apply(context, args.concat(arguments))
  }
}

// 手写 instanceof

function instan(obj, ctor) {
  let objProto = obj.__proto__;
  while(objProto) {
    if (objProto === ctor.prototype) {
      return true
    }
    objProto = objProto.__proto__
  }
  return false
}

// 手写 new

/**
 * 首先创建一个空对象var obj = {}，然后设置新对象的constructor属性为构造函数的名称，设]
 * 置新对象的_proto_属性指向构造函数的prototype对象，然后使用新对象调用函数并且函数中的
 * this指向新实例对象，最后将初始化完毕的新对象地址保存到等号左边的变量中。
 * 
*/
function myNew() {
  let obj = {}
  let Constructor = Array.prototype.slice.call(arguments, 1)
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}

// 组合继承

function A(val) {
  this.val = val
}

function B(val) {
  A.call(this, val)
}

B.prototype = new A();

// 寄生组合继承
function A(val) {
  this.val = val
}

function B(val) {
  A.call(this, val)
}

B.prototype = Object.create(A.prototype, {
  constructor: {
    value: B,
    enumerable: false,
    writable: true,
    configuable: true
  }
})

// 节流与防抖

// 节流

function inte(fn, delay) {
  let lastTime = 0
  return function() {
    let nowTime = new Date()
    if (nowTime - lastTime > delay) {
      fn.call(this, ...arguments)
      lastTime = nowTime;
    }
  }
}

// 防抖

function debounce(fn, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this)
    }, delay)
  }
}

// 二分查找

function bsearsh(A, x) {
  let left = 0
  let right = A.length - 1
  let guess;
  while(left < right) {
    guess = Math.floor((left + right)/2)
    if (A[guess] === x) return guess;
    if (A[guess] > x) {
      right = guess - 1
    } else {
      left = guess + 1
    }
  }
  return -1
}

// 快排

function quickSort(arr) {
  if (arr.length < 2) {
    return arr
  } else {
    let guess = arr[0]
    let point = []
    let low = []
    let hight = []
    arr.forEach((item) => {
      if (item === guess) point.push(item);
      if (item > guess) hight.push(item);
      if (item < guess) low.push(item) 
    })
    return quickSort(low).concat(point).concat(quickSort(hight))
  }
}