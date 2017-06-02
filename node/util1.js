var util=require('util');
var a1=util.isArray([]);
var a2=util.isArray({});
var a3=util.isArray(new Array);
console.log('a1--->',a1,'a2----->',a2,'a3----->',a3);