const $ = require('jquery');
const packageJson = require('../../package.json');

const ACTIVATION_KEYCODE = 77; // 'M' key or 'B' key for Windows
const ACTIVATION_KEYCODE_WINDOWS = 66; // 'M' key or 'B' key for Windows
const ESC_KEYCODE = 27;
const NAV_STATE_STORAGE_KEY = `bedrock.${packageJson.name}.prototypeNavState`;

let navState = {
  isOpen: false,
  closedModules: [],
};

const $html = $('html');
const $prototypeNav = $('#__prototype-nav');
const $moduleLabels = $prototypeNav.find(`.br-tree-dir-title`);

try {
  const savedState = JSON.parse(localStorage.getItem(NAV_STATE_STORAGE_KEY));
  navState = Object.assign({}, navState, savedState);
} catch (err) {
  console.warn('There was an error parsing the saved state for the prototype navigation.');
}

// Set up unique IDs for all module titles
$prototypeNav
  .find('.br-tree-dir-title')
  .each(function () {
    let randomId = Math.floor(Math.random() * 1000)
    let moduleIds = $(this)
      .parentsUntil('.br-bordered-list')
      .find('.br-tree-dir-title')
      .map(function () {
        return $(this).text();
      })
      .get();

    const indexOfClickedModule = moduleIds.findIndex(e => e === $(this).text());
    moduleIds = moduleIds.splice(0, indexOfClickedModule + 1);

    $(this).attr('id', moduleIds.join('-') + randomId);
  });

/**
 * Closes a module based on ID.
 */
function closeModule(moduleId) {
  $(`#${moduleId}`).parents('.br-tree-dir').first()
    .addClass('br-tree-dir--is-collapsed');

  navState.closedModules.push(moduleId);
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
$moduleLabels.on('click', function () {
  const moduleId = $(this).attr('id');
  toggleModule(moduleId);
});

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
  $prototypeNav.addClass('br-prototype-nav-open');
  $html.addClass('br-prototype-nav-is-open');
  navState.isOpen = true;
  saveNavState();
}

function closeNavigation() {
  $prototypeNav.removeClass('br-prototype-nav-open');
  $html.removeClass('br-prototype-nav-is-open');
  navState.isOpen = false;
  saveNavState();
}

function toggleNavigation() {
  navState.isOpen ? closeNavigation() : openNavigation();
}

$(window).on('keyup', function (e) {
  if (e.keyCode === ESC_KEYCODE ) {
    closeNavigation();
  }
  else if (e.ctrlKey && (e.keyCode == ACTIVATION_KEYCODE || e.keyCode == ACTIVATION_KEYCODE_WINDOWS)) {
    toggleNavigation();
  }
});
