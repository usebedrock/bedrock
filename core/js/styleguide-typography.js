const $ = require('jquery');

const $typographyEntries = $('#component-typography tbody tr');

function calculateFontSizes() {
  $typographyEntries.each(function () {
    const $fontSizeInfo = $(this).find('.br-typography-sample-size');
    const fontSizeForElement = $(this).find('.br-typography-sample-content').children().first().css('font-size');
    $fontSizeInfo.text(fontSizeForElement);
  });
}

// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

on_resize(function() {
  calculateFontSizes();
});

calculateFontSizes();