// new 的原理？

/**  首先创建一个空对象var obj = {}，然后设置新对象的constructor属性为构造函数的名称，设置新对象的_proto_属性指向构造函数的prototype对象，然后使用新对象调用函数并且函数中的this指向新实例对象，最后将初始化完毕的新对象地址保存到等号左边的变量中。*/

// 实现 new

function myNew(){
  let obj = {}
  let Contrustor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Contrustor.prototype;
  Contrustor.apply(obj, arguments);
  return obj;
}

function Animal(a) {
  this.a = a;
}
Animal.prototype.bb = function() {
  console.log(this.a);
}

let a = myNew(Animal, 'cc')
a.bb()
console.log(a)