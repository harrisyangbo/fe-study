// js 构造一个并查集

export default class QuickUnion {
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
		this.count--
	}

	connected(x, y) {
		return this.findRoot(x) === this.findRoot(y)
	}

	getCount() {
		return this.count;
	}
}