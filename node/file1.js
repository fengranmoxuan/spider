function print(){
	console.log(__filename);
	console.log(__dirname);
}
var a=setInterval(print,200);
clearInterval(a);
console.trace();
console.error();
console.info('程序开始执行');
var count=10;
console.log('计数:%d',count);
console.time('获取数据');
console.timeEnd('获取数据');