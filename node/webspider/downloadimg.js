var http=require('http');
var url="http://baike.baidu.com/item/%E6%9E%97%E5%BF%83%E5%A6%82/181081";
var fs=require('fs');
var path=require('path');
var roots='./linxinru';
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


function download(url,callback){
	http.get(url,function(res){
		var data='';
		res.on('data',function(chunk){
			data+=chunk;
		});
		res.on('end',function(){
			callback(data);
		})
	}).on('error',function(){
		callback(null);
	})
}

var cheerio=require('cheerio');
download(url,function(data){
	if(data){
		var $=cheerio.load(data);
		$('.maqueeCanvas').find('li').find('a').find('img').each(function(i,elem){
			var urls=$(this).attr('src');
			http.get(urls,function(res){
				var imgData='';
				res.setEncoding('binary');
				res.on('data',function(chunk){
					imgData+=chunk
				});
				mkdir(roots);
				var paths=path.join(roots,path.basename(urls));
				console.log(paths);
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
		})
	}else{
		console.log('error');
	}
})

