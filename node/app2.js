var express=require('express');
var app=express();
app.router('/book')
.get(function(req,res){
	res.send('this is get method');
})
.post(function(req,res){
	res.send('this is post method');
})
.put(function(req,res){
	res.send('this is a put method');
})
var server=app.listen(9000,function(req,res,next){
	var host=server.address().host;
	var port=server.address().port;
	console.log(host,port);
})