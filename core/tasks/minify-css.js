const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const paths = require('../paths');

let config;
if (process.env.NODE_ENV == "production") {
  config = require('../discovery/prod-config');
} else {
  config = require('../discovery/config');
}

module.exports = function (done) {

  if (config.css.minify == true) {
    return gulp.src(paths.dist.css.allFiles)
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest(paths.dist.css.mainPath))
  } else {
    done();
    return false;
  }

};