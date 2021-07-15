const gulp = require('gulp');

const browserify = require('browserify');

const rename = require('gulp-rename');
const babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

const terser = require('gulp-terser');
const gulpif = require('gulp-if');
const paths = require('../paths');

const babelConfig = require('../../babel.config.json');
const config = require('../discovery/config');

const glob = require('glob');

var clientEntryFile = browserify({ entries: paths.content.js.entryFile }).transform("babelify", babelConfig);

var styleguideEntryFile = browserify({ entries: paths.core.js.styleguideEntryFile }).transform("babelify", babelConfig);
var prototypeNavEntryFile = browserify({ entries: paths.core.js.prototypeNavEntryFile }).transform("babelify", babelConfig);

module.exports = {
  clientBundle() {
    return clientEntryFile.bundle()
      .pipe(source('bundle-client.js'))
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  },
  corePrototypeNavBundle() {
    return prototypeNavEntryFile.bundle()
      .pipe(source('core-prototype-nav.js'))
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  },
  coreStyleguideBundle() {
    return styleguideEntryFile.bundle()
      .pipe(source('core-style-guide.js'))
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  }

};
