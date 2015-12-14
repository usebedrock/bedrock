var browserSync = require('browser-sync');
var path = require('path');
var paths = require('../paths');
var config = require('../config');

module.exports = function () {
  return browserSync.init({
    files: [
      path.join(paths.dist.css, '*.css'),
      path.join(paths.dist.js, 'bundle.js'),
      paths.content.templates.all,
      './core/templates/**/*.jade',
      paths.content.scss.colorsDefinition,
      paths.content.templates.data
    ],
    ui: false,
    ghostMode: false,
    notify: false,
    proxy: `localhost:${config.ports.express}`
  });
};
