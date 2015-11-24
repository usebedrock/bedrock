var path = require('path');
var glob = require('glob');
var gutil = require('gulp-util');

var DATA_DIRECTORY = 'content/data/';

function clearContentDataCache() {
  for (var key in require.cache) {
    if (key.indexOf(DATA_DIRECTORY) > -1) {
      delete require.cache[key];
    }
  }
}

function discover() {
  var dataFilePaths = glob.sync(path.join(DATA_DIRECTORY, '*.js'));
  var data = {};

  clearContentDataCache();

  for (var filepath of dataFilePaths) {
    var fileName = filepath.replace(DATA_DIRECTORY, '').replace('.js', '');
    try {
      data[fileName] = require(path.join(process.cwd(), filepath));
    } catch (err) {
      var displayErr = gutil.colors.red(`${err.message} in file: ${filepath}`);
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
