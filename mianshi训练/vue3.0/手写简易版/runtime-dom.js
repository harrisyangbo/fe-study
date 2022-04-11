/**
 * 运行时包
 * 放着常见的 dom 操作方法
 * 
*/
// 抽离出这些方法的目的是可以支持重写这些方法
const nodeOps = {
  // 插入节点
  insert(child, parent, anchor) {
    // anchor: 参照物
    if (anchor) {
      parent.insertBefore(child, anchor)
    } else {
      parent.appendChild(child)
    }
  },
  // 删除节点
  remove(child) {
    let parent = child.parentNode;
    parent && parent.removeChild(child)
  },
  // 创建元素
  createElement(tag) {
    return document.createElement(tag)
  },
  // 创建文本
  hostSetElementText(el, text) {
    el.textContent = text;
  },
  // 更新属性方法
  hostPatchProps(el, key, prevProps, nextProps) {
    /**
     * prevProps: 旧的属性值 
     * nextProps: 新的属性值
     * el: 元素
     * key: 属性名
    */
    if (/^on[^a-z]/.test(key)) { // 事件
      const eventName = key.slice(2).toLowerCase(); // 获取事件名
      // 更新事件
      prevProps && el.removeEventListener(eventName, prevProps);
      nextProps && el.addEventListener(eventName, nextProps)
    } else { // 其他属性
      if(!nextProps) {
        return el.removeAttribute(key); // 删除元素上的属性
      }
      if (key === 'style') { // 样式
        for(let key in nextProps) {
          el.style[key] = nextProps[key]
        }
        for(let key in prevProps) {
          if(!nextProps.hasOwnProperty(key)) {
            // 旧的属性中有的，而新的属性中没有，就置为 null
            el.style[key] = null;
          }
        }
      } else {
        el.setAttribute(key, nextProps);
      }
    }
  }
}

window.nodeOps = nodeOps;