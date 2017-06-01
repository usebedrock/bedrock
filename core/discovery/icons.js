'use strict';

const path = require('path');
const glob = require('glob');
const paths = require('../paths');

const ICONS_DIRECTORY = paths.content.icons.sourceDirectory;

function discover() {
  const svgIcons = glob.sync(path.join(ICONS_DIRECTORY, '*.svg'))
    .filter(file => file.indexOf('.svg') !== -1)
    .map(filename => path.parse(filename).name);

  const iconFontIcons = glob.sync(paths.content.iconFont.sourceFiles)
    .filter(file => file.indexOf('.svg') !== -1)
    .map(filename => path.parse(filename).name);

  return {
    svg: svgIcons,
    iconFont: iconFontIcons,
  }
}

module.exports = {
  discover: discover
};
