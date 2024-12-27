const db = uniCloud.database();
const dbCmd = db.command;
module.exports = {
	_before: function () { // 通用预处理器

	},
	async update({raffleID=null,active_state=null,fromData=null,reset=false}){
		let updateData = {
			active_state:active_state
		}
		if(fromData){
			updateData.operLogs = dbCmd.push([fromData])
		}
		return db.collection("raffle-data").where({
			_id: raffleID
		}).update(updateData)
	}
}
