//
const express = require('express'),
	app = express(),
	server = require('http').createServer(app);
app.use('/', express.static(__dirname + '/www')); //指定静态html文件的位置
server.listen(8081);
console.log(`listen by 8081`);