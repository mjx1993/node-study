/*
* @ author unoboy
* @ use 管理后台的接口配置
* @ 逻辑层实现 /controllers/backend/*
*/

import { BackendMain,BackendArticle,BackendUser } from '../controllers/backend.export';
const router = require('koa-router')();

router
    .get('/', BackendMain.Login)                                                 //管理后台首页
    //用户相关
	.post('/server/login', BackendUser.signIn)                                   // 用户登录验证接口
	.get('/server/user', BackendMain.user)                                       // 用户管理主页
	
  	//文章相关
  	.get('/server/home', BackendMain.home);                                      //管理后台主页


module.exports = router;