var browserSync = require('browser-sync');

var DEFAULT_PORT = 3000;

module.exports = function () {
  return browserSync.init({
    files: [
      './dist/css/*.css',
      './dist/js/bundle.js'
    ],
    ghostMode: false,
    notify: false,
    port: process.env.C9_PORT || DEFAULT_PORT,
    server: {
      baseDir: ['./dist']
    }
  });
};
