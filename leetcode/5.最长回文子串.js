/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (27.68%)
 * Likes:    2712
 * Dislikes: 0
 * Total Accepted:    383.2K
 * Total Submissions: 1.2M
 * Testcase Example:  '"babad"'
 *
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 
 * 示例 1：
 * 
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入: "cbbd"
 * 输出: "bb"
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let sArr = s.split('');
  let sArrRev = new Array(...sArr).reverse();
  let dp = Array.from({
    length: sArr.length
  }, () => new Array(sArrRev.length).fill(0))
  let maxLength = 0;
  let endIndex = 0;
  for(let i = 0;i < sArr.length; i++) {
    for(let j = 0;j < sArrRev.length; j++) {
      if (sArr[i] === sArrRev[j]) {
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
  let str2 = sArrRev.join('')
  return str2.substring(endIndex - maxLength, endIndex);
};
console.log(longestPalindrome('babad'))
// @lc code=end

