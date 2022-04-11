/**
 * 可以想象一个场景。假设有一份很复杂的代码需要用户去调用，但是用户并不关心这些复杂的代码，
 * 只需要你提供给我一个接口去调用，用户只负责传递需要的参数，至于这些参数怎么使用，内部有什
 * 么逻辑是不关心的，只需要你最后返回我一个实例。这个构造过程就是工厂。
 * 
*/

// 一个简单的工厂模式

class A {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class B {
  static create(name) {
    return new A(name)
  }
}

B.create('na').getName();

// 在 Vue 中创建异步组件用的也是工厂模式 

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
    
    // 逻辑处理...
  
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  return vnode
}