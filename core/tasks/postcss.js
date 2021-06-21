const gulp = require('gulp');
const postcss = require('gulp-postcss');

// Plugins

const paths = require('../paths');
const bedrockConfig = require('../../bedrock.config');

if (bedrockConfig.cssCompiler == 'postcss') {
  const postCSSPluginConfig = require('../../postcss.config');
}

const { content } = require('../paths');

module.exports = function () {

  if (bedrockConfig.cssCompiler == 'postcss') {
    return gulp.src(paths.content.postcss.allMainFiles)
        .pipe(postcss(postCSSPluginConfig))
        .on('error', (err) => console.error(err))
        .pipe(gulp.dest(paths.compiled.css));
  } else {
    return false;
  }

};
