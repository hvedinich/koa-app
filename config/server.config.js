const joi = require('joi');

const schema = joi
  .object({
    NODE_ENV: joi.string().allow('development', 'production', 'test'),
    PORT: joi.number(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables
 */
const { error, value: envVars } = schema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  server: {
    port: envVars.PORT || 3000,
  },
};

module.exports = config;
