const gulp = require('gulp');
const purgecss = require('gulp-purgecss');

const config = require('../discovery/config');
const paths = require('../paths');

module.exports = function (done) {

  if (config.css.purge == true) {
    return gulp.src(paths.dist.path+'/**/*.css')
      .pipe(purgecss({
        content: [paths.dist.path+'**/*.html']
      }))
      .pipe(gulp.dest(paths.dist.path))
  } else {
    done();
    return false;
  }

};
