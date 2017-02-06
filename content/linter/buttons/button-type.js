module.exports = function ($) {
  const errors = [];
  let allButtonsHaveType = true;

  $('button').each(function (index, el) {
    const $el = $(el);

    if (!$el.attr('type')) {
      allButtonsHaveType = false;
    }
  });

  if (!allButtonsHaveType) {
    errors.push('Buttons need a `type` attribute.');
  }

  return errors;
};
