<template>
	<view class="joinUser">
		<z-paging ref="paging" v-model="dataList" @query="queryList" :default-page-size="15">
			<template #loading>
				<uni-load-more status="loading"></uni-load-more>
			</template>
			<uni-list  border-full v-if="dataList.length">			
				<uni-list-item
				v-for="item in dataList" 
				:thumb="item.avatar || '/static/defAvatar.jpg'"
				thumb-size="lg"
				:title="item.nickname" 
				:note="`参与时间：${dayjs(item.create_date).format('YYYY-MM-DD HH:mm:ss')}`"
				:key="item._id"/>				
			</uni-list>
		</z-paging>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from "dayjs";
import { showToast} from '../../utils/common';
import { onLoad } from '@dcloudio/uni-app';

const db = uniCloud.database();
const paging = ref(null);
const dataList = ref([]);

let id;
onLoad((option)=>{
	id = option.id;
})

const queryList =async (pageNo, pageSize)=>{
	console.log(pageNo, pageSize);
	let skip = (pageNo -1) * pageSize;
	let joinTemp = db.collection("raffle-join-user").where({
		raffle_id:id
	})
	.orderBy("create_date desc")
	.skip(skip)
	.limit(pageSize)
	.getTemp();
	
	let userTemp = db.collection("uni-id-users").field("_id,nickname,avatar_file").getTemp();
	
	let {result:{data,errCode}} = await db.collection(joinTemp,userTemp)
	.field(`create_date,raffle_id,
	arrayElemAt(join_user_id.nickname,0) as nickname,
	arrayElemAt(join_user_id.avatar_file.url,0) as avatar`).get()
	console.log(data);
	
	paging.value.complete(data);
}
	
</script>

<style lang="scss" scoped>

</style>
