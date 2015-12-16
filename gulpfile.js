'use strict';

const gulp = require('gulp');

const browserSync = require('./core/tasks/browser-sync');
const sass = require('./core/tasks/sass');
const bundle = require('./core/tasks/bundle');
const iconFont = require('./core/tasks/icon-font');
const templates = require('./core/tasks/templates');
const copy = require('./core/tasks/copy');
const watch = require('./core/tasks/watch');
const server = require('./core/tasks/server');
const modernizr = require('./core/tasks/modernizr');

gulp.task('sass', sass);
gulp.task('modernizr', modernizr);
gulp.task('server', server);
gulp.task('copy:images', copy.images);
gulp.task('copy:fonts', copy.fonts);
gulp.task('copy:favicon', copy.favicon);
gulp.task('copy:resources', copy.resources);
gulp.task('bundle', bundle);
gulp.task('icon-font', iconFont);

gulp.task('templates:clean', templates.clean);
gulp.task('templates:compile', ['templates:clean', 'templates:compile:content', 'templates:compile:styleguide']);
gulp.task('templates:compile:content', templates.compile.content);
gulp.task('templates:compile:styleguide', templates.compile.styleguide);

gulp.task('watch', watch);

gulp.task('copy', ['copy:images', 'copy:fonts', 'copy:resources', 'copy:favicon']);
gulp.task('compile-all', ['modernizr', 'icon-font', 'bundle', 'sass', 'copy']);
gulp.task('build', ['compile-all', 'templates:compile'], function () {
  console.log('Build finished. Compiled files can be found in the dist/ directory.');
  process.exit(0);
});
gulp.task('browser-sync', ['server', 'compile-all', 'watch'], browserSync);
gulp.task('default', ['browser-sync']);
