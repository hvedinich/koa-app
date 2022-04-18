const mongoose = require('mongoose');
const {
  server: { name },
  db: { url },
} = require('../config');

const init = () => {
  const db = mongoose.connection;
  const retry = 0;
  const opt = {
    useNewUrlParser: true,
    dbName: name,
  };

  mongoose.connect(url, opt);

  db.on('disconnected', () => {
    if (retry < 10) {
      mongoose.connect(url, opt);
    }
    console.log('Can not connect to mongo');
  });

  db.on('error', () => {
    console.log('connection error:');
    mongoose.disconnect();
  });
  db.once('open', () => {
    console.log(`Mongo conected to ${url}`);
  });

  return mongoose;
};

module.exports = { init };
