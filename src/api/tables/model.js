const schema = require('./schema');

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

module.exports = { getAll, create };
