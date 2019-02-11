
/* Dropdown JS
   ========================================================================== */

// Collect all triggers on the page
const dropdownTriggers = document.querySelectorAll('[data-dropdown]');
const dropdowns = document.querySelectorAll('.c-menu:not(.js-no-action)');
const dropdownsInDropdowns = document.querySelectorAll('.c-menu .c-menu:not(.js-no-action)');
const bodyElement = document.querySelector('body');

// Global settings
const dropdownActiveClass = 'c-menu--visible';
const dropdownMargin = 4;

let currentNestedDropdownActiveEl = null;
let isNestedDropdownOpen = false;

// Find target dropdown element
const findDropdown = triggerEl => {
  const targetId = triggerEl.getAttribute('data-dropdown');
  return document.getElementById(targetId);
};

// Add or remove classes on clicking a trigger
const handleClick = e => {

  e.stopPropagation();

  const targetEl = findDropdown(e.currentTarget);

  // This code to make dropdowns in dropdowns work, it is dirty but we have not found a chance to refactor this in our projects so far.
  if (e.currentTarget.closest('.c-menu')) {

    if (targetEl.classList.contains(dropdownActiveClass)) {
        targetEl.classList.remove(dropdownActiveClass);
    } else {
        for (let i = 0; i < dropdownsInDropdowns.length; i += 1) {
          dropdownsInDropdowns[i].classList.remove(dropdownActiveClass);
        }
        targetEl.classList.add(dropdownActiveClass);
        currentNestedDropdownActiveEl = targetEl;
        isNestedDropdownOpen = true;

    }

  } else if (targetEl.classList.contains(dropdownActiveClass)) {

    // Basic situation for first level dropdown
    targetEl.classList.remove(dropdownActiveClass);

    // Remove any nested open dropdown active classe
    if(isNestedDropdownOpen) {
      currentNestedDropdownActiveEl.classList.remove(dropdownActiveClass);
      isNestedDropdownOpen = false;
    }

  } else {
    // Basic situation for first level dropdown
    for (let i = 0; i < dropdowns.length; i += 1) {
      dropdowns[i].classList.remove(dropdownActiveClass);
    }
    targetEl.classList.add(dropdownActiveClass);
  }
};

// Don't propagate click on dropdown
const handleDropdownClick = e => {

  e.stopPropagation();
  
  // If some nested dropdown is active
  // means we clicked on the root dropdown and want to close it
  if(isNestedDropdownOpen) {
    currentNestedDropdownActiveEl.classList.remove(dropdownActiveClass);
    isNestedDropdownOpen = false;
  }

};

// Hide all dropdowns when clicking outside
const handleOutsideClick = () => {
  
  for (let i = 0; i < dropdowns.length; i += 1) {
    dropdowns[i].classList.remove(dropdownActiveClass);
  }
};

function autoSizing(data) {
  data.styles.width = data.offsets.reference.width;
  return data;
}

// Position dropdown
const positionDropdown = triggerEl => {
  const targetEl = findDropdown(triggerEl);
  const placement =
    triggerEl.getAttribute('data-dropdown-placement') || 'bottom-start';
  const autosize =
    triggerEl.getAttribute('data-dropdown-autosize') || false;
  new Popper(triggerEl, targetEl, {
    placement,
    modifiers: {
      flip: {
        behavior: ['bottom-start', 'bottom-end', 'top-start', 'top-end']
      },
      offset: {
        offset: `0, ${dropdownMargin}`
      },
      autoSizing: {
        enabled: autosize,
        fn: autoSizing,
        order: 840,
       },
    }
  });

};

// Move all dropdowns to root level (to avoid wrong positioning)
for (let i = 0; i < dropdowns.length; i += 1) {
  bodyElement.appendChild(dropdowns[i]);
  dropdowns[i].addEventListener('click', handleDropdownClick, false);
}

// Loop through all triggers on the page
window.onload = () => {
  for (let i = 0; i < dropdownTriggers.length; i += 1) {
    // Position dropdowns
    positionDropdown(dropdownTriggers[i]);
    // Attach event listeners
    dropdownTriggers[i].addEventListener('click', handleClick, false);
  }
};

// Add click listener on outside
document.addEventListener('click', handleOutsideClick, false);
