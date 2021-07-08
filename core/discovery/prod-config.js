const projectConfig = require('./config');

try {
  const defaultConfig = require('./default-config.js');
  const projectConfig = require('../../bedrock.config');
  let prodConfigImport = require('../../bedrock.config.prod');
  prodConfig = {...defaultConfig, ...projectConfig, ...prodConfigImport};
  console.log(prodConfig);
} catch (err) {
  console.log(err);
  console.log('No `bedrock.config.prod.js` file was found at the root of your project. Please add a production settings file.');
}

module.exports = prodConfig;