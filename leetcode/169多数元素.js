// leetcode 169

/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
	const map = nums.reduce((pre, cur) => {
			if (pre[cur] !== undefined) {
				pre[cur] += 1;
				return pre
			} else {
				return Object.assign(pre, {[cur]: 1})
			}
	}, {})
	const max = Math.max.apply(null, Object.values(map));
	let res;
	if (max > nums.length / 2) {
		Object.keys(map).forEach((item) => {
			if (map[item] === max) {
				res = item
			}
		})
	}
	return res
};

console.log(majorityElement([2,2,1,1,1,2,2]))