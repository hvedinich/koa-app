require('dotenv').config();
const serverConfig = require('./server.config');
const dbConfig = require('./db.config');

const config = { ...serverConfig, ...dbConfig };

module.exports = config;
