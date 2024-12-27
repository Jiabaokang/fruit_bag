<template>
	<view class="container">
		<image class="top" src="../../static/salto_logo.jpg"></image>

		<view class="info-item">
			<text class="label">手机号码：</text>
			<input class="input-value" type="number" v-model="phoneNumber" placeholder="请输入手机号码" maxlength="11" />
		</view>

		<view class="info-item">
			<text class="label">房间号：</text>
			<input class="input-value" type="number" v-model="roomNumber" placeholder="请输入房间号" />
		</view>

		<image class="unlock-btn" :src="unlockStatus?'../../static/unlocked.png':'../../static/lock.png'"
			@click="handleUnlock"></image>
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

	const phoneNumber = ref('13480773570')
	const roomNumber = ref('101')
	const unlockStatus = ref(false)

	onLoad((options) => {


	})

	onReady(() => {
		uni.setNavigationBarTitle({
			title: 'PMS云开门',
		})
		uni.setNavigationBarColor({
			backgroundColor: "#387CFE",
			frontColor: "#ffffff",
		})
	})

	const handleUnlock = () => {
		if (unlockStatus.value) {
			uni.showToast({
				title: '门已开，请勿重复操作',
			})
			return
		}
		if (!phoneNumber.value || !roomNumber.value) {
			uni.showToast({
				title: '请输入完整信息',
				icon: 'none'
			})
			return
		}

		console.log('手机号:', phoneNumber.value)
		console.log('房间号:', roomNumber.value)

		uni.showLoading({
			mask: true,
			title: '正在开门'
		})
		uniCloud.callFunction({
			name: "fruit_request_api",
			data: {
				"phoneNumber": phoneNumber.value,
				"roomNumber": roomNumber.value
			},
		}).then(res => {
			uni.hideLoading()
			console.log(res);
			//var data = JSON.parse(res);
			if (res.result.status != null && res.result.status === 200) {
				uni.showToast({
					icon: 'success',
					title: '开锁成功'
				})
				unlockStatus.value = true

				// 开锁成功后，等待3秒后自动关闭开锁状态
				setTimeout(() => {
					unlockStatus.value = false
				}, 8000)

			} else {
				uni.showToast({
					icon: 'error',
					title: res.result.msg
				})
				unlockStatus.value = false
			}
		}).catch(err => {
			uni.hideLoading()
			uni.showToast({
				icon: 'error',
				title: '开锁失败'
			})
			unlockStatus.value = false
		})
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.top {
		width: 200px;
		height: 80px;
		margin-bottom: 60px;
	}

	.info-item {
		display: flex;
		width: 100%;
		align-items: center;
		padding: 0 20px;
		margin-bottom: 20px;
		justify-content: center;

		.label {
			width: 180rpx;
			color: black;
			font-size: 16px;
		}

		.input-value {
			flex: 1;
			height: 40px;
			border-radius: 4px;
			border: 1px solid #ccc;
			padding: 0 10px;
			color: black;
			font-size: 16px;
		}
	}

	.unlock-btn {
		width: 200px;
		height: 200px;
		margin-top: 60px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;



	}
</style>