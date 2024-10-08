<template>
	<view class="main-bg">
		<image class="img-bg" src="/static/apples-bg.jpg" mode="aspectFill"></image>
		<view class="app-title" @click="goIndex()">金地家园</view>
		<view class="app-subtitle">果袋-销售供应，感谢大家的支持</view>
	</view>
</template>

<script setup>
import { onLoad, onReady } from '@dcloudio/uni-app';

onReady(() => {
	goIndex();
});

const goIndex = () => {
	//是否登录
	let token = uni.getStorageSync('uni_id_token');
	console.log(token);
	if (token) {
		uni.switchTab({
			url: '../index/index'
		});
	} else {
		uni.navigateTo({
			url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
		});
	}
};

// function goLogin() {
// 	uni.navigateTo({
// 		url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
// 	});
// }
</script>

<style lang="scss" scoped>
.main-bg {
	position: relative;
	width: 100vw;
	height: 100vh;
	.img-bg {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.app-title {
		position: absolute;
		bottom: 8%;
		left: 50%;
		transform: translateX(-50%);
		font-size: 56rpx;
		font-weight: bold;
		color: #fff;
	}
	.app-subtitle {
		position: absolute;
		bottom: 4%;
		left: 40%;
		transform: translateX(-40%);
		font-size: 32rpx;
		color: #fff;
	}
}
</style>
