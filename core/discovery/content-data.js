'use strict';

const path = require('path');
const glob = require('glob');
const gutil = require('gulp-util');

const DATA_DIRECTORY = 'content/data/';

function clearContentDataCache() {
  for (const key in require.cache) {
    if (key.indexOf(DATA_DIRECTORY) > -1) {
      delete require.cache[key];
    }
  }
}

function discover() {
  const dataFilePaths = glob.sync(path.join(DATA_DIRECTORY, '*.js'));
  let data = {};

  clearContentDataCache();

  for (const filepath of dataFilePaths) {
    const fileName = filepath.replace(DATA_DIRECTORY, '').replace('.js', '');

    try {
      data[fileName] = require(path.join(process.cwd(), filepath));
    } catch (err) {
      const displayErr = gutil.colors.red(`${err.message} in file: ${filepath}`);
      gutil.log(displayErr);
      gutil.beep();
      break;
    }
  }

  return data;
}

module.exports = {
  discover: discover
};
