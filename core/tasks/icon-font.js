var gulp = require('gulp');
var fontcustom = require('gulp-fontcustom');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var del = require('del');
var path = require('path');

var FONT_NAME = 'c-icon-font';
var TMP_DIRECTORY = './icon-font-tmp';

module.exports = function (done) {
  console.log('Generating font...');
  gulp.src(['./content/icon-font-source'])
    .pipe(fontcustom({
      font_name: FONT_NAME,
      'css-selector': '.glyphicon-{{glyph}}'
    }))
    .pipe(gulp.dest(TMP_DIRECTORY))
    .on('end', function () {
      console.log('Copying generated CSS file...');
      gulp.src(path.join(TMP_DIRECTORY, FONT_NAME + '.css'))
        .pipe(rename(function (path) {
          path.basename = '_icon-font';
          path.extname = '.scss';
        }))
        .pipe(replace('./', '/fonts/'))
        .pipe(gulp.dest('./content/scss/base'))
        .on('end', function () {
          console.log('Copying generated fonts...');
          gulp.src([
              path.join(TMP_DIRECTORY, FONT_NAME + '.eot'),
              path.join(TMP_DIRECTORY, FONT_NAME + '.svg'),
              path.join(TMP_DIRECTORY, FONT_NAME + '.ttf'),
              path.join(TMP_DIRECTORY, FONT_NAME + '.woff')
            ])
            .pipe(gulp.dest('./dist/fonts'))
            .on('end', function () {
              del([TMP_DIRECTORY, '.fontcustom-manifest.json']).then(function () {
                done();
              });
            });
        });
    });
};
