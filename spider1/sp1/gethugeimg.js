var http=require('http');
var cheerio=require('cheerio');
var fs=require('fs');
var path=require('path');
url1='http://www.duitang.com/search/?kw=%E8%83%A1%E6%AD%8C&type=feed#!s-p2';
var i=1;
function getAllImage(x){
	getImagesrc(x)
}

var j=0;
function getImagesrc(url){
	http.get(url,function(res){
		var data='';
		res.on('data',function(chunk){
			data+=chunk;
		})
		res.on('end',function(){
			var $=cheerio.load(data);
			$('img').each(function(i,ele){
				var img_href=$(this).attr('src');
				downloadimg('http://'+img_href.split('//')[1],'./Image/');
			})
			// i=i+1;
			// if(i<31){
			// 	var hrefs=url1+'#!s-p'+i;
			// 	console.log(hrefs);
			// 	// getAllImage(hrefs);
			// }
		})
	})
}
getImagesrc(url1);



function downloadimg(url,roots){
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
}
// downloadimg('http://b-ssl.duitang.com/uploads/item/201603/10/20160310192812_ia5B8.jpeg',"./gyy/")

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