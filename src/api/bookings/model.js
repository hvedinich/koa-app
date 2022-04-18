const schema = require('./schema');

const read = filter => schema.findOne(filter).lean();
const getAll = filter => schema.find(filter).lean().exec();
const create = user => schema.create(user);

module.exports = { read, getAll, create };
