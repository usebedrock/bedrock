module.exports = function ($) {
  const errors = [];
  let allAhasHref = true;

  $('a').each(function (index, el) {
    const $el = $(el);

    if (!$el.attr('href')) {
      allAhasHref = false;
    }
  });

  if (!allAhasHref) {
    errors.push('All anchors need a `href` attribute.');
  }

  return errors;
};
