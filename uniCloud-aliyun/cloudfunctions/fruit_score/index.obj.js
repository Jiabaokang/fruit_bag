// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {

	// async dataFormatted(date) {
	// 	//const date = new Date(timestamp);
	// 	const formattedDate =
	// 		await `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	// 	return formattedDate; //
	// },

	_before: function() { // 通用预处理器

	},

	async addScore(params) {
		let db = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()
		});

		// 查询用户积分余额
		let res1 = await db.collection('fruit-scores')
			.where(`user_id == '${params.user_id}'`)
			.orderBy("create_date", "desc")
			.limit(1)
			.get();
		//记录积分
		let balance = 0;
		if (res1.data.length) {
			balance = res1.data[0].balance;
		}

		let res2 = await db.collection('fruit-scores')
			.where(`user_id == '${params.user_id}' && product_id == '${params.product_id}'`)
			.orderBy("create_date", "desc")
			.limit(1)
			.get();
		if (res2.data.length) {
			let lastItem = res2.data[0];
			let curentDate = new Date(lastItem.create_date);
			let nowDate = new Date();

			let curentDateStr =
				`${curentDate.getFullYear()}-${String(curentDate.getMonth() + 1).padStart(2, '0')}-${String(curentDate.getDate()).padStart(2, '0')}`;
			let nowDateStr =
				`${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(2, '0')}-${String(nowDate.getDate()).padStart(2, '0')}`;
			//比较日期
			if (curentDateStr === nowDateStr) {
				return {
					errorCode: -1,
					errorMsg: '今天已经浏览过该产品了'
				}
			}
		}
		return await db.collection('fruit-scores').add({
			...params,
			score: 10,
			type: 1,
			balance: balance + 10,
			comment: '首页浏览产品奖励',
		})

	}

}