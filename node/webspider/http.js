var http=require('http');
var url="http://baike.baidu.com/item/%E6%9E%97%E5%BF%83%E5%A6%82/181081";
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
			console.log($(this).attr('src'));
		})
	}else{
		console.log('error');
	}
})