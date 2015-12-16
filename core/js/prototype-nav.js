const $ = require('jquery');
const Cookies = require('js-cookie');

const ACTIVATION_KEYCODE = 77; // 'M' key
const ESC_KEYCODE = 27;
const NAV_STATE_STORAGE_KEY = 'bedrock.prototypeNavState';

const $html = $('html');
const $prototypeNav = $('#__prototype-nav');

let navState = {
  isOpen: false
};

try {
  const savedState = JSON.parse(localStorage.getItem(NAV_STATE_STORAGE_KEY));
  navState = Object.assign({}, navState, savedState);
} catch (err) {
}

if (navState.isOpen) {
  open();
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

$(window).on('keyup', function (e) {
  if (e.keyCode === ESC_KEYCODE) {
    close();
  }
  else if (e.ctrlKey && e.keyCode == ACTIVATION_KEYCODE) {
    toggle();
  }
});
