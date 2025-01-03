<template>
	<view class="container">
		<!-- 手机图标 -->
		<image class="phone-icon" src="/static/ic_top_phone.png" mode="aspectFit"></image>

		<!-- 国家选择 -->
		<view class="country-select" @click="selectionArea">
			<image class="flag-icon" src="../../static/flag-icon.png" mode="aspectFit"></image>
			<text>China</text>
			<text class="arrow">▼</text>
		</view>

		<!-- 电话输入区域 -->
		<view class="phone-input">
			<image class="flag-icon" src="../../static/ic_phone.png" mode="aspectFit"></image>
			<text class="area-code">+86</text>
			<input type="number" v-model="phoneNumber" placeholder="请输入手机号" />
		</view>

		<!-- 接受按钮 -->
		<button class="accept-btn" @click="handleAccept">接受</button>

		<!-- 协议文本 -->
		<view class="agreement-text">
			<text>点击"接受"您将接受我们的</text>
			<text class="link">最终用户许可协议</text>
			<text>(EULA)条款。</text>
		</view>

		<!-- 底部提示 -->
		<view class="bottom-tip" v-if="showTip">
			<text>此号码没有分配数字密钥。</text>
			<view class="tip-detail">
				联系您的数字密钥发行者以获取数字密钥。您的数字密钥发行者会是您要住宿的酒店或公寓，或者您要访问的公司或大楼。
				<text class="more-info">更多信息</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app'

	const phoneNumber = ref('')
	const showTip = ref(false)
	
	const selectionArea = () => {
		uni.showToast({
			title: '暂不支持选择其他国家',
			icon: 'none'
		})
	}

	const handleAccept = () => {
		if (phoneNumber.value.length === 11) {
			uni.showLoading({
				mask: true,
				title: '查询中...'
			})
			uniCloud.callFunction({
				name: "fruit_request_api",
				data: {
					"methodName": "getRoomInfo",
					"phoneNumber": phoneNumber.value,
				},
			}).then(res => {
				uni.hideLoading()
				console.log(res);
				if (res.result.status != null && res.result.status === 200) {
					console.log(res.result.data.data);
					if(res.result.data.code == 200){
						// 跳转到下一个页面
						uni.navigateTo({
							url: "/pages/index/open_door?data="+JSON.stringify(res.result.data.data),
						})
					}else{
						showTip.value = true
						uni.showToast({
							title:res.result.data.msg,
							icon: 'error'
						})
					}
					
				} else {
					showTip.value = true
				}
			}).catch(err => {
				uni.hideLoading()
				uni.showToast({
					icon: 'error',
					title: err.message
				})
			})
		} else {
			uni.showToast({
				icon: 'error',
				title: '手机号码错误'
			})
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 30px;

		.phone-icon {
			width: 300rpx;
			height: 300rpx;
			margin: 60rpx auto;
			display: block;
		}

		.country-select {
			display: flex;
			align-items: center;
			padding: 15rpx 0;
			border-bottom: 1px solid #eee;

			.flag-icon {
				width: 60rpx;
				height: 60rpx;
				margin-right: 10rpx;
			}

			.arrow {
				margin-left: auto;
				color: #999;
			}
		}

		.phone-input {
			display: flex;
			margin: 36rpx auto;
			align-items: center;
			padding: 15rpx 0;
			border-bottom: 1px solid #387CFE;

			.flag-icon {
				width: 60rpx;
				height: 60rpx;
				margin-right: 10rpx;
			}

			.area-code {
				color: #333;
				margin-right: 20rpx;
			}

			input {
				flex: 1;
			}
		}

		.accept-btn {
			margin-top: 60rpx;
			background-color: #387CFE;
			color: #fff;
			border: none;
			border-radius: 4px;
		}

		.agreement-text {
			font-size: 24rpx;
			color: #666;
			text-align: center;
			margin-top: 20rpx;

			.link {
				color: #387CFE;
			}
		}

		.bottom-tip {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: #333;
			color: #fff;
			padding: 20rpx;
			font-size: 24rpx;

			.tip-detail {
				margin-top: 10rpx;
				color: #999;
			}

			.more-info {
				color: #387CFE;
				text-decoration: underline;
			}
		}
	}
</style>