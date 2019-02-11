/* Tooltips
   ========================================================================== */

// Collect all triggers on the page
const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
const tooltips = document.querySelectorAll('.c-tooltip');
const bodyElement = document.querySelector('body');

// Global settings
const tooltipActiveClass = 'c-tooltip--show';
const tooltipTopClass = 'c-tooltip--top';
const tooltipBottomClass = 'c-tooltip--bottom';
const tooltipLeftClass = 'c-tooltip--left';
const tooltipRightClass = 'c-tooltip--right';
const tooltipMargin = 8;

// Find target tooltip element
const findTooltip = function findTarget(triggerEl) {
  const targetId = triggerEl.getAttribute('data-tooltip');
  return document.getElementById(targetId);
};

// Add or remove classes on hovering a trigger
const handleHover = function handleMouseOver(e) {
  const targetEl = findTooltip(e.currentTarget);
  switch (e.type) {
    case 'mouseenter': {
      targetEl.classList.add(tooltipActiveClass);
      break;
    }
    case 'mouseleave': {
      targetEl.classList.remove(tooltipActiveClass);
      break;
    }
  }
};

// Position tooltip
const positionTooltip = function positionTooltip(triggerEl) {
  const targetEl = findTooltip(triggerEl);
  const placement = triggerEl.getAttribute('data-tooltip-placement') || 'top';
  new Popper(triggerEl, targetEl, {
    placement,
    modifiers: {
      offset: {
        offset: `0, ${tooltipMargin}`,
      },
    },
    onCreate: data => {
      switch (data.placement) {
        case 'top': {
          targetEl.classList.add(tooltipTopClass);
          break;
        }
        case 'bottom': {
          targetEl.classList.add(tooltipBottomClass);
          break;
        }
        case 'left': {
          targetEl.classList.add(tooltipLeftClass);
          break;
        }
        case 'right': {
          targetEl.classList.add(tooltipRightClass);
          break;
        }
      }
    },
  });
};

// Move all tooltips to root level (to avoid wrong positioning)
for (let i = 0; i < tooltips.length; i += 1) {
  bodyElement.appendChild(tooltips[i]);
}

//  Loop through all triggers on the page
for (let i = 0; i < tooltipTriggers.length; i += 1) {
  // Position tooltips
  positionTooltip(tooltipTriggers[i]);
  // Attach event listeners
  tooltipTriggers[i].addEventListener('mouseenter', handleHover, false);
  tooltipTriggers[i].addEventListener('mouseleave', handleHover, false);
}
