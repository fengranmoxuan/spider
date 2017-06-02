var express=require('express');
var app=express();
var request=require('request');
var cheerio=require('cheerio');
// var $=cheerio.load("<h2>hello world</h2>");
// console.log($('h2').html());
app.get('/',function(req,res){
	request('http://www.jd.com',function(err,response,body){
		if(!err && response.statusCode==200){
			var $=cheerio.load("body");
			$('div').each(function(key,value){
				console.log(value.text());
			})
		}
	})
})
var server=app.listen('3000',function(){
	console.log('listen 3000');
})