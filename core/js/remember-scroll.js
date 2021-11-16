const SCROLL_STORAGE_KEY = 'bedrock.scrollPos';

let scrollPositions;

// Load selector map from storage, or create a new one
try {
  scrollPositions = JSON.parse(sessionStorage[SCROLL_STORAGE_KEY]);
} catch (err) {
  scrollPositions = {};
}

// Set scroll positions for saved selectors
for (var selector in scrollPositions) {
  document.querySelector(selector).scrollTop = scrollPositions[selector];
}

// Save positions on unload
window.onbeforeunload = function () {
  for (var selector in scrollPositions) {
    scrollPositions[selector] = document.querySelector(selector).scrollTop || 0;
  }
  sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(scrollPositions));
};

function rememberScroll(selector) {
  scrollPositions[selector] = document.querySelector(selector).scrollTop || 0;
}

rememberScroll('.br-styleguide-navigation-holder');
