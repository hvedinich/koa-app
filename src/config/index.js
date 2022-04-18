require('dotenv').config();
const { schema, config } = require('./config');

/**
 * Validate the env variables
 */
const { error } = schema.validate(config);
if (error) {
  throw new Error(`Validation error: ${error.message}`);
}

module.exports = config;
