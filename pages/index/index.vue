<template>
	<view class="swiper-container">
		<view>
			<z-swiper v-model="images" :options="optionsRotateNumber" @slideChange="onChange">
				<z-swiper-item :custom-style="slideCustomStyle" v-for="(item, index) in images" :key="index">
					<view :style="itemCustomStyle">
						<image class="slide-image" :src="item.src" mode="aspectFill"></image>
					</view>
				</z-swiper-item>
			</z-swiper>
		</view>

		<view class="count">
			浏览增加积分：
			<text style="size: 24px; color: red; font-weight: bolder">{{ point_card }}</text>
		</view>

		<button  @click="goToDetail">积分兑换奖品</button>
	</view>
</template>

<script>
import { routerTo } from '../../utils/common.js'
const db = uniCloud.database();
export default {
	onReady() {
		this.point_card = uni.getStorageSync('point_card_key') || 0;
	},
	
	onBackPress() {
		console.log("页面关闭");
		uni.setStorageSync('point_card_key', this.point_card);
	},

	data() {
		return {
			point_card: 0,
			optionsRotateNumber: {
				effect: 'cards',
				cardsEffect: {
					perSlideRotate: 15
				}
			},
			slideCustomStyle: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			},
			itemCustomStyle: {
				overflow: 'hidden',
				height: '640rpx',
				width: '480rpx',
				'border-width': '12rpx',
				'border-color': '#4fc08d',
				'border-style': 'solid',
				'border-radius': '24rpx'
			},
			startX: 0,
			moveX: 0,
			currentIndex: 0,
			images: [
				{ src: '../../static/image1.jpg', removed: false },
				{ src: '../../static/image3.jpeg', removed: false },
				{ src: '../../static/image4.jpeg', removed: false },
				{ src: '../../static/image5.jpg', removed: false }
				// 添加更多图片
			]
		};
	},
	methods: {
		onChange(swiper, index) {
			this.point_card += index;
			let {_id } = uni.getStorageSync('uni-id-pages-userInfo')
			
			db.collection("uni-id-scores").add({
				user_id: _id,
				score: 10,
				type:1,
				comment: '浏览增加积分',
				balance:10
			})
			
			.then(res=>{
				uni.showToast({
					title: `当前 swiper 索引：${index} 增加 10 积分`,
					icon: 'none',
				});
			})
			. catch(err=>{
				console.log(err);
			})
		},
		goToDetail() {
			routerTo('/pages_raffle/detail/detail');
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper-container {
	margin: 80rpx 0 20rpx;
	padding: 30rpx;
	height: 100vh;
	width: 100vw;
}
.count {
	margin-top: 90rpx;
	text-align: center;
	font-size: 36rpx;
	color: #666;
}

.slide-image {
	width: 100%;
	height: 100%;
}
</style>
