<template>
	<view class="awardItem">
		<view class="userinfo">
			<image class="pic" src="../../static/logo.png" mode="aspectFill"></image>
			<view class="text">匿名用户</view>
		</view>
		<view class="body">
			<view class="left">
				<image class="pic" src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="title">一等奖</view>
				<view class="info">
					<view class="line">奖品：华为手机</view>
					<view class="line">轮次：第三轮中奖</view>
					<view class="line">时间：2024-07-30 12:00:00</view>
					<view class="line">
						<button type="primary" size="mini">手动核销</button>
					</view>
				</view>
			</view>
		</view>
		<view class="confirm" v-if="confirm">
			<button type="primary">确认核销</button>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		writeOff:{
			type:Boolean,
			default:false
		},
		code:{
			type:Boolean,
			default:false
		},
		confirm:{
			type:Boolean,
			default:false
		}
	})
	
	
</script>

<style lang="scss" scoped>
.awardItem {
	border: 1px solid #eee;
	border-radius: 30rpx;
	border-bottom-width: 3px;
	.userinfo {
		height: 80rpx;
		background: #eee;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		.pic {
			width: 60rpx;
			height: 60rpx;
			border: 1px solid #fff;
			border-radius: 50%;
		}
		.text {
			font-size: 32rpx;
			font-weight: bolder;
			margin-left: 15rpx;
		}
	}
	.body {
		display: flex;
		padding: 30rpx;
		.left {
			width: 230rpx;
			height: 230rpx;
			.pic {
				width: 100%;
				height: 100%;
			}
		}
		.right {
			flex: 1;
			flex-direction: column;
			padding-left: 20rpx;
			.title {
				font-size: 38rpx;
				font-weight: bolder;
			}
			.info {
				margin-top: 30rpx;
				font-size: 28rpx;
				color: #666;
				line-height: 1.5em;
				.line {
					padding-bottom: 10rpx;
				}
			}
		}
	}
	.confirm {
		padding: 20rpx;
		padding-top: 60rpx;
	}
}
</style>
