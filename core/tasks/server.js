'use strict';

var glob = require('glob');
var path = require('path');
var express = require('express');
var jade = require('jade');
var beautify = require('js-beautify').html;
var fs = require('fs');

var config = require('../config');
var colors = require('../discovery/colors');
var icons = require('../discovery/icons');
var pages = require('../discovery/pages');
var patterns = require('../discovery/patterns');
var contentData = require('../discovery/content-data');
var paths = require('../paths');

var app = express();
app.use(express.static('dist'));
app.set('view engine', 'jade');
app.set('views', path.join(process.cwd(), './content/templates'));

const getDefaultLocals = require('./templates').getDefaultLocals;

module.exports = function () {
  app.get('*', function (req, res) {
    if (req.path === '/favicon.ico') {
      return;
    }

    let allLocals = Object.assign({}, getDefaultLocals(), {
      //filename: path.basename(templatePath).replace('.jade', ''),
      pathname: req.path.replace('/', '').replace('.html', '')
    });

    app.render(req.path.replace('/', '').replace('.html', ''), allLocals, function (err, html) {

      if (err) {
        res.send(`<pre>${err}</pre>`)
      } else {
        html = beautify(html, {
          logSuccess: false,
          indentSize: 2,
          unformatted: ['pre'],
          extraLiners: ['body']
        });

        res.send(html);
      }
    });
  });

  app.listen(9090, function () {
    console.log('Express server listening on port 9090');
  });
};

