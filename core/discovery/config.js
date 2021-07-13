const defaultConfig = require('./default-config');

let config = {...defaultConfig};

try {
  const projectConfig = require('../../bedrock.config');
  config = {...config, ...projectConfig};
} catch (err) {
  console.log(err);
  console.log('No `bedrock.config.js` file was found at the root of your project. Using default configuration. Please add your own settings file.');
}


if (process.env.NODE_ENV == "production") {
  try {
    const projectConfig = require('../../bedrock.config.prod');
    config = {...config, ...projectConfig};
  } catch (err) {
    console.log(err);
    console.log('No `bedrock.config.prod.js` file was found at the root of your project. Please add a production settings file.');
  }
}

module.exports = config;
