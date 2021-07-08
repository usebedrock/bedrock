const path = require('path');
const fs = require('fs');
const pug = require('pug');
const moment = require('moment');
const marked = require('marked');

let config;
if (process.env.NODE_ENV == "production") {
  config = require('../discovery/prod-config');
} else {
  config = require('../discovery/config');
}

const paths = require('../paths');
const beautify = require('js-beautify').html;

function getDefaultLocals() {
  delete require.cache[require.resolve('../discovery/pages')];
  delete require.cache[require.resolve('../discovery/colors')];
  delete require.cache[require.resolve('../discovery/icons')];
  delete require.cache[require.resolve('../discovery/components')];
  delete require.cache[require.resolve('../discovery/content-data')];

  const pages = require('../discovery/pages');
  const colors = require('../discovery/colors');
  const icons = require('../discovery/icons');
  const components = require('../discovery/components');
  const contentData = require('../discovery/content-data');

  const locals = {
    basedir: './content/',
    contentData: contentData.discover(),
    components: components.discover(),
    pages: pages.discover(),
    icons: icons.discover(),
    config,
    colorCategories: colors.discover(),
    moment: moment,
    marked: marked
  };

  locals.renderSvgIcon = function (name) {
    const svgFileLocation = path.join(paths.content.icons.sourceDirectory, name + '.svg');
    return fs.readFileSync(svgFileLocation, 'utf8');
  };

  locals.renderCode = function (id, language) {
    const componentFileLocation = path.join(paths.content.templates.components, id + '.pug');
    const pugMarkup = fs.readFileSync(componentFileLocation, 'utf8');

    if (!language || language === 'pug') {
      return pugMarkup;
    } else if (language === 'html') {

      const indentedPugMarkup = pugMarkup.split('\n').map(line => `    ${line}`).join('\n');
      const markupWithLayout = `extends /../core/templates/layouts/sample\n\nblock content\n${indentedPugMarkup}`;

      // First compile Pug
      var a = pug.compile(markupWithLayout, {
        pretty: true,
        basedir: 'content',
        filename: componentFileLocation
      })(locals);

      // Then beautify with JS beautify settings
      var b = beautify(a, config.prettify);
      return b;

    }
  };

  return locals;
}

module.exports = {
  getDefaultLocals
};
