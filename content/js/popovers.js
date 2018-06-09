$(function () {

  /* Init standard popovers
     ========================================================================== */

  $('[data-toggle="popover"]').popover();


  /* Dismiss on click
     ========================================================================== */

  var isPopoverVisible = false;

  var hideAllPopovers = function() {
     $('.popover').each(function() {
          $('[data-popover-ref]').popover('hide');
      });
  };

  $('[data-popover-ref]').popover({
    trigger : 'click',
    animation: true,
    placement : $(this).attr('data-placement'),
    container: 'body',
    html: true,
    content: function() {
      var foundHtml = $('[data-popover-html="' + $(this).attr('data-popover-ref') + '"]').html();
      return foundHtml;
    }
  }).on('click', function(e) {

      // If any other popovers are visible, hide them
      if(isPopoverVisible) {
          hideAllPopovers();
      }

      // Show our popover
      $(this).popover('show');

      // Handle clicking on the popover itself
      $('.popover').off('click').on('click', function(e) {
          e.stopPropagation(); // prevent event for bubbling up => will not get caught with document.onclick
      });

      // Close button inside popover
      $('[data-dismiss="popover"]').click(function() {
        hideAllPopovers();
      });

      isPopoverVisible = true;
      e.stopPropagation();

  });


  $(document).on('click', function(e) {
      hideAllPopovers();
      isPopoverVisible = false;
  });

});