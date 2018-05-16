module.exports = {
  styleguide: {
    snippetLanguage: 'html',
    colors: './content/scss/_settings.colors.scss',
    categoryOrder: [
      'Style guide',
      'Patterns',
      'Overviews',
      'Components',
    ],
    componentCategories: {
      b: 'Bootstrap additions',
      f: 'Foundation additions',
      bc: 'Bootstrap custom components',
      fc: 'Foundation custom components',
      br: 'Bedrock components',
      c: 'Custom components'
    }
  },
  languages: [{
    id: "langEn",
    label: "English",
    default: true
  },{
    id: "langFr",
    label: "Français"
  }],
  ui: {
    dark: false
  },
  icons: {
    generateIconFont: false,
    hasSvgIcons: true
  },
  pug: {
    pretty: true,
    basedir: "./content"
  },
  prettify: {
    logSuccess: false,
    indentSize: 2,
    unformatted: ['pre', 'textarea'],
    extraLiners: ['body']
  },
};
