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

let config;
if (process.env.NODE_ENV == "production") {
  config = require('../discovery/prod-config');
} else {
  config = require('../discovery/config');
}

var svgIconClassPrefix = config.icons && config.icons.svgIconClassPrefix || 'svg-icon'

if (config.css.compiler == "postcss") {
  var sources = [paths.core.scss.prototype]
} else if (config.css.compiler == "scss") {
  var sources = [paths.content.scss.all, paths.core.scss.prototype]
} else {
  console.error("Please provide a CSS compiler");
}

module.exports = function () {
  const processors = [
    autoprefixer()
  ];

  return gulp.src(sources)
    // Inject config svgIconPrefix in scss
    .pipe(header('$br-svg-icon-class-prefix: ' + svgIconClassPrefix + ';\n'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules']
    }))
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
