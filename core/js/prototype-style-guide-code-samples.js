const $ = require('jquery');
const Clipboard = require('clipboard');
const Codemirror = require('codemirror');
const config = require('../../bedrock.config');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/pug/pug');
require('codemirror/mode/xml/xml');

const $codeBlocks = $('.br-sample-code .br-sample-markup');
const $codeButtons = $('.br-sample-show-code-btn');
const $copyButtons = $('.br-sample-copy-code-btn');
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

// Hide on init
$codeBlocks.hide();

$codeButtons.on('click', function () {
  var $codeBlock = $(this).parents('.br-sample').find('.br-sample-markup');
  $codeBlock.toggle();
  $codeBlock.find('.CodeMirror').each(function (i, el) {
    el.CodeMirror.refresh();
  });
});

$codeBlocks.each(function () {
  const code = $(this).text();

  $(this).empty();
  if ( config.ui.dark ) {
    var editorOptions = {
      value: code,
      readOnly: true,
      theme: 'monokai'
    }
  } else {
    var editorOptions = {
      value: code,
      readOnly: true,
      theme: 'default'
    }
  }

  switch (config.styleguide.snippetLanguage) {
    case 'pug':
      editorOptions.mode = 'pug';
      break;
    case 'html':
      editorOptions.mode = 'xml';
      editorOptions.htmlMode = true;
      break;
  }

  const editor = Codemirror(this, editorOptions);

  $(this).editor = editor;
});
