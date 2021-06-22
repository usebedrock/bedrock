const defaultConfig = {
  /**
   *  Don't index (hide prototypes from search engines)
   */
  noIndex: true,
  /**
   *  Page tree generation: existence of this section
   *  determines whether the page tree gets generated
   */
  pageTree: {
    layoutStyle: 'sidebar'
  },
  /**
   * CSS, JS and HTML build options
   * Adjust these values to set up your project for production or dev;
   * use `bedrock.config.prod.js` for production settings and `bedrock.config.js` for dev settings
   */
  css: {
    compiler: 'scss',
    minify: false,
    purge: false
  },
  js: {
    minify: false
  },
  html: {
    minify: false,
  },
  /**
   *  Styleguide generation: existence of this section
   *  determines whether the styleguide gets generated
   */
  styleguide: {
    /**
     *  search [boolean]
     *  Feature flag for search feature
    */
    search: true,
    colors: './content/scss/_colors.scss',
    /**
     *  categoryOrder
     *  Determines the order of documentation categories
     */
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components'
    ],
    /**
     * componentCategories
     * The prefix on folder names in /components determines the category
     */
    componentCategories: {
      aov: 'Overviews',
      c: 'Components',
    }
  },
  /**
   *  Icon
   *  Set up whether Bedrock should generate icon fonts
   *  Set up CSS classnames for SVG icons and icon font
   */
  icons: {
    generateIconFont: false,
    iconFontPath: "./content/scss/_icon-font.scss",
    svgIconClassPrefix: 'o-svg-icon',
    iconFontClassPrefix: 'if'
  },
  pug: {
    pretty: false,
    basedir: "./content"
  },
  beautifier: {
    indent_char: " ",
    indent_size: 4,
  },
  express: {
    port: 8000,
  },
};

module.exports = defaultConfig;