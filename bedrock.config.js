/**
 * Bedrock configuration
 * For docs, see https://bedrockapp.org/documentation/configuration/
*/

module.exports = {
  /**
   *  Styleguide generation: existence of this section
   *  determines whether the styleguide gets generated
  */
  purgeCSS: true,
  cssCompiler: 'postcss',
  styleguide: {
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
      'Components'
    ],
    /**
     * componentCategories
     * The prefix on folder names in /components determines the category
    */
    componentCategories: {
      aov: 'Overviews',
      c: 'Components',
      cc: 'Custom components category',
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
    svgIconClassPrefix: 'o-svg-icon',
    iconFontClassPrefix: 'if'
  }
};
