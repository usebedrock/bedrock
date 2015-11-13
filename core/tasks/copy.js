var gulp = require('gulp');
var paths = require('../paths');

module.exports = {
  images: function () {
    return gulp.src(paths.content.assets.images)
      .pipe(gulp.dest(paths.dist.assets.images));
  }
};
