/** 
 * 组合继承
 * 比较常用
 * 这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，但是也
 * 存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类
 * 属性，存在内存上的浪费。
 * 
 * 核心是在子类的构造函数中通过 Parent.call(this) 继承父类的属性，然后改变子类的原型为 
 * new Parent() 来继承父类的函数
*/

function Parent(value) {
  this.value = value
}

Parent.prototype.con = function() {
  console.log(this.value)
}

function Child(a) {
  Parent.call(this, a)
}
Child.prototype = new Parent();

let child = new Child('yang')
child.con();

/** 
 * 寄生组合继承
 * 核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问
 * 题，还能正确的找到子类的构造函数。
 * */ 

function Parent1(value) {
  this.value = value
}

Parent1.prototype.con = function() {
  console.log(this.value)
}

function Child1(a) {
  Parent1.call(this, a)
}
Child1.prototype = Object.create(Parent1.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

let child1 = new Child1('vvv')
child1.con();