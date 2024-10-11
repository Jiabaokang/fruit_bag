<template>
	<view class="detailPage">
		<view v-if="productPic">
			<video v-if="isVideo" class="video-size" :src="productPic" controls></video>
			<image v-else class="pic" :src="productPic" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onReady } from '@dcloudio/uni-app';
const db = uniCloud.database();
const productPic = ref('');
const isVideo = ref(false);
let productId = '';

onLoad((e) => {
	console.log(e);
	productId = e.id;
});

onReady(() => {
	if (productId) {
		let tempPro = db.collection('fruit-product-list').where(`_id == '${productId}'`).field('title,navid,picurl,orderid,price,checked').getTemp();
		let tempNav = db.collection('fruit-product-nav').field('_id, classname as text').getTemp();

		db.collection(tempPro, tempNav)
			.get({
				getOne: true
			})
			.then((res) => {
				console.log(res);
				let {data: {picurl}} = res.result;
				productPic.value = picurl.path;
				
				isVideo.value = picurl.extname === "mp4";
				
			});
	}
});
</script>

<style lang="scss" scoped>
.detailPage {
	display: flex;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
	.video-size{
		width: 100vw;
		height: 100vh;
		background-color: $uni-bg-color-hover;
	}
	.pic {
		width: 100vw;
		height: 100vh;
	}
}
</style>
