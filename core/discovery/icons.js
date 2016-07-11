'use strict';

const path = require('path');
const glob = require('glob');
const paths = require('../paths');

const ICONS_DIRECTORY = paths.content.icons.sourceDirectory;

function discover() {
  const svgIcons = glob.sync(path.join(ICONS_DIRECTORY, '*.svg'))
    .filter(file => file.indexOf('.svg') !== -1)
    .map(filename => filename.replace(ICONS_DIRECTORY + '/', '').replace('.svg', ''));

  const iconFontIcons = glob.sync('content/icon-font-source/*.svg')
    .filter(file => file.indexOf('.svg') !== -1)
    .map(filename => filename.replace('content/icon-font-source/', '').replace('.svg', ''));

  return {
    svg: svgIcons,
    iconFont: iconFontIcons,
  }
}

module.exports = {
  discover: discover
};
