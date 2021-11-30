'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

const browserSync = require('./browser-sync');
const bundle = require('./bundle');
const templates = require('./templates');
const copy = require('./copy');
const watch = require('./watch');
const server = require('./server');
const iconFont = require('./icon-font');

// Configs
const config = require('../discovery/config');

// Sass is used to render core templates so is needed, even if you use postcss in your content part
const sass = require('./sass');
const postcss = require('./postcss');

// Optional tasks: Purge CSS and minify CSS
const purge = require('./purge');
const minifyCSS = require('./minify-css');

// Execute this task instead of optional tasks
const dummy = require('./dummy');

function defineGulpTasks() {
gulp.task('templates:clean', templates.clean);
gulp.task('sass', sass);
gulp.task('postcss', postcss);
gulp.task('minifyCSS', minifyCSS);
gulp.task('purgeCSS', purge);
gulp.task('server', server);
gulp.task('dummy', dummy);
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
gulp.task('compile-all', gulp.parallel('templates:clean', 'icon-font', 'bundle:clientBundle', 'bundle:prototypeBundle', 'sass', 'postcss', 'copy'));

gulp.task('build', gulp.series('compile-all', 'templates:compile', 'copy:compiledToDist', config.css.purge ? 'purgeCSS' : 'dummy', config.css.minify ? 'minifyCSS': 'dummy'), function (done) {
  console.log('------------\n');
  console.log('Build finished. Compiled files can be found in the dist/ directory.');
  process.exit(0);
});

gulp.task('default', gulp.parallel('server', 'compile-all', 'watch', browserSync));

}
module.exports = defineGulpTasks;
