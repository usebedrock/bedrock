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
  page.href = '/' + page.path.replace('.pug', '.html');
  page.name = page.name.replace('.pug', '');
  page.id = page.path.replace('.pug', '');

  if (page.href === '') {
    page.href = '/';
  }

  return page;
}

function movePageStatesToParentPage(obj, index, collection) {
  if (!obj) {
    return;
  }

  if (obj.name.includes('--')) {
    const parentStateName = obj.name.split('--')[0];
    const parentState = collection.find(obj => obj.name === parentStateName);

    // Add the state to the parent page
    if (!parentState.states) {
      parentState.states = [obj];
    } else {
      parentState.states.push(obj);
    }
  }

  if (obj.children) {
    obj.children.forEach(movePageStatesToParentPage);
  }
}

function discover() {
  const pagesAndFoldersSortedByType = _.chain(dirTree.directoryTree(TEMPLATES_BASE_DIRECTORY, ['.pug']).children)
    .filter(obj => obj.path.charAt(0) !== '_')
    .map(obj => {
      obj = addPageInfo(obj);

      if (obj.children) {
        obj.children = mapChildren(obj.children);
      }

      return obj;
    })
    .sortBy('type')
    .forEach(movePageStatesToParentPage)
    .value();

  return pagesAndFoldersSortedByType.filter(p => !p.path.includes('--'));
}

module.exports = {
  discover: discover
};
