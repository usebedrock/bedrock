// jQuery
const $ = require('jquery');
window.$ = $;

// Bootstrap bundle
require('bootstrap/dist/js/bootstrap.bundle');
require('holderjs');

$(function() {

  // Custom javascript
  require('./file-inputs');
  require('./tooltips');
  require('./popovers');

});

// Require JS to render prototype,
// styleguide and navigation.
// Remove this line when going to production.
//
require('../../core/js/index');