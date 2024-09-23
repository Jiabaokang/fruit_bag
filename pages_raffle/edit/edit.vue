<!-- http://localhost:5173/#/pages_raffle/edit/edit  -->
<template>
	<view class="editPage">
		<uni-notice-bar show-icon text="最多可创建9个奖项,最大支持300人参与" />
		<view class="award">
			<view class="headTitle">—— 奖品奖项 ——</view>
			<view class="option" v-for="(item, index) in awardList" :key="item.id">
				<view class="top">
					<view class="left" @click="addPic(index)">
						<view class="pic">
							<image v-if="item.picurl" :src="item.picurl" mode="aspectFill"></image>
							<uni-icons v-else type="image" size="50" color="#555"></uni-icons>
						</view>
						<view class="text">更换图片</view>
					</view>

					<view class="right">
						<view class="row">
							<view class="name">
								<input type="text" placeholder="请输入奖项名称" v-model="item.name" />
							</view>
							<view class="remove">
								<uni-icons type="minus-filled" size="30" color="#ee4626" @click="removeAward(item)"
									v-if="true"></uni-icons>
							</view>
						</view>

						<view class="row">
							<view>
								<input type="text" placeholder="请输入奖品名称" v-model="item.description" />
							</view>
							<view></view>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="name">奖品份数</view>
					<view>
						<uv-number-box v-model="item.number"></uv-number-box>
					</view>
				</view>
			</view>

			<view class="addBox">
				<view class="btn" @click="addAwards">添加奖项</view>
			</view>
		</view>
		<view class="rule">
			<view class="headTitle">—— 规则说明 ——</view>
			<view class="content">
				<textarea v-model="roleContent" placeholder="请编辑规则说明"></textarea>
			</view>
		</view>
		<view class="more">
			<view class="headTitle">—— 更多选项 ——</view>
			<view class="content">
				<view class="row">
					<view class="name">结束时间</view>
					<view class="control">
						<uni-datetime-picker type="datetime" :start="deftTime.start" :end="deftTime.end"
							v-model="endTime"></uni-datetime-picker>
					</view>
				</view>
				<view class="row">
					<view class="name">是否能重复中奖</view>
					<view class="control">
						<switch :checked="isRepeat" @change="changeRepeat" color="#ee4626"
							style="transform: scale(0.8); transform-origin: right;" />
					</view>
				</view>
			</view>
			<view class="submitBtn" @click="onSubmit">
				<button type="primary">确认提交</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import dayjs from 'dayjs';
	import {
		getFileExtension,
		uuid
	} from '../../utils/tools';
	import {
		showToast
	} from '../../utils/common';
	console.log(dayjs().format('YYYY-MM-DD'));

	const isRepeat = ref(false);
	const endTime = ref(null);
	//奖品列表
	const awardList = ref([{
			name: '一等奖',
			description: '',
			picurl: '',
			number: 1,
			id: uuid()
		},
		{
			name: '二等奖',
			description: '',
			picurl: '',
			number: 2,
			id: uuid()
		}
	]);

	//规则说明
	const roleContent = ref(`1.点击参与报名参加活动；
2.参与后无需额外操作，等待主办方发起抽奖；
3.抽奖成功后会将抽奖结果返回，可在右上角点击查看；
4.将获奖记录给现场工作人员核销后，领取对应的奖品。`);

	const deftTime = ref({
		start: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		end: dayjs().add(7, 'day').endOf("day").format('YYYY-MM-DD HH:mm:ss')
	})

	//添加奖项
	const addAwards = () => {
		awardList.value.push({
			name: '',
			description: '',
			picurl: '',
			number: 1,
			id: uuid()
		});
	};

	//移除奖项
	const removeAward = async (item) => {
		uni.showModal({
			title: '提示',
			content: `确定要删除${item.name}吗？`,
			success: (res) => {
				if (res.confirm) {
					awardList.value.pop();
				}
			}
		});
	};

	//添加图片
	const addPic = (index) => {
		uni.chooseImage({
			count: 1,
			success: (res) => {
				if (res.tempFilePaths.length) {
					let tempFile = res.tempFilePaths[0];
					console.log(tempFile);
					uni.showLoading({
						title: '上传中',
						mask: true
					});
					console.log(getFileExtension(tempFile));
					uniCloud.uploadFile({
						filePath: tempFile,
						cloudPath: `raffle/${dayjs().format('YYYYMMDD')}/${uuid()}_${index}.${getFileExtension(tempFile)}`,
						cloudPathAsRealPath: true,
						success: (res) => {
							awardList.value[index].picurl = res.fileID;
							uni.hideLoading();
						},
						fail: (err) => {
							console.log(err);
							uni.hideLoading();
						}
					});
				}
			}
		});
	};

	//改变是否重复中奖
	const changeRepeat = (e) => {
		console.log(e);
		isRepeat.value = e.detail.value;
	};

	//提交
	const onSubmit = () => {
		if (!(awardList.value.length && awardList.value.every(item => item.name && item.description))) {
			showToast({
				title: "奖项及奖品名称必填",
				duration: 2500
			})
			return;
		}
		console.log("符合要求");
		if (!roleContent.value) return showToast({
			title: "规则说明不能为空",
			duration: 2500
		})

		//最终要提交的数据
		let fromData = {
			awardList: awardList.value,
			roleContent: roleContent.value,
			isRepeat: isRepeat.value,
			endTime: endTime.value
		}
		console.log(fromData);
	};
</script>

<style lang="scss" scoped>
	.editPage {
		.headTitle {
			font-size: 34rpx;
			text-align: center;
			line-height: 2em;
			font-weight: bold;
			color: #ee4626;
			padding-bottom: 30rpx;
		}

		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f4f4f4;
			font-size: 34rpx;
			height: 100rpx;
			padding: 10rpx 0;
		}

		.award {
			.option {
				padding: 20rpx;
				padding-bottom: 0;
				border-bottom: 14rpx solid #f4f4f4;

				.top {
					display: flex;

					.left {
						width: 160rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.pic {
							width: 120rpx;
							height: 120rpx;
							background: #f4f4f4;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.text {
							font-size: 28rpx;
							color: #999;
							line-height: 2em;
						}
					}

					.right {
						flex: 1;

						.row {
							.name {
								font-size: 38rpx;
								font-weight: bold;
							}
						}
					}
				}
			}

			.addBox {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 60rpx;
				background: #f4f4f4;

				.btn {
					border: 1px solid #ee4626;
					padding: 15rpx 35rpx;
					color: #ee4626;
					font-size: 36rpx;
					border-radius: 200rpx;
				}
			}
		}

		.rule {
			padding: 20rpx;
			margin-top: 60rpx;

			textarea {
				width: 100%;
				background: #fafafa;
				border: 1px solid #efefef;
				width: 100%;
				padding: 10rpx 20rpx;
				line-height: 1.7em;
				font-size: 36rpx;
				min-height: 380rpx;
				color: #333;
			}
		}

		.more {
			margin-top: 60rpx;

			.content {
				padding: 20rpx;

				.control {
					width: 400rpx;
					display: flex;
					justify-content: flex-end;
				}
			}
		}

		.submitBtn {
			padding: 60rpx 20rpx 100rpx;

			button {
				background: #ee4626;
			}
		}
	}
</style>