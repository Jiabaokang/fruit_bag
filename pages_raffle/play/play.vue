<template>
	<view class="playPage" v-if="detail">
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
					<view class="group">
						<uv-number-box v-model="fromData.number" :min="0" :max="maxNumber"></uv-number-box>
						<text class="tip">最多可抽 {{maxNumber}} 个</text>
					</view>
				</view>
			</view>
		</view>

		<view class="btnGroup">
			<view class="btn" hover-class="btnHover" hover-start-time="0" @click="raffleHandle">
				<text v-if="detail.active_state==1" class="noStart">点击\n抽奖</text>
				<text v-if="detail.active_state==2" class="start">停止</text>
				<text v-if="detail.active_state==3" class="end">已结束</text>
			</view>
		</view>

		<view class="logs" v-if="detail.operLogs && detail.operLogs.length > 0">
			<view class="title">—— 开奖记录 ——</view>
			<view class="content">
				<uni-list>
					<uni-list-item
						v-for="(item, index) in detail.operLogs" :key="index"
						:clickable="true"
						:showArrow="true"
						:to="`./list`"
						:title="`第${index + 1}轮抽奖`"
						:note="`${item.name} - ${item.number}人`"
						:rightText="dayJs(item.create_date).format('YYYY-MM-DD HH:mm:ss')"
					></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import {onLoad,onUnload} from '@dcloudio/uni-app'
import { showToast } from '../../utils/common';
import { uuid } from '../../utils/tools.js'
import dayJs from 'dayjs'

const db = uniCloud.database();
const dbCmd = db.command;
const dbCloudObj = uniCloud.importObject("raffle_operation");
const maxNumber = ref(0)

let raffleID;
onLoad((e) => {
	raffleID = e.raffleID;
	getDetail();
});

onUnload(async() => {
	if(detail.value.active_state === 2){
		await dbCloudObj.update({raffleID,active_state:1,reset:false})
	}
});

//抽奖详情数据
const detail = ref();

const fromData = ref({
	id: uuid(),
	aid: '',
	number: 0
});

//奖项列表
// const range = computed(()=> detail.value.awardList.map(item=>({
// 	text:item.name,value:item.id
// })));

const range = computed(()=>detail.value?.awardList.map(item=>({text:item.name,value:item.id})))

//选择奖项
const selectChange = (e) => {
	fromData.value.number = 0;
	let sum = detail.value.operLogs?.filter(item=> item.aid === fromData.value.aid)
	.reduce((prev,item)=> {
		return prev + item.number
	},0);
	
	let select = detail.value.awardList.find(item=> item.id == e)
	console.log(select);
	maxNumber.value = select.number - sum;
	
};

// 获取抽奖详情
const getDetail = async() => {
	init();
	let {result:{data:[obj],errCode}} = await db.collection('raffle-data').where({_id:raffleID}).get();
	detail.value = obj;
	
	detail.value.operLogs = detail.value.operLogs.map(item=>{
		let find = detail.value?.awardList?.find(find=> find.id == item.aid)
		return{
			...item,
			name:find?.name?? "未命名"
		}
	})??[];
	
	
	console.log(detail.value);
};

// 抽奖
const raffleHandle = async () => {
	if(detail.value.active_state == 1){
		if(!fromData.value.aid) return showToast({title:'请选择奖项'})
		if(!fromData.value.number) return showToast({title:'请选择抽奖个数'})
		
		detail.value.active_state = 2
		let res = await dbCloudObj.update({raffleID,active_state:2});
		console.log(res);
		return;
		
	}
	
	if(detail.value.active_state == 2){
		fromData.value.create_date = Date.now();
		let res = await dbCloudObj.update({raffleID,active_state:1,fromData:fromData.value});
		console.log(res);
		getDetail();
		return;
	}
	
	if(detail.value.active_state == 3){
		showToast({title:'抽奖已结束'})
	}
}

const init = () => {
	fromData.value = {
		id: uuid(),
		aid: '',
		number: 0
	}
}


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
				.group{
					display: flex;
					justify-content: start;
					align-items: center;
					.tip{
						margin-left: 20rpx;
						color: #666;
						font-size: 28rpx;
					}
				}
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
