'use strict';

const path = require('path');
const glob = require('glob');
const gutil = require('gulp-util');
const _camelCase = require('lodash/string/camelCase');

const DATA_DIRECTORY = 'content/data/';

function clearContentDataCache() {
  for (const key in require.cache) {
    if (key.indexOf(DATA_DIRECTORY) > -1) {
      delete require.cache[key];
    }
  }
}

function discover() {
  const dataFilePaths = glob.sync(path.join(DATA_DIRECTORY, '*')).filter(p => path.parse(p).ext);
  let data = {};

  clearContentDataCache();

  for (const filepath of dataFilePaths) {
    const fileName = path.parse(filepath).name;
    const camelCasedName = _camelCase(fileName);

    try {
      data[camelCasedName] = require(path.join(process.cwd(), filepath));
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
