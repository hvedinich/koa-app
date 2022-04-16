/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const baseConfig = {};
const basePath = path.join(__dirname);
const baseName = path.basename(__filename);

// Require all the files from the folder and add the imported to a unique configuration object
fs.readdirSync(basePath)
  .filter(file => file !== baseName)
  .forEach(file => {
    const { schema, config } = require(path.join(basePath, file));

    // The configuration name is the first part of the file name
    const configName = file.split('.')[0];

    /**
     * Validate the env variables
     */
    const { error } = schema.validate(config);
    if (error) {
      throw new Error(`${configName} validation error: ${error.message}`);
    }

    baseConfig[configName] = config;
  });

module.exports = baseConfig;
