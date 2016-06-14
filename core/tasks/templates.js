const gulp = require('gulp');
const gulpJade = require('gulp-jade');
const prettify = require('gulp-jsbeautifier');
const notifier = require('node-notifier');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const data = require('gulp-data');
const gulpIf = require('gulp-if');
const path = require('path');
const fs = require('fs');
const jade = require('jade');
const del = require('del');
const es = require('event-stream');
const config = require('../../bedrock.config');
const paths = require('../paths');
const locals = require('../templates/locals');
const docs = require('../discovery/docs');

function isModuleTemplate(file) {
  return file.path.indexOf('templates/modules/') > -1;
}

function getDefaultLocals() {
  const defaultLocals = locals.getDefaultLocals();
  defaultLocals.docs = docs.discover();

  return defaultLocals;
}

module.exports = {
  clean(done) {
    del(['./dist/**.html', './dist/modules', './dist/styleguide']).then(function () {
      done();
    });
  },
  compile: {
    styleguide() {
      const defaultLocals = getDefaultLocals();

      const tasks = Object.keys(defaultLocals.patterns.byGroup).map(patternGroup => {
        return gulp.src([
            paths.core.templates.styleguide.patternGroup
          ])
          .pipe(data(function (file) {
            return Object.assign({}, getDefaultLocals(), {
              patternGroup: defaultLocals.patterns.byGroup[patternGroup]
            });
          }))
          .pipe(gulpJade(config.jade))
          .pipe(prettify(config.prettify))
          .pipe(rename(function (path) {
            path.basename = patternGroup;
          }))
          .pipe(gulp.dest(paths.dist.styleguide));
      });

      tasks.push(
        gulp.src([
            paths.core.templates.styleguide.index
          ])
          .pipe(data(function (file) {
            return getDefaultLocals();
          }))
          .pipe(gulpJade(config.jade))
          .pipe(prettify(config.prettify))
          .pipe(gulp.dest(paths.dist.styleguide))
      );

      return es.merge.apply(null, tasks);
    },
    docs() {
      const defaultLocals = getDefaultLocals();

      const tasks = defaultLocals.docs.allDocs.map(doc => {
        return gulp.src(paths.core.templates.styleguide.doc)
          .pipe(data(function (file) {
            return Object.assign({}, getDefaultLocals(), {
              doc
            });
          }))
          .pipe(gulpJade(config.jade))
          .pipe(prettify(config.prettify))
          .pipe(rename(function (path) {
            path.basename = doc.attributes.filename;
          }))
          .pipe(gulp.dest(paths.dist.docs));
      });

      return es.merge.apply(null, tasks);
    },
    content() {
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
        .pipe(gulpJade(config.jade))
        .on('error', function (err) {
          notifier.notify({
            title: 'Jade error',
            message: err.message
          });
          gutil.log(gutil.colors.red(err));
          gutil.beep();
          this.emit('end');
        })
        .pipe(prettify(config.prettify))
        .pipe(gulpIf(isModuleTemplate, gulp.dest(paths.dist.modules), gulp.dest(paths.dist.path)));
    }
  }
};
