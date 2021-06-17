const gulp = require('gulp');
const browserSync = require('browser-sync');
const paths = require('../paths');

module.exports = function () {
  global.isWatching = true;

  gulp.watch([paths.content.scss.all, paths.core.scss.all], gulp.series('sass'));
  gulp.watch([paths.content.postcss.all], gulp.series('postcss'));
  gulp.watch(paths.content.assets.images, gulp.series('copy:images'));
  gulp.watch(paths.content.assets.favicon, gulp.series('copy:favicon'));
  gulp.watch(paths.content.assets.fonts, gulp.series('copy:fonts'));
  gulp.watch(paths.content.assets.resources, gulp.series('copy:resources'));
  gulp.watch(paths.content.iconFont.sourceFiles, gulp.series('icon-font'));
  gulp.watch(paths.content.icons.sourceFiles, browserSync.reload());
  gulp.watch(paths.content.js.allFiles, gulp.series('bundle:clientBundle'));
  gulp.watch(paths.content.js.separated, gulp.series('copy:scripts'));
  gulp.watch(paths.core.js.allFiles, gulp.series('bundle:prototypeBundle'));

};