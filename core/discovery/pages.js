'use strict';

const _ = require('lodash');

const dirTree = require('directory-tree');
const paths = require('../paths');

const TEMPLATES_BASE_DIRECTORY = paths.content.templates.path;
const TEMPLATES_MODULE_DIRECTORY = paths.content.templates.modulesPath;

function mapChildren(children) {
  children = children.map((obj) => {
    obj.href = obj.path.replace('.jade', '.html');
    obj.name = obj.name.replace('.jade', '');
    obj.id = obj.path.replace('.jade', '');

    if (obj.children) {
      mapChildren(obj.children);
    }

    return obj;
  });

  return _.sortBy(children, 'type');
}

function discover() {
  return _.chain(dirTree.directoryTree(TEMPLATES_BASE_DIRECTORY, ['.jade']).children)
    .filter(obj => obj.path.charAt(0) !== '_')
    .map(obj => {
      obj.id = obj.path.replace('.jade', '');

      if (obj.children) {
        obj.children = mapChildren(obj.children);
      }

      return obj;
    })
    .sortBy('type')
    .value();
}

module.exports = {
  discover: discover
};
