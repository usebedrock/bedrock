'use strict';

const frontMatter = require('front-matter');
const marked = require('marked');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const paths = require('../paths');

module.exports = {
  discover: function () {
    const docFiles = glob.sync(paths.content.docs);

    return docFiles.map(function (docPath) {
      const fileContent = fs.readFileSync(docPath, 'utf8');
      const parsedFile = frontMatter(fileContent);
      const filename = path.parse(docPath).name;
      parsedFile.body = marked(parsedFile.body);
      parsedFile.attributes.filename = filename;

      if (!parsedFile.attributes.title) {
        parsedFile.attributes.title = filename.replace(/-/g, ' ');
      }

      return parsedFile;
    });
  }
};
