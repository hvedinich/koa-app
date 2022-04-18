const db = require('../../db');

const schema = db.Schema(
  {
    id: {
      type: String,
      required: '{id} is required!',
      unique: true,
    },
    tableId: {
      type: String,
    },
    timeSlot: {
      type: Number,
    },
    guestsCount: {
      type: Number,
    },
    date: {
      type: Number,
    },
  },
  { timestamps: false },
);

module.exports = db.model('Booking', schema);
