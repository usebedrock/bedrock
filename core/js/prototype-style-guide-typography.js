const $ = require('jquery');

const $typographyEntries = $('.br-typography-overview tbody tr');

$typographyEntries.each(function () {
  const $fontSizeInfo = $(this).find('.typography-sample-size');
  const fontSizeForElement = $(this).find('.br-typography-sample-content').children().first().css('font-size');
  $fontSizeInfo.text(fontSizeForElement);
});

