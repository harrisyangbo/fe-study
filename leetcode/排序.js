// leetcode 912. 排序数组
// 冒泡
var sortArray = function(nums) {
	for(let i = nums.length - 1; i>0; i--) {
		for (let j = 0; j < i; j++) {
			if (nums[j] > nums[j+1]) {
				let old = nums[j]
				nums[j] = nums[j+1];
				nums[j+1] = old;
			}
		}
	}
	return nums;
};

// 快排
var sortArray = function(nums) {
	if (nums.length < 2) return nums;
	let base = nums[0]; // 基准值
	let p = []; // 和基准值一样大
	let l = []; // 比基准值小
	let r = []; // 比基准值大
	nums.forEach((item) => {
		if (item === base) {
			p.push(item)
		} else if (item < base) {
			l.push(item)
		} else {
			r.push(item)
		}
	});
	return sortArray(l).concat(p).concat(sortArray(r));
};

