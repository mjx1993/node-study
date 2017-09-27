'use strict'

const http = require('http')
const fs = require('fs')
const cheerio = require('cheerio')
const request = require('request')

let i = 0
let url = 'http://www.ss.pku.edu.cn/index.php/newscenter/news/2391';

function fetchPage(x) {
	startRequest(x);
}

function startRequest(x) {
	// http发起请求
	http.get(x, function (res) {
		let html = '';  	//用来存储请求网页的整个html内容
		let titles = [];
		res.setEncoding('utf-8');   //防止中文乱码
		// 监听data事件, 每次取一块数据
		res.on('data', function (chunk) {
			html += chunk;
		})
		//监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
		res.on('end', function () {
			let $ = cheerio.load(html);  //采用cheerio模块解析html
			let time = $('.articel-info a:first-child').next().text().trim();
			var news_item = {
				//获取文章的标题
				title: $('div.article-title a').text().trim(),
				//获取文章发布的时间
				Time: time,
				//获取当前文章的url
				link: 'http://www.ss.pku.edu.cn' + $('div.article-title a').attr('href'),
				//获取供稿单位
				author: $('[title=供稿]').text().trim(),
				// i 判断取了多少篇文章
				i: ++i 
			};

			console.log(news_item);  //打印新闻信息
			let news_title = $('div.article-title a').text().trim();

			savedContent($, news_title);   //存储每篇文章的图片及图片标题
			savedImg($, news_title);    //存储每篇文章的图片及图片标题

			let next_url = 'http://www.ss.pku.edu.cn' + $('li.next a').attr('href');
			let str1 = next_url.split('-');
			let str = encodeURI(str1[0]);
			// 控制爬去文章的数量
			if (i < 15)
				fetchPage(str);
		})
	}).on('error', function (err) {
		console.log(err);
	})
}

function savedContent($, title) {
	$('.article-content p').each(function (index, item) {
		var x = $(this).text();
		var y = x.substring(0, 2).trim();
		if (y == '') {
			x = x + '\n';
			//将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
			fs.appendFile('./data/' + title + '.txt', x, 'utf-8', function (err) {
				if (err) {
					console.log(err);
				}
			})
		}
	})
}

function savedImg($, title) {
	$('.article-content img').each(function (index, item) {
		var img_title = $(this).parent().next().text().trim();  //获取图片的标题
		if (img_title.length>35 || img_title=='') {
			img_title = 'Null';
		}
		var img_filename = img_title + '.jpg';
		var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src');

		//采用request模块，向服务器发起一次请求，获取图片资源
		request.head(img_src, function (err, res, body) {
			if (err)
				console.log(err);
		})
		//通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
		request(img_src).pipe(fs.createWriteStream('./image/' + title + '---' + img_filename));
	})
}

fetchPage(url);  //主程序运行

