/* Accordion
   ========================================================================== */

$(".c-accordion__header").on("click", function() {
  if($(this).find(".c-accordion__icon-open").css("display") === "none") {
    // Is open, need to close
    $(this).closest(".c-accordion").addClass("c-accordion--closed")
  } else {
    $(this).closest(".c-accordion").removeClass("c-accordion--closed")
  }
});
