<template>
	<view class="playPage">
		<view class="option">
			<view class="row">
				<view class="left">奖项选择：</view>
				<view class="right">
					<uni-data-select v-model="fromData.aid" :localdata="range" @change="selectChange"></uni-data-select>
				</view>
			</view>

			<view class="row">
				<view class="left">抽奖个数：</view>
				<view class="right">
					<uv-number-box v-model="fromData.number" :min="0"></uv-number-box>
				</view>
			</view>
		</view>

		<view class="btnGroup">
			<view class="btn" hover-class="btnHover" hover-start-time="0">
				<text v-if="true" class="noStart">点击\n抽奖</text>
				<text v-if="false" class="start">停止</text>
				<text v-if="false" class="end">已结束</text>
			</view>
		</view>

		<view class="logs">
			<view class="title">—— 开奖记录 ——</view>
			<view class="content">
				<uni-list>
					<uni-list-item
						v-for="(item, index) in 5"
						:clickable="true"
						:showArrow="true"
						:title="`第${index + 1}轮抽奖`"
						note="一等奖 - 10人"
						rightText="2024-9-23 16:37"
					></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const fromData = ref({
	aid: '',
	number: 1
});
const range = ref([
	{
		text: '奖项1',
		value: 0
	},
	{
		text: '奖项2',
		value: 1
	},
	{
		text: '奖项3',
		value: 2
	}
]);

const selectChange = (e) => {
	console.log(e);
	fromData.value.number = 0;
};
</script>

<style lang="scss" scoped>
.playPage {
	.option {
		.row {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 1px solid #eee;
			padding: 30rpx;
			.right {
				flex: 1;
			}
		}
	}
	.btnGroup {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 100rpx 0;
		.btn {
			width: 260rpx;
			height: 260rpx;
			color: #eee;
			font-weight: bolder;
			font-size: 46rpx;
			text {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				position: relative;
			}
			.noStart {
				background-color: #ff6a33;
			}
			.start {
				background: #ee4626;
				&::before {
					content: '';
					display: block;
					width: 110%;
					height: 110%;
					border: 1px solid transparent;
					border-top-color: #ee4626;
					position: absolute;
					top: -5%;
					left: -5%;
					border-radius: 50%;
					box-sizing: border-box;
					animation: rotate 0.7s infinite linear;
				}
				&::after {
					content: '';
					display: block;
					width: 120%;
					height: 120%;
					border: 1px solid transparent;
					border-left-color: #ee4626;
					position: absolute;
					top: -10%;
					left: -10%;
					border-radius: 50%;
					box-sizing: border-box;
					animation: rotate 1.2s infinite linear;
				}
			}
			.end {
				background-color: #888;
			}
		}
		.btnHover {
			transform: scale(0.97);
		}
	}
	.logs{
		padding: 100rpx 30rpx;
		.title{
			text-align: center;
			font-size: 36rpx;
			color: #999;
			font-weight: bolder;
		}
		.content{
			padding: 50rpx 0;
		}
	}
}

@keyframes rotate {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
