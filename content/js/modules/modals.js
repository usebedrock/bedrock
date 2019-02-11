/* Modal JS
   ========================================================================== */

// Global settings
const modalClass = 'c-modal';
const backdropClass = 'c-modal-backdrop';
const backdropVisibleclass = 'c-modal-backdrop--visible';
const contextClass = 'c-modal-context';
const contextVisibleClass = 'c-modal-context--visible';
const queryParams = getQueryParameters();

// DOM elements
const bodyEl = document.querySelector('body');
const modalTriggers = document.querySelectorAll('[data-modal]');
const closeButtons = document.querySelectorAll('[data-modal-close]');
const contexts = document.querySelectorAll(`.${contextClass}`);
const modals = document.querySelectorAll(`.${modalClass}`);
let backdrop = document.querySelector(`${backdropClass}`);

// Check for triggers on page
if (modalTriggers.length > 0) {
  // Create backdrop if non-existent
  if (backdrop === null) {
    backdrop = document.createElement('div');
    backdrop.classList.add(backdropClass);
    bodyEl.appendChild(backdrop);
  }
}

// Find parent context
const findParentContext = function findParentContext(el) {
  let parentEl = el;
  while (!parentEl.classList.contains(contextClass)) {
    parentEl = parentEl.parentNode;
  }
  return parentEl;
};

// Open modal
const showModal = function showModal(contextEl) {
  contextEl.classList.add(contextVisibleClass);
  backdrop.classList.add(backdropVisibleclass);
  // Push modal to URL of browser
  window.history.pushState('page', 'Title', `${window.location.origin}${window.location.pathname}?modal=${contextEl.getAttribute('id')}`);
};

// Close modal
const closeModal = function closeModal(contextEl) {
  contextEl.classList.remove(contextVisibleClass);
  backdrop.classList.remove(backdropVisibleclass);
  // Push normal URL to browser again
  window.history.pushState('page', 'Title', `${window.location.origin}${window.location.pathname}`);
};

// Handle trigger clicks
const handleTriggerClick = function handleTriggerClick(e) {
  e.preventDefault();
  const contextId = e.currentTarget.getAttribute('data-modal');
  const contextEl = document.getElementById(contextId);
  showModal(contextEl);
};

// Handle close button clicks
const handleCloseClicks = function handleCloseClicks(e) {
  e.preventDefault();
  const contextEl = findParentContext(e.currentTarget);
  closeModal(contextEl);
};

// Prevent clicks on modal itself to propagate
const handleModalClicks = function handleModalClicks(e) {
  e.stopPropagation();
};

// Close modal on click outside
const handleContextClicks = function handleContextClicks(e) {
  e.preventDefault();
  const activeContext = document.querySelector(`.${contextVisibleClass}`);
  closeModal(activeContext);
};

// Close modal on pressing escape key
const handleEscKey = function handleEscapeKey(e) {
  if (e.keyCode === 27) {
    const activeContext = document.querySelector(`.${contextVisibleClass}`);
    closeModal(activeContext);
  }
};

// Get query parameters to open modals if they're in the URL
function getQueryParameters(str) {
  return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
}

// If there is a parameter `modal` in the URL, call that modal
if (queryParams.modal) {
  const callModal = document.getElementById(queryParams.modal);
  showModal(callModal);
}

// Move contexts to root element
for (let i = 0; i < contexts.length; i += 1) {
  bodyEl.appendChild(contexts[i]);
}

// Add click listener to triggers
for (let i = 0; i < modalTriggers.length; i += 1) {
  modalTriggers[i].addEventListener('click', handleTriggerClick, false);
}

// Add click listener to close buttons
for (let i = 0; i < closeButtons.length; i += 1) {
  closeButtons[i].addEventListener('click', handleCloseClicks, false);
}

// Add click listener to modals
for (let i = 0; i < modals.length; i += 1) {
  modals[i].addEventListener('click', handleModalClicks, false);
}

// Add click listener to contexts
for (let i = 0; i < contexts.length; i += 1) {
  contexts[i].addEventListener('click', handleContextClicks, false);
}

// Add click listener to key press
document.addEventListener('keyup', handleEscKey, false);
