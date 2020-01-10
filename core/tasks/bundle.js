const gulp = require('gulp');
const bro = require('gulp-bro');
const rename = require('gulp-rename');
const babelify = require('babelify');

const paths = require('../paths');

module.exports = function () {
  return gulp.src(paths.content.js.entryFile)
    .pipe(bro({
      debug: true,
      transform: [
        babelify.configure({ presets: ['@babel/preset-env'] }),
      ]
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(paths.compiled.js))
};
