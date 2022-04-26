//给定n(n大于10）个请求，控制并发的最大QPS为10，请设计相关代码

function after(timers, cb) {
	let obj = {}
	return function(key, val) {
		obj[key] = val;
		if (--timers === 0) {
			cb(obj)
		}
	}
}
// n 是请求个数
const finish = after(n, function out(data) {
	console.log(data)
});

const one = setTimeout(() => {
	finish('one', 1)
}, 1000)
const two = setTimeout(() => {
	finish('two', 2)
}, 1000)
const three = setTimeout(() => {
	finish('three', 3)
}, 1000)
//.......