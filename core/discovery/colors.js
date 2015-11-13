var fs = require('fs');
var _ = require('lodash');
var paths = require('../paths');

function discover() {
  var CATEGORY_REGEX = /\/\*\s(.*)/g;

  var scss = fs.readFileSync(paths.content.scss.colorsDefinition, 'utf-8');
  var colorCategories = [];
  var currentCategory;

  for (var i = 0; i < scss.split('\n').length; i++) {
    var scssLine = scss.split('\n')[i];
    var categoryData = CATEGORY_REGEX.exec(scssLine);
    var colorLine = scssLine.split(':');
    var colorData = null;

    if (colorLine.length === 2) {
      colorData = {
        name: colorLine[0].trim(),
        value: colorLine[1].trim().replace(';', '')
      };
    }

    if (categoryData && categoryData[1].indexOf('===') === -1) {
      currentCategory = categoryData[1];
    }

    if (currentCategory) {
      var category = _.find(colorCategories, {name: currentCategory});

      if (!category) {
        category = {
          name: currentCategory,
          colors: []
        };

        colorCategories.push(category);
      }

      if (colorData) {
        category.colors.push(colorData);
      }
    }
  }

  return colorCategories;
}

module.exports = {
  discover: discover
};
