var util=require('util');
function base(){
	this.name='hello world';
	this.sleep=function(){
		for(var i=0;i<10;i++){
			console.log(i);
		}
	}
	this.print=function(){
		console.log(this.name);
	}
}
base.prototype.eat=function(){
	console.log('i want to eat ······');
}

function sub(){
	this.name="他不是个好人";
}
util.inherits(sub,base);
var sub1=new sub();
var base1=new base();
sub1.eat();
console.log(util.inspect(base1));
console.log(util.inspect(base1,true,2,true));


