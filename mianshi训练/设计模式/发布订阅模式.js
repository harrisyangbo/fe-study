/**
 * 发布-订阅模式也叫做观察者模式。通过一对一或者一对多的依赖关系，当对象发生改变时，订阅方
 * 都会收到通知。
 * 
*/
var event = {
  clientList: {}, // 缓存列表，存放订阅者的回调函数
  listen: function(key, fn) {
    if(!this.clientList[key]) {
      // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
      this.clientList[key] = []
    }
    // 订阅的消息添加进消息缓存列表
    this.clientList[key].push(fn)
  },
  // 发布消息
  trigger: function() {
    let key = Array.prototype.shift.call(arguments); // 取出消息类型
    let fns = this.clientList[key]; // 取出该消息对应的回调函数集合
    if(!fns||fns.length===0){
      //如果没有订阅该消息，则返回
      return false;
    }
    for(let i =0; i< fns.length; i++) {
      //arguments是发布消息时附带的参数
      fns[i].apply(this, arguments);
    }
  }
}
var installEvent = function(obj) {
  for(var i in event) {
    obj[i] = event[i];
  }
}