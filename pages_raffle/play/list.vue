<template>
	<view class="playList">
		<z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="15" empty-view-text="暂无中奖记录">
			<template #loading>
				<uni-load-more status="loading"></uni-load-more>
			</template>
			<view class="list">
				<view class="row" v-for="item in dataList">
					<AwardItem :writeOff="true">
						
					</AwardItem>
				</view>
			</view>
		</z-paging>
		<uni-fab horizontal="right" vertical="bottom" :content="content" :pattern="{ icon: 'scan' }" @fabClick="scanCode" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
const paging = ref(null);
const dataList = ref([]);
const queryList = (pageNo, pageSize) => {
	paging.value.complete([]);
};

const scanCode = () => {
	uni.scanCode({
		success: (res) => {
			console.log(res);
		},
		fail: (err) => {
			console.log(err);
		}
	})
}

</script>

<style lang="scss" scoped>
.playList {
	.list {
		padding: 30rpx;
		.row {
			margin-bottom: 50rpx;
		}
	}
}
</style>
