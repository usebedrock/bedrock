const gulp = require('gulp');
const postcss = require('gulp-postcss');

const paths = require('../paths');

let config;
if (process.env.NODE_ENV == "production") {
  config = require('../discovery/prod-config');
} else {
  config = require('../discovery/config');
}

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
