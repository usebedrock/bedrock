import $ from 'jquery';

import packageJson from '../../package.json';
import config from '../discovery/config';

const ACTIVATION_KEYCODE = 77; // 'M' key or 'B' key for Windows
const ACTIVATION_KEYCODE_WINDOWS = 66; // 'M' key or 'B' key for Windows
const ESC_KEYCODE = 27;
const NAV_STATE_STORAGE_KEY = `bedrock.${packageJson.name}.prototypeNavState`;

let navState = {
  isOpen: false,
  closedModules: [],
  langSelected: config.languages && config.languages.find((lang) => lang.default).id
};

const $html = document.documentElement;
const $prototypeNav = document.getElementById('__prototype-nav');
const $moduleLabels = document.querySelector('__prototype-nav').querySelectorAll('.br-tree-dir-title')


try {
  const savedState = JSON.parse(localStorage.getItem(NAV_STATE_STORAGE_KEY));
  navState = Object.assign({}, navState, savedState);
} catch (err) {
  console.warn('There was an error parsing the saved state for the prototype navigation.');
}

// Set up unique IDs for all module titles
$moduleLabels.forEach(item =>  myFunc(currentValue, index) ){
 console.log("Array Current Index is: " + index + " :: Value is: " + currentValue + item); 
});


  // .each(function () {
  //   let moduleIds = $(this)
  //     .parentsUntil('.br-bordered-list')
  //     .children('.br-tree-dir-title')
  //     .map(function () {
  //       return $(this).text();
  //     })
  //     .get();
  //
  //   // Replace space by -
  //   moduleIds = moduleIds.map((moduleId) => {
  //     return moduleId.split(" ").join("-")
  //   })
  //
  //   $(this).attr('id', moduleIds.join('-'));
  // });

/**
 * Closes a module based on ID.
 */

function closeModule(moduleId) {
  $(`#${moduleId}`).parents('.br-tree-dir').first()
    .classList.add('br-tree-dir--is-collapsed');

  if(navState.closedModules.indexOf(moduleId) === -1) {
    navState.closedModules.push(moduleId);
  }
}

/**
 * Opens a module based on ID.
 */

function openModule(moduleId) {
  $(`#${moduleId}`).parents('.br-tree-dir').first()
    .removeClass('br-tree-dir--is-collapsed');

  navState.closedModules = navState.closedModules.filter(id => id !== moduleId);
}

/**
 * Determines whether to close or open a module, and then saves the state.
 */

function toggleModule(moduleId) {
  const isClosed = $(`#${moduleId}`).parents('.br-tree-dir').first().hasClass('br-tree-dir--is-collapsed');
  isClosed ? openModule(moduleId) : closeModule(moduleId);
  saveNavState();
}

/**
 * Set up listener for module title clicks.
 */

//$moduleLabels.addEventListener('click', function() { let moduleId = $(this).attr('id'); toggleModule(moduleId); }, false);

// Handle state on page load: open/close nav and close saved modules
if (navState.isOpen) {
  openNavigation();
}

if (navState.closedModules.length > 0) {
  navState.closedModules.forEach(moduleId => closeModule(moduleId));
}

function saveNavState() {
  localStorage.setItem(NAV_STATE_STORAGE_KEY, JSON.stringify(navState));
}

function openNavigation() {
  $prototypeNav.classList.add('br-prototype-nav-open');
  $prototypeNav.setAttribute('aria-hidden', 'false');
  $html.classList.add('br-prototype-nav-is-open');
  navState.isOpen = true;
  saveNavState();
}

function closeNavigation() {
  $prototypeNav.classList.remove('br-prototype-nav-open');
  $html.classList.remove('br-prototype-nav-is-open');
  $prototypeNav.setAttribute('aria-hidden', 'true');
  navState.isOpen = false;
  saveNavState();
}

function toggleNavigation() {
  navState.isOpen ? closeNavigation() : openNavigation();
}

document.querySelector('.br-prototype-close-nav').addEventListener('click', closeNavigation, false);

window.addEventListener('keyup', function(e) {
  if (e.keyCode === ESC_KEYCODE ) {
    closeNavigation();
  }
  else if (e.ctrlKey && (e.keyCode == ACTIVATION_KEYCODE || e.keyCode == ACTIVATION_KEYCODE_WINDOWS)) {
    toggleNavigation();
  }
}, false);
