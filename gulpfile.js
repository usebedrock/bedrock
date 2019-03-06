'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

const browserSync = require('./core/tasks/browser-sync');
const sass = require('./core/tasks/sass');
const bundle = require('./core/tasks/bundle');
const templates = require('./core/tasks/templates');
const copy = require('./core/tasks/copy');
const watch = require('./core/tasks/watch');
const server = require('./core/tasks/server');
const iconFont = require('./core/tasks/icon-font');
const linter = require('./core/tasks/linter');
const config = require('./bedrock.config');

gulp.task('templates:clean', templates.clean);
gulp.task('sass', sass);
gulp.task('server', server);
gulp.task('copy:images', copy.images);
gulp.task('copy:fonts', copy.fonts);
gulp.task('copy:favicon', copy.favicon);
gulp.task('copy:resources', copy.resources);
gulp.task('copy:compiledToDist', copy.compiledToDist);
gulp.task('bundle', bundle);
gulp.task('icon-font', iconFont);
gulp.task('lint', linter);

gulp.task('templates:compile', config.styleguide ?
  ['templates:compile:content', 'templates:compile:styleguide', 'templates:compile:docs'] :
  ['templates:compile:content']
);
gulp.task('templates:compile:content', templates.compile.content);
gulp.task('templates:compile:styleguide', templates.compile.styleguide);
gulp.task('templates:compile:docs', templates.compile.docs);

gulp.task('watch', watch);

gulp.task('copy', ['copy:images', 'copy:fonts', 'copy:resources', 'copy:favicon']);
gulp.task('compile-all', ['templates:clean','icon-font', 'bundle', 'sass', 'copy']);

gulp.task('build', function () {
  runSequence(
    ['compile-all', 'templates:compile'],
    'copy:compiledToDist',
    function () {
      console.log('------------\n');
      console.log('Build finished. Compiled files can be found in the dist/ directory.');
      process.exit(0);
    }
  )
});
gulp.task('browser-sync', ['server', 'compile-all', 'watch'], browserSync);
gulp.task('default', ['browser-sync']);
