<template>
	<uni-notice-bar :text="`1、浏览果袋列表,查看果袋详情可增加积分0.5积分;\n2、分享此页面给微信好友或者朋友圈可增加10积分;`" />
	<view class="swiper-container">
		<view>
			<z-swiper v-model="productList" :options="optionsRotateNumber" @slideChange="onChange" @slideClick="goDetail">
				<z-swiper-item :custom-style="slideCustomStyle" v-for="(item, index) in productList" :key="item._id">
					<view :style="itemCustomStyle">
						
						<video class="slide-image" v-if="isMP4(item.picUrl)" @click="null"
						 :src="item.picUrl" :controls="false" 	:show-center-play-btn="false"></video>
						<image class="slide-image" v-else :src="item.picUrl" mode="aspectFill"></image>
					</view>
				</z-swiper-item>
			</z-swiper>

			<view class="info" v-if="productList.length > 0">
				<view class="list-item">{{ '名称：' + productList[currentIndex].title }}</view>
				<view class="list-item">{{ '价格：' + productList[currentIndex].price }}</view>
				<view class="list-item">
					<view class="">本次积分：</view>
					<view class="number">+0.5</view>
				</view>
			</view>
		</view>
	</view>
</template>
	
<script>
import { routerTo } from '../../utils/common.js';
const db = uniCloud.database();
//引入云对象
const dbFruitScore = uniCloud.importObject('fruit_score', {
	customUI: false
});
const dbFruitList = uniCloud.importObject('fruit-api-product');
export default {
	onReady() {
		this.point_card = uni.getStorageSync('point_card_key') || 0;
		this.getFruitList();
	},

	onBackPress() {
		console.log('页面关闭');
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
				//loop: true,
				//loopedSlides: 2,
			},
			slideCustomStyle: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			},
			itemCustomStyle: {
				overflow: 'hidden',
				height: '720rpx',
				width: '560rpx',
				'border-width': '12rpx',
				'border-color': '#4fc08d',
				'border-style': 'solid',
				'border-radius': '24rpx'
			},
			startX: 0,
			moveX: 0,
			currentIndex: 0,
			productList: []
		};
	},
	computed: {
		// isMP4(url) {
		// 	return url.endsWith('.mp4');
		// }
	},
	methods: {
		onChange(swiper, index) {
			this.currentIndex = index;
			this.point_card += index;
			let { _id: user_id } = uni.getStorageSync('uni-id-pages-userInfo');
			let { _id: product_id } = this.productList[this.currentIndex];

			console.log('swiper=' + swiper + 'index=' + index);
			dbFruitScore
				.addScore({
					user_id,
					product_id
				})
				.then((res) => {
					console.log(res);
				});
		},
		getFruitList() {
			dbFruitList.getProductList().then((res) => {
				console.log(res);
				this.productList = res.data;
			});
		},
		goDetail() {
			//let {clickedIndex} = e;
			//console.log(clickedIndex);
			let item = this.productList[this.currentIndex];
			console.log(item);
			routerTo(`/pages/fruit-detail/fruit-detail?id=${item._id}`);
		},
		isMP4(url) {
			return url.endsWith('.mp4');
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

.info {
	margin-top: 110rpx;
	font-size: 36rpx;
	color: #666;
	display: flex;
	flex-direction: column;
	align-items: self-start;
	justify-content: center;
	font-weight: bolder;
}
.list-item {
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.number {
	font-size: 48rpx;
	font-weight: bolder;
	color: orangered;
	animation: fadeInOut 2s ease-in-out infinite;
}
.slide-image {
	width: 100%;
	height: 100%;
}
@keyframes fadeInOut {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
