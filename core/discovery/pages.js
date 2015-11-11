var path = require('path');
var glob = require('glob');
var _ = require('lodash');

var TEMPLATES_BASE_DIRECTORY = 'src/templates/';
var TEMPLATES_MODULE_DIRECTORY = TEMPLATES_BASE_DIRECTORY + 'modules/';

function discover() {
  var basePageTemplates = glob.sync(path.join(TEMPLATES_BASE_DIRECTORY, '*.jade'));
  var moduleTemplates = glob.sync(path.join(TEMPLATES_MODULE_DIRECTORY, '*/*.jade'));

  var basePages = basePageTemplates.map(filename => {
    filename = filename.replace(TEMPLATES_BASE_DIRECTORY, '');
    var filenameWords = filename
      .replace('.jade', '')
      .split('-');

    return {
      name: filenameWords[0].charAt(0).toUpperCase() + filenameWords[0].slice(1),
      state: filenameWords.splice(1, filenameWords.length - 1).join(' '),
      url: '/' + filename.replace('.jade', '.html')
    };
  });

  var modules = _.chain(moduleTemplates)
    .map((path) => {
      var splitPath = path.replace(TEMPLATES_MODULE_DIRECTORY, '').split('/');
      var moduleName = splitPath[0];
      var templateFilename = splitPath[1];

      return {
        moduleName,
        name: templateFilename.replace('.jade', ''),
        url: '/modules/' + moduleName + '/' + templateFilename.replace('.jade', '.html')
      };
    })
    .groupBy('moduleName')
    .value();

  return {
    base: basePages,
    modules: modules
  };
}

module.exports = {
  discover: discover
};
