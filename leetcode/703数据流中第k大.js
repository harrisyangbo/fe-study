// leetcode 703. 数据流中的第 K 大元素

/**
 * @param {number} k
 * @param {number[]} nums
 */
 var KthLargest = function(k, nums) {

};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {

};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

 var isAnagram = function(s, t) {
	if (s.length !== t.length) return false;
	let map = new Array(26).fill(0);
	let base = 'a'.codePointAt(0);
	for (let str of s) {
		map[str.codePointAt() - base] += 1
	}
	for (let str of t) {
		map[str.codePointAt() - base] -= 1
		if (map[str.codePointAt() - base] < 0) {
			return false
		}
	}
	return true
};
isAnagram("rat","car")