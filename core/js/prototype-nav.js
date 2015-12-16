const $ = require('jquery');

const ACTIVATION_KEYCODE = 77; // 'M' key
const ESC_KEYCODE = 27;
const NAV_STATE_STORAGE_KEY = 'bedrock.prototypeNavState';
const MODULE_LABEL_CLASS = 'br-bordered-list-label';
const MODULE_IS_COLLAPSED_CLASS = 'br-prototype-nav-item-is-collapsed';

let navState = {
  isOpen: false,
  closedModules: []
};

const $html = $('html');
const $prototypeNav = $('#__prototype-nav');
const $moduleLabels = $prototypeNav.find(`.${MODULE_LABEL_CLASS}`);

try {
  const savedState = JSON.parse(localStorage.getItem(NAV_STATE_STORAGE_KEY));
  navState = Object.assign({}, navState, savedState);
} catch (err) {
}

function addModuleToClosedModules(module) {
  navState.closedModules.push(module);
  saveNavState();
}

function removeModuleFromClosedModules(module) {
  navState.closedModules = navState.closedModules.filter(m => m !== module);
  saveNavState();
}

// Handle state on page load
if (navState.isOpen) {
  open();
}

for (const moduleId of navState.closedModules) {
  const $moduleParent = $prototypeNav
    .find(`.${MODULE_LABEL_CLASS}[data-module="${moduleId}"]`)
    .parents('li')
    .eq(0);

  $moduleParent.addClass(MODULE_IS_COLLAPSED_CLASS);
}

function saveNavState() {
  localStorage.setItem(NAV_STATE_STORAGE_KEY, JSON.stringify(navState));
}

function open() {
  $prototypeNav.addClass('br-prototype-nav-open');
  $html.addClass('br-prototype-nav-is-open');
  navState.isOpen = true;
  saveNavState();
}

function close() {
  $prototypeNav.removeClass('br-prototype-nav-open');
  $html.removeClass('br-prototype-nav-is-open');
  navState.isOpen = false;
  saveNavState();
}

function toggle() {
  navState.isOpen ? close() : open();
}

$moduleLabels.on('click', function () {
  const moduleId = $(this).data('module');
  const $parent = $(this).parents('li').eq(0);

  if ($parent.hasClass(MODULE_IS_COLLAPSED_CLASS)) {
    $parent.removeClass(MODULE_IS_COLLAPSED_CLASS);
    removeModuleFromClosedModules(moduleId);
  } else {
    $parent.addClass(MODULE_IS_COLLAPSED_CLASS);
    addModuleToClosedModules(moduleId);
  }
});

$(window).on('keyup', function (e) {
  if (e.keyCode === ESC_KEYCODE) {
    close();
  }
  else if (e.ctrlKey && e.keyCode == ACTIVATION_KEYCODE) {
    toggle();
  }
});
