'use strict';

const gulp = require('gulp');
const gulpJade = require('gulp-jade');
const prettify = require('gulp-jsbeautifier');
const notifier = require('node-notifier');
const gutil = require('gulp-util');
const data = require('gulp-data');
const gulpIf = require('gulp-if');
const path = require('path');
const fs = require('fs');
const jade = require('jade');
const del = require('del');
const config = require('../config');
const paths = require('../paths');

function isModuleTemplate(file) {
  return file.path.indexOf('templates/modules/') > -1;
}

function getDefaultLocals() {
  delete require.cache[require.resolve('../discovery/pages')];
  delete require.cache[require.resolve('../discovery/colors')];
  delete require.cache[require.resolve('../discovery/icons')];
  delete require.cache[require.resolve('../discovery/patterns')];
  delete require.cache[require.resolve('../discovery/content-data')];

  const pages = require('../discovery/pages');
  const colors = require('../discovery/colors');
  const icons = require('../discovery/icons');
  const patterns = require('../discovery/patterns');
  const contentData = require('../discovery/content-data');

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
