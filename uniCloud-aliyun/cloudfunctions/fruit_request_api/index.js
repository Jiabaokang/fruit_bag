'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	try {
		
		// let url = "https://salto.p2link.483n.com/salto/api/openOnlineDoor"
		// let roomNumber = event.roomNumber;
		// let phoneNumber = event.phoneNumber;
		// const httpclient =  uniCloud.httpclient;
		// const res = await httpclient.request(url, {
		// 	method: 'GET', 
		// 	timeout: 60000,
		// 	data: {
		// 		"doorID":roomNumber,
		// 	},
		// 	header: {'content-type':'application/json'},
		// 	dataType: 'json',
			
		// })
		
		const httpclient =  uniCloud.httpclient;
		let res = null;
		
		let methodName = event.methodName;
		if (methodName === 'openDoor') {
			// 调用开门接口
			let url = "https://salto.p2link.483n.com/salto/api/pms/openDoor"
			let roomName = event.roomNumber;
			let phoneNumber = event.phoneNumber;
			const httpclient =  uniCloud.httpclient;
			res = await httpclient.request(url, {
				method: 'GET', 
				timeout: 60000,
				data: {
					"phoneNumber":phoneNumber,
					"roomName":roomName,
				},
				header: {'content-type': 'application/json'},
				dataType: 'json',
				
			})
		}else{
			// 调用查询房间信息接口
			let url = "https://salto.p2link.483n.com/salto/api/pms/getRoomInfo"
			let phoneNumber = event.phoneNumber;
			const httpclient =  uniCloud.httpclient;
			res = await httpclient.request(url, {
				method: 'GET', 
				timeout: 50000,
				data: {
					"phoneNumber":phoneNumber
				},
				header: {'content-type': 'application/json'},
				dataType: 'json',
			})
		}

		console.log(res);
		return res
		
	} catch (error) {
		return {
			code: -1,
			msg: '请求失败',
			error: error.message
		}
	}
};
