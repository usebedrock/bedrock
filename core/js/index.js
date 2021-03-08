import $ from 'jquery';

import './prototype-nav';
import './styleguide-code-samples';
import './styleguide-typography';
import './styleguide-search';
import rememberScroll from './styleguide-remember-scroll';

window.$ = $;

rememberScroll('#__prototype-nav');
rememberScroll('.br-styleguide-content');
rememberScroll('.br-styleguide-navigation-holder');
