const gulp = require('gulp');
const postcss = require('gulp-postcss');

const config = require('../discovery/config');
const paths = require('../paths');

// Plugins
if (config.css.compiler == 'postcss') {
  var postCSSPluginConfig = require('../../postcss.config');
}

module.exports = function (done) {

  if (config.css.compiler == 'postcss') {
    return gulp.src(paths.content.postcss.allMainFiles)
        .pipe(postcss(postCSSPluginConfig))
        .on('error', (err) => console.error(err))
        .pipe(gulp.dest(paths.compiled.css));
  } else {
    done();
    return false;
  }

};
