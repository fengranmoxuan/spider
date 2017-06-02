var fs=require('fs');
var superagent=require('superagent');
var cheerio=require('cheerio');

var url = 'http://www.imooc.com/learn/441';
var savePath = './gyy';

var headers = {
    "Cache-Control": "max-age=0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Referer": "http://www.imooc.com/",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "zh-CN,zh;q=0.8",
    "Cookie": cookies // 在外面定义一个 cookies 变量存放自己的 cookies
};
var cookies={
	
}

superagent
    .get('www.imooc.com/learn/' + courseId) // 在外面设置一个 courseId 的参数
    .set(headers)
    .end(function(err, res) {

        // res.text 通过请求获取的 html 页面
        var $ = cheerio.load(res.text);

        // 获取课程的名称
        $('.course-infos .hd').find('h2').each(function(item) {
            courseTitle = $(this).text();
        })

        // .chapter 是包含所有 video 的容器，这是 jquery 语法，为了获取所有的视频 id 和 filename
        $('.chapter').each(function(item) {

            var videos = $(this).find('.video').children('li')

            videos.each(function(item) {
                var video = $(this).find('a')
                var filename = video.text().replace(/(^\\\\\\\\s+)|(\\\\\\\\s+$)/g,"");
                var id = video.attr('href').split('video/')[1]

                // 视频 id 和 视频文件名字
                console.log(id, filename);
            })
        })
    })

    var getVideoUrl = function(id, callback) {
    superagent.get('http://www.imooc.com/course/ajaxmediainfo/?mid=' + id + '&mode=flash')
        .end(function(err, res) {
            var url = JSON.parse(res.text);

            if(url.result == 0) {
                url = url.data.result.mpath[0];
                callback(url);
            }
        })
}

var downloadVideo = function(url, filename, callback) {

    // 去掉文件名后面的时间
    // 2-1 登录动画-冒泡 (10:53) —> 2-1 登录动画-冒泡.mp4
    filename = filename.replace(/\\\\\\\\(.*\\\\\\\\)/,'') + '.mp4';

    // 创建一个以课程名字命名的目录存放视频
    var dirPath = savePath + courseTitle + '/'
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    console.log('开始下载第' + courseTotalCount + '个视频' + filename + ' 地址: ' + url);
    var writeStream = fs.createWriteStream(dirPath + filename);
    writeStream.on('close', function() {

        callback(filename);
    })

    var req = superagent.get(url);
    req.pipe(writeStream);

}
var courseId = process.argv.splice(2, 1);