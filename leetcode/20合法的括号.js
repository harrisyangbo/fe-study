// 合法的括号

var isValid = function(s) {
	let stack = [];
	const parenMap = {
		')': '(',
		']': '[',
		'}': '{'
	}
	for (let str of s) {
		if (!parenMap[str]) {
			// 左括号
			stack.unshift(str)
		} else {
			// 右括号
			if (stack.length <= 0) return false;
			if (stack[0] === parenMap[str]) {
				stack.shift();
			} else {
				return false
			}
		}
	}
	return stack.length === 0;
};

var isValid2 = function(s) {
	let length;
	do {
		length = s.length;
		s = s.replace('()', '').replace('{}', '').replace('[]', '')
	} while (s.length !== length)

	return s.length === 0;
}

console.log(isValid2("((([])))"))