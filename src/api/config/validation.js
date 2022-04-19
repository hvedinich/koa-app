const joi = require('joi');
const { ServerError } = require('../../utils/errors');

const configSchema = joi
  .object({
    id: joi.string().required(),
    openFrom: joi.number().min(0).max(24).required(),
    openTo: joi.number().min(0).max(24).required(),
  })
  .required();

const validateConfigInput = input => {
  const { error } = configSchema.validate(input);
  if (error) {
    throw new ServerError(`Validation error: ${error.message}`, 400);
  }
};

module.exports = {
  validateConfigInput,
};
