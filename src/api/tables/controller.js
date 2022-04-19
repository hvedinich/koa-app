const { v4: uuidv4 } = require('uuid');
const model = require('./model');
const { validateTableInput } = require('./validation');
const { ServerError } = require('../../utils/errors');
const configModel = require('../config/model');
const { DEFAULT_CONFIG } = require('../config/constants');

/**
 * Creates an array with all possible time slots based on working hours
 *
 * @param {Number} start - start hour
 * @param {Number} end - end hour
 * @returns {Array.<Object>}
 */
const getAllPossibleSlots = (start, end) =>
  Array.from({ length: end - start }, (_, i) => {
    const timeSlot = start + i;
    return {
      name: `${timeSlot}:00 - ${timeSlot + 1}:00`,
      timeSlot,
    };
  });

/**
 * Fills each table with all available timeslots
 *
 * @param {Array} tables - All tables collection
 * @param {Array} allPossibleSlots - all possible working time slots
 * @returns {Array.<Object>}
 */
const fillAvailableSlots = (tables, allPossibleSlots) =>
  tables.map(table => ({
    ...table,
    availableSlots: allPossibleSlots.filter(({ timeSlot }) => !table.bookings.find(e => e.timeSlot === timeSlot)),
  }));

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
  const config = await configModel.read({ id: DEFAULT_CONFIG });

  const allPossibleSlots = getAllPossibleSlots(config.openFrom, config.openTo);
  const tablesWithAvailableSlots = fillAvailableSlots(tables, allPossibleSlots);

  ctx.status = 200;
  ctx.body = tablesWithAvailableSlots;
};

const createOne = async ctx => {
  const { tableNumber } = ctx.request.body;

  const id = uuidv4();
  const newUser = {
    id,
    tableNumber,
  };

  let createdUser;
  try {
    createdUser = await model.create(newUser);
  } catch (err) {
    if (err.code === 11000) {
      throw new ServerError(`Table with tableNumber == ${tableNumber} already exists`, 404);
    }
    throw err;
  }

  ctx.status = 201;
  ctx.body = createdUser;
};

const updateOne = async ctx => {
  const { id } = ctx.params;
  const table = await model.read({ id });
  if (!table) {
    throw new ServerError('Table no found', 404);
  }

  const newTable = { id, ...ctx.request.body };
  validateTableInput(newTable);

  const updatedTable = await model.findOneAndUpdate(newTable);

  ctx.status = 201;
  ctx.body = updatedTable;
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
