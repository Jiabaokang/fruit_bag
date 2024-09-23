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