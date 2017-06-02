var fs=require('fs');
fs.writeFile('3.txt','当天边那颗星出现',function(err){
	if(err){
		console.log(err);
	}else{
		console.log('写入成功');
	}
})