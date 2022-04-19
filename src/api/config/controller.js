const model = require('./model');
const { validateConfigInput } = require('./validation');
const { DEFAULT_CONFIG } = require('./constants');

const getOne = async ctx => {
  const config = await model.find({ id: DEFAULT_CONFIG });

  ctx.status = 200;
  ctx.body = config;
};

const update = async ctx => {
  const { openFrom, openTo } = ctx.request.body;

  const newConfig = {
    id: DEFAULT_CONFIG,
    openFrom,
    openTo,
  };

  validateConfigInput(newConfig);

  const updatedConfig = await model.findOneAndUpdate(newConfig);

  ctx.status = 201;
  ctx.body = updatedConfig;
};

module.exports = {
  getOne,
  update,
};
