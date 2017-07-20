'use strict';

const path = require('path');
const glob = require('glob');
const groupBy = require('lodash/collection/groupBy');

const paths = require('../paths');

function isSvgFile(filename) {
  return path.parse(filename).ext === '.svg';
}

function discover() {
  const svgIcons = glob.sync(paths.content.icons.sourceFiles)
    .filter(isSvgFile)
    .map(filename => {
      const parsedPath = path.parse(filename);
      let category = parsedPath.dir.replace(`${paths.content.icons.sourceDirectory}`, '').replace('/', '');

      return {
        name: path.parse(filename).name,
        category,
      };
    });

  const iconFontIcons = glob.sync(paths.content.iconFont.sourceFiles)
    .filter(isSvgFile)
    .map(filename => path.parse(filename).name);

  return {
    svg: groupBy(svgIcons, 'category'),
    iconFont: iconFontIcons,
  }
}

module.exports = {
  discover: discover
};
