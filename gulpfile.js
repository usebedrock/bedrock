var gulp = require('gulp');

var browserSync = require('./core/tasks/browser-sync');
var sass = require('./core/tasks/sass');
var bundle = require('./core/tasks/bundle');
var iconFont = require('./core/tasks/icon-font');
var templates = require('./core/tasks/templates');
var copy = require('./core/tasks/copy');
var watch = require('./core/tasks/watch');
var server = require('./core/tasks/server');

var paths = require('./core/paths');

gulp.task('sass', sass);
gulp.task('server', server);
gulp.task('copy:images', copy.images);
gulp.task('copy:fonts', copy.fonts);
gulp.task('copy:favicon', copy.favicon);
gulp.task('copy:resources', copy.resources);
gulp.task('bundle', bundle);
gulp.task('icon-font', iconFont);

gulp.task('templates:clean', templates.clean);
gulp.task('templates:compile', ['templates:clean'], templates.compile);

gulp.task('watch', watch);

gulp.task('copy', ['copy:images', 'copy:fonts', 'copy:resources', 'copy:favicon']);
gulp.task('compile-all', ['icon-font', 'bundle', 'sass', 'copy']);
gulp.task('build', ['compile-all', 'templates:compile'], function () {
  console.log('Build finished. Compiled files can be found in the dist/ directory.');
  process.exit(0);
});
gulp.task('browser-sync', ['server', 'compile-all', 'watch'], browserSync);
gulp.task('default', ['browser-sync']);
