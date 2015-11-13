var path = require('path');
var glob = require('glob');
var paths = require('../paths');

var ICONS_DIRECTORY = paths.content.icons.sourceDirectory;

function discover() {
  return glob.sync(path.join(ICONS_DIRECTORY, '*.svg'))
    .filter(file => file.indexOf('.svg') !== -1)
    .map(filename => {
      var iconName = filename.replace(ICONS_DIRECTORY + '/', '').replace('.svg', '');

      return {
        jadeClasses: '.glyphicon.glyphicon-' + iconName,
        htmlClasses: 'glyphicon glyphicon-' + iconName
      };
    });
}

module.exports = {
  discover: discover
};
