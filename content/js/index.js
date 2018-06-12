require('../../core/js/index');

// Init ripple for buttons

import { MDCRipple } from '@material/ripple/dist/mdc.ripple';

const buttons = document.querySelectorAll('.mdc-button');

for (var i = 0; i < buttons.length; i++) {
  new MDCRipple(buttons[i]);
}