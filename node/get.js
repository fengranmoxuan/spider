var http=require('http');
var url=require('url');
var util=require('util');
http.createServer(function(req,res){
	res.writeHead(200,{"Content-Type":"text/plain"});
	var params=url.parse(req.url,true).query;
	console.log(params);
	console.log('网站名称:'+params.name);
	console.log('网址:'+params.url);
}).listen(3000);
