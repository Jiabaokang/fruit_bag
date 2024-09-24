<template>
	<view class="playList">
		<z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="15" empty-view-text="暂无中奖记录">
			<template #loading>
				<uni-load-more status="loading"></uni-load-more>
			</template>
			<view class="list">
				<view class="row" v-for="item in dataList">
					<AwardItem :code="true"></AwardItem>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const paging = ref(null);
const dataList = ref([]);
const queryList = (pageNo, pageSize) => {
	paging.value.complete([]);
};
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
