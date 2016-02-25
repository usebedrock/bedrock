'use strict';

const frontMatter = require('front-matter');
const marked = require('marked');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const paths = require('../paths');
const jade = require('jade');
const beautify = require('js-beautify').html;
const config = require('../config');
const locals = require('../templates/locals');

function compileJade(jadeContent) {
  const compiler = jade.compile(jadeContent, config.jade);
  return compiler(locals.getDefaultLocals());
}

module.exports = {
  discover: function () {
    const docFiles = glob.sync(paths.content.docs)
      .map(function (docPath) {
        const fileContent = fs.readFileSync(docPath, 'utf8');
        const parsedFile = frontMatter(fileContent);
        const filename = path.parse(docPath).name;
        const extension = path.parse(docPath).ext;
        parsedFile.attributes.filename = filename;

        if (extension === '.md') {
          parsedFile.body = marked(parsedFile.body);
        } else if (extension === '.jade') {
          parsedFile.body = compileJade(parsedFile.body);
        }

        if (!parsedFile.attributes.title) {
          parsedFile.attributes.title = filename.replace(/-/g, ' ');
        }

        return parsedFile;
      });

    return _.sortBy(docFiles, (d) => d.attributes.order);
  }
};
