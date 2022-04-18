const db = require('../../db');

const schema = db.Schema({
  id: {
    type: String,
    required: '{id} is required!',
    unique: true,
  },
  openFrom: {
    type: Number,
  },
  openTo: {
    type: Number,
  },
});

module.exports = db.model('Configuration', schema);
