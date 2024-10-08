const db = uniCloud.database();
const { result } = require("fruit-utils");

let dbJQL = null;
module.exports = {
	_before: function() { // 通用预处理器
		this.startTime = Date.now();
		// let body = this.getHttpInfo().body;
		// if (!body) throw result(400, 'required')
		// this.param = JSON.parse(body);

		// 初始化数据库对象
		dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo(),
		});
		// dbJQL.setUser({ 
		// 	uid: '66f3d17389bd27450b8fec14', // 建议此处使用真实uid
		// 	role: ['admin'], // 指定当前执行用户的角色为admin。如果只希望指定为admin身份，可以删除uid和permission字段
		// })
	},

	// 获取产品列表
	getProductList: async function() {
		
		
		let res  = await dbJQL.collection('fruit-product-list')
		//.where(war)
		.field("picurl.url as picUrl,title,price,navid")
		.get();
		
		//获取总数
		let count = await dbJQL.collection('fruit-product-list').count();

		//传统写法
		/* let res = await db.collection('fruit-product-list')
			.where({
				navid: navid,
				checked: true
			})
			.skip(size)
			.limit(limit)
			.orderBy("orderid", "asc")
			.get(); */
		return result(0, "success", res.data,count.total);
	},

	// 获取产品详情
	getProductDetail:async function() {
		let {id} = this.param;
		if (!id) throw result(400, 'required');
		let res = await dbJQL.collection('fruit-product-list')
		.where(`_id == "${id}"`)
		.field("picurl.url as picUrl,title,price,pronum,weight,year,grade,createTime")
		.get({
			getOne:true
		});
		return result(0,"success",res.data)
	},
	// 通用后处理器
	_after: function(error, result) { // 通用后处理器
		if (error) {
			throw error; // 将抛出的异常
		}
		result.costTime = Date.now() - this.startTime;
		return result;
	}
}