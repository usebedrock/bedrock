const gulp = require('gulp');
const watch = require('gulp-watch');
const path = require('path');
const browserSync = require('browser-sync');
const paths = require('../paths');

module.exports = function () {
  global.isWatching = true;

  watch([paths.content.scss.all, paths.core.scss.all], () => gulp.start('sass'));
  watch(paths.content.assets.images, () => gulp.start('copy:images'));
  watch(paths.content.assets.favicon, () => gulp.start('copy:favicon'));
  watch(paths.content.assets.fonts, () => gulp.start('copy:fonts'));
  watch(paths.content.assets.resources, () => gulp.start('copy:resources'));
  watch(paths.content.iconFont.sourceFiles, () => gulp.start('icon-font'));
  watch(paths.content.icons.sourceFiles, () => browserSync.reload());
};
