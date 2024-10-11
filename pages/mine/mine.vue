<template>
	<view class="mine">
		<!-- <view class="main" :style="{ paddingTop: getStatusBarHeight() + 'px' }">
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px' }">
				
				
			</view>
		</view> -->
		<view class="top">
			<view class="group" @click="goUserInfo">
				<view class="userinfo">
					<view class="pic">
						<image v-if="hasLogin && userInfo.avatar_file && userInfo.avatar_file.url" :src="userInfo.avatar_file.url" mode="aspectFill"></image>
						<image v-else src="../../static/user-default.jpg" mode="aspectFill"></image>
					</view>
					<view class="text" v-if="hasLogin">
						<view class="nickname">{{ userInfo.nickname || userInfo.username || userInfo.mobile }}</view>
						<view class="year">
							<uni-dateformat :date="userInfo.register_date" :threshold="[3600, 99 * 365 * 24 * 60 * 60 * 1000]"></uni-dateformat>
							注册
						</view>
					</view>
					<view class="text" v-else>
						<view class="nickname">点击登录</view>
					</view>
				</view>

				<view class="more">
					<text class="iconfont icon-a-10-you"></text>
				</view>
			</view>
			<view class="bg">
				<image v-if="hasLogin && userInfo.avatar_file && userInfo.avatar_file.url" :src="userInfo.avatar_file.url" mode="aspectFill"></image>
				<image v-else src="../../static/user-default.jpg" mode="aspectFill"></image>
			</view>
		</view>

		<view class="main">
			<!-- <view class="info">
				<view class="item">
					<text>33</text>
					获赞
				</view>
				<view class="item">
					<text>5</text>
					评论
				</view>
				<view class="item">
					<text>3</text>
					发文
				</view>
			</view> -->
			<view class="list">
				<view class="group" v-if="uniIDHasRole('admin')">
					<view class="item" @click="onClassicesManage">
						<view class="left">
							<text class="iconfont icon-a-24-bianji"></text>
							<text class="text">分类管理</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
					<view class="item" @click="onProductManage">
						<view class="left">
							<text class="iconfont icon-a-106-xihuan"></text>
							<text class="text">产品管理</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>

					<!-- <view class="item">
						<view class="left">
							<text class="iconfont icon-a-21-xiugai"></text>
							<text class="text">评论过的</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view> -->
				</view>

				<view class="group">
					<view class="item" @click="onViewsHostory">
						<view class="left">
							<text class="iconfont icon-a-24-bianji"></text>
							<text class="text">浏览记录</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
					<view class="item" @click="onMyScore">
						<view class="left">
							<text class="iconfont icon-a-106-xihuan"></text>
							<text class="text">我的积分</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
					<view class="item" @click="toJoinRaffle">
						<view class="left">
							<text class="iconfont icon-a-106-xihuan"></text>
							<text class="text">积分抽奖</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
				</view>

				<view class="group">
					<view class="item">
						<view class="left">
							<text class="iconfont icon-a-32-wenjian"></text>
							<text class="text">关于</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
					<view class="item" @click="goFeedback">
						<view class="left">
							<text class="iconfont icon-a-5-xinxi"></text>
							<text class="text">意见反馈</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
				</view>

				<view class="group">
					<view class="item" @click="logout">
						<view class="left">
							<text class="iconfont icon-a-73-tuichu"></text>
							<text class="text">退出登录</text>
						</view>
						<view class="right"><text class="iconfont icon-a-10-you"></text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { store, mutations } from '@/uni_modules/uni-id-pages/common/store.js';
import { routerTo } from '../../utils/common.js';
import { getStatusBarHeight, getTitleBarHeight } from '@/utils/system.js';
export default {
	data() {
		return {};
	},
	onLoad() {},
	computed: {
		userInfo() {
			console.log(store.userInfo);
			return store.userInfo;
		},
		hasLogin() {
			return store.hasLogin;
		}
	},
	methods: {
		//意见反馈
		goFeedback() {
			if (this.goLoginPage()) return;
			uni.navigateTo({
				url: '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback'
			});
		},
		//浏览记录
		onViewsHostory() {
			uni.navigateTo({
				url: '/pages/views-history/list'
			});
		},
		//我的积分
		onMyScore() {
			uni.navigateTo({
				url: '/pages/mine/score-list'
			});
		},
		//参加积分抽奖
		toJoinRaffle() {
			routerTo('/pages_raffle/detail/detail');
		},
		//分类管理
		onClassicesManage() {
			uni.navigateTo({
				url: '/pages/fruit-product-nav/list'
			});
		},
		//产品管理
		onProductManage() {
			uni.navigateTo({
				url: '/pages/fruit-product-list/list'
			});
		},
		myLike() {
			if (this.goLoginPage()) return;
			uni.navigateTo({
				url: '/pages/circle-like/list'
			});
		},
		myArticle() {
			if (this.goLoginPage()) return;
			uni.navigateTo({
				url: '/pages/circle-article/list'
			});
		},
		goUserInfo() {
			console.log(store);

			if (this.hasLogin) {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
				});
			} else {
				//获取路由路径
				let route = this.$mp.page.route;
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo?uniIdRedirectUrl=/' + route
				});
			}
		},

		logout() {
			if (this.goLoginPage()) return;
			uni.showModal({
				title: '是否确认退出？',
				success: (res) => {
					if (res.confirm) {
						mutations.logout();
					}
				}
			});
		},

		goLoginPage() {
			if (!this.hasLogin) {
				uni.showToast({
					title: '你没登录呀～～',
					icon: 'none'
				});
				return true;
			}
			return false;
		}
	}
};
</script>

<style lang="scss" scoped>
.mine {
	.top {
		height: 320rpx;
		background: #bbb;
		padding: 0 30rpx;
		padding-top: calc(var(--status-bar-height) + 64rpx) ;
		position: relative;
		display: flex;
		align-items: center;

		.group {
			position: relative;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			color: #fff;
			.userinfo {
				display: flex;
				width: 100%;
				align-items: center;
				.pic {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 2px solid #fff;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.text {
					padding-left: 20rpx;
					.nickname {
						font-size: 44rpx;
						font-weight: 600;
					}
					.year {
						font-size: 26rpx;
						opacity: 0.6;
						padding-top: 5rpx;
					}
				}
			}
			.more {
				.iconfont {
					font-size: 40rpx;
				}
			}
		}
		.bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
				filter: blur(20px);
				transform: scale(2);
				opacity: 0.5;
			}
		}
	}

	.main {
		width: 100%;
		min-height: 200rpx;
		background: #fff;
		border-radius: 36rpx;
		transform: translateY(-18rpx);
		padding: 30rpx 0;
		.info {
			padding: 10rpx 30rpx;
			display: flex;
			font-size: 30rpx;
			.item {
				padding-left: 20rpx;
				color: #888;
				.text {
					font-weight: 600;
					color: #333;
				}
			}
		}
		.list {
			.group {
				padding: 15rpx 30rpx;
				border-bottom: 15rpx solid #f4f4f4;
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 25rpx 0;
					font-size: 36rpx;
					color: #555;
					border-bottom: 1px solid #f8f8f8;
					.left {
						display: flex;
						align-items: center;
						.iconfont {
							font-size: 38rpx;
							margin-right: 10rpx;
						}
					}
					.right {
						.iconfont {
							font-size: 26rpx;
						}
					}
				}
				.item:last-child {
					border: none;
				}
			}
			.group:last-child {
				border: none;
			}
		}
	}
}
</style>
