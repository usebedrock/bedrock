import Clipboard from 'clipboard';
import Prism from 'prismjs';
import 'prismjs/plugins/filter-highlight-all/prism-filter-highlight-all';
Prism.plugins.filterHighlightAll.reject.addSelector('.br-copy-paste');

import config from '../discovery/config';


// Initial hide of all code
var markupBoxes = document.querySelectorAll('.br-sample-code');

markupBoxes.forEach((item) => {
 item.style.display = 'none'
});

var samples = document.querySelectorAll('.br-sample');

samples.forEach((sample) => {

  var localHTMLButton = sample.querySelector('.br-sample-show-code-btn-html');
  var localPugButton = sample.querySelector('.br-sample-show-code-btn-pug');
  var localJsxButton = sample.querySelector('.br-sample-show-code-btn-jsx');

  // Set event listeners
  if(localHTMLButton) {
      localHTMLButton.addEventListener('click', () => toggleCode(sample, "html", event), false);
  }

  if(localPugButton) {
      localPugButton.addEventListener('click', () => toggleCode(sample, "pug", event), false);
  }

  if(localJsxButton) {
      localJsxButton.addEventListener('click', () => toggleCode(sample, "jsx", event), false);
  }

});

function toggleCode(sample, language, event) {
  
  var parentBlock = sample.querySelector('.br-sample-code-'+language);
  
  if (parentBlock.style.display == 'none') {
    parentBlock.style.display = 'block';
  } else {
    parentBlock.style.display = 'none';
  }

}

/* Save text to clipboard
   ========================================================================== */

if (config.styleguide) {

  const clipboard = new Clipboard('.br-sample-copy-code-btn', {
    text: function (trigger) {

      const originalButtonText = trigger.innerHTML;

      trigger.setAttribute('disabled', true);
      trigger.innerHTML = 'Copied!';

      setTimeout(function () {
        trigger.innerHTML = originalButtonText;
        trigger.removeAttribute('disabled')
      }, 1500);

      return trigger.nextElementSibling.querySelector('.br-copy-paste').innerHTML.replaceAll('&lt;','<').replaceAll('&gt;','>');
    }
  });

}
