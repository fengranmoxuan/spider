var http=require('http');
var fs=require('fs');
var path=require('path');
var url="http://s0.hao123img.com/res/img/logo/logonew.png";
var roots='./image';

function mkdir(path){
	fs.exists(path, function(data){
		if(data==false){
			fs.mkdir(path,function(err){
				if(err){
					console.log('failure');
				}else{
					console.log('success');
				}
			})
		}else{
			console.log('exist');
		}
	})
}

http.get(url,function(res){
	var imgData='';
	res.setEncoding('binary');
	res.on('data',function(chunk){
		imgData+=chunk
	});
	mkdir(roots);
	var paths=path.join(roots,path.basename(url));
	res.on('end',function(){
		fs.writeFile(paths,imgData,"binary",function(err){
			if(err){
				console.log('download failure',err);
			}else{
				console.log('success');
			}
		})
	})
})