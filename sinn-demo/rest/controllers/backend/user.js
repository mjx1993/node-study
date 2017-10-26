//
import mongoose from 'mongoose';
import md5 from 'md5';
import AdminConfig from '../../../config/admin';
const AdminUserModel = mongoose.model('AdminUser');

class BackendUser {
	//用户登录验证接口
	static async signIn(ctx) {
		const { name, password } = ctx.request.body;
		console.log(ctx.request.body);
		if(!name||!password) return ctx.render('error.html',{
		  	message: '信息填写错误!',
		  	error: { status:404 }
		})
		if (name == AdminConfig.name && md5(password) == AdminConfig.password) {
			ctx.session.user = {name, password};
			ctx.redirect('/server/home');
		}
		const result = await AdminUserModel.findOne({name, password: md5(password)});
		if (!result) return ctx.render('error.html', {
			message: '用户名或密码错误！',
			error: {status: 404}
		})
		ctx.session.user = result;
		ctx.redirect('/server/home');
	}
}

export default BackendUser;