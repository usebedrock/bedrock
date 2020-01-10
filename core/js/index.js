import $ from 'jquery';

import './prototype-nav';
import './styleguide-code-samples';
import './styleguide-typography';
import './styleguide-search';

window.$ = $;

const rememberScroll = require('./styleguide-remember-scroll');

rememberScroll('#__prototype-nav');
rememberScroll('.br-styleguide-content');
rememberScroll('.br-styleguide-navigation-holder');
