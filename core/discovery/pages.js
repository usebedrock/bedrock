'use strict';

const _ = require('lodash');

const dirTree = require('directory-tree');
const paths = require('../paths');

const TEMPLATES_BASE_DIRECTORY = paths.content.templates.path;
const TEMPLATES_MODULE_DIRECTORY = paths.content.templates.modulesPath;

function mapChildren(children) {
  children = children.map((obj) => {
    obj = addPageInfo(obj);

    if (obj.children) {
      mapChildren(obj.children);
    }

    return obj;
  });

  return _.sortBy(children, 'type');
}

function addPageInfo(page) {
  page.href = '/' + page.path.replace('.jade', '.html').replace('index.html', '');
  page.name = page.name.replace('.jade', '');
  page.id = page.path.replace('.jade', '');

  if (page.href === '') {
    page.href = '/';
  }

  return page;
}

function discover() {
  return _.chain(dirTree.directoryTree(TEMPLATES_BASE_DIRECTORY, ['.jade']).children)
    .filter(obj => obj.path.charAt(0) !== '_')
    .map(obj => {
      obj = addPageInfo(obj);

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
