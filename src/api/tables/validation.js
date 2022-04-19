const joi = require('joi');
const { ServerError } = require('../../utils/errors');

const configSchema = joi
  .object({
    id: joi.string().required(),
    tableNumber: joi.number().required(),
  })
  .required();

const validateTableInput = input => {
  const { error } = configSchema.validate(input);
  if (error) {
    throw new ServerError(`Validation error: ${error.message}`, 400);
  }
};

module.exports = {
  validateTableInput,
};
