var gulp = require('gulp');
var watch = require('gulp-watch');
var path = require('path');
var paths = require('../paths');

module.exports = function () {
  watch([
    paths.content.scss.all,
    paths.core.scss.all
  ], function () {
    gulp.start('sass');
  });

  watch(paths.content.assets.images, function () {
    gulp.start('copy:images');
  });

  watch(paths.content.assets.fonts, function () {
    gulp.start('copy:fonts');
  });

  watch(paths.content.assets.resources, function () {
    gulp.start('copy:resources');
  });

  watch(path.join(paths.content.icons.sourceDirectory, '*.svg'), function () {
    gulp.start('icon-font');
  });

  watch([
    paths.content.scss.colorsDefinition,
    paths.content.templates.all,
    paths.content.templates.data
  ], function () {
    gulp.start('jade-reload');
  });
};
