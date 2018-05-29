const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const path = require('path');
const es = require('event-stream');
const exec = require('child_process').exec;
const paths = require('../paths');
const config = require('../../bedrock.config');
const browserSync = require('browser-sync');

const FONT_NAME = 'icon-font';
const TMP_DIRECTORY = './icon-font-tmp';

const iconFontClassPrefix = config.icons && config.icons.iconFontClassPrefix || 'if';
const destFolder = path.dirname(config.icons.iconFontPath)
const fileName = path.basename(config.icons.iconFontPath, path.extname(config.icons.iconFontPath))

const cmd = `fontcustom compile ${paths.content.iconFont.sourceDirectory} --name ${FONT_NAME} --selector=".${iconFontClassPrefix}-{{glyph}}" -h -o ${TMP_DIRECTORY}`;

module.exports = function (done) {

  if (!config.icons.generateIconFont) {
    return done();
  }

  exec(cmd, function (err, stdout, stderr) {
    if (stdout.includes('error')) {
      throw new Error(stdout);
    }

    const tasks = [
      gulp
        .src(path.join(TMP_DIRECTORY, FONT_NAME + '.css'))
        .pipe(rename(function (path) {
          path.basename = fileName;
          path.extname = '.scss';
        }))
        .pipe(replace('./', '/fonts/'))
        .pipe(gulp.dest(destFolder)),
      gulp.src([
          path.join(TMP_DIRECTORY, FONT_NAME + '.eot'),
          path.join(TMP_DIRECTORY, FONT_NAME + '.svg'),
          path.join(TMP_DIRECTORY, FONT_NAME + '.ttf'),
          path.join(TMP_DIRECTORY, FONT_NAME + '.woff')
        ])
        .pipe(gulp.dest(paths.compiled.fonts)),
    ];

    const taskStream = es.merge.apply(null, tasks);

    taskStream.on('end', function () {
      browserSync.reload();
      done();
    });
  });
};
