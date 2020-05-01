const koa = require('koa');

const app = new koa();

app.use(async ctx => {
  ctx.body = 'hello';
});
export default app;
