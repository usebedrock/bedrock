const path = require('path');
const fs = require('fs');
const jade = require('jade');
const config = require('../../bedrock.config');
const paths = require('../paths');

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

  const locals = {
    basedir: './content/',
    contentData: contentData.discover(),
    patterns: patterns.discover(),
    pages: pages.discover(),
    icons: icons.discover(),
    config,
    colorCategories: colors.discover()
  };

  locals.renderSvgIcon = function (name) {
    const svgFileLocation = path.join(paths.content.icons.sourceDirectory, name + '.svg');
    return fs.readFileSync(svgFileLocation, 'utf8');
  };

  locals.render = function (id, language) {
    const patternFileLocation = path.join(paths.content.templates.patterns, id + '.jade');
    const jadeMarkup = fs.readFileSync(patternFileLocation, 'utf8');

    if (!language || language === 'jade') {
      return jadeMarkup;
    } else if (language === 'html') {
      return jade.compile(jadeMarkup, {
        pretty: true,
        basedir: 'content',
        filename: patternFileLocation
      })(locals);
    }
  };

  return locals;
}

module.exports = {
  getDefaultLocals
};
