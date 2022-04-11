// import {nodeOps} from './runtime-dom';
function render(vnode, container) {
  // 源码 patch 方法 更新视图
  /**
   * 1. 初次渲染
   * 2. dom-diff
  */
  patch(container._vnode, vnode, container)
  container._vnode = vnode; // 上一次渲染的虚拟节点
}

function patch(n1, n2, container, anchor) {
  /**
   * n1 是旧的虚拟节点
   * n2 是新的虚拟节点
  */
 /**
  * 如果是组件，tag 可能是个对象
  * 如果是字符串，tag 是标签
  * */
 if (typeof n2.tag == 'string') {
  // 标签渲染 
  // mountElement(n2, container);
  processElement(n1, n2, container, anchor)

 } else if (typeof n2.tag == 'object'){
  // 组件渲染
  mountComponent(n2, container);
 }
}

function processElement(n1, n2, container, anchor) {
  // 没有 n1 就是初次渲染，否则就进行diff操作

  if (!n1) {
    mountElement(n2, container, anchor)
  } else {
    patchElement(n1, n2, container);
  }
}

function patchElement(n1, n2, container) {
  // 暂时不考虑没有key的情况
  let el = n2.el = n1.el; // 节点复用
  const oldProps = n1.props;
  const newProps = n2.props;
  patchProps(el, oldProps, newProps); // 比对属性

  // 比对元素中的 children, el 是children 的父节点
  patchChildren(n1, n2, el);
}

function patchChildren(n1, n2, container) {
  let c1 = n1.children;
  let c2 = n2.children;
  /**
   * 可能一方有多个 children 另一方没有
   * */ 

  if (typeof c2 === 'string') {
    if(c1 !== c2) {
      // 直接文本替换
      nodeOps.hostSetElementText(container, c2);
    }
  } else { // c2 是数组
    if (typeof c1 === 'string') {
      // 先删除 c1 中原有内容
      nodeOps.hostSetElementText(container, '')
      // 然后插入新内容
      mountChildren(c2, container);
    } else { // c1 是数组
      // 比较新旧节点的 children
      patchKeyedChildren(c1, c2, container);
    }
  }

  /**
   * 相反
   * */ 

  /**
   * 两方都有 children
   * */ 

  
}

function patchKeyedChildren(c1, c2, container) { // key 的比较
  /**
   * c1 旧的虚拟节点children数组
   * c2 新的虚拟节点children数组
  */

  // 1. 最长递增子序列算法 LIS (重要核心，也是常见的面试题,diff 依赖这个算法)
  // 内部有优化 头头比较  尾尾比较 头尾 尾头
  /**
   * diff 主要流程
   * 1) 根据新节点  生成一个 key => index(索引) 的映射表
   * 2) 去旧的里面找 看看有没有对应的  如果有一样的就复用
   * 3) 新的比旧的多，就添加；旧的比新的多，就删除
   * 4) 如果新旧的key 一样多，比较属性，移动
  */
 
  let e1 = c1.length - 1; // 旧的最后一项的索引
  let e2 = c2.length - 1; // 新的最后一项的索引
  //-------------比对和删除无用节点-------------
  let keyedToNewIndexMap = new Map(); // 生成一个 key => index(索引) 的映射表
  for(let i = 0; i<= e2; i++) {
    const currentEle = c2[i]; // 拿到当前项, currentEle 是新的虚拟节点
    keyedToNewIndexMap.set(currentEle.props.key, i); // key => index(索引) 的映射
  }
  // 根据新的节点个数生成数组
  const newIndexToOldIndexMap = new Array(e2 + 1).fill(-1);
  // 去旧的里面找 看看有没有对应的  如果有一样的就复用
  for(let i = 0;i <= e1; i++) {
    const oldVnode = c1[i]; // 旧的虚拟节点
    let newIndex = keyedToNewIndexMap.get(oldVnode.props.key) // 去映射表中看看有没有这个key，有的话就是新的虚拟节点的索引
    if (newIndex == undefined) {
      // 旧的有，新的没有
      nodeOps.remove(oldVnode.el); // 删除旧的节点
    } else {
      // 新的旧的都有就 复用并且对比属性
      // 复用需要调patch 方法, 有可能属性变了
      newIndexToOldIndexMap[newIndex] = i + 1; // 记录调用patch的节点, +1 是因为下面获取最长子序列的方法不会处理0
      patch(oldVnode, c2[newIndex], container); // 复用并比对属性
    }
  }
  //-------------end-------------

  //-------------移动，从后往前插入-------------
  
  let sequence = getSequence(newIndexToOldIndexMap); // 最长子序列
  let j = sequence.length - 1;// 获取最长序列最后的索引

  for(let i = e2; i>=0; i--) {
    let currentEle = c2[i]; // 新的虚拟节点,虚拟节点上的 el 是真实节点
    const anchor = i+1 <= e2 ? c2[i+1].el : null; // 参照物
    // 有可能新的节点比旧的节点多
    if(newIndexToOldIndexMap[i] === -1) {
      // 这是一个新元素，需要插入到列表中
      patch(null, currentEle,container,anchor);
    } else {
      /**
       * 获取不需要移动的最长个数
       * 比如旧的是 [q,a,b,c] 新的是 [e,a,b,c,q] 
       * 所以需要找到最长的递增子序列也就是[a,b,c]，
       * a,b,c是不需要移动的的，只移动 q 就好(e是新增)
      */
      // 根据最长递增子序列来确定不需要移动的元素
      if (i === sequence[j]) {
        // 索引相同则表示不需要移动，然后让j往前移一位
        j--;
      } else {
        // 移动(将新节点插入到容器中，根据参照物插入)
        nodeOps.insert(currentEle.el, container, anchor);
      }
    }
  }
  //-------------end-------------

}

function patchProps(el, oldProps, newProps) {
  if (oldProps !== newProps) {
    // 不一样就比较属性
    /**
     * 1. 将新的属性全部设置上去
    */
   for(let key in newProps) {
     const p = oldProps[key]
     const n = newProps[key]
     if (n !== p) {
       // 旧的和新的不一样 以新的为准
       nodeOps.hostPatchProps(el, key, p, n); // 更新属性值
     }
   }
   /**
    * 2. 旧的属性里有的，而新的没有则需要删掉
   */
   for(let key in oldProps) {
     if(!newProps.hasOwnProperty(key)) {
      nodeOps.hostPatchProps(el, key, oldProps[key], null);// 删除属性值
     }
   }
  }
}

function mountComponent(vnode, container) {
  // 根据组件创建一个实例 
  const instance = {
    vnode,
    render:null, // 当前setup返回值
    subTree: null // render方法返回结果
  }
  const Component = vnode.tag;
  instance.render = Component.setup(vnode.props, instance);
  // 每个组件都有一个 effect, 用于局部重新渲染
  window.effect(() => {
    // 如果返回的render 是对象, 请编译为render ，然后再把render 挂到对象上
    // 这里可以做vue2  的兼容，可以拿到 vue2 中的 optionsAPI 和 setup返回值做合并
    instance.subTree = instance.render && instance.render();
    patch(null, instance.subTree, container);// 将组件插入到容器中
  })
}

function mountElement(vnode, container, anchor) {
  const {tag, children, props} = vnode;
  // 将虚拟节点和真实节点创建映射关系
  let el = (vnode.el = nodeOps.createElement(tag))
  if (props) {
    // 将属性赋予给 el
    for(let key in props) {
      nodeOps.hostPatchProps(el, key, {}, props[key])
    }
  }
  if (Array.isArray(children)) {
    mountChildren(children, el)
  } else {
    nodeOps.hostSetElementText(el, children);
  }
  // 将元素插入到容器中
  nodeOps.insert(el, container, anchor);
}

function mountChildren(children, container) {
  for(let i=0; i< children.length; i++) {
    let child = children[i]
    // 递归挂载 child
    patch(null, child, container)
  }
}

function getSequence(arr) { // 寻找最长递增子序列
  // 此方法返回的是最长递增子序列的索引
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = ((u + v) / 2) | 0
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}

window.render = render;
window.patch = patch;