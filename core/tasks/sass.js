var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var paths = require('../paths');

module.exports = function () {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}) // IE10+
  ];

  return gulp.src([
      paths.content.scss.main,
      paths.core.scss.prototype
    ])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', function (err) {
      var displayErr = gutil.colors.red(err);
      notifier.notify({
        title: 'SASS error',
        message: err.message
      });
      gutil.log(displayErr);
      gutil.beep();
      this.emit('end');
    })
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css));
};
