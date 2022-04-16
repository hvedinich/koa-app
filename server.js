const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app
  .use(cors())
  .use(bodyParser())
  .use(async (ctx) => {
    ctx.body = 'Hello World';
  });

module.exports = app;
