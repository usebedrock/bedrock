const browserSync = require('browser-sync');
const path = require('path');
const paths = require('../paths');
const config = require('../config');

module.exports = function () {
  return browserSync.init({
    files: [
      path.join(paths.dist.path, '**/*'),
      paths.content.templates.all,
      './core/templates/**/*.jade',
      paths.content.scss.colorsDefinition,
      paths.content.templates.data
    ],
    ui: false,
    ghostMode: false,
    notify: false,
    proxy: `localhost:${global.expressPort}`
  });
};
