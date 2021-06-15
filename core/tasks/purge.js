const gulp = require('gulp');
const purgecss = require('gulp-purgecss');
const paths = require('../paths');

module.exports = function () {
  return gulp.src(paths.dist.path+'/**/*.css')
    .pipe(purgecss({
      content: [paths.dist.path+'**/*.html']
    }))
    .pipe(gulp.dest(paths.dist.path))
};
