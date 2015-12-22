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
const config = require('../config');
const paths = require('../paths');

const options = {
  jade: {
    pretty: true
  },
  prettify: {
    logSuccess: false,
    indentSize: 2,
    unformatted: ['pre', 'textarea'],
    extraLiners: ['body']
  }
};

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
    slugify(input) {
      return input.replace(/\//g, '-');
    },
    render(id, language) {
      var patternFileLocation = path.join(paths.content.templates.patterns, id + '.jade');
      var jadeMarkup = fs.readFileSync(patternFileLocation, 'utf8');

      if (!language || language === 'jade') {
        return jadeMarkup;
      } else if (language === 'html') {
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
          .pipe(gulpJade(options.jade))
          .pipe(prettify(options.prettify))
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
          .pipe(gulpJade(options.jade))
          .pipe(prettify(options.prettify))
          .pipe(gulp.dest(paths.dist.styleguide))
      );

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
        .pipe(gulpJade(options.jade))
        .on('error', function (err) {
          notifier.notify({
            title: 'Jade error',
            message: err.message
          });
          gutil.log(gutil.colors.red(err));
          gutil.beep();
          this.emit('end');
        })
        .pipe(prettify(options.prettify))
        .pipe(gulpIf(isModuleTemplate, gulp.dest(paths.dist.modules), gulp.dest(paths.dist.path)));
    }
  }
};
