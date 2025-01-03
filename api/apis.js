import {
	request
} from "@/utils/request.js"

/**
 * 获取首页banner数据
 */
export function openDoor(phoneNumber,roomName) {
	// return uni.request({
	// 	url: 'https://tea.qingnian8.com/api/bizhi/homeBanner'
	// })

	return request({
		url: "/api/pms/openDoor",
		data:{
			phoneNumber:phoneNumber,
			roomName:roomName
		}
	})
};

