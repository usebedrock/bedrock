const gulp = require('gulp');
const gulpPug = require('gulp-pug');
const prettify = require('gulp-jsbeautifier');
const notifier = require('node-notifier');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const data = require('gulp-data');
const filter = require('gulp-filter');
const path = require('path');
const fs = require('fs');
const pug = require('pug');
const del = require('del');
const es = require('event-stream');
const config = require('../../bedrock.config');
const paths = require('../paths');
const locals = require('../templates/locals');
const docs = require('../discovery/docs');


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

      const tasks = Object.keys(defaultLocals.components.byGroup).map(componentGroup => {
        return gulp.src([
            paths.core.templates.styleguide.componentGroup
          ])
          .pipe(data(function (file) {
            return Object.assign({}, getDefaultLocals(), {
              componentGroup: defaultLocals.components.byGroup[componentGroup],
              pathname: file.path.replace(path.join(process.cwd(), paths.content.templates.path), '').replace('.pug', ''),
            });
          }))
          .pipe(gulpPug(config.pug))
          .pipe(prettify(config.prettify))
          .pipe(rename(function (path) {
            path.basename = componentGroup;
          }))
          .pipe(gulp.dest(paths.dist.styleguide));
      });

      tasks.push(
        gulp.src([
            paths.core.templates.styleguide.index
          ])
          .pipe(data(function (file) {
            return Object.assign({}, getDefaultLocals(), {
              pathname: file.path.replace(path.join(process.cwd(), paths.content.templates.path), '').replace('.pug', ''),
            });
          }))
          .pipe(gulpPug(config.pug))
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
              doc,
              pathname: file.path.replace(path.join(process.cwd(), paths.content.templates.path), '').replace('.pug', ''),
            });
          }))
          .pipe(gulpPug(config.pug))
          .pipe(prettify(config.prettify))
          .pipe(rename(function (path) {
            path.basename = doc.attributes.filename;
          }))
          .pipe(gulp.dest(paths.dist.docs));
      });

      return es.merge.apply(null, tasks);
    },
    content() {
      const templateFilter = filter(function (file) {
        const folderNameInTemplates = file.path.replace(process.cwd(), '').replace('/content/templates/', '');
        return path.parse(folderNameInTemplates).dir.charAt(0) !== '_';
      });
      return gulp.src(paths.content.templates.all)
        .pipe(templateFilter)
        .pipe(data(function (file) {
          return Object.assign({}, getDefaultLocals(), {
            filename: path.basename(file.path).replace('pug', 'html'),
            pathname: file.path.replace(path.join(process.cwd(), paths.content.templates.path), '').replace('.pug', ''),
          });
        }))
        .pipe(gulpPug(config.pug))
        .on('error', function (err) {
          notifier.notify({
            title: 'Pug error',
            message: err.message
          });
          gutil.log(gutil.colors.red(err));
          gutil.beep();
          this.emit('end');
        })
        .pipe(prettify(config.prettify))
        .pipe(gulp.dest(paths.dist.path));
    }
  }
};
