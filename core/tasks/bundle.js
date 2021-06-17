const gulp = require('gulp');
const bro = require('gulp-bro');
const rename = require('gulp-rename');
const babelify = require('babelify');

const paths = require('../paths');

let babelConfig = {
  transform: [
    babelify.configure({ presets: ['@babel/preset-env'] }),
  ]
}

module.exports = {
  clientBundle() {
    return gulp.src(paths.content.js.entryFile)
      .pipe(bro(babelConfig))
      .pipe(rename('bundle-client.js'))
      .pipe(gulp.dest(paths.compiled.js))
  },
  prototypeBundle() {
    return gulp.src(paths.core.js.entryFile)
      .pipe(bro(babelConfig))
      .pipe(rename('bundle-prototype.js'))
      .pipe(gulp.dest(paths.compiled.js))
  }
};
