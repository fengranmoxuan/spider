function say(word){
	console.log(word);
}
function excute(cb,value){
	cb(value);
}
excute(say,'hello');