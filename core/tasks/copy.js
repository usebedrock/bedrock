var gulp = require('gulp');
var paths = require('../paths');

module.exports = {
  images: function () {
    return gulp.src(paths.content.assets.images)
      .pipe(gulp.dest(paths.dist.assets.images));
  },
  fonts: function () {
    return gulp.src(paths.content.assets.fonts)
      .pipe(gulp.dest(paths.dist.assets.fonts));
  },
  resources: function () {
    return gulp.src(paths.content.assets.resources)
      .pipe(gulp.dest(paths.dist.assets.resources));
  },
  favicon: function () {
    return gulp.src(paths.content.assets.favicon)
      .pipe(gulp.dest(paths.dist.path));
  }
};
