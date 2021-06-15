const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const paths = require('../paths');
const config = require('../../bedrock.config');

module.exports = function () {

  if (config.cssCompiler == 'postcss') {
    return gulp.src(paths.content.postcss.all)
        .pipe(postcss())
        .pipe(gulp.dest(paths.compiled.css));
  } else {
    return false;
  }

};
