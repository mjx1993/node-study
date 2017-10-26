/*
* @ author unoboy
* @ use 管理后台文章相关接口逻辑层
*/

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
}

export default BackendMain;