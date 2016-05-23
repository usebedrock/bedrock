'use strict';

const path = require('path');
const glob = require('glob');
const paths = require('../paths');

const ICONS_DIRECTORY = paths.content.icons.sourceDirectory;

function discover() {
  return glob.sync(path.join(ICONS_DIRECTORY, '*.svg'))
    .filter(file => file.indexOf('.svg') !== -1)
    .map(filename => filename.replace(ICONS_DIRECTORY + '/', '').replace('.svg', ''));
}

module.exports = {
  discover: discover
};
