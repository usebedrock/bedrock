const fs = require('fs');
const path = require('path');
const glob = require('glob');
const pug = require('pug');
const cheerio = require('cheerio');
const chalk = require('chalk');

const locals = require('../templates/locals');
const paths = require('../paths');

const allComponentPaths = glob.sync(paths.content.templates.allComponents);
const linterPaths = glob.sync(paths.content.linter.tests);

 module.exports = function (done) {
  console.log('Running linters on Pug templates within components...\n');

   allComponentPaths.forEach(function (templatePath) {

     const fakeIcon = 'include ../../../../core/templates/mixins/icon\n'

     const pugContent = fakeIcon + fs.readFileSync(templatePath, 'utf8');

     const compiledHtml = pug.compile(pugContent, {
      pretty: true,
      basedir: '/content',
      filename: templatePath
    })(locals.getDefaultLocals());

     const $ = cheerio.load(compiledHtml);

     linterPaths.forEach(function (linterPath) {
      const linter = require(path.join('../../', linterPath));

       const linterResult = linter($);

       if (linterResult && linterResult.length > 0) {
        console.log(chalk.underline.bold(templatePath));

         linterResult.forEach(function (result) {
          console.log('\t' + chalk.red(result));
        });

         console.log('\n');
      }
    });
  });

   console.log('Done linting Pug files!');
  done();
};