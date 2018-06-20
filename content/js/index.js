// Load jQuery
const $ = require('jquery');
window.$ = $;

// Bootstrap JS bundle
require('bootstrap/dist/js/bootstrap.bundle');

// Image holders
require('holderjs');

$(function() {

  // Enable standard popovers everywhere
  $('[data-toggle="popover"]').popover();
  
  // Enable tooltips everywhere
  $('[data-toggle="tooltip"]').tooltip();

});

/*
  Require JS to render prototype, styleguide and navigation.
  Remove this line when going to production.
*/

require('../../core/js/index');