// 最长递增子序列 LIS
/**
 * 给定数组  [2,5,8,6,4,7,2,7,2] 找出这个数组中最长递增子序列
 * 输出结果:  4个 ([2, 5, 6, 7] 或 [2, 4, 5, 6])
 * vue3.0 内部默认用 数组push + 二分查找 时间复杂度是 Onlogn
 * 也可以使用动态规划，但是时间复杂度是 On2
*/

/**
 * [2,5,8,7,3,4,5,1,6]
 * 1. 算个数，看哪个连续的潜力最大
 * 先拿个 [2]
 * 之后每次拿一个和最后一个比较，[2, 5]
 * 再拿个8 和最后一个比较 [2,5,8],这个数组是上升的
 * 再拿7比，找到第一个比7大的，然后替换掉 [2,5,7]
 * 再拿3比，找到第一个比3大的，然后替换掉 [2,3,7]
 * 如果遇到1 需要插入到第0个，需要忽略掉，就不去替换了
*/
function getSequence(arr) {
  const result = [0]; // 默认以0作为开头, result 里存的是索引
  let p = arr.slice(); // 拷贝一个一摸一样的数组
  let len = arr.length;
  /**
   * i用作循环
   * 
  */
  let i,j,u,v,c;

  for(i = 0;i<len; i++) {
    const arrI = arr[i];
    // 这里要和最后一个去比较
    if (arrI !== 0) {
      j = result[result.length-1]
      if(arr[j] < arrI) {
        p[i] = j; // 将当前最后一项放在 p 中
        result.push(i)
        continue
      }
      // 当前值比 result 中的小，去数组中找到 然后替换, 所以对 result 进行二分查找
      u = 0;
      v = result.length - 1;
      
      while(u<v) {
        c = ((u+v)/2) | 0 // 取整， 3.5 | 0 会返回3
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if ( u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  result[u - 1];
  while(u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}

let res = getSequence([0,1,2,3,4,5])
console.log(res)