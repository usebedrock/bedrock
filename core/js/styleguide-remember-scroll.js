const SCROLL_STORAGE_KEY = 'bedrock.scrollPos';
const $ = require('jquery');

let scrollPositions;

// Load selector map from storage, or create a new one
try {
  scrollPositions = JSON.parse(sessionStorage[SCROLL_STORAGE_KEY]);
} catch (err) {
  scrollPositions = {};
}

// Set scroll positions for saved selectors
for (var selector in scrollPositions) {
  $(selector).scrollTop(+scrollPositions[selector]);
}

// Export function to store selector in map
module.exports = function (selector) {
  scrollPositions[selector] = $(selector).scrollTop() || 0;
};

// Save positions on unload
window.onbeforeunload = function () {
  for (var selector in scrollPositions) {
    scrollPositions[selector] = $(selector).scrollTop() || 0;
  }
  sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(scrollPositions));
};
