<template>
	<view class="container">
		<unicloud-db ref="udb" 
		v-slot:default="{ data, pagination, loading, hasMore, error }" 
		:collection="collectionList" 
		field="user_id,score,type,balance,comment,create_date"
		>
			<view v-if="error">{{ error.message }}</view>
			<view v-else-if="data">
				<uni-list>
					<uni-list-item
						v-for="(item, index) in data"
						:key="index"
						:title="`积分来源：${item.comment}`"
						:note="`积分：${item.score}`"
						showArrow
						:clickable="true"
						@click="handleItemClick(item._id)"
					></uni-list-item>
				</uni-list>
			</view>
			<uni-load-more :status="loading ? 'loading' : hasMore ? 'more' : 'noMore'"></uni-load-more>
		</unicloud-db>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
	</view>
</template>

<script>
const db = uniCloud.database();
export default {
	data() {
		return {
			collectionList: 'uni-id-scores',
			loadMore: {
				contentdown: '',
				contentrefresh: '',
				contentnomore: ''
			}
		};
	},
	onPullDownRefresh() {
		this.$refs.udb.loadData(
			{
				clear: true
			},
			() => {
				uni.stopPullDownRefresh();
			}
		);
	},
	onReachBottom() {
		this.$refs.udb.loadMore();
	},
	methods: {
		handleItemClick(id) {
			uni.navigateTo({
				url: './detail?id=' + id
			});
		},
		fabClick() {
			// 打开新增页面
			uni.navigateTo({
				url: './add',
				events: {
					// 监听新增数据成功后, 刷新当前页面数据
					refreshData: () => {
						this.$refs.udb.loadData({
							clear: true
						});
					}
				}
			});
		}
	}
};
</script>

<style></style>
