const schema = require('./schema');

const read = filter => schema.findOne(filter).lean();
const getAll = filter => schema.find(filter).lean().exec();
const create = user => schema.create(user);
const findOneAndUpdate = config => schema.findOneAndUpdate({ id: config.id }, config, { new: true }).lean();
const deleteOne = id => schema.deleteOne({ id });

module.exports = { read, getAll, create, findOneAndUpdate, deleteOne };
