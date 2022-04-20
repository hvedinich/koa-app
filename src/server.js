const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

const server = new Koa();

server
  .use(cors())
  .use(bodyParser())
  .use(api.routes())
  .use(api.allowedMethods());

module.exports = server;
