const BASE_URL = "https://salto.p2link.483n.com/salto";

export function request(config = {}) {
	let {
		url,
		data = {},
		method = "GET",
		header = {}
		} = config
		
	url = BASE_URL + url
	header["token"] = "11112222"
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header,
			success: (res) => {
				if (res.data.errCode === 0) {
					resolve(res.data)
				} else if (res.data.errCode == 400) {
					uni.showModal({
						title: "错误提示",
						content: res.data.errMsg,
						showCancel: false
					})
					reject(res.data)
				} else {
					uni.showToast({
						title: res.data.errMsg,
						icon: "none"
					})
					reject(res.data)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	});
}

