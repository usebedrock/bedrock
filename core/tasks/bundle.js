const gulp = require('gulp');
const bro = require('gulp-bro');
const rename = require('gulp-rename');
const babelify = require('babelify');
const terser = require('gulp-terser');
const gulpif = require('gulp-if');
const paths = require('../paths');

let config;
if (process.env.NODE_ENV == "production") {
  config = require('../discovery/prod-config');
} else {
  config = require('../discovery/config');
}

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
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  },
  prototypeBundle() {
    return gulp.src(paths.core.js.entryFile)
      .pipe(bro(babelConfig))
      .pipe(rename('bundle-prototype.js'))
      .pipe(gulpif(config.js.minify,terser()))
      .pipe(gulp.dest(paths.compiled.js))
  }
};
