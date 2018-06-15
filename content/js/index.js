require('../../core/js/index');

// All @matial imports

import { MDCRipple } from '@material/ripple/dist/mdc.ripple';
import { MDCChipSet } from '@material/chips/dist/mdc.chips';
import { MDCFormField } from '@material/form-field/dist/mdc.formField';
import { MDCCheckbox } from '@material/checkbox/dist/mdc.checkbox';

// import MDCDataTable from './_custom/dataTable';

// Element variables

const buttons = document.querySelectorAll('.mdc-button');
const chips = document.querySelectorAll('.mdc-chip-set');
const checkboxes = document.querySelectorAll('.mdc-checkbox');

function init() {
  if (buttons) {
    handleMDCButton(buttons);
  }
  if (chips) {
    handleMDCChips(chips);
  }
  if (checkboxes) {
    handleMDCCheckboxes(checkboxes);
  }
  // new MDCDataTable();
}

// General MDC Button function
// Add all functions related to MDC Button page

function handleMDCButton(buttonsEl) {
  handleRipple(buttonsEl);
}

// General MDC Chips function
// Add all functions related to MDC Chips page

function handleMDCChips(chipsEl) {
  for (var i = 0; i < chipsEl.length; i++) {
    new MDCChipSet(chipsEl[i]);
  }
}

// General MDC Checkboxes function
// Add all functions related to MDC Checkboxes page

function handleMDCCheckboxes(checkboxesEl) {
  [].forEach.call(checkboxesEl, function(checkbox) {
    const formField = checkbox.parentElement;
    if (formField) {
      console.log('There\'s no form field!');
    } else {
      const formFieldInstance = new MDCFormField(formField);
      const checkboxInstance = new MDCCheckbox(checkbox);
      formFieldInstance.input = checkboxInstance;
    }
  });
};

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
