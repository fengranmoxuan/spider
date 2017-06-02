var fs=require('fs');
var path=require('path');
function mkdir(paths,callback){
	fs.exists(paths,function(data){
		if(data){
			callback('exist');
		}else{
			mkdir(path.dirname(paths),function(){
				fs.mkdir(paths);
				callback('create success');
			})
		}
	})
}

mkdir('./gyy/huge',function(data){
	console.log(data);
})