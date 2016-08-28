'use strict';

const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const frontMatter = require('front-matter');
const marked = require('marked');
const config = require('../../bedrock.config');
const paths = require('../paths');

const TEMPLATES_BASE_DIRECTORY = paths.content.templates.patterns;
const PATTERN_CATEGORIES = {
  b: 'Bootstrap additions',
  bc: 'Bootstrap custom components',
  br: 'Bedrock components',
  c: 'Custom components'
};

function discover() {
  const files = glob.sync(path.join(TEMPLATES_BASE_DIRECTORY, '**/*.jade'));
  let patternGroups = {};

  for (const file of files) {
    const filename = file.replace(TEMPLATES_BASE_DIRECTORY, '').replace('.jade', '');
    const parts = filename.split('/');
    const groupId = parts[0];
    const patternName = parts[1];
    const category = patternGroups[groupId];

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

      try {
        const docsPath = path.join(TEMPLATES_BASE_DIRECTORY, groupId, '_docs.md');
        const docsContent = fs.readFileSync(docsPath, 'utf8');
        const parsedDocs = frontMatter(docsContent);

        parsedDocs.body = marked(parsedDocs.body);
        patternGroups[groupId].docs = parsedDocs;
      } catch (err) {

      }
    }

    const patternData = {
      filename,
      name: patternName,
    };


    try {
      const patternDocsPath = path.join(TEMPLATES_BASE_DIRECTORY, groupId, patternName + '.md');
      const patternDocsContent = fs.readFileSync(patternDocsPath, 'utf8');
      const parsedDocs = frontMatter(patternDocsContent);

      parsedDocs.body = marked(parsedDocs.body);
      patternData.docs = parsedDocs;
    } catch (err) {

    }

    patternGroups[groupId].patterns.push(patternData);
  }

  return {
    byGroup: patternGroups,
    byCategory: _.groupBy(patternGroups, (pattern) => pattern.category.humanized || 'No category')
  };
}

module.exports = {
  discover: discover
};
