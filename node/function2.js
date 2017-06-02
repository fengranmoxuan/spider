function excute(cb,word){
	cb(word);
}
excute(function(word){
	console.log(word);
},'hi');

var a=[7,6,5,4,3,2,1,0];
a.map(function(value,key){
	console.log(value,key);
})