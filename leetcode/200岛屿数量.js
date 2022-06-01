// leetcode 200 题：岛屿的数量

/**
 * @param {character[][]} grid
 * @return {number}
 */

/**
 * 解法1：染色 FloadFill
 * 1. 遍历所有节点
 * 2. 为1 就是陆地 count++
 * 3. 将 1 和周围所有的节点置为0 (递归： DFS 或 BFS)
 * **/
var numIslands1 = function(grid) {
	let count = 0;
	for(let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] == 1) {
				count += 1;
				def(i, j, grid);
			}
		}
	}
	return count
};
var def = function(i, j, grid) {
	if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
		return
	}
	grid[i][j] = '0';
	def(i, j+1, grid);
	def(i, j-1, grid);
	def(i+1, j, grid);
	def(i-1, j, grid);
}
// [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
/**
 * 解法2：并查集
 * 1. 初始化所有为1的节点，让其指向自己
 * 2. 遍历所有节点，进行相邻节点合并 (1的话就尝试合并,0的话就略过)
 * 3. 遍历有多少个 root （此步骤可以不用遍历，直接在前面的代码中统计）
 * **/
class QuickUnion {
	constructor(n) {
		this.count = n; // 并查集的总数
		this.parent = new Array(n); // 构造 parent
		this.rank = new Array(n); // 树的高度
		for(let i = 0; i < n; i++) {
			this.parent[i] = i; // 自己是自己的 parent
			this.rank[i] = 1; // 初始化树的节点/高度是1
		}
	}

	findRoot(x) {
		// 查找根 (递归查询)
		// if (i === this.roots[i]) {
		// 	return i
		// }
		// return this.findRoot(this.roots[i]);
		/**
		 * 并查集优化2: 路径压缩
		 * **/
		while(this.parent[x] !== x) {
			this.parent[x] = this.parent[this.parent[x]];
			x = this.parent[x]
		}
		return x;
	}

	union(x, y) {
		// 合并
		let xRoot = this.findRoot(x)
		let yRoot = this.findRoot(y)
		if (xRoot === yRoot) return;
		// this.roots[xRoot] = yRoot
		// 并查集优化1： 判断高度, 将低的 parent 赋给高的那边
		// rank 是树的高度 (深度)
		if (this.rank[xRoot] > this.rank[yRoot]) {
			this.parent[yRoot] = xRoot;
			this.rank[xRoot] += this.rank[yRoot];
		} else {
			this.parent[xRoot] = yRoot;
			this.rank[yRoot] += this.rank[xRoot];
		}
		this.count--;
	}

	connected(x, y) {
		return this.findRoot(x) === this.findRoot(y)
	}

	getCount() {
		return this.count;
	}
}
var numIslands2 = function(grid) {
	if (grid.length === 0) return;
	let m = grid.length;
	let n = grid[0].length;
	const dummy = -1;
	let qu = new QuickUnion(m * n);
	const dirs = [[1, 0], [0, 1]]; // 方向 右 和 下
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (grid[i][j] === '0') {
				qu.union(n * i + j, dummy);
			} else if (grid[i][j] === '1') {
				for(let d of dirs) {
					let r = i + d[0];
					let c = j + d[1];
					if (r >= m || c >= n) continue;
					if (grid[r][c] === '1') {
						qu.union(n * i + j, n * r + c);
					}
				}
			}
		}
	}
	return qu.getCount();
};

numIslands2([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]])