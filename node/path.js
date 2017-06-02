var path=require('path');
console.log('normalize:',path.normalize('/gyy/linan/liyuanbo/mudan/..'));
console.log('path.join:',path.join('gyy','linan','liyuanbo','mudan','wangjiao'));
console.log('__dirname',__dirname);
console.log('__filename',__filename);
console.log('relative',path.relative('path.js','/gyy/path.js'));
console.log('resolve',path.resolve('path.js'));
console.log('dirname',path.dirname(__dirname));
console.log('dirname',path.dirname(__filename));
console.log('basename',path.basename(__filename));
console.log('extname',path.extname(__filename));
var obj={
    root : "/",
    dir : "/home/user/dir",
    base : "file.txt",
    ext : ".txt",
    name : "file"
}
console.log('parse',path.parse(__filename));
console.log('format',path.format(obj));