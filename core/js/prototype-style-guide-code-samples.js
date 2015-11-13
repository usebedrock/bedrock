const $ = require('jquery');
const Clipboard = require('clipboard');
const Codemirror = require('codemirror');
const config = require('../../core/config');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jade/jade');
require('codemirror/mode/xml/xml');

const $codeBlocks = $('.c-sample-code .c-sample-markup');
const $codeButtons = $('.c-sample-show-code-btn');
const $copyButtons = $('.c-sample-copy-code-btn');
const clipboard = new Clipboard('.c-sample-copy-code-btn', {
  target: function (trigger) {
    return $(trigger).parents('.c-sample-footer').find('.c-sample-code').get(0);
  }
});

// Hide on init
$codeBlocks.hide();
$copyButtons.hide();

$codeButtons.on('click', function () {
  var $codeBlock = $(this).parents('.c-sample').find('.c-sample-markup');
  $codeBlock.toggle();
  $codeBlock.find('.CodeMirror').each(function (i, el) {
    el.CodeMirror.refresh();
  });
  $(this).parents('.c-sample').find('.c-sample-copy-code-btn').toggle();
});

$codeBlocks.each(function () {
  const code = $(this).text();

  $(this).empty();

  let editorOptions = {
    value: code,
    readOnly: true
  };

  switch (config.snippetLanguage) {
    case 'jade':
      editorOptions.mode = 'jade';
      break;
    case 'html':
      editorOptions.mode = 'xml';
      editorOptions.htmlMode = true;
      break;
  }

  const editor = Codemirror(this, editorOptions);

  $(this).editor = editor;
});
