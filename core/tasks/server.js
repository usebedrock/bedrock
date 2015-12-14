const glob = require('glob');
const path = require('path');
const express = require('express');
const jade = require('jade');
const beautify = require('js-beautify').html;
const fs = require('fs');

const config = require('../config');
const colors = require('../discovery/colors');
const pages = require('../discovery/pages');
const patterns = require('../discovery/patterns');
const paths = require('../paths');
const getDefaultLocals = require('./templates').getDefaultLocals;

const app = express();

app.use(express.static('dist'));
app.set('view engine', 'jade');
app.set('views', [
  path.join(process.cwd(), './content/templates'),
  path.join(process.cwd(), './core/templates')
]);

function renderView(req, res, viewName, customLocals) {
  const locals = Object.assign({}, getDefaultLocals(), customLocals);

  app.render(viewName, locals, function (err, html) {
    if (err) {
      if (err.message.includes('Failed to lookup view')) {
        res.render('404', locals);
      } else {
        res.send(`<pre>${err}</pre>`);
      }
    } else {
      html = beautify(html, {
        logSuccess: false,
        indentSize: 2,
        unformatted: ['pre', 'textarea'],
        extraLiners: ['body']
      });

      res.send(html);
    }
  });
}

module.exports = function () {
  app.get('/styleguide', function (req, res) {
    renderView(req, res, 'styleguide/index');
  });

  app.get('/styleguide/colors.html', function (req, res) {
    renderView(req, res, 'styleguide/colors');
  });

  app.get('/styleguide/:group', function (req, res) {
    const patternGroups = patterns.discover();
    const patternGroup = req.params.group.replace('.html', '');

    renderView(req, res, 'styleguide/pattern-group', {
      pathname: req.path.replace('/', '').replace('.html', ''),
      patternGroup: patternGroups.byGroup[patternGroup]
    });
  });

  app.get('*', function (req, res) {
    const viewName = req.path.replace('/', '').replace('.html', '');
    renderView(req, res, viewName, {
      pathname: viewName
    });
  });

  app.listen(config.ports.express, function () {
    console.log(`Express server listening on port ${config.ports.express}`);
  });
};

