const fs = require('fs');
const path = require('path');
const glob = require('glob');
const jade = require('jade');
const cheerio = require('cheerio');
const chalk = require('chalk');

const locals = require('../templates/locals');
const paths = require('../paths');

const allTemplatePaths = glob.sync(paths.content.templates.all);
const linterPaths = glob.sync(paths.content.linter.tests);

module.exports = function (done) {
  console.log('Running linters on Jade templates...\n');

  allTemplatePaths.forEach(function (templatePath) {
    const jadeContent = fs.readFileSync(templatePath, 'utf8');

    const compiledHtml = jade.compile(jadeContent, {
      pretty: true,
      basedir: 'content',
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

  console.log('Done linting Jade files!');
  done();
};
