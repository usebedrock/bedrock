const projectConfig = require('./config');

try {
  const projectConfig = require('../../bedrock.config');
  let prodConfigImport = require('../../bedrock.config.prod');
  prodConfig = {...projectConfig, ...prodConfigImport};
} catch (err) {
  console.log(err);
  console.log('No `bedrock.config.prod.js` file was found at the root of your project. Please add a production settings file.');
}

module.exports = prodConfig;