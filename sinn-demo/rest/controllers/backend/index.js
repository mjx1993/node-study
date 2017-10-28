/*
* @ author unoboy
* @ use 管理后台文章相关接口逻辑层
*/
import mongoose from 'mongoose';
import menu from '../config/menu';

class BackendMain {
    //登录页渲染
    static async Login(ctx) {
        return ctx.render('login.html', { title: 'Unoboy管理平台'});
    }

    //首页渲染
    static async home(ctx) {
    	console.log(ctx.flash);
    	const user = ctx.session.user;
    	return ctx.render('home.html', { title: 'Unoboy管理平台',message:'这里是首页',user });
    }

    //用户管理
    static async user(ctx) {
        let Index = 1;
        const { type,item } = ctx.query;
        if (item) Index = item;
        const user = ctx.session.user;
        if (user == '') return ctx.render('login.html', { title: 'Unoboy管理平台'});
        return ctx.render('user.html', {
            title: 'Unoboy管理平台',
            message: '用户管理',
            user,
            index: Index,
            menu: menu[type]
        })
    }
}

export default BackendMain;