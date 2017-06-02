// var dns=require('dns');
// dns.lookup('www.github.com',function (err,address,family){
// 	console.log('ip地址:',address);
// 	dns.reverse(address,function(err,hostnames){
// 		if(err){
// 			console.log(err.stack);
// 		}
// 			console.log('反向解析:'+'<---->'+address+'<---->'+JSON.stringify(hostnames));
// 	})
// })


// var dns = require('dns');

// dns.lookup('www.github.com', function onLookup(err, address, family) {
//    console.log('ip 地址:', address);
//    dns.reverse(address, function (err, hostnames) {
// 	   if (err) {
// 	      console.log(err.stack);
// 	   }

// 	   console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
// 	});  
// });


var dns=require('dns');
dns.lookup('chrome.google.com',function(err,address,family){
	if(err){
		console.log(err);
	}else{
		console.log(address);
		console.log(family);
	}
})