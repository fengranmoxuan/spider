var express=require('express');
var http=require('http');
var app=express();
var router=express.Router();
app.get('/about',function(req,res){
	res.send('game over');
})
app.get('/index.html',function(req,res){
	res.send('index.html');
})

app.get('/',function(req,res,next){
	console.log('you know that you are wrong');
	next();
},function(req,res){
	res.send('you know that you are wrong');
});

app.route('/book')
.get(function(req,res){
	res.send('this is a get method');
})

router.get('/study',function(req,res){
	res.send('hello everyone let us begin the first chapter');
})

app.use('/index/:_id',function(req,res){
	console.log(req.params);
	res.send(req.method);
})

app.use('/time',function(req,res,next){
	console.log('time:',Date.now());
	next();
})

var server=app.listen(9000,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log(host,port);
})


module.exports = router;