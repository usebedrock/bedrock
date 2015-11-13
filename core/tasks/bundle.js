var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var _ = require('lodash');
var paths = require('../paths');

// add custom browserify options here
var customOpts = {
  entries: [paths.content.js.entryFile],
  debug: true
};

var opts = _.assign({}, watchify.args, customOpts);

function bundler() {
  var bundle = watchify(browserify(opts));;

  bundle.transform(babelify, {presets: ['es2015']});

  bundle.on('update', bundler); // on any dep update, runs the bundler
  bundle.on('log', gutil.log); // output build logs to terminal

  return bundle.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(paths.dist.js));
}

module.exports = bundler;
