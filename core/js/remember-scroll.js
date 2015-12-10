const SCROLL_STORAGE_KEY = 'bedrock.scrollPos';

module.exports = function ($element) {
  if (sessionStorage[SCROLL_STORAGE_KEY] != undefined)
    $element.scrollTop(+sessionStorage[SCROLL_STORAGE_KEY]);

  window.onbeforeunload = function () {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, $element.scrollTop());
  };
};
