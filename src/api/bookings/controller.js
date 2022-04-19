const { v4: uuidv4 } = require('uuid');
const model = require('./model');
const configModel = require('../config/model');
const { validateCreateBookingInput, validateUpdateBookingInput } = require('./validation');
const { DEFAULT_CONFIG } = require('../config/constants');
const { ServerError } = require('../../utils/errors');

const getOne = async ctx => {
  const { id } = ctx.params;
  const booking = await model.read({ id });

  ctx.assert(booking, 404, "The requested booking doesn't exist");

  ctx.status = 200;
  ctx.body = booking;
};

const getAll = async ctx => {
  ctx.status = 200;
  ctx.body = await model.getAll();
};

const createOne = async ctx => {
  const { tableId, timeSlot, guestsCount, date } = ctx.request.body;
  const newBooking = {
    id: uuidv4(),
    tableId,
    timeSlot,
    guestsCount,
    date,
  };

  validateCreateBookingInput(newBooking);

  const config = await configModel.read({ id: DEFAULT_CONFIG });
  if (timeSlot < config.openFrom || timeSlot >= config.openTo) {
    throw new ServerError('Invalid time slot', 400);
  }

  const isBookingExists = await model.read({ date, timeSlot, tableId });
  if (isBookingExists) {
    throw new ServerError('Table has already been booked', 400);
  }

  const createdBooking = await model.create(newBooking);

  ctx.status = 201;
  ctx.body = createdBooking;
};

const updateOne = async ctx => {
  const { id } = ctx.params;
  const booking = await model.read({ id });
  if (!booking) {
    throw new ServerError('Booking no found', 404);
  }

  validateUpdateBookingInput(ctx.request.body);

  const newBooking = { id, ...ctx.request.body };
  const updatedBooking = await model.findOneAndUpdate(newBooking);

  ctx.status = 201;
  ctx.body = updatedBooking;
};

const deleteOne = async ctx => {
  const { id } = ctx.params;
  await model.deleteOne(id);
  ctx.status = 201;
  ctx.body = { id };
};

module.exports = {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
