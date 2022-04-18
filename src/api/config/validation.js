const joi = require('joi');
const { ValidationError } = require('../../utils/errors');

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
    throw new ValidationError(`Validation error: ${error.message}`);
  }
};

module.exports = {
  validateConfigInput,
};
