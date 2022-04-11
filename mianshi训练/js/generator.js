// 用 es5 创建一个迭代器

function createIterator(items) {
  let i = 0;
  // 迭代器会返回一个对象
  // 所有迭代器都有一个 next 方法
  // 每次调用都返回一个结果对象。结果对象有两个属性：一个是value，表示下一个将要返回的值；另一个是done，它是一个布尔类型的值，当没有更多可返回数据时返回true。迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次next()方法，都会返回下一个可用的值
  return {
    next: function() {
      var done = (i >= items.length)
      var value = !done ? items[i++] : undefined;
      return {
        done,
        value
      }
    }
  }
}
var iterator = createIterator([1,2,3])
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 生成器
/**
 * 生成器是一种返回迭代器的函数，通过function关键字后的星号(*)来表示，函数中会用到新
 * 的关键字yield。星号可以紧挨着function关键字，也可以在中间添加一个空格
 * 如果给迭代器的next()方法传递参数，则这个参数的值就会替代生成器内部上条yield语句的返回
 * 值.
 * 第一次调用next()方法时无论传入什么参数都会被丢弃
*/

function *createGenerator() {
  yield 1;
  yield 2;
}

let generator = createGenerator(); // 返回一个迭代器
console.log(generator.next())
console.log(generator.next())

/**
 * 由于生成器也是函数，因此可以通过return语句提前退出函数执行，对于最后一次next()方法调
 * 用，可以主动为其指定一个返回值。正如在其他函数中那样，可以通过return语句指定一个返回
 * 值。而在生成器中，return表示所有操作已经完成，属性done被设置为true；如果同时提供了相应
 * 的值，则属性value会被设置为这个值
 * 
*/

/**
 * 生成器常用的使用场景
 * 1. 状态机
 * 2. 可迭代对象(可迭代对象具有Symbol.iterator属性)
 * 3. for-of循环的代码通过调用values数组的Symbol.iterator方法来获取迭代器
*/
