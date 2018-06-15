// jQuery
const $ = require('jquery');
window.$ = $;

// Bootstrap bundle
require('bootstrap/dist/js/bootstrap.bundle');
// Image holders
require('holderjs');

$(function() {

  // Custom javascript
  require('./tooltips');
  require('./popovers');

});

// Require JS to render prototype, styleguide and navigation.
// Remove this line when going to production.
require('../../core/js/index');