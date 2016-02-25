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

const options = {
  jade: {
    pretty: true
  },
  prettify: {
    logSuccess: false,
    indentSize: 2,
    unformatted: ['pre', 'textarea'],
    extraLiners: ['body']
  }
};

function getDefaultLocals() {
  delete require.cache[require.resolve('../discovery/pages')];
  delete require.cache[require.resolve('../discovery/colors')];
  delete require.cache[require.resolve('../discovery/icons')];
  delete require.cache[require.resolve('../discovery/patterns')];
  delete require.cache[require.resolve('../discovery/content-data')];

  const pages = require('../discovery/pages');
  const colors = require('../discovery/colors');
  const icons = require('../discovery/icons');
  const patterns = require('../discovery/patterns');
  const contentData = require('../discovery/content-data');

  return {
    contentData: contentData.discover(),
    patterns: patterns.discover(),
    pages: pages.discover(),
    icons: icons.discover(),
    config,
    colorCategories: colors.discover(),
    slugify(input) {
      return input.replace(/\//g, '-');
    },
    render(id, language) {
      var patternFileLocation = path.join(paths.content.templates.patterns, id + '.jade');
      var jadeMarkup = fs.readFileSync(patternFileLocation, 'utf8');

      if (!language || language === 'jade') {
        return jadeMarkup;
      } else if (language === 'html') {
        return jade.compile(jadeMarkup, {
          pretty: true,
          basedir: 'content',
          filename: patternFileLocation
        })({icons: icons.discover(), config});
      }
    }
  };
}

function compileJade(jadeContent) {
  const compiler = jade.compile(jadeContent, options.jade);
  const locals = getDefaultLocals();
  return compiler(locals);
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
