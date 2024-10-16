//路由跳转方法
export const routerTo = (url,type='navigate')=>{
	if(type === "navigate"){
		uni.navigateTo({
			url
		})
	}else if(type==='redirect'){
		uni.redirectTo({
			url
		})
	}else if(type==="reLaunch"){
		uni.reLaunch({
			url
		})
	}else{
		return "错误信息"
	}
}
//返回上一页
export const goBack = (delta = 1)=>{
	uni.navigateBack({
		delta
	})
}

//提示框
export function showToast({title="",duration=1500,icon="none",mask=false}={}){
	uni.showToast({
		title:String(title),
		icon,
		duration,
		mask
	})
}

//抽奖状态
export function activeStateTxt(value){
	if(value ===1){
		return "未开始";
	}else if(value ===2){
		return "进行中";
	}else if(value ===3){
		return "已结束";
	}else{
		return "未知状态";
	}
	
}
