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
const config = require('./bedrock.config');

gulp.task('templates:clean', templates.clean);
gulp.task('sass', sass);
gulp.task('server', server);
gulp.task('copy:images', copy.images);
gulp.task('copy:fonts', copy.fonts);
gulp.task('copy:favicon', copy.favicon);
gulp.task('copy:resources', copy.resources);
gulp.task('copy:scripts', copy.scripts);
gulp.task('copy:compiledToDist', copy.compiledToDist);
gulp.task('bundle:clientBundle', bundle.clientBundle);
gulp.task('bundle:prototypeBundle', bundle.prototypeBundle);
gulp.task('icon-font', iconFont);

gulp.task('templates:compile:content', templates.compile.content);
gulp.task('templates:compile:styleguide', templates.compile.styleguide);
gulp.task('templates:compile:docs', templates.compile.docs);

gulp.task('templates:compile', config.styleguide ?
  gulp.parallel('templates:compile:content', 'templates:compile:styleguide', 'templates:compile:docs') :
  gulp.series('templates:compile:content')
);

gulp.task('watch', watch);
gulp.task('copy', gulp.parallel('copy:images', 'copy:fonts', 'copy:resources', 'copy:scripts', 'copy:favicon'));
gulp.task('compile-all', gulp.parallel('templates:clean','icon-font', 'bundle:clientBundle', 'bundle:prototypeBundle', 'sass', 'copy'));

gulp.task('build', gulp.series('compile-all', 'templates:compile', 'copy:compiledToDist'), function (done) {
  console.log('------------\n');
  console.log('Build finished. Compiled files can be found in the dist/ directory.');
  process.exit(0);
});
gulp.task('default', gulp.parallel('server', 'compile-all', 'watch', browserSync));
