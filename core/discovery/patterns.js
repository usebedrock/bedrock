var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var config = require('../config');
var paths = require('../paths');

var TEMPLATES_BASE_DIRECTORY = paths.content.templates.patterns;

function discover() {
  var files = glob.sync(path.join(TEMPLATES_BASE_DIRECTORY, '**/*.jade'));
  var filemap = {
    base: [],
    categories: []
  };

  files.forEach(function (file) {
    var filename = file.replace(TEMPLATES_BASE_DIRECTORY, '').replace('.jade', '');
    var parts = filename.split('/');
    var categoryName, patternName;

    if (parts.length === 1) {
      patternName = parts[0];
      filemap.base.push({
        filename,
        name: patternName,
        url: '/styleguide.html#' + patternName
      });
    }
    else {
      categoryName = parts[0];
      patternName = parts[1];
      var category = _.find(filemap.categories, {'name': categoryName});

      if (!category) {
        category = {
          name: categoryName,
          patterns: []
        };

        filemap.categories.push(category);
      }

      var patternData = {
        filename,
        name: patternName,
        url: '/styleguide.html#' + patternName,
        extraClasses: []
      };

      if (config.patternClasses) {
        var patternCategoryClass = config.patternClasses[categoryName];
        var patternSpecificClass = config.patternClasses[categoryName + '.' + patternName];

        if (patternCategoryClass) {
          patternData.extraClasses.push(patternCategoryClass);
        }

        if (patternSpecificClass) {
          patternData.extraClasses.push(patternSpecificClass);
        }

        patternData.extraClasses = patternData.extraClasses.join(' ');
      }

      category.patterns.push(patternData);
    }
  });

  return filemap;
}

module.exports = {
  discover: discover
};
