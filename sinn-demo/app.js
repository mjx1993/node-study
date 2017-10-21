//
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const templating = require('./templating');
const { backendRouter } = require('./rest/index');

// 判断当前环境是否是production环境。如果是，就使用缓存，如果不是，就关闭缓存
const isProduction = process.env.NODE_ENV === 'production';

app.use(convert(logger()))
   .use(require('koa-static')(__dirname + '/public'));

// app.use(views(__dirname + '/views', {
//     extension: 'ejs'
// }));

// add nunjucks as view:
app.use(templating(__dirname + '/views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.method} ${ctx.url}...`);
    let start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

app.use(backendRouter.routes())
   .use(backendRouter.allowedMethods());

module.exports = app;