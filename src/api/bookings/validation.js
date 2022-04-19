const joi = require('joi');
const { ServerError } = require('../../utils/errors');

const createBookingSchema = joi
  .object({
    id: joi.string().required(),
    tableId: joi.string().required(),
    timeSlot: joi.number().required(),
    guestsCount: joi.number().required(),
    date: joi.number().required(),
  })
  .required();

const validateCreateBookingInput = input => {
  const { error } = createBookingSchema.validate(input);
  if (error) {
    throw new ServerError(`Validation error: ${error.message}`, 400);
  }
};

const updateBookingSchema = joi
  .object({
    id: joi.string().required(),
    tableId: joi.string(),
    timeSlot: joi.number(),
    guestsCount: joi.number(),
    date: joi.number(),
  })
  .required();

const validateUpdateBookingInput = input => {
  const { error } = updateBookingSchema.validate(input);
  if (error) {
    throw new ServerError(`Validation error: ${error.message}`, 400);
  }
};

module.exports = {
  validateCreateBookingInput,
  validateUpdateBookingInput,
};
