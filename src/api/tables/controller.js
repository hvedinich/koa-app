const { v4: uuidv4 } = require('uuid');
const model = require('./model');

const getOne = async ctx => {
  const { tableId } = ctx.params;
  const user = await model.find(tableId);

  ctx.status = 200;
  ctx.body = user;
};

const getAll = async ctx => {
  const filter = {
    date: ctx.query.date && parseInt(ctx.query.date, 10),
  };
  const tables = await model.getAll(filter);
  ctx.status = 200;
  ctx.body = tables;
};

const createOne = async ctx => {
  const { tableNumber } = ctx.request.body;

  const id = uuidv4();
  const newUser = {
    id,
    tableNumber,
  };
  const createdUser = await model.create(newUser);

  ctx.status = 201;
  ctx.body = createdUser;
};

module.exports = {
  getOne,
  getAll,
  createOne,
};
