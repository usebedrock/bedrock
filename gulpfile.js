'use strict';

const gulp = require('gulp');
const inquirer = require('inquirer');

const browserSync = require('./core/tasks/browser-sync');
const sass = require('./core/tasks/sass');
const bundle = require('./core/tasks/bundle');
const templates = require('./core/tasks/templates');
const copy = require('./core/tasks/copy');
const watch = require('./core/tasks/watch');
const server = require('./core/tasks/server');
const modernizr = require('./core/tasks/modernizr');
const iconFont = require('./core/tasks/icon-font');

gulp.task('sass', ['icon-font'], sass);
gulp.task('modernizr', modernizr);
gulp.task('server', server);
gulp.task('copy:images', copy.images);
gulp.task('copy:fonts', copy.fonts);
gulp.task('copy:favicon', copy.favicon);
gulp.task('copy:resources', copy.resources);
gulp.task('bundle', bundle);
gulp.task('icon-font', iconFont);

gulp.task('templates:compile', ['templates:compile:content', 'templates:compile:styleguide', 'templates:compile:docs']);
gulp.task('templates:compile:content', templates.compile.content);
gulp.task('templates:compile:styleguide', templates.compile.styleguide);
gulp.task('templates:compile:docs', templates.compile.docs);

gulp.task('watch', watch);

gulp.task('copy', ['copy:images', 'copy:fonts', 'copy:resources', 'copy:favicon']);
gulp.task('compile-all', ['modernizr', 'icon-font', 'bundle', 'sass', 'copy']);

gulp.task('build', ['compile-all', 'templates:compile'], function (done) {
  console.log('------------\n');
  console.log('Build finished. Compiled files can be found in the dist/ directory.');
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'clean',
      message: 'Would you like to clean the dist/ directory?',
      default: true
    }
  ], function (answers) {
    if (answers.clean) {
      templates.clean(function () {
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
});
gulp.task('browser-sync', ['server', 'compile-all', 'watch'], browserSync);
gulp.task('default', ['browser-sync']);
