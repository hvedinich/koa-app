const joi = require('joi');

const schema = joi
  .object({
    DB_USER: joi.string(),
    DB_HOST: joi.string(),
    DB_PASSWORD: joi.string().optional().empty(''),
    DB_DATABASE: joi.string(),
    DB_PORT: joi.number(),
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
  databaseConfig: {
    user: envVars.DB_USER,
    host: envVars.DB_HOST,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    port: envVars.DB_PORT,
  },
};

module.exports = config;
