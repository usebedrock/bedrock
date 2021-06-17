const gulp = require('gulp');
const postcss = require('gulp-postcss');

// Plugins
const autoprefixer = require('autoprefixer');
const atImport = require("postcss-import");
const tailwind = require("tailwindcss");

const paths = require('../paths');
const config = require('../../bedrock.config');
const { content } = require('../paths');

module.exports = function () {

  var plugins = [ atImport, tailwind, autoprefixer ];

  if (config.cssCompiler == 'postcss') {
    return gulp.src(paths.content.postcss.allMainFiles)
        .pipe(postcss(plugins))
        .on('error', (err) => console.error(err))
        .pipe(gulp.dest(paths.compiled.css));
  } else {
    return false;
  }

};
