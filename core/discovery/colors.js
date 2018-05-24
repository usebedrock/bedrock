'use strict';

const fs = require('fs');
const _ = require('lodash');
const paths = require('../paths');
const config = require('../../bedrock.config');

function discover() {
  if (!config.styleguide && !config.styleguide.colors) {
    return [];
  }

  let colors = JSON.parse(fs.readFileSync(config.styleguide.colors, 'utf8'));
  // Remove the _comment of the 
  colors = colors.filter((entry) => entry._comment === undefined)

  return colors;
}

function getSassVariableToInject() {
  let sassVariables = "";
  discover().map((colorCategory) => {
    colorCategory.colors.map((color) => {
      sassVariables += `${color.name}:${color.value};\n`
    })
  })
  return sassVariables;
}

module.exports = {
  discover: discover,
  getSassVariableToInject: getSassVariableToInject
};
