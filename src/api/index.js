/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const basePath = path.join(__dirname);

const router = new Router({
  prefix: `/api`,
});

fs.readdirSync(basePath, { withFileTypes: true })
  .filter(file => file.isDirectory())
  .forEach(file => {
    const api = require(path.join(__dirname, file.name))(
      new Router({
        prefix: `/${file.name}`,
      }),
    );
    router.use(api.routes());
  });

module.exports = router;
