// leetcode 两数之和

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 暴力破解法
var twoSum = function(nums, target) {
	for(let i = 0;i < nums.length - 1; i++) {
		for(let j = i + 1; j < nums.length; j++) {
			if ((nums[i] + nums[j]) === target) {
				return [i, j]
			}
		}
	}
};

// 优化
var twoSum1 = function(nums, target) {
	let hash = {};
	for(let i = 0;i < nums.length; i++) {
		if (hash[target - nums[i]] !== undefined) {
			return [hash[target - nums[i]], i]
		}
		hash[nums[i]] = i;
	}
};

//[2,7,11,15]

console.log(twoSum1([2,7,11,15], 9))