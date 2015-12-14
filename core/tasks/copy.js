const gulp = require('gulp');
const paths = require('../paths');

module.exports = {
  images() {
    return gulp.src(paths.content.assets.images)
      .pipe(gulp.dest(paths.dist.assets.images));
  },
  fonts() {
    return gulp.src(paths.content.assets.fonts)
      .pipe(gulp.dest(paths.dist.assets.fonts));
  },
  resources() {
    return gulp.src(paths.content.assets.resources)
      .pipe(gulp.dest(paths.dist.assets.resources));
  },
  favicon() {
    return gulp.src(paths.content.assets.favicon)
      .pipe(gulp.dest(paths.dist.path));
  }
};
