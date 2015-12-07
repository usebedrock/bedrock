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
