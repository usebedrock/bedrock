const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');

module.exports = {
  images() {
    return gulp.src(paths.content.assets.images)
      .pipe(gulp.dest(paths.compiled.assets.images));
  },
  fonts() {
    return gulp.src(paths.content.assets.fonts)
      .pipe(gulp.dest(paths.compiled.assets.fonts));
  },
  resources() {
    return gulp.src(paths.content.assets.resources)
      .pipe(gulp.dest(paths.compiled.assets.resources));
  },
  favicon() {
    return gulp.src(paths.content.assets.favicon)
      .pipe(gulp.dest(paths.compiled.path));
  },
  compiledToDist() {
    return gulp.src(path.join(paths.compiled.path, '**/*'))
      .pipe(gulp.dest(paths.dist.path));
  }
};
