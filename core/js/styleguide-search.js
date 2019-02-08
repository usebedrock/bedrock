const $ = require('jquery');

$('#styleguideSearch').on('input', function(e) {

  var inputVal = $(this).val().toUpperCase();

  $('.br-styleguide-nav-holder li a').each(function() {
    var txtValue = $(this).text().toUpperCase();
    if (txtValue.indexOf(inputVal) > -1) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  });

});