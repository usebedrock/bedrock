const DEFAULT_CONFIG = {
  styleguide: {
    search: true,
    colors: './content/scss/_colors.scss',
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components'
    ],
    componentCategories: {
      aov: 'Overviews',
      c: 'Components',
    }
  },
  icons: {
    generateIconFont: false,
    iconFontPath: "./content/scss/_icon-font.scss",
    svgIconClassPrefix: 'o-svg-icon',
    iconFontClassPrefix: 'if'
  },
  pug: {
    pretty: true,
    basedir: "./content"
  },
  prettify: {
    indentWithTabs: true,
    preserveNewlines: true,
    inline: '',
    logSuccess: false,
    indentSize: 2,
    unformatted: ['pre', 'textarea'],
    extraLiners: ['body']
  },
  css: {
    purge: false,
    compiler: 'scss'
  },
  express: {
    port: 8000,
  },
};
const config = Object.assign({}, DEFAULT_CONFIG);

try {
  const projectConfig = require('../../bedrock.config');
  Object.assign(config, projectConfig);
} catch (err) {
  console.log('No `bedrock.config.js` file was found at the root of your project. Using default configuration.');
}

module.exports = config;
