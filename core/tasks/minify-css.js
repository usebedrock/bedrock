const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

const config = require('../discovery/config');
const paths = require('../paths');

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
