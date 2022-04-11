Function.prototype.bind = function(context) {
  if (typeof this !== 'function') {
    throw new Error('no function')
  }
  let aArgs = Array.prototype.slice(arguments, 1); // 参数截取
  let fToBind = this;
  let fNop = function() {};
  fBound = function() {
    return fToBind.apply(this instanceof fNop ? this : context, aArgs.concat(Array.prototype.slice(arguments)))
  }
  if (this.prototype) {
    fNop.prototype = this.prototype;
  }
  fBound.prototype = new fNop();
  return fBound;
}

Function.prototype.bind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')  
  }
  let _self = this;
  let args = Array.prototype.slice(arguments, 1);
  return function F() {
    if (this instanceof F) {
      return new _self(...args, ...arguments);
    }
    return _self.apply(context, args.concat(...arguments))
  }
}

// 手写 applay

Function.prototype.apply = function(context, args) {
    context = context || window;
    args = args || [];
    const key = Symbol()
    context[key] = this
    let result = context[key](...args);
    delete context[key];
    return result;
}

// 手写 call

Function.prototype.call = function(context, ...args) {
  context = context || window;
  const key = Symbol();
  context[key] = this;
  let result = context[key](...args);
  delete context[key]
  return result
}