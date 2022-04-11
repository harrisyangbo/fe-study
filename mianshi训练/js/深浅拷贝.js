/*******首先实现浅拷贝*******/
function shallowCopy(obj) {
  let objType = types(obj);
  let Ctor = obj.constructor;
  if (/^symbol$/i.test(objType)) return Object(obj);
  if (/^error$/i.test(objType)) return new Ctor(obj.message);
  if (/^(regexp|Date)/i.test(objType)) return new Ctor(obj);
  if (/^function$/i.test(objType)) {
    return function() {
      return obj.call(this, ...arguments)
    }
  }
  if (/^(array|object)$/.test(objType)) {
    return objType === 'array' ? [...obj] : {...obj}
  }
  return obj;
}

// 深拷贝
function deepClone(obj, cache = new Set()) {
  let type = types(obj),
      Ctor = obj.constructor;
  if (!/^(array|object)$/i.test(type)) return shallowClone(obj);
  if (cache.has(obj)) return obj;
  cache.add(obj);
  let result = new Ctor(),
      keys = [
          ...Object.keys(obj),
          ...Object.getOwnPropertySymbols(obj)
      ];
  keys.forEach(key => {
    result[key] = deepClone(obj[key], cache);
  })
  return result;
}

// 判断对象类型的方法 
function types(obj) {
  if (obj instanceof Array) {
    return 'array';
  } else if (obj instanceof Function) {
    return 'function'
  } else if (obj instanceof Object) {
    return 'object'
  } else if (obj instanceof Error) {
    return 'error'
  } else if (obj instanceof RegExp) {
    return 'regexp'
  } else if (obj instanceof Date) {
    return 'Date'
  } else if (typeof obj === 'symbol') {
    return symbol
  } else if (typeof obj === 'undefined') {
    return 'undefined'
  } else if (typeof obj === 'string') {
    return 'string'
  } else if (typeof obj === 'number') {
    return 'number'
  } else if (typeof obj === 'boolean') {
    return 'boolean'
  } else if (obj === null) {
    return null
  } else {
    return obj;
  }
}

// 题目: 下面的代码输出啥

var a = [{c: {d: 1}}, {e: 2}]

var b = a.slice()

console.log(b)

b[1].e = 6

console.log(a)