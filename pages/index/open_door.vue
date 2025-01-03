<template>
	<view class="container">
		<!-- <image class="top" src="../../static/salto_logo.jpg"></image> -->
		<!-- <view class="info-item">
			<text class="label">手机号码：</text>
			<input class="input-value" type="number" v-model="doorData.phoneNumber" placeholder="请输入手机号码" maxlength="11" />
		</view>

		<view class="info-item">
			<text class="label">房间号：</text>
			<input class="input-value" type="text" v-model="doorData.roomName" placeholder="请输入房间号" />
		</view> -->

		<view class="info-content">
			<view class="top-info">
				<image src="https://mp-c9eb320a-ffa8-44c1-94bf-921e844548b4.cdn.bspapp.com/cloudstorage/ic_hotel.webp"
					mode="widthFix"></image>
				<view class="top-left">
					<view class="title">
						<text>SWIRE \n HOTELS</text>

					</view>
					<view class="line"></view>
					<view class="icon-list">
						<uni-icons type="phone" size="30" color="#387CFE"></uni-icons>
						<uni-icons type="location" size="30" color="#387CFE"></uni-icons>
						<uni-icons type="email" size="30" color="#387CFE"></uni-icons>
					</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="bottom">
				<view class="bottom-item">
					<view class="item-title">
						Room No.
					</view>
					<view class="item-value">
						{{doorData.roomName}}
					</view>
				</view>
				<view class="bottom-item">
					<view class="item-title">
						Valid Until
					</view>
					<view class="item-value">
						{{doorData.endingTime}}
					</view>
				</view>
			</view>

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
	import {
		openDoor
	} from '../../api/apis.js'

	const doorData = ref({});

	const unlockStatus = ref(false)

	onLoad((options) => {
		let result = JSON.parse(options.data);
		result.endingTime = formatDate(result.endingTime);
		doorData.value = result;
		console.log(doorData.value);
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

	function formatDate(input) {
		// 使用正则表达式分离日期和时间
		const match = input.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2})$/);
		if (match) {
			// 提取日期部分（MM-DD）和时间部分（HH:MM）
			const monthDay = `${match[2]}-${match[3]}`;
			const time = match[4];

			// 返回所需的格式
			return `${monthDay} ${time}`;
		} else {
			// 输入格式不匹配
			return 'Invalid date format';
		}
	}

	const handleUnlock = () => {
		if (unlockStatus.value) {
			uni.showToast({
				title: '门已开，请勿重复操作',
			})
			return
		}

		uni.showLoading({
			mask: true,
			title: '正在开门'
		})

		uniCloud.callFunction({
			name: "fruit_request_api",
			data: {
				"methodName": "openDoor",
				"phoneNumber": doorData.value.phoneNumber,
				"roomNumber": doorData.value.roomName,
			},
		}).then(res => {
			uni.hideLoading()
			console.log(res);
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

		.info-content {
			width: 100vw-12;
			height: 300px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border: 2px solid blueviolet;
			border-radius: 16px;
			margin-left: 12px;
			margin-right: 12px;
			margin-top: 20px;
			padding: 12px;

			.top-info {
				width: 100%;
				height: 180px;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				image {
					width: 180px;
					height: 180px;
					border-radius: 10%;
				}

				.top-left {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 240px;

					.title {
						font-size: 20px;
						font-weight: bold;
						color: black;
						text-align: center;
						margin-top: 10px;
					}

					.icon-list {
						margin-top: 10px;
						margin-top: 10px;
						display: flex;
						flex-direction: row;
						padding: 0 20px;
						justify-content: space-between;
					}

					.line {
						width: 100%;
						height: 1px;
						background-color: #ccc;
						margin-top: 10px;
					}
				}

			}

			.bottom {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				padding-bottom: 12px;

				.bottom-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.item-title {
						font-size: 16px;
						color: gray;
						font-weight: 600;
						margin-bottom: 4px;
					}

					.item-value {
						font-size: 22px;
						color: black;
						font-weight: 800;
					}
				}
			}
		}
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