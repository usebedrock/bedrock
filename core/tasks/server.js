'use strict';

var glob = require('glob');
var path = require('path');
var express = require('express');
var jade = require('jade');
var beautify = require('js-beautify').html;
var fs = require('fs');

var config = require('../config');
var colors = require('../discovery/colors');
var pages = require('../discovery/pages');
var patterns = require('../discovery/patterns');
var paths = require('../paths');

var app = express();
app.use(express.static('dist'));
app.set('view engine', 'jade');
app.set('views', [
  path.join(process.cwd(), './content/templates'),
  path.join(process.cwd(), './core/templates')
]);

const getDefaultLocals = require('./templates').getDefaultLocals;

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
    renderView(req, res, req.path.replace('/', '').replace('.html', ''), {
      pathname: req.path.replace('/', '').replace('.html', '')
    });
  });

  app.listen(9090, function () {
    console.log('Express server listening on port 9090');
  });
};

