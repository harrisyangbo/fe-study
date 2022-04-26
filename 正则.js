// 解析url 参数

function queryURL(url) {
	let reg = /([^&=?]+)=([^&=?]+)/g
	let obj = {}
	url.replace(reg, function() {
		obj[arguments[1]] = arguments[2]
	})
	console.log(obj)
}
queryURL('https://www.qq.com?a=1&b=ho')