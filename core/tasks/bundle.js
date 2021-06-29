const gulp = require('gulp');

const browserify = require('browserify');

const rename = require('gulp-rename');
const babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

const terser = require('gulp-terser');
const gulpif = require('gulp-if');
const paths = require('../paths');

var log = require('gulplog');


const babelConfig = require('../../babel.config.json');

let config;
if (process.env.NODE_ENV == "production") {
  config = require('../discovery/prod-config');
} else {
  config = require('../discovery/config');
}

var b = browserify(babelConfig);

module.exports = {
  clientBundle() {
    return b.bundle()
      .pipe(gulp.src(paths.content.js.entryFile))
      .pipe(rename('bundle-client.js'))
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  },
  prototypeBundle() {
    return b.bundle()
      .pipe(gulp.src(paths.core.js.entryFile))
      .pipe(rename('bundle-prototype.js'))
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  }
};
