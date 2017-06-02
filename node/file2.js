var fs=require('fs');
fs.open('1.html','r',function(err){
	if(err){
		console.log(err);
	}else{
		console.log('文件打开成功');
	}
})
fs.stat('1.html',function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data.dev);
		console.log(data.isFile());
		console.log(data.isDirectory());
	}
})