
const http = require('http');
const fs = require('fs');

//主页路由模块,file文件夹里的index.js文件
var index = require('./views/index');
//错误处理文件路径
var error = "./views/error.html";
//春晓页面路径
var cx = "./views/chunxiao.html";

//函数Response，将HTML、css、js等文件响应给客户端
var Response = function (res, filePath) {
	//读取文件，读取完成后给客户端响应
	fs.readFile(filePath, 'utf-8', function (err, data) {
		if (err) {
			//如果失败的不是错误文件，才返回错误文件
			if (filePath != error) {
				Response(res, error);
			}
		} else {
			console.log(typeof data);
			//获取后缀名
            var i = filePath.lastIndexOf('.');
            var suffix = filePath.substr( i+1, filePath.length);
            console.log(suffix);
            res.writeHead(200,{                     //响应客户端，将文件内容发回去
                'Content-type':"text/"+suffix});    //通过后缀名指定mime类型
            res.end(data);
		}
	})
};

//404错误响应文件
var error404 = function(res){
   Response(res,error);
};

//创建HTTP服务器
var server = http.createServer(function(req,res){
   	console.log(req.url);               //在控制台打印请求
    //判断URL，提供不同的路由
    if(req.url == '/index' || req.url == '/') {    //主页
        index.index(res);
    } else if (req.url == '/chunxiao') {   //访问chunxiao.html（特意使用中文命名）
       	Response(res,cx);
    } else {                              //访问其它静态文件，如/stylesheets/index.css
        Response(res,"./views"+req.url);
    }
});

//启动服务器
server.listen('3001',function(){
    console.log("服务器启动");
});