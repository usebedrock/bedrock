import $ from 'jquery';
import Clipboard from 'clipboard';
//import Codemirror from 'codemirror';
//import 'codemirror/mode/pug/pug';
//import 'codemirror/mode/xml/xml';

import Prism from 'prismjs';
import config from '../discovery/config';

const $codeHolders = document.querySelectorAll('.br-sample-code');
const $codeBlocks = document.querySelectorAll('.br-sample-markup');

if (config.styleguide) {

  /* Init code blocks
     ========================================================================== */

  console.log($codeBlocks);

  $codeBlocks.forEach(item => Prism.highlight(item.innerHTML, Prism.languages.xml, 'xml')  )

  /* Button logic: be able to show both Pug and HTML at the same time
     ========================================================================== */

  //$codeHolders.hide();

  // $('.br-sample-show-code-btn-html').on('click', function(e) {
  //   if ($(this).parents('.br-sample').find('.br-sample-code-html').is(':visible')) {
  //       $(this).parents('.br-sample').find('.br-sample-code-html').hide();
  //   } else {
  //     $(this).parents('.br-sample').find('.br-sample-code-html').show();
  //   }
  // });
  //
  // $('.br-sample-show-code-btn-pug').on('click', function(e) {
  //   if ($(this).parents('.br-sample').find('.br-sample-code-pug').is(':visible')) {
  //       $(this).parents('.br-sample').find('.br-sample-code-pug').hide();
  //   } else {
  //     $(this).parents('.br-sample').find('.br-sample-code-pug').show();
  //   }
  // });

  /* Save text to clipboard
     ========================================================================== */

  //const clipboard = new Clipboard('.br-sample-copy-code-btn', {
  //  text: function (trigger) {
  //    const originalButtonText = $(trigger).text();
  //
  //    $(trigger).prop('disabled', true);
  //    $(trigger).text('Copied!');
  //
  //    setTimeout(function () {
  //      $(trigger).text(originalButtonText);
  //      $(trigger).prop('disabled', false);
  //    }, 1500);
  //
  //    return $(trigger).siblings('.br-sample-markup').find('.CodeMirror').get(0).CodeMirror.getValue();
  //  }
  //});

}
