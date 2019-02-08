const $ = require('jquery');
window.$ = $;

require('./prototype-nav');
require('./styleguide-code-samples');
require('./styleguide-typography');
require('./styleguide-search');

const rememberScroll = require('./styleguide-remember-scroll');

rememberScroll('#__prototype-nav');
rememberScroll('.br-styleguide-content');
rememberScroll('.br-styleguide-navigation-holder');
