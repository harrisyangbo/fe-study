function myInstanceof(obj, ctor) {
  if (typeof obj !== 'object') {
    return false;
  }
  let objProto = obj.__proto__;
  while(objProto) {
    if (objProto === ctor.prototype) {
      return true
    }
    objProto = objProto.__proto__;
  }
  return false
}