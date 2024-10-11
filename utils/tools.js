//创建唯一id
export function uuid(){
	return Date.now().toString(36)+"-"+ Math.random().toString(36).substring(3,9);
}

//后去文件后缀名
export function getFileExtension(filePath) {
	if(filePath.includes('.')){
		const fileExtension = filePath.split('.').pop();
		return fileExtension;
	}else{
		return "png";
	}
}


export function getCurrentDayOfWeek() {  
    const daysOfWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];  
    const currentDate = new Date();  
    const dayOfWeekIndex = currentDate.getDay();  
      
    return daysOfWeek[dayOfWeekIndex];  
}  

export function removeHtmlTags(text) {
  return text.replace(/<[^>]*>/g, '');
}

//计算天数间隔
export function daysFromTimestamp(timestamp) {
  const now = new Date().getTime();
  const diff = now - timestamp;
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.floor(diff / oneDay);
}

//日期格式化
export function formatDate(timestamp, format="yyyy-MM-dd hh:mm:ss") {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return format.replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('hh', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}


//性别格式化
export function formatGender(value) {
  const genderMap = {
    0: "保密",
    1: "男",
    2: "女"
  };
  return genderMap[value] || "保密";
}

//超出指定字符显示省略号
export function truncateString(str, num) {
  if (str.length > num) {
    return str.substring(0, num) + '...';
  } else {
    return str;
  }
}

