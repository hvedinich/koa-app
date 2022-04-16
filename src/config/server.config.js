const joi = require('joi');

const schema = joi
  .object({
    env: joi.string().allow('development', 'production', 'test'),
    port: joi.number(),
  })
  .unknown()
  .required();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};

module.exports = { schema, config };
