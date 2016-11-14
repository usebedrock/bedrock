const $ = require('jquery');
window.$ = $;

const rememberScroll = require('./remember-scroll');

require('./prototype-nav');
require('./prototype-style-guide-code-samples');
require('./prototype-style-guide-typography');

rememberScroll('#__prototype-nav');
rememberScroll('.br-styleguide-content');
