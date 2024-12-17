<template>
	<!-- http://localhost:5173/#/pages_raffle/list/list -->
	<view>
		<z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="15">
			<template #loading>
				<uni-load-more status="loading"></uni-load-more>
			</template>
			<uni-list border v-if="dataList.length">
				<uni-list-item showArrow v-for="(item, index) in dataList" :key="item._id"
					clickable
					@click="routerTo(`/pages_raffle/detail/detail?id=${item._id}`)"
					:title="`${item.nickname}-创建的抽奖`"
					:note="`创建于：${dayJs(item.publish_date).format('YYYY-MM-DD HH:ss')}\n已有${item.join_count}人参与`"
					:right-text="activeStateTxt(item.active_state)"></uni-list-item>
			</uni-list>
		</z-paging>
		<uni-fab horizontal="right" vertical="bottom" @fabClick="onAddRaffle" />
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		routerTo,
		activeStateTxt,
		showToast
	} from '../../utils/common';
	import dayJs from 'dayjs'
	const db = uniCloud.database();

	const paging = ref(null);
	const dataList = ref([]);

	//查询抽奖列表
	const queryList = async (pageNo, pageSize) => {
		let skip = (pageNo -1) * pageSize;
		let raffleTemp = db.collection("raffle-data").orderBy("publish_date desc")
		.skip(skip)
		.limit(pageSize)
		.getTemp();
		
		let userTemp = db.collection("uni-id-users").field("_id,nickname").getTemp();
		let {result: {data,errCode}} = await db.collection(raffleTemp, userTemp)
			.field("active_state,publish_date,join_count,arrayElemAt(user_id.nickname,0) as nickname,_id")
			.get();
		try {
			if (errCode === 0) {
				console.log(data);
				paging.value.complete(data);
			} else {
				paging.value.complete(false);
			}
		} catch (err) {
			showToast({
				title: err
			})
		}
	};


	const onAddRaffle = () => {
		routerTo("/pages_raffle/edit/edit")
	};
</script>

<style lang="scss" scoped></style>