<template>
	<view class="uni-container">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="user_id" label="" required>
				<uni-easyinput placeholder="用户id，参考uni-id-users表" v-model="formData.user_id"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="score" label="" required>
				<uni-easyinput placeholder="本次变化的积分" type="number" v-model="formData.score"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="type" label="">
				<uni-data-checkbox v-model="formData.type" :localdata="formOptions.type_localdata"></uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="balance" label="" required>
				<uni-easyinput placeholder="变化后的积分余额" type="number" v-model="formData.balance"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="comment" label="">
				<uni-easyinput placeholder="备注，说明积分新增、消费的缘由" v-model="formData.comment" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="create_date" label="">
				<uni-datetime-picker return-type="timestamp" v-model="formData.create_date"></uni-datetime-picker>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
import { validator } from '../../js_sdk/validator/uni-id-scores.js';

const db = uniCloud.database();
const dbCollectionName = 'uni-id-scores';

function getValidator(fields) {
	let result = {};
	for (let key in validator) {
		if (fields.indexOf(key) > -1) {
			result[key] = validator[key];
		}
	}
	return result;
}

export default {
	data() {
		let formData = {
			user_id: '',
			score: null,
			type: null,
			balance: null,
			comment: '',
			create_date: null
		};
		return {
			formData,
			formOptions: {
				type_localdata: [
					{
						value: 1,
						text: 1
					},
					{
						value: 2,
						text: 2
					}
				]
			},
			rules: {
				...getValidator(Object.keys(formData))
			}
		};
	},
	onReady() {
		this.$refs.form.setRules(this.rules);
	},
	methods: {
		/**
		 * 验证表单并提交
		 */
		submit() {
			uni.showLoading({
				mask: true
			});
			this.$refs.form
				.validate()
				.then((res) => {
					return this.submitForm(res);
				})
				.catch(() => {})
				.finally(() => {
					uni.hideLoading();
				});
		},

		/**
		 * 提交表单
		 */
		submitForm(value) {
			// 使用 clientDB 提交数据
			return db
				.collection(dbCollectionName)
				.add(value)
				.then((res) => {
					uni.showToast({
						icon: 'none',
						title: '新增成功'
					});
					this.getOpenerEventChannel().emit('refreshData');
					setTimeout(() => uni.navigateBack(), 500);
				})
				.catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					});
				});
		}
	}
};
</script>

<style>
.uni-container {
	padding: 15px;
}

.uni-input-border,
.uni-textarea-border {
	width: 100%;
	font-size: 14px;
	color: #666;
	border: 1px #e5e5e5 solid;
	border-radius: 5px;
	box-sizing: border-box;
}

.uni-input-border {
	padding: 0 10px;
	height: 35px;
}

.uni-textarea-border {
	padding: 10px;
	height: 80px;
}

.uni-button-group {
	margin-top: 50px;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
}

.uni-button {
	width: 184px;
}
</style>
