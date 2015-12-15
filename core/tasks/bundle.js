const watchify = require('watchify');
const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const _ = require('lodash');
const paths = require('../paths');

const opts = _.assign({}, watchify.args, {
  entries: [paths.content.js.entryFile],
  debug: true
});

function bundler() {
  var bundle = watchify(browserify(opts));;

  bundle.transform(babelify, {presets: ['es2015']});

  bundle.on('update', bundler);
  bundle.on('log', gutil.log);

  return bundle.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(paths.dist.js));
}

module.exports = bundler;
