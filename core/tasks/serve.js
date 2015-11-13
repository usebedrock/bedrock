var browserSync = require('browser-sync');
var path = require('path');
var paths = require('../paths');

var DEFAULT_PORT = 3000;

module.exports = function () {
  return browserSync.init({
    files: [
      path.join(paths.dist.css, '*.css'),
      path.join(paths.dist.js, 'bundle.js'),
    ],
    ghostMode: false,
    notify: false,
    port: process.env.C9_PORT || DEFAULT_PORT,
    server: {
      baseDir: paths.dist.path
    }
  });
};
