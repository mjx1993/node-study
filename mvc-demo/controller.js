// 
const fs = require('fs');

function addController(router, dir) {
	var files = require(__dirname + '/' + dir);
	console.log(files);
}

module.exports = function (dir) {
	let 
		controllers_dir = dir || 'controllers',
		router = require('koa-router')();
	addController(router, controllers_dir);
	return router.routes();
}