/**
 * Bedrock configuration
 * If no file exists, uses the default config object in `core/discovery/config.js`
 * For docs, see https://bedrockapp.org/documentation/configuration/
*/

module.exports = {
  js: {
    minify: false
  },
  css: {
    purge: false,
    compiler: 'scss'
  },
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
  express: {
    port: 8000,
  },
};
