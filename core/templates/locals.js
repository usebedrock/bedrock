const path = require('path');
const fs = require('fs');
const pug = require('pug');
const moment = require('moment');
const marked = require('marked');
const htmlToJSX = require('html-to-jsx');

/**
 * Indents the given string
 * @param {string} str  The string to be indented.
 * @param {number} numOfIndents  The amount of indentations to place at the
 *     beginning of each line of the string.
 * @param {number=} opt_spacesPerIndent  Optional.  If specified, this should be
 *     the number of spaces to be used for each tab that would ordinarily be
 *     used to indent the text.  These amount of spaces will also be used to
 *     replace any tab characters that already exist within the string.
 * @return {string}  The new string with each line beginning with the desired
 *     amount of indentation.
 */
function indent(str, numOfIndents, opt_spacesPerIndent) {
  str = str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join('\t'));
  numOfIndents = new Array(opt_spacesPerIndent + 1 || 0).join(' '); // re-use
  return opt_spacesPerIndent
    ? str.replace(/^\t+/g, function(tabs) {
        return tabs.replace(/./g, numOfIndents);
    })
    : str;
}


let config;
if (process.env.NODE_ENV == "production") {
  config = require('../discovery/prod-config');
} else {
  config = require('../discovery/config');
}

const paths = require('../paths');
const beautifyHTML = require('js-beautify').html;
const beautifyJS = require('js-beautify').js;

const beautifyJSConfig = {
  indentSize: 2,
}

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
      var b = beautifyHTML(a, config.prettify);
      return b;

    } else if (language == "jsx") {

      // I know we are repeating l57 to l 69 but I don't want to change this into a function for now until the feature is validated

      const indentedPugMarkup = pugMarkup.split('\n').map(line => `    ${line}`).join('\n');
      const markupWithLayout = `extends /../core/templates/layouts/sample\n\nblock content\n${indentedPugMarkup}`;

      // First compile Pug
      var compiledPug = pug.compile(markupWithLayout, {
        pretty: true,
        basedir: 'content',
        filename: componentFileLocation
      })(locals);

      const reactFunctionBegin = `export default function Example() {
  return (`

      const reactFunctionEnd = `
  )
}`

      let reactCodeExample = reactFunctionBegin + indent(htmlToJSX(compiledPug), 1, 2) + reactFunctionEnd;
      return reactCodeExample;

      
    }
  };

  return locals;
}

module.exports = {
  getDefaultLocals
};
