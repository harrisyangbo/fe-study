/**
 * 给定一个带有头结点 head 的非空单链表，返回链表的中间结点。如果有两个中间结点，则返回第二个中间
 * 结点。
 * 输入：[1,2,3,4,5]
 * 输出：此列表中的结点 3 (序列化形式：[3,4,5])
 * 返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
*/

/**
 * 快慢指针法
 * 用两个指针 slow 与 fast 一起遍历链表。slow 一次走一步，fast 一次走两步。那么当 fast 到达链
 * 表的末尾时，slow 必然位于中间。
*/
var middleNode = function(head) {
  slow = fast = head;
  while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
  }
  return slow;
};

/**
 * 二叉树的遍历
 * 
*/

// 前序遍历
var preorderTraversal = (root) => {
  let result = []
  var preOrderTraverseNode = (node) => {
      if(node) {
          // 先根节点
          result.push(node.val)
          // 然后遍历左子树
          preOrderTraverseNode(node.left)
          // 再遍历右子树
          preOrderTraverseNode(node.right)
      }
  }
  preOrderTraverseNode(root)
  return result
};

//斐波那契数列
function fib(n) {
  if (n < 2 && n >= 0) return n
  return fib(n - 1) + fib(n - 2)
}
fib(10)

// 优化斐波那契数列
function fib(n) {
  let array = new Array(n + 1).fill(null)
  array[0] = 0
  array[1] = 1
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2]
  }
  return array[n]
}
fib(10)


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
juzhen(arr, 2, 2, 3, 2)