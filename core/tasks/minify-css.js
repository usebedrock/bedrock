const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const paths = require('../paths');
const bedrockConfig = require('../../bedrock.config');

module.exports = function (done) {

  if (bedrockConfig.minifyCSS == true) {
    return gulp.src(paths.dist.css.allFiles)
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest(paths.dist.css.mainPath));
  } else {
    done();
    return false;
  }

};