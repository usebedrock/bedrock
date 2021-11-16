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

var b = browserify({ entries: paths.content.js.entryFile }).transform("babelify", babelConfig);
var c = browserify({ entries: paths.core.js.entryFile }).transform("babelify", babelConfig);

module.exports = {
  clientBundle() {
    return b.bundle()
      .pipe(source('bundle-client.js'))
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  },
  prototypeBundle() {
    return c.bundle()
      .pipe(source('bundle-prototype.js'))
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  }
};
