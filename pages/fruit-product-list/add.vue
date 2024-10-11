<template>
	<view class="uni-container">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="title" label="名称" required>
				<uni-easyinput placeholder="请输入产品名称" v-model="formData.title"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="navid" label="分类" required="">
				<uni-data-picker v-model="formData.navid" collection="fruit-product-nav" field="_id as value, classname as text"></uni-data-picker>
			</uni-forms-item>
			<uni-forms-item name="picurl" label="产品图" required>
				<uni-file-picker file-mediatype="all" return-type="object" v-model="formData.picurl" :image-styles="imageStyle"></uni-file-picker>
			</uni-forms-item>
			<uni-forms-item name="orderid" label="排序">
				<uni-easyinput placeholder="请输入序号" type="number" v-model="formData.orderid"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="price" label="价格">
				<uni-easyinput placeholder="如：40RMB/包(1000个)" v-model="formData.price" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="checked" label="状态">
				<uni-data-checkbox v-model="formData.checked" :localdata="formOptions.checked_localdata"></uni-data-checkbox>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
import { validator } from '../../js_sdk/validator/fruit-product-list.js';

const db = uniCloud.database();
const dbCollectionName = 'fruit-product-list';

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
			title: '',
			navid: '',
			picurl: null,
			orderid: null,
			price: '',
			checked: true
		};
		return {
			formData,
			formOptions: {
				checked_localdata: [
					{
						value: true,
						text: '显示'
					},
					{
						value: false,
						text: '隐藏'
					}
				]
			},
			rules: {
				...getValidator(Object.keys(formData))
			},
			//图标样式
			imageStyle: {
				height: 160,
				width: 160,
				border: {
					radius: '8'
				}
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
	width: 100%;
}
</style>
