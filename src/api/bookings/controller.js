const { v4: uuidv4 } = require('uuid');
const model = require('./model');
const { validateCreateBookingInput } = require('./validation');

const getOne = async ctx => {
  const { id } = ctx.params;
  const user = await model.find({ id });
  ctx.assert(user, 404, "The requested booking doesn't exist");
  ctx.status = 200;
  ctx.body = user;
};

const getAll = async ctx => {
  ctx.status = 200;
  ctx.body = await model.getAll();
};

const createOne = async ctx => {
  const { tableId, timeSlot, guestsCount, date } = ctx.request.body;

  const id = uuidv4();

  const newBooking = {
    id,
    tableId,
    timeSlot,
    guestsCount,
    date,
  };

  validateCreateBookingInput(newBooking);

  const createdBooking = await model.create(newBooking);

  ctx.status = 201;
  ctx.body = createdBooking;
};

module.exports = {
  getOne,
  getAll,
  createOne,
};
