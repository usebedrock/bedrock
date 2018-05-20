const gulp = require('gulp');
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const notifier = require('node-notifier');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const header = require('gulp-header');
const autoprefixer = require('autoprefixer');
const paths = require('../paths');
const errors = require('../util/errors');
const config = require('../../bedrock.config');

var svgIconClassPrefix = config.icons && config.icons.svgIconClassPrefix || 'svg-icon'

module.exports = function () {
  const processors = [
    autoprefixer({browsers: ['last 2 versions']}) // IE10+
  ];

  return gulp.src([
      paths.content.scss.allMainFiles,
      paths.core.scss.prototype
    ])
    // Inject config svgIconPrefix in scss
    .pipe(header('$br-svg-icon-class-prefix: ' + svgIconClassPrefix + ';\n'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('start', function () {
    })
    .on('error', function (err) {
      notifier.notify({
        title: 'SASS error',
        message: err.message
      });
      gutil.log(gutil.colors.red(err));
      gutil.beep();
      this.err = err;
      this.emit('end');
    })
    .on('end', function () {
      if (this.err) {
        errors.updateError('sass', this.err);
      } else {
        errors.clearError('sass');
      }
      this.err = null;
    })
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.compiled.css));
};
