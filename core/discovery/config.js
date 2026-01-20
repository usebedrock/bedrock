const path = require('path');

const defaultConfig = require('./default-config');

let config = {...defaultConfig};


// The `require()` logic must be a bit different depending on if we are running
// our code in Node, or in the browser. See below.
let inNodeJS = typeof window === 'undefined';

try {
  // If we're running the code in Node, we can lookup the Bedrock configuration
  // file from the current working directory (where `bedrock build` is run).
  // If we're running the code in the browser, this is done from the
  // bundle-prototype.js file, which is the result of Browserify. To do its
  // magic, Browserify statically follows `require()` calls, but it is confused
  // by the dynamic cwd-based path. Instead, we expose the configuration file
  // through a specific name 'bedrock-config` (and not something like
  // './bedrock-config' or '../../bedrock-config'). See core/tasks/bundle.js.
  const projectConfigPath = path.join(process.cwd(), 'bedrock.config');
  const projectConfig = inNodeJS ? require(projectConfigPath) : require('bedrock.config');
  config = {...config, ...projectConfig};
} catch (err) {
  console.log(err);
  console.log('No `bedrock.config.js` file was found at the root of your project. Using default configuration. Please add your own settings file.');
}


if (process.env.NODE_ENV == "production") {
  try {
    const projectConfigPath = path.join(process.cwd(), 'bedrock.config.prod');
    const projectConfig = require(projectConfigPath);
    config = {...config, ...projectConfig};
  } catch (err) {
    console.log(err);
    console.log('No `bedrock.config.prod.js` file was found at the root of your project. Please add a production settings file.');
  }
}

module.exports = config;
