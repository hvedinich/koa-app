const joi = require('joi');

const schema = joi
  .object({
    user: joi.string(),
    host: joi.string(),
    password: joi.string().optional().empty(''),
    database: joi.string(),
    port: joi.number(),
  })
  .required();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

module.exports = { config, schema };
