var path = require('path');

var contentPath = 'content/';
var corePath = 'core/';
var distPath = 'dist/';

module.exports = {
  content: {
    path: contentPath,
    assets: {
      images: path.join(contentPath, 'images/**/*'),
      fonts: path.join(contentPath, 'fonts/**/*'),
      resources: path.join(contentPath, 'resources/**/*')
    },
    scss: {
      all: path.join(contentPath, 'scss/**/*.scss'),
      main: path.join(contentPath, 'scss/main.scss'),
      base: path.join(contentPath, 'scss/base/'),
      custom: path.join(contentPath, 'scss/custom/'),
      colorsDefinition: path.join(contentPath, 'scss/custom/_c-colors.scss')
    },
    templates: {
      path: path.join(contentPath, 'templates/'),
      modulesPath: path.join(contentPath, 'templates/modules/'),
      all: path.join(contentPath, 'templates/**/*.jade'),
      baseTemplates: path.join(contentPath, 'templates/*.jade'),
      moduleTemplates: path.join(contentPath, 'templates/modules/**/*.jade'),
      patterns: path.join(contentPath, 'templates/patterns/'),
      data: path.join(contentPath, 'data/*')
    },
    js: {
      entryFile: path.join(contentPath, 'js/index.js')
    },
    icons: {
      sourceDirectory: path.join(contentPath, 'icon-font-source')
    }
  },
  core: {
    path: corePath,
    scss: {
      all: path.join(corePath, 'scss/**/*.scss'),
      prototype: path.join(corePath, 'scss/prototype.scss')
    }
  },
  dist: {
    path: distPath,
    fonts: path.join(distPath, 'fonts/'),
    modules: path.join(distPath, 'modules/'),
    js: path.join(distPath, 'js/'),
    css: path.join(distPath, 'css/'),
    assets: {
      images: path.join(distPath, 'images/'),
      fonts: path.join(distPath, 'fonts/'),
      resources: path.join(distPath, 'resources/')
    }
  }
};
