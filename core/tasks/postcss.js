const gulp = require('gulp');
const postcss = require('gulp-postcss');

// Plugins

const paths = require('../paths');
const bedrockConfig = require('../../bedrock.config');

if (bedrockConfig.cssCompiler == 'postcss') {
  var postCSSPluginConfig = require('../../postcss.config');
}

module.exports = function (done) {

  if (bedrockConfig.cssCompiler == 'postcss') {
    return gulp.src(paths.content.postcss.allMainFiles)
        .pipe(postcss(postCSSPluginConfig))
        .on('error', (err) => console.error(err))
        .pipe(gulp.dest(paths.compiled.css));
  } else {
    done();
    return false;
  }

};
