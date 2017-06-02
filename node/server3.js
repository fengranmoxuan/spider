var http=require('http');
var url=require('url');
var fs=require('fs');
function start(route){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		console.log("Request for"+pathname+"recieved");
		route(pathname);
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(fs.readFileSync('1.html'));
		response.end();
	}
	http.createServer(onRequest).listen(9000);
	console.log('server has started');
}
exports.start=start;