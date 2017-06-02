var http=require('http');
var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var path=require('path');
var url1="http://www.cnblogs.com/";


function checkUrl(x){
	checkContent(x);
}

function checkContent(url){
	http.get(url,function(res){
		var html='';
		res.on('data',function(chunk){
			html+=chunk;
		})
		res.on('end',function(){
			var $=cheerio.load(html);
			$('.post_item_body h3 a').each(function(i,ele){
				console.log($(this).attr('href'));
			})
			var next_href=$('.pager a:last-child').attr('href');
			var str=next_href.slice(next_href.length-3,next_href.length);
			var str1=str.split('/')[0];
			var str2=str.split('/')[1];
			var hrefs=url1+"#"+str1+str2;
			checkUrl(hrefs);
		})
	})
}
checkUrl(url1);