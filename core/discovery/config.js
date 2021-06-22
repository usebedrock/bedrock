const defaultConfig = require('./default-config');

try {
  const projectConfig = require('../../bedrock.config');
  config = {...defaultConfig, ...projectConfig};
  //console.log(config);
} catch (err) {
  console.log(err);
  console.log('No `bedrock.config.js` file was found at the root of your project. Using default configuration. Please add your own settings file.');
}

module.exports = config;