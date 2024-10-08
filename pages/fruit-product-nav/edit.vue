<template>
	<view class="uni-container">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="classname" label="名称" required>
				<uni-easyinput placeholder="请输入产品名称" v-model="formData.classname"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="orderid" label="排序" required>
				<uni-easyinput placeholder="产品名称排序" type="number" v-model="formData.orderid"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="icon" label="图标">
				<uni-file-picker return-type="object" v-model="formData.icon" :image-styles="imageStyle"></uni-file-picker>
			</uni-forms-item>
			<uni-forms-item name="state" label="状态">
				<switch @change="binddata('state', $event.detail.value)" :checked="formData.state"></switch>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
import { validator } from '../../js_sdk/validator/fruit-product-nav.js';

const db = uniCloud.database();
const dbCollectionName = 'fruit-product-nav';

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
			classname: '',
			orderid: null,
			icon: null,
			state: true
		};
		return {
			formData,
			formOptions: {},
			rules: {
				...getValidator(Object.keys(formData))
			},
			//图标样式
			imageStyle: {
				height: 120, 
				width: 120,
				border: {
					radius: '8' 
				}
			}
		};
	},
	onLoad(e) {
		if (e.id) {
			const id = e.id;
			this.formDataId = id;
			this.getDetail(id);
		}
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
				.doc(this.formDataId)
				.update(value)
				.then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
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
		},

		/**
		 * 获取表单数据
		 * @param {Object} id
		 */
		getDetail(id) {
			uni.showLoading({
				mask: true
			});
			db.collection(dbCollectionName)
				.doc(id)
				.field('classname,orderid,icon,state')
				.get()
				.then((res) => {
					const data = res.result.data[0];
					if (data) {
						this.formData = data;
					}
				})
				.catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					});
				})
				.finally(() => {
					uni.hideLoading();
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
	width: 100%;
}
</style>
