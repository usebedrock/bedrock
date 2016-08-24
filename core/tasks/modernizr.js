const fs = require('fs');
const path = require('path');
const Modernizr = require('modernizr');
const mkdirp = require('mkdirp');
const paths = require('../paths');
const config = require('../../bedrock.config');

module.exports = function (done) {
  Modernizr.build(config.modernizr, function (output) {
    mkdirp(paths.compiled.js, function (err) {
      fs.writeFileSync(path.join(paths.compiled.js, 'modernizr.js'), output);
      done();
    });
  });
};
