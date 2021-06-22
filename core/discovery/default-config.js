const defaultConfig = {
  pageTree: {
    layoutStyle: 'sidebar'
  },
  js: {
    minify: false
  },
  css: {
    compiler: 'scss',
    minify: false,
    purge: false
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

module.exports = defaultConfig;