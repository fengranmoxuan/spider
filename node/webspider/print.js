var url = "http://sale.jd.com/act/n4BWSjIrlePo.html"
var http = require("http");
 // Utility function that downloads a URL and invokes
 // callback with the data.
function download(url, callback) {
     http.get(url, function(res) {
         var data = "";
         res.on('data', function(chunk) {
             data += chunk;
         });
         res.on("end", function() {
             callback(data);
         });
     }).on("error", function() {
         callback(null);
     });
}
var cheerio = require("cheerio");
download(url, function(data) {
     if (data) {
         var $ = cheerio.load(data);
         //id为weibo里的所有li,每个li里的段落p的内容 
         $('.nav-item a').find('span').each(function(i, elem) {
             console.log($(this).text());
             console.log(" ");
         })
     }
 	else{
     	console.log("error");
 	}
});