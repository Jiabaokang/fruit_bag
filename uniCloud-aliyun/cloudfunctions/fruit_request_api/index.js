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
		
		
		let url = "https://salto.p2link.483n.com/salto/api/pms/openDoor"
		let roomName = event.roomNumber;
		let phoneNumber = event.phoneNumber;
		const httpclient =  uniCloud.httpclient;
		const res = await httpclient.request(url, {
			method: 'GET', 
			timeout: 60000,
			data: {
				"phoneNumber":phoneNumber,
				"roomName":roomName,
			},
			header: {'content-type': 'application/json'},
			dataType: 'json',
			
		})
		
	
		console.log(res);
		// let responseData = res.data;
		// console.log(responseData.data);
		return res
		
	} catch (error) {
		return {
			code: -1,
			msg: '请求失败',
			error: error.message
		}
	}
};
