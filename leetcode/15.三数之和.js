/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (24.59%)
 * Likes:    1577
 * Dislikes: 0
 * Total Accepted:    125.9K
 * Total Submissions: 511.5K
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0
 * ？找出所有满足条件且不重复的三元组。
 * 
 * 注意：答案中不可以包含重复的三元组。
 * 
 * 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 
 * 满足要求的三元组集合为：
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
	let res = [];
	let hash = {};
	for (let i = 0; i < nums.length; i++) {
		if (i>=1 && nums[i] === nums[i - 1]) continue;
		for (let j = i + 1; j < nums.length; j++) {
			if (hash[nums[j]] !== undefined) {
				res.push([nums[j]].concat(hash[nums[j]]));
				hash[nums[j]] = undefined
			} else {
				const mark = 0 - nums[i] - nums[j];
				hash[mark] = [nums[i], nums[j]]
			}
		}
	}
	return res;
};
var threeSum = function(nums) {
	nums.sort();
	let result = [];
	let r = nums.length - 1;
	let l = 0
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] > 0) break;
		if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重
		l = i + 1;
		while (l < r) {
			if (nums[i] + nums[l] + nums[r] < 0) {
				l++
			} else if (nums[i] + nums[l] + nums[r] > 0) {
				r--
			} else {
				result.push([nums[i], nums[l], nums[r]]);
				// 去重
				while(l < r && nums[l] === nums[l+1]) {
					l++
				}
				// 去重
				while(l < r && nums[r] === nums[r-1]) {
					r--
				}
				l++;
				r--;
			}
		}
	}
};
// @lc code=end

