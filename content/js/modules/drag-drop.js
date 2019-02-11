import Sortable from '@shopify/draggable/lib/sortable';

const sortable = new Sortable(document.querySelectorAll('.c-table-view'), {
  draggable: '.c-table-view__item--type-action'
});

sortable.on('sortable:start', function() {
  console.log('sortable:start');
  // We have to temporarily disabled our scrolled areas
  var scrollAreas;
  scrollAreas = document.querySelectorAll('main.u-scroll');
  for (var i = 0; i < scrollAreas.length; ++i) {
     scrollAreas[i].classList.add('u-kill-scroll');
  }
});

sortable.on('sortable:stop', function() {
  console.log('sortable:stop');
  // We have to temporarily disabled our scrolled areas
  var scrollAreas;
  scrollAreas = document.querySelectorAll('main.u-kill-scroll');
  for (var i = 0; i < scrollAreas.length; ++i) {
     scrollAreas[i].classList.remove('u-kill-scroll');
  }
});


sortable.on('sortable:sort', () => console.log('sortable:sort'));
sortable.on('sortable:sorted', () => console.log('sortable:sorted'));
sortable.on('sortable:stop', () => console.log('sortable:stop'));