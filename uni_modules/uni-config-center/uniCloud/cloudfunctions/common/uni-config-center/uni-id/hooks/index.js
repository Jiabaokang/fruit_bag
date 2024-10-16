
function beforeRegister({
  userRecord,
  clientInfo
} = {}) {
  let nickName = userRecord.nickname ? userRecord.nickname : "游客"+(Math.random().toString(36).substring(3,9));
  userRecord.nickname = nickName; //设置默认昵称
  return userRecord; //返回用户信息
}

module.exports = {
  beforeRegister
}
