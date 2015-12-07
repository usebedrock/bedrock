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
'use strict';

const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const config = require('../config');
const paths = require('../paths');

const TEMPLATES_BASE_DIRECTORY = paths.content.templates.patterns;
const PATTERN_CATEGORIES = {
  b: 'Bootstrap additions',
  bc: 'Bootstrap custom components',
  br: 'Bedrock components',
  c: 'Custom components'
};

function discover() {
  var files = glob.sync(path.join(TEMPLATES_BASE_DIRECTORY, '**/*.jade'));
  var patternGroups = {};

  files.forEach(function (file) {
    var filename = file.replace(TEMPLATES_BASE_DIRECTORY, '').replace('.jade', '');
    var parts = filename.split('/');
    var groupId = parts[0];
    var patternName = parts[1];

    var category = patternGroups[groupId];

    if (!category) {
      patternGroups[groupId] = {
        category: {
          id: groupId.split('-')[0],
          humanized: PATTERN_CATEGORIES[groupId.split('-')[0]]
        },
        group: {
          id: groupId
        },
        patterns: []
      };
    }

    var patternData = {
      filename,
      name: patternName,
      //url: '/styleguide#' + patternName,
      extraClasses: []
    };

    if (config.patternClasses) {
      var patternCategoryClass = config.patternClasses[groupId];
      var patternSpecificClass = config.patternClasses[groupId + '.' + patternName];

      if (patternCategoryClass) {
        patternData.extraClasses.push(patternCategoryClass);
      }

      if (patternSpecificClass) {
        patternData.extraClasses.push(patternSpecificClass);
      }

      patternData.extraClasses = patternData.extraClasses.join(' ');
    }

    patternGroups[groupId].patterns.push(patternData);
  });

  return {
    byGroup: patternGroups,
    byCategory: _.groupBy(patternGroups, (pattern) => pattern.category.humanized || 'No category')
  };
}

module.exports = {
  discover: discover
};
    var categoryName, patternName;

    if (parts.length === 1) {
      patternName = parts[0];
      filemap.base.push({
        filename,
        name: patternName,
        url: '/styleguide#' + patternName
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
        url: '/styleguide#' + patternName,
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
