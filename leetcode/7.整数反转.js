/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let a = typeof x === 'string' ? x : x + '';
    let reverseA = a.split('').reverse();
    if (x > 0) {
      return reverseA.join('') * 1 > Math.pow(2, 31) - 1 ? 0 : reverseA.join('') * 1;
    } else {
      let str = reverseA.join('');
      let b = str.substr(0, str.length - 1) * -1;
      return b < Math.pow(-2, 31) ? 0 : b;
    }
};
// @lc code=end

