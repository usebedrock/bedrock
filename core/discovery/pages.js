'use strict';

const dirTree = require('directory-tree');
const paths = require('../paths');

const TEMPLATES_BASE_DIRECTORY = paths.content.templates.path;
const TEMPLATES_MODULE_DIRECTORY = paths.content.templates.modulesPath;

function mapChildren(children) {
  children = children.map((obj) => {
    obj.href = obj.path.replace('.jade', '.html');
    obj.name = obj.name.replace('.jade', '');

    if (obj.children) {
      mapChildren(obj.children);
    }

    return obj;
  });

  return children;
}

function discover() {
  const baseTree = dirTree.directoryTree(TEMPLATES_BASE_DIRECTORY, ['.jade']).children
    .filter(obj => obj.type === 'file')
    .map(obj => {
      obj.href = '/' + obj.path.replace('.jade', '.html');
      obj.name = obj.name.replace('.jade', '');
      return obj;
    })
    .concat([{
      path: 'styleguide.jade',
      href: '/styleguide',
      name: 'Styleguide'
    }]);

  const modulesTree = dirTree.directoryTree(TEMPLATES_MODULE_DIRECTORY, ['.jade']).children
    .map(obj => {
      if (obj.children) {
        obj.children = mapChildren(obj.children);
      }
      return obj;
    });

  return {
    base: baseTree,
    modules: modulesTree
  };
}

module.exports = {
  discover: discover
};
