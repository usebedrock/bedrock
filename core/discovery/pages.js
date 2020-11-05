'use strict';

const _ = require('lodash');

const dirTree = require('directory-tree');
const paths = require('../paths');

const TEMPLATES_BASE_DIRECTORY = paths.content.templates.path;
const TEMPLATES_MODULE_DIRECTORY = paths.content.templates.modulesPath;

function mapChildren(children, parent) {
  children = children.map((obj) => {
    obj.path = obj.path.replace(TEMPLATES_BASE_DIRECTORY, '');
    obj = addPageInfo(obj, parent);

    if (obj.children) {
      mapChildren(obj.children, obj);
    }

    return obj;
  });

  return _.sortBy(children, 'type');
}

function addPageInfo(page, parent) {
  page.href = '/' + page.path.replace('.pug', '.html');
  page.name = page.name.replace('.pug', '');
  page.id = page.path.replace('.pug', '');
  // Copy array
  page.parents = parent.parents.slice()
  // Push current
  page.parents.push(page.name);

  if (page.href === '') {
    page.href = '/';
  }

  return page;
}

// Format to a not technical friendly label
// eg: form--error -> "Error"
function formatPageStateLabel(stateName) {
  var stateLabel = stateName.split("--")[1].split("-").join(" ");
  return stateLabel.substr(0,1).toUpperCase() + stateLabel.substr(1);
}

function movePageStatesToParentPage(obj, index, collection) {
  if (!obj) {
    return;
  }

  if (obj.name.includes('--')) {
    const parentStateName = obj.name.split('--')[0];
    const parentState = collection.find(obj => obj.name === parentStateName);

    // Format to a not technical friendly label
    // eg: form--error -> "Error"
    obj.label = formatPageStateLabel(obj.name)

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
  const pagesAndFoldersSortedByType = _.chain(dirTree(TEMPLATES_BASE_DIRECTORY, {
    extensions: /.pug/
  }).children)
    .filter(obj => !obj.name.startsWith('_'))
    .map(obj => {
      // Root item
      obj.parents = []
      obj.path = obj.path.replace(TEMPLATES_BASE_DIRECTORY, '');
      obj = addPageInfo(obj, obj);

      if (obj.children) {
        obj.children = mapChildren(obj.children, obj).filter(child => !child.name.startsWith('_'));
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
