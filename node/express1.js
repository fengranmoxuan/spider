var express=require('express');
var app=express();
app.all('/',function(req,res,next){
	res.send('hello world');
	console.log('hello world');
	next();
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log(host,port);
	console.log(server.address());
})
