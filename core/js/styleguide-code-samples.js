import Clipboard from 'clipboard';
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

  // Set event listeners
  if(localHTMLButton) {
      localHTMLButton.addEventListener('click', () => toggleCode(sample, "html", event), false);
  }

  if(localPugButton) {
      localPugButton.addEventListener('click', () => toggleCode(sample, "pug", event), false);
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


if (config.styleguide) {

  /* Save text to clipboard
     ========================================================================== */

  const clipboard = new Clipboard('.br-sample-copy-code-btn', {
    text: function (trigger) {
      const originalButtonText = $(trigger).text();

      $(trigger).prop('disabled', true);
      $(trigger).text('Copied!');

      setTimeout(function () {
        $(trigger).text(originalButtonText);
        $(trigger).prop('disabled', false);
      }, 1500);

      return $(trigger).siblings('.br-sample-markup').find('.CodeMirror').get(0).CodeMirror.getValue();
    }
  });

}
