var http = require('http');
var _url = require('url');    //引用url模块，处理url地址相关操作
var cheerio = require("cheerio");    //引用cheerio模块,使在服务器端像在客户端上操作DOM,不用正则表达式
var iconv = require('iconv-lite');    //解决编码转换模块
var BufferHelper = require('bufferhelper');    //关于Buffer我后面细说
 /*
  *最后我需要达到的效果是，给予一个访问地址，形如：http://www.mynode.com?link=www.abc.com&callback=cb
 *我希望可以返回json，也可返回jsonp
 */
 
http.createServer(function (req, res) {
    var arg = _url.parse(req.url, true).query;    //通过调用url模块，获取查询字符串参数集合
    var link = arg.link;    //获取抓取的link
    var callback = arg.callback;    //回调函数的名称
     //若没有对link加上http，则补全
    var protocol = "http";
    if (link.indexOf("http") < 0) {
        link = protocol + "://" + link;
    }
     //抓取页面
    download(link, function (data) {
        res.writeHead(200, {
            "Content-Type": "text/html;charset=utf-8",
            "Transfer-Encoding": "chunked"
        });
        var doc = data.toString();
        var $ = cheerio.load(doc);
        var list = [];
        $(".e2 li .title").each(function (i, e) {
            var item = $(e).children("a").last();
            var title = item.text();
            var link = item.attr("href");
            list.push({ "title": title, "link": link });
        });
        var jsonText = JSON.stringify(list);
        if (callback) {
            res.write(callback + "(" + jsonText + ")");
        }
        else{
            res.write(jsonText);
        }
        res.end();
    });
}).listen(3000);
 
 //加载第三方页面
function download(url, callback) {
    http.get(url, function (res) {
        var bufferHelper = new BufferHelper();    //解决中文编码问题
        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });
        res.on("end", function () {
             //注意，此编码必须与抓取页面的编码一致，否则会出现乱码，也可以动态去识别
            var val = iconv.decode(bufferHelper.toBuffer(), 'gb2312');    
            callback(val);
        });
    }).on("error", function () {
        callback(null);
    });
}
download('https://www.jd.com/', callback);