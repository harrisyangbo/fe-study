/**
 * 1、 如下所示表格，点击 `#data .date` 元素后使表格中数据「按日期排序」，在有序以后再次
 * 点击该元素，若当前是「正序」则改为「倒序」，若当前是「倒序」则改为「正序」。
 * 
*/

// function orderBy(array, reverse) {
//   // desc 正序  asc 倒序
//   let sortArr = array.sort((a, b) => {
//     if (reverse === 'desc') {
//       return a - b
//     } else {
//       return b - a
//     }
//   })
//   return sortArr;
// }
// console.log(orderBy([5,8,3,4,9,2,4], 'asc'))

// 2、 请完成下方所示的函数 calc
/**
 * @param {Number} n 乘积
 * @return {Array} 由 n 被拆解后的乘数组成的数组
 */
let arr = []
let count = 0
function calc(n){
  // todo
  // let count = 0
  // for (let i = 1; i<= n;i++) {
  //   if(n % i === 0) {
  //     count++
  //   }
  // }
  // if (count === 2) {
  //   return [n]
  // }
  if (n === 1 || n === 2 || n === 3) {
    arr[count] = n
    return arr
  }
  for (let i = 2;i < n; i++) {
    if (n % i === 0) {
      arr[count++] = i;
      calc(n / i);
      break;
    }
    if (i >= n) {
      arr[count++] = n
    }
  }
  return arr;
}
// 例如：

// console.log(calc(8))
// [7]
// console.log(calc(8));
// [2, 2, 2]
// console.log(calc(24));
// [2, 2, 2, 3]
// console.log(calc(30));
// [2, 3, 5]




