const gulp = require('gulp');
const purgecss = require('gulp-purgecss');
const paths = require('../paths');

let config;
if (process.env.NODE_ENV == "production") {
  config = require('../discovery/prod-config');
} else {
  config = require('../discovery/config');
}

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
