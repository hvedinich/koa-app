const schema = require('./schema');

const read = filter => schema.findOne(filter).lean();
const create = user => schema.create(user);
const getAll = ({ date }) =>
  schema
    .aggregate([
      {
        $lookup: {
          from: 'bookings',
          localField: 'id',
          foreignField: 'tableId',
          as: 'bookings',
          pipeline: [{ $match: { date } }],
        },
      },
    ])
    .exec();
const findOneAndUpdate = config => schema.findOneAndUpdate({ id: config.id }, config, { new: true }).lean();
const deleteOne = id => schema.deleteOne({ id });

module.exports = { getAll, create, findOneAndUpdate, deleteOne, read };
