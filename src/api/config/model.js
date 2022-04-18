const schema = require('./schema');

const findOneAndUpdate = config =>
  schema.findOneAndUpdate({ id: config.id }, config, { new: true, upsert: true }).lean();
const read = filter => schema.findOne(filter).lean();

module.exports = { findOneAndUpdate, read };
