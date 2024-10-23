// schema扩展相关文档请参阅：https://uniapp.dcloud.net.cn/uniCloud/jql-schema-ext.html
const db = uniCloud.database();
const dbCmd = db.command;

module.exports = {
  trigger: {
    beforeCreate: async function({
      clientInfo,
	  addDataList
    } = {}) {
		let [addData] = addDataList;
		let {raffle_id} = addData;
		console.log(raffle_id);
		//给抽奖的活动人数加1
		db.collection("raffle-data").doc(raffle_id).update({
			join_count: dbCmd.inc(1)
		})
	  
    }
  }
}

