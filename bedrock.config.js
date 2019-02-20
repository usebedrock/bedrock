/**
 * Bedrock configuration
 * For docs, see https://bedrockapp.org/documentation/configuration/
*/

module.exports = {
  /**
   *  Styleguide generation: existence of this section
   *  determines whether the styleguide gets generated
  */
  styleguide: {
    colors: './content/scss/_colors.scss',
    /**
     *  search [boolean]
     *  Feature flag for search feature
    */
    search: true,

   /**
    *  categoryOrder
    *  Determines the order of documentation categories
   */
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components',
      'Material design components',
      'Unofficial components'
    ],
   /**
    * componentCategories
    * The prefix on folder names in /components determines the category
   */
    componentCategories: {
      aov: 'Overviews',
      mdc: 'Material design components',
      uc: 'Unofficial components',
    }
  },
  /**
   *  Icons
   *  Set up whether Bedrock should generate icon fonts
   *  Set up CSS classnames for SVG icons and icon font
  */
  icons: {
    generateIconFont: false,
    iconFontPath: "./content/scss/_icon-font.scss",
    hasSvgIcons: true,
    svgIconClassPrefix: 'svg-icon',
    iconFontClassPrefix: 'if'
  },
  /**
   *  Pug config
   *  Unlikely that you need to change this
  */
  pug: {
    pretty: true,
    basedir: "./content"
  },
  /**
   *  Prettify config
   *  Unlikely that you need to change this
  */
  prettify: {
    logSuccess: false,
    indentSize: 2,
    unformatted: ['pre', 'textarea'],
    extraLiners: ['body']
  },
};
