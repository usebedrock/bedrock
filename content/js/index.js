require('../../core/js/index');

// All @matial imports

import { MDCRipple } from '@material/ripple/dist/mdc.ripple';
import { MDCChipSet } from '@material/chips/dist/mdc.chips';
import { MDCFormField } from '@material/form-field/dist/mdc.formField';
import { MDCCheckbox } from '@material/checkbox/dist/mdc.checkbox';
import { MDCFloatingLabel } from '@material/floating-label/dist/mdc.floatingLabel';

// import MDCDataTable from './_custom/dataTable';

// Element variables

const buttons = document.querySelectorAll('.mdc-button');
const chips = document.querySelectorAll('.mdc-chip-set');
const checkboxes = document.querySelectorAll('.mdc-checkbox');
const floatingLabels = document.querySelectorAll('.mdc-floating-label');

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
  if (floatingLabels) {
    handleMDCFloatingLabels(floatingLabels);
  }
  
  // new MDCDataTable();
}

// General MDC Button function
// Add all functions related to MDC Buttons

function handleMDCButton(buttonsEl) {
  handleRipple(buttonsEl);
}

// General MDC Chips function
// Add all functions related to MDC Chips

function handleMDCChips(chipsEl) {
  for (var i = 0; i < chipsEl.length; i++) {
    new MDCChipSet(chipsEl[i]);
  }
}

// General MDC Checkboxes function
// Add all functions related to MDC Checkboxes

function handleMDCCheckboxes(checkboxesEl) {
  [].forEach.call(checkboxesEl, function(checkbox) {
    const formField = checkbox.parentElement;
    if (formField) {
      console.log('There\'s no checkbox field!');
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

// General MDC Floating labels function

function handleMDCFloatingLabels(floatingLabelsEl) {
  [].forEach.call(floatingLabelsEl, function(label) {
    const formField = label.parentElement;
    if (formField) {
      console.log('There\'s no form field!');
    } else {
      const formFieldInstance = new MDCFormField(formField);
      const labelInstance = new MDCFloatingLabel(label);
      formFieldInstance.input = labelInstance;
    }
  });
};

init();
