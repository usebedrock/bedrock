var gulp = require('gulp');

module.exports = {
  images: function () {
    return gulp.src('./content/images/**/*')
      .pipe(gulp.dest('./dist/images'));
  }
};
