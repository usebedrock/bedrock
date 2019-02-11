// Animate alerts example

if ($('.c-alert--floating--animate-in').length > 0) {
  setTimeout(function(){
    animateAlert();
  }, 3000);
}

function animateAlert() {
  $('.c-alert--floating--animate-in')
    .removeClass('c-alert--floating--animate-in')
    .addClass('c-alert--floating--animate-out');
}

