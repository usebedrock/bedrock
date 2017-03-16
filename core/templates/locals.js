const path = require('path');
const fs = require('fs');
const jade = require('jade');
const config = require('../../bedrock.config');
const paths = require('../paths');

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
    colorCategories: colors.discover()
  };

  locals.renderSvgIcon = function (name) {
    const svgFileLocation = path.join(paths.content.icons.sourceDirectory, name + '.svg');
    return fs.readFileSync(svgFileLocation, 'utf8');
  };

  locals.render = function (id, language) {
    const componentFileLocation = path.join(paths.content.templates.components, id + '.jade');
    const jadeMarkup = fs.readFileSync(componentFileLocation, 'utf8');

    if (!language || language === 'jade') {
      return jadeMarkup;
    } else if (language === 'html') {
      const indentedJadeMarkup = jadeMarkup.split('\n').map(line => `    ${line}`).join('\n');
      const markupWithLayout = `extends /../core/templates/layouts/sample\n\nblock content\n${indentedJadeMarkup}`;

      return jade.compile(markupWithLayout, {
        pretty: true,
        basedir: 'content',
        filename: componentFileLocation
      })(locals);
    }
  };

  return locals;
}

module.exports = {
  getDefaultLocals
};
