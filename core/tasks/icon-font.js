const gulp = require('gulp');
const fontcustom = require('gulp-fontcustom');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const del = require('del');
const path = require('path');
const paths = require('../paths');

const FONT_NAME = 'icon-font';
const TMP_DIRECTORY = './icon-font-tmp';

module.exports = function (done) {
  console.log('Generating font...');
  gulp.src(paths.content.icons.sourceDirectory)
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
        .pipe(gulp.dest(paths.content.scss.settings))
        .on('end', function () {
          console.log('Copying generated fonts...');
          gulp.src([
              path.join(TMP_DIRECTORY, FONT_NAME + '.eot'),
              path.join(TMP_DIRECTORY, FONT_NAME + '.svg'),
              path.join(TMP_DIRECTORY, FONT_NAME + '.ttf'),
              path.join(TMP_DIRECTORY, FONT_NAME + '.woff')
            ])
            .pipe(gulp.dest(paths.dist.fonts))
            .on('end', function () {
              del([TMP_DIRECTORY, '.fontcustom-manifest.json']).then(function () {
                done();
              });
            });
        });
    });
};
