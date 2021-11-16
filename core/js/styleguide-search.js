import $ from 'jquery';

$('#styleguideSearch').on('input', function(e) {

  var inputVal = $(this).val().toUpperCase();

  $('.br-docs-category').each(function() {

    $(this).find('.br-docs-category-list-wrapper li a').each(function() {

        var txtValue = $(this).text().toUpperCase();
        if (txtValue.indexOf(inputVal) > -1) {
          $(this).parent().show();
        } else {
          $(this).parent().hide();
        }

    });

    $(this).show();
    if( $(this).find('li:hidden').length == $(this).find('li').length ) {
        $(this).hide();
    }

  });

});

