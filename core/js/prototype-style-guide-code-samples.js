const $ = require('jquery');
const Clipboard = require('clipboard');
const Codemirror = require('codemirror');
const config = require('../../core/config');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jade/jade');
require('codemirror/mode/xml/xml');

const $codeBlocks = $('.b-sample-code .b-sample-markup');
const $codeButtons = $('.b-sample-show-code-btn');
const $copyButtons = $('.b-sample-copy-code-btn');
const clipboard = new Clipboard('.b-sample-copy-code-btn', {
  target: function (trigger) {
    return $(trigger).parents('.b-sample-footer').find('.b-sample-code').get(0);
  }
});

// Hide on init
$codeBlocks.hide();
$copyButtons.hide();

$codeButtons.on('click', function () {
  var $codeBlock = $(this).parents('.b-sample').find('.b-sample-markup');
  $codeBlock.toggle();
  $codeBlock.find('.CodeMirror').each(function (i, el) {
    el.CodeMirror.refresh();
  });
  $(this).parents('.b-sample').find('.b-sample-copy-code-btn').toggle();
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
