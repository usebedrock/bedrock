const $ = require('jquery');
const Clipboard = require('clipboard');


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
  $(this).parents('.c-sample').find('.c-sample-markup').toggle();
  $(this).parents('.c-sample').find('.c-sample-copy-code-btn').toggle();
});

// Manually highlight code blocks since we don't use <pre> tags
$codeBlocks.each(function (i, e) {
  hljs.highlightBlock(e);
});

// Trim trailing newline space
$codeBlocks.each(function () {
  $(this).html($(this).html().trim());
});
