const typographyEntries = document.querySelectorAll('#component-typography tbody tr');

function calculateFontSizes() {
  typographyEntries.forEach(function (element) {
    const fontSizeInfo = element.querySelector('.br-typography-sample-size');
    const fontSizeForElement = getComputedStyle(element.querySelector('.br-typography-sample-content').children[0])['font-size'];
    fontSizeInfo.innerText = fontSizeForElement;
  });
}

// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100)};return c};

on_resize(function() {
  calculateFontSizes();
});

calculateFontSizes();
