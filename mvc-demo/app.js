//
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

// 判断当前环境是否是production环境。如果是，就使用缓存，如果不是，就关闭缓存
const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var 
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

// const router = require('koa-router')();

// app.use(async (ctx, next) => {
//     await next();
//     let met = ctx.url;
//     console.log(met);
// });

// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });
// router.get('/', async (ctx, next) => {
//     ctx.response.body = '<h1>Index</h1>';
// });
// app.use(router.routes());

app.listen(3003);
console.log(`listen by 3003`);