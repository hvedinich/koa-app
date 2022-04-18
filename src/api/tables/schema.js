const db = require('../../db');

const schema = db.Schema({
  id: {
    type: String,
    required: '{id} is required!',
    unique: true,
  },
  tableNumber: {
    type: Number,
    unique: true,
  },
});

module.exports = db.model('Table', schema);
