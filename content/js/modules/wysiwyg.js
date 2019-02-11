/* WYSIWYG
   ========================================================================== */

$('.c-wysiwyg-toolbar').hide();

// @todo don't hide the toolbar when we click a button
$('.c-wysiwyg-toolbar .c-button').click(function(e) {
  $('.c-wysiwyg textarea').focus();
});

$('.c-wysiwyg textarea').focus(function(e) {
  $(this).parents('.c-wysiwyg').find('.c-wysiwyg-toolbar').show();
});

$('.c-wysiwyg textarea').blur(function(e) {
  $(this).parents('.c-wysiwyg').find('.c-wysiwyg-toolbar').hide();
});