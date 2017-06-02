function play(){
	var name;
	this.arr=function(thename){
		name=thename;
		var arr=[];
		for(var i=0;i<8;i++){
			arr.push(i);
		}
		console.log(arr.join(','));
	}
	this.print=function(){
		console.log('lallalla');
	}
	this.color=function(){
		var arr=['red','green','blue'];
		var i=Math.floor(Math.random()*3);
		console.log(arr[i]);
	}
	this.time=function(){
		var time=new Date();
		var year=time.getFullYear();
		var month=time.getMonth()+1;
		var day=time.getDate();
		var hour=time.getHours();
		var minute=time.getMinutes();
		var second=time.getSeconds();
		var week=time.getDay();
		var millseconds=time.getMilliseconds(); 
		var Time=time.getTime();
		console.log(year,month,day,hour,minute,second,week,millseconds,Time);
	}
	this.shijian=function(){
		var time=new Date();
		console.log(time.toString());
		console.log('--------------------');
		console.log(time.toLocaleString());
		console.log('--------------------');
		console.log(time.toDateString());
		console.log('--------------------');
		console.log(time.toLocaleDateString());
		console.log('--------------------');
		console.log(time.toLocaleTimeString());
		console.log('--------------------');
		console.log(time.toTimeString());
		console.log(time);
	}
	this.helloperson=function(){
		console.log('hello'+name);
	}
}
module.exports=play;