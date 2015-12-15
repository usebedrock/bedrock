const $ = require('jquery');

const rememberScroll = require('./remember-scroll');

require('./prototype-nav');
require('./prototype-style-guide-code-samples');

rememberScroll('#__prototype-nav');
rememberScroll('.br-styleguide-content');
