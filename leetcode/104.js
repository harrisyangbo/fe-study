// leetcode 104. 二叉树的最大深度
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {
	if (!root) return 0;
	return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};
// 最小深度
var minDepth = function(root) {
	if (!root) return 0;
	let left = minDepth(root.left);
	let right = minDepth(root.right);
	if (left == 0 || right == 0) {
		return left + right + 1
	}
	return 1 + Math.min(minLeft, minRight)
};