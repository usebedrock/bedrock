require('../../core/js/index');

// All @matial imports

import { MDCRipple } from '@material/ripple/dist/mdc.ripple';

// Element variables

const buttons = document.querySelectorAll('.mdc-button');

function init() {
  // Check if there are buttons on page
  // Also able to write the code like this: (but the console.log is just for ref. for now)
  //    if (buttons) {
  //      handleMDCButton();
  //    }

  if (!buttons) {
    console.log('There are no buttons on this page');
  } else {
    handleMDCButton();
  }
}

// General MDC Button function
// Add all functions related to MDC Button page

function handleMDCButton() {
  handleRipple(buttons);
}

// Helper functions (reusable function)

function handleRipple(elements) {
  if (!elements) {
    console.log('There are no elements that are fit for ripple effect');
  } else {
    for (var i = 0; i < elements.length; i++) {
      new MDCRipple(elements[i]);
    }
  }
};

init();
