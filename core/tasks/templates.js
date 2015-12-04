var gulp = require('gulp');
var gulpJade = require('gulp-jade');
var prettify = require('gulp-jsbeautifier');
var notifier = require('node-notifier');
var gutil = require('gulp-util');
var data = require('gulp-data');
var gulpIf = require('gulp-if');
var path = require('path');
var fs = require('fs');
var jade = require('jade');
var del = require('del');
var config = require('../config');
var colors = require('../discovery/colors');
var icons = require('../discovery/icons');
var pages = require('../discovery/pages');
var patterns = require('../discovery/patterns');
var contentData = require('../discovery/content-data');
var paths = require('../paths');

function isModuleTemplate(file) {
  return file.path.indexOf('templates/modules/') > -1;
}

function getDefaultLocals() {
  return {
    contentData: contentData.discover(),
    patterns: patterns.discover(),
    pages: pages.discover(),
    icons: icons.discover(),
    config,
    colorCategories: colors.discover(),
    slugify: function (input) {
      return input.replace(/\//g, '-');
    },
    render: function (id, language) {
      var patternFileLocation = path.join(paths.content.templates.patterns, id + '.jade');
      var jadeMarkup = fs.readFileSync(patternFileLocation, 'utf8');

      if (!language || language === 'jade') {
        return jadeMarkup;
      }

      else if (language === 'html') {
        return jade.compile(jadeMarkup, {
          pretty: true,
          basedir: 'content',
          filename: patternFileLocation
        })({icons: icons.discover(), config});
      }
    }
  };
}

module.exports = {
  getDefaultLocals: getDefaultLocals,
  clean: function (done) {
    del(['./dist/*.html', './dist/modules']).then(function () {
      done();
    });
  },
  compile: function () {
    return gulp.src([
        paths.content.templates.baseTemplates,
        paths.content.templates.moduleTemplates
      ])
      .pipe(data(function (file) {
        return Object.assign({}, getDefaultLocals(), {
          filename: path.basename(file.path).replace('jade', 'html'),
          pathname: file.path.replace(path.join(process.cwd(), paths.content.templates.path), '').replace('.jade', ''),
        });
      }))
      .pipe(gulpJade({
        pretty: true
      }))
      .on('error', function (err) {
        var displayErr = gutil.colors.red(err);
        notifier.notify({
          title: 'Jade error',
          message: err.message
        });
        gutil.log(displayErr);
        gutil.beep();
        this.emit('end');
      })
      .pipe(prettify({
        logSuccess: false,
        indentSize: 2,
        unformatted: ['pre'],
        extraLiners: ['body']
      }))
      .pipe(gulpIf(isModuleTemplate, gulp.dest(paths.dist.modules), gulp.dest(paths.dist.path)));
  }
};
