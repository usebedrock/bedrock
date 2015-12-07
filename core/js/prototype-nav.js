const $ = require('jquery');
const Cookies = require('js-cookie');

const ACTIVATION_KEYCODE = 77; // 'M' key
const ESC_KEYCODE = 27;
const NAV_STATE_COOKIE_KEY = 'prototypenav.cookie';

const $html = $('html');
const $prototypeNav = $('#__prototype-nav');
let isPrototypeNavOpen = Cookies.get(NAV_STATE_COOKIE_KEY) === 'true' || false;

if (isPrototypeNavOpen) {
  open();
}

function saveNavState(isOpen) {
  isPrototypeNavOpen = isOpen;
  Cookies.set(NAV_STATE_COOKIE_KEY, isPrototypeNavOpen);
}

function open() {
  $prototypeNav.addClass('br-prototype-nav-open');
  $html.addClass('br-prototype-nav-is-open');
  saveNavState(true);
}

function close() {
  $prototypeNav.removeClass('br-prototype-nav-open');
  $html.removeClass('br-prototype-nav-is-open');
  saveNavState(false);
}

function toggle() {
  isPrototypeNavOpen ? close() : open();
}

$(window).on('keyup', function (e) {
  if (e.keyCode === ESC_KEYCODE) {
    close();
  }
  else if (e.ctrlKey && e.keyCode == ACTIVATION_KEYCODE) {
    toggle();
  }
});
