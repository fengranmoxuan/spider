var http=require('http');
var fs=require('fs');
var cheerio=require('cheerio');
var request=require('request');

var i=0;
var url="http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";

function fetchPage(x){
	startRequest(x);
}


function startRequest(x){
	http.get(x,function(res){
		var html='';
		var titles=[];
		res.setEncoding('utf-8');
		res.on('data',function(chunk){
			html+=chunk;
		});
		res.on('end',function(){
			var $=cheerio.load(html);
			var news_title=$('.article-title a:first-child').text();
			savedContent($,news_title);
			savedImage($,news_title);
			var new_items={
				time:$('.article-info a:first-child').next().text().trim(),
				href:$('.article-title a').attr('href'),
				title:$('.article-title a').text().trim(),
				author:$('.article-info  a:first-child').text().trim(),
				i:i+1
			}
			// console.log(new_items);
			var nextLink="http://www.ss.pku.edu.cn"+$('li.next a').attr('href');
			var str=nextLink.split('-')[0];
			if(i<3){
				fetchPage(str);
			}
		}).on('error',function(err){
			console.log(err);
		})
	})
}

function savedContent($,news_title){
	$('.article-content p').each(function(i,item){
		var x=$(this).text();
		var y=x.substring(0,2).trim();
		if(y==''){
			x=x+'\n';
			fs.appendFile('./data/'+news_title+'.txt',x,'utf-8',function(err){
				if(err){
					console.log(err);
				}
			})
		}
	})
}

function savedImage($,news_title){
	$('.article-content img').each(function(i,item){
		// console.log($(this).attr('src'));
		var img_title=$(this).parent().next().text().trim();
		if(img_title.length>35||img_title==""){
			img_title="Null";
		}
		var img_filename=img_title+'.jpg';
		var img_src='http://www.ss.pku.edu.cn'+$(this).attr('src');
		console.log(img_src);
		request.head(img_src,function(err,res,body){
			if(err){
				console.log(err);
			}
		});
		request(img_src).pipe(fs.createWriteStream('./image/'+news_title+'--'+img_filename));
	})
}

fetchPage(url);