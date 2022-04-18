const joi = require('joi');

const schema = joi
  .object({
    name: joi.string(),
    env: joi.string().allow('development', 'production', 'test'),
    server: joi.object({ port: joi.number().required() }),
    db: joi.object({ url: joi.string().required() }),
  })
  .unknown()
  .required();

const config = {
  name: 'Booking',
  env: process.env.NODE_ENV,
  server: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.DB_URL,
  },
};

module.exports = { schema, config };
