/**
 * 栈属于逻辑结构
 * 假如有一个长筒，一面封闭，另一端开口，往里面防乒乓球，先放入的靠近底部，后放入
 * 的靠近出口，要想取出来必须按照相反的顺序来
 * 所以说栈是一种先入后出的数据结构，最早放入的元素叫做栈底，最后进入的叫栈顶
 * 
*/

class Static {
  constructor() {
    this.strac = []
  }

  add(item) {
    this.strac.push(item)
  }
  pop() {
    this.strac.pop();
  }
  peek() {
    return this.strac[this.getCount() - 1]
  }
  getCount() {
    return this.strac.length;
  }
  
  isEmpty() {
    return this.strac.length === 0;
  }
}