// leetcode 239. 滑动窗口最大值

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
	if (!nums || nums.length <= 0) return [];
	let queue = [], res = [];
	for (let i=0; i< nums.length; i++) {
		while(nums[i] >= nums[queue[queue.length - 1]]) {
			queue.pop();
		}
		queue.push(i); // 索引入队
		while(queue[0] <= i - k) {
			queue.shift()
		}
		if (i >= k - 1) {
			res.push(nums[queue[0]]);
		}
	}
	return res
};