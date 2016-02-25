const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const path = require('path');
const es = require('event-stream');
const exec = require('child_process').exec;
const paths = require('../paths');
const config = require('../config');

const FONT_NAME = 'icon-font';
const TMP_DIRECTORY = './icon-font-tmp';

const cmd = `fontcustom compile content/icon-font-source --name ${FONT_NAME} --selector=".glyphicon-{{glyph}}" -h -o ${TMP_DIRECTORY}`;

module.exports = function (done) {

  if (!config.icons.generateIconsFromSource) {
    return done();
  }

  exec(cmd, function (err, stdout, stderr) {
    console.log('Done generating');
    const tasks = [
      gulp
        .src(path.join(TMP_DIRECTORY, FONT_NAME + '.css'))
        .pipe(rename(function (path) {
          path.basename = '_icon-font';
          path.extname = '.scss';
        }))
        .pipe(replace('./', '/fonts/'))
        .pipe(gulp.dest(paths.content.scss.settings)),
      gulp.src([
          path.join(TMP_DIRECTORY, FONT_NAME + '.eot'),
          path.join(TMP_DIRECTORY, FONT_NAME + '.svg'),
          path.join(TMP_DIRECTORY, FONT_NAME + '.ttf'),
          path.join(TMP_DIRECTORY, FONT_NAME + '.woff')
        ])
        .pipe(gulp.dest(paths.dist.fonts)),
    ];

    const taskStream = es.merge.apply(null, tasks);

    taskStream.on('end', function () {
      done();
    });
  });
};
