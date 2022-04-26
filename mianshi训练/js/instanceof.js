function myInstanceof(obj, ctor) {
  if (typeof obj !== 'object') {
    return false;
  }
  let objProto = obj.__proto__;
  while(objProto) {
    if (objProto === ctor.prototype) {
      return true
    }
    objProto = objProto. __proto__;
  }
  return false
}

function intanceof(left, right) {
  const proto = left.__proto__;
  while (proto) {
    if (proto === right.prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}