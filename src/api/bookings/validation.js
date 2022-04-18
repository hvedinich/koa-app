const joi = require('joi');
const { ValidationError } = require('../../utils/errors');

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
    throw new ValidationError(`Validation error: ${error.message}`);
  }
};

module.exports = {
  validateCreateBookingInput,
};
