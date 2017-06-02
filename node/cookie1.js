var express=require('express');
var cookieParser=require('cookie-parser');
var app=express();
console.log(JSON.stringify(app));
// app.use(cookieParser());
// app.get('/',function(req,res){
// 	console.log('Cookies',req.cookies);
// })
// app.listen(9000);