require('../../core/js/index');

// All @matial imports

import {MDCRipple} from '@material/ripple/dist/mdc.ripple';
import {MDCChipSet} from '@material/chips/dist/mdc.chips';
import {MDCFormField} from '@material/form-field/dist/mdc.formField';
import {MDCCheckbox} from '@material/checkbox/dist/mdc.checkbox';
import {MDCTextField} from '@material/textfield/dist/mdc.textfield';
import {MDCSelect} from '@material/select/dist/mdc.select';
import {MDCSlider} from '@material/slider/dist/mdc.slider';
import {MDCTab, MDCTabFoundation} from '@material/tabs/dist/mdc.tabs';
import {MDCTabBar, MDCTabBarFoundation} from '@material/tabs/dist/mdc.tabs';
import {MDCTabBarScroller, MDCTabBarFoundationScroller} from '@material/tabs/dist/mdc.tabs';

// import MDCDataTable from './_custom/dataTable';

// Element variables

const buttons = document.querySelectorAll('.mdc-button');
const fabs = document.querySelectorAll('.mdc-fab');
const iconbuttons = document.querySelectorAll('.mdc-icon-button');
const chips = document.querySelectorAll('.mdc-chip-set');
const checkboxes = document.querySelectorAll('.mdc-checkbox');
const textfields = document.querySelectorAll('.mdc-text-field');
const selects = document.querySelectorAll('.mdc-select');
const sliders = document.querySelectorAll('.mdc-slider');
const tabbars = document.querySelectorAll('.mdc-tab-bar')
const tabbarsscrollers = document.querySelectorAll('.mdc-tab-bar-scroller');

function init() {
  handleMDCChips(chips);
  handleMDCCheckboxes(checkboxes);
  handleMDCTextFields(textfields);
  handleMDCSelects(selects);
  handleMDCSliders(sliders);
  handleMDCTabBars(tabbars);
  handleMDCTabBarScrollers(tabbarsscrollers);

  handleMDCRipple(buttons);
  handleMDCRipple(iconbuttons);
  handleMDCRipple(fabs);
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
  for (var i = 0; i < checkboxesEl.length; i++) {
    new MDCCheckbox(checkboxesEl[i]);
  }
};

// General MDC Floating labels function

function handleMDCTextFields(textfieldsEl) {
  for (var i = 0; i < textfieldsEl.length; i++) {
    new MDCTextField(textfieldsEl[i]);
  }
};

// General MDC Selects function

function handleMDCSelects(selectsEl) {
  for (var i = 0; i < selectsEl.length; i++) {
    new MDCSelect(selectsEl[i]);
  }
};

// General MDC Sliders function

function handleMDCSliders(slidersEl) {
  for (var i = 0; i < slidersEl.length; i++) {
    new MDCSlider(slidersEl[i]);
  }
};

function handleMDCTabBars(tabbarsEl) {
  for (var i = 0; i < tabbarsEl.length; i++) {
    new MDCTabBar(tabbarsEl[i]);
  }
};

function handleMDCTabBarScrollers(tabbarsscrollersEl) {
  for (var i = 0; i < tabbarsscrollersEl.length; i++) {
    new MDCTabBarScroller(tabbarsscrollersEl[i]);
  }
};

// Helper functions (reusable function)

function handleMDCRipple(elements) {
  if (!elements) {
    console.log('There are no elements that are fit for ripple effect');
  } else {
    for (var i = 0; i < elements.length; i++) {
      new MDCRipple(elements[i]);
      elements[i].unbounded = true;
    }
  }
};

init();
