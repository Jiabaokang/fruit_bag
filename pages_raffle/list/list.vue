<template>
	<!-- http://localhost:5173/#/pages_raffle/list/list -->
	<view>
		<z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="15" >
			<template #loading>
				<uni-load-more status="loading"></uni-load-more>
			</template>
			<uni-list border v-if="dataList.length">
				<uni-list-item showArrow
					v-for="(item, index) in dataList"
					:key="index"
					:title="`${index}${item.title}`"
					:note="`这是副标题～～～${Date.now()}\n已有${index + 1}人参与`"
					right-text="右侧文本"
				></uni-list-item>
			</uni-list>
		</z-paging>
		<uni-fab horizontal="right" vertical="bottom" @fabClick="onAddRaffle" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { routerTo } from '../../utils/common';

const paging = ref(null);
const dataList = ref([]);

//查询抽奖列表
const queryList = (pageNo, pageSize) => {
	setTimeout(()=>{
		let list = []
		for (let i = 0; i < pageSize; i++) {
			list.push({
				id: i,
				title: `标题${Math.random()}`,
				note: `副标题${i}`,
				rightText: `右侧文本${i}`,
			});
		}
		console.log('pageNo', pageNo);
		console.log('pageSize', pageSize);
		paging.value.complete(list)
	},1000)
};
	
	
const onAddRaffle = () => {
	routerTo("/pages_raffle/edit/edit")
};
</script>

<style lang="scss" scoped></style>
