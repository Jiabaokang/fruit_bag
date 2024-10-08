
// 
function giveMsg(str) {
	let msgObj = {
		"success": "查询成功~~~",
		"noSuccess": "查询失败",
		"add": '新增成功',
		"noAdd": "新增失败",
		"required": "缺少参数"
	}
	return msgObj[str];
}

function giveCode(code) {
	let objCode = {
		0:0,		// 成功
		400:400,	// 失败
	}
	return objCode[code];
}


// 封装返回结果
class UserResult {
	constructor(errorCode, errorMsg, data,total) {
		this.errorCode = giveCode(errorCode);
		this.errorMsg = giveMsg(errorMsg);
		this.data = data;
		this.total = total;
	}
}

// 封装返回结果
function result(errorCode, errorMsg, data,total) {
	return {
		errorCode: giveCode(errorCode),
		errorMsg: giveMsg(errorMsg),
		data: data,
		total: total
	}
}

module.exports = {
	// 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common
	giveMsg,
	giveCode,
	UserResult,
	result
}