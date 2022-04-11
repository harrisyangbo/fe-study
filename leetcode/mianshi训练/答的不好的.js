// 深度比较两个对象是否相等 

/**
 * 深度判断两个对象是否相同
 */
function diff (obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
      return false;
  }
  else {
      for (let key in obj1) {
          if (!obj2.hasOwnProperty(key)) {
              return false;
          }
          //类型相同
          if (typeof obj1[key] === typeof obj2[key]) {
              //同为引用类型
              if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                  const equal = diff(obj1[key], obj2[key]);
                  if (!equal) {
                      return false;
                  }
              }
              //同为基础数据类型
              if (typeof obj1[key] !== 'object' && typeof obj2[key] !== 'object' && obj1[key] !== obj2[key]) {
                  return false;
              }
          }
          else {
              return false;
          }
      }
  }
  return true;
}


// vue 的依赖收集是在什么时期做的？
// 在Object.definePropoty 中的 get 方法中做的


// 跨域有几种解决方案

// JSONP跨域有什么缺陷

// script 标签跨域有什么缺陷

// vuedraggable 实现原理

/** 
 * 在一个字符串中找出回文字符串 
 * 在 kdhj,abcbajkl 中找出 abcba
 * */ 

// 垃圾回收机制，老生代算法中的 标记清除法是怎么标记的

// 找出回文字符串

let str = 'hjkdfabcbasfdas'
var longestPalindrome = function(s) {
  if(!s || s.length === 0) return "";
  let res = [];
  const dp = [];

  for(let i = s.length - 1; i >= 0; i--){
      dp[i] = [];
      for(let j = i; j < s.length; j++){
          if(j-i === 0){
            dp[i][j] = true;
          }else if(j - i === 1 && s[i] === s[j]) {
            dp[i][j] = true;
          }else if(s[i] === s[j] && dp[i + 1][j - 1]) {
            dp[i][j] = true;
          }
          if (dp[i][j] && j - i + 1 > res.length) {
            res = s.slice(i , j + 1)
          }
      }
  }
  return res;
};
// console.log(longestPalindrome(str))

/**
 * 找出两个字符串的最长公共子串
 * 实现思路：
 * 将两个字符串变为一个二维矩阵，一个是行，一个是列
 * 然后比较如果行列相同就标记为1，否则就是0
 * 最后比较最长的对角线
*/

let str1 = 'babad';
let str2 = 'dabab';

function commonStr(str1, str2) {
  let arr1 = str1.split('');
  let arr2 = str2.split('');
  let dp = Array.from({
    length: arr1.length
  }, () => new Array(arr2.length).fill(0))
  let maxLength = 0
  let endIndex = 0
  for (let i = 0; i < arr1.length;i++) {
    for(let j = 0; j< arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        if (i === 0 || j === 0) {
          dp[i][j] = 1
        } else {
          dp[i][j] = dp[i-1][j-1] + 1
        }
        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j]
          endIndex = j
        }
      }
    }
  }
  endIndex += 1;
  return str2.substring(endIndex - maxLength, endIndex);
}
console.log(commonStr(str1, str2))

// 找出一个字符串中的重复字符

function repeatStr(str1) {
  let arr1 = str1.split('')
  let tem = []
  arr1.sort().sort((a, b) => {
    if (a === b && tem.indexOf(a) === -1) {
      tem.push(a)
    }
  })
  return tem.join('');
}

// 为什么 vue 中的 v-for 需要绑定 key ?
/**
 * 当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺
 * 序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们
 * 在每个索引位置正确渲染,这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 
 * 状态 (例如：表单输入值) 的列表渲染输出。
 * 给 Vue 一个key，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，主要用在 Vue 
 * 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes，使用 key 时，它会基于 key 的变化重
 * 新排列元素顺序，并且会移除 key 不存在的元素。
*/


/**
 * 说说vue中的几种watcher
 * 三个场景，对应三种watcher：
 * 负责视图更新的render-watcher
 * 执行计算属性更新的computed-watcher
 * 用户注册的普通watcher（watch-api或watch属性）
*/


// 实现Promise.all

// function all(list) {
//   return new Promise((resolve,reject) => {
//     let values = []
//     let count = 0
//     for(let [i, p] of list.entries()){
//       Promise.resolve(p).then(res => {
//         values[i]=res
//         count++
//         if(count===list.length) resolve(values)
//       }, err => reject(err)
//     }
//   }
// }

/**
 * 生成带有缓存函数
 * @param fn
 * @returns {cachedFn}
 *
 * @example
 *
 * const camelizeRE = /-(\w)/g
 * const camelize = cached((str) => {
 *   return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
 * })
 *
 * camelize('app-info') // appInfo
 * camelize('app-info') // appInfo，因为有缓存，所以不会再解析一边
 */
// function cached (fn) {}




// 给定一个链表，如果它是有环链表，实现一个算法返回环路的开头节点。

// 1 -> 4 -> 0 -> 2
/**
 * 慢指针一次走一步，快指针一次走两步，快指针追上慢指针，说明有环
 * 
*/
const hasCycle = (head) => {

  // 至少 2 个节点才能构成一个环
  if (!head || !head.next) {
    return false;
  }

  // 设置快慢指针
  let slow = head;
  let fast = head.next;

  // 如果快指针一直没有追上慢指针
  while (slow !== fast) {
    // 如果没有环，则快指针会抵达终点
    if (!fast || !fast.next) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }

  // 如果有环，那么快指针会追上慢指针
  return true;
};


/**

* Definition for singly-linked list.

* function ListNode(val) {

* this.val = val;

* this.next = null;

* }

*/


/**

* @param {ListNode} head

* @return {ListNode}

*/

// var detectCycle = function (head) {}

// async函数是generator函数的语法糖
// 1. async函数内置执行器，generator必须依靠执行器，需要调用next()方法。
// 2. async返回值是promise，可以用then方法指代下一步操作。
// 3. 更好的语义
// 4. 更广的适用性。async函数的await后面可以是Promise和原始类型值，yield后面只能是Thunk函数和Promise对象。

// 解决 0.1 + 0.2 !== 0.3 的问题
// parseFloat((0.1 + 0.2).toFixed(10)) === 0.3

const {
	getState,
  subscrible,
  dispatch,
  once
} = createStore(initState, reducer);

function createStore(initState, reducer) {

}

// 一个矩阵  m * n 
// 1 2 3 4 5
// 5 4 3 2 1
// 2 3 3 2 3
// 3 2 3 3 3 
// input给出一个坐标（2，2） 希望给一个source， 一个target，意思就是把source 变成target，在这个过程中，上下左右都会受到影响，而且会传递下去，直到source值失效
// source 3, target 2
// 1 2 2 4 5
// 5 4 2 2 1
// 2 2 2 2 2
// 3 2 2 2 2

var arr=[[1,2,3,4,5],[5,4,3,2,1],[2,3,3,2,3],[3,2,3,3,3]];
function juzhen(A, x, y, source, target) {
  // let arr = A;
  if (A[x][y] === source) {
    for(let i = 0;i<A.length;i++) {
      for(let j = 0;j<A[i].length; j++) {
        if (i === x || j === y) {
          A[i][j] = target
        }
      }
    }
  }
}


// 给一个数组 [1, 2, 7, 9, 3, 4], 然后给一个target，把两两配对的a + b = target, 就把（a, b) 返回，每个元素只能用一次，如果是多个就返回多个

function twoSum(A, target) {
  for(let i = 0;i<A.length - 1; i++) {
    for(let j = i+1; j< A.length; j++) {
      if (A[i] + A[j] === target) {
      return [A[i], A[j]]
      }
    }
  }
}

// js compose函数实现