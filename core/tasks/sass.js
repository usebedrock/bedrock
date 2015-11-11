var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

module.exports = function () {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}) // IE10+
  ];

  return gulp.src([
      './content/scss/main.scss',
      './core/scss/prototype.scss'
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
    .pipe(gulp.dest('./dist/css'));
};
