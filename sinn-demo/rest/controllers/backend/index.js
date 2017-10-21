/*
* @ author unoboy
* @ use 管理后台文章相关接口逻辑层
*/

class BackendMain {
    // 登录页渲染
    static async Login(ctx) {
        return ctx.render('login.html', { title: 'SInn管理平台'});
    }
}

export default BackendMain;