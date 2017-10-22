//

import md5 from 'md5';
import AdminConfig from '../../../config/admin';

class BackendUser {
	//用户登录验证接口
	static async signIn(ctx) {
		const { name, password } = ctx.request.body;
		console.log(ctx.request.body);
		if (!name || !password) return ctx.render('error.html', {
			message: '信息填写错误！',
			error: {status: 404}
		});
		if (name == AdminConfig.name && md5(password) == AdminConfig.admin) {
			ctx.session.user = {name, password};
			ctx.redirect('/server/home');
		}
	}  
}

export default BackendUser;