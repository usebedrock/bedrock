const navigationToggle = document.querySelector('.c-nav-toggle');
const mobileNavigation = document.querySelector('.c-nav-mobile');
const navigationOpen = document.querySelector('.c-nav-open');
const navigationClose = document.querySelector('.c-nav-close');
const bodyElement = document.querySelector('body');
const htmlElement = document.querySelector('html');

const handleToggleClick = function handleToggleClick(e) {
  e.preventDefault();
  navigationToggle.classList.toggle('c-nav-toggle--active');
  mobileNavigation.classList.toggle('c-nav-mobile--active');
  navigationOpen.classList.toggle('c-nav-open--active');
  navigationClose.classList.toggle('c-nav-close--active');
  bodyElement.classList.toggle('u-no-scroll');
  htmlElement.classList.toggle('u-no-scroll');
}

navigationToggle.addEventListener('click', handleToggleClick, false);