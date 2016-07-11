'use strict';

const path = require('path');
const glob = require('glob');
const paths = require('../paths');

const ICONS_DIRECTORY = paths.content.icons.sourceDirectory;

function discover() {
  const svgIcons = glob.sync(path.join(ICONS_DIRECTORY, '*.svg'))
    .filter(file => file.indexOf('.svg') !== -1)
    .map(filename => filename.replace(ICONS_DIRECTORY + '/', '').replace('.svg', ''));

  const iconFontIcons = glob.sync(paths.content.iconFont.sourceFiles)
    .filter(file => file.indexOf('.svg') !== -1)
    .map(filename => filename.replace(paths.content.iconFont.sourceDirectory, '').replace('.svg', ''));

  return {
    svg: svgIcons,
    iconFont: iconFontIcons,
  }
}

module.exports = {
  discover: discover
};
