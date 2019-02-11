/* Table handling
   ========================================================================== */

// Look for data tables
const tables = document.querySelectorAll('.js-data-table');

// Handle click on the select all checkbox
const handleSelectAll = (e, selectCheckboxes) => {
  const state = e.currentTarget.checked;
  for (let i = 0; i < selectCheckboxes.length; i += 1) {
    selectCheckboxes[i].checked = state;
    handleSelect(state, selectCheckboxes[i]);
  }
};

// Handle click on a select checkbox
const handleSelect = (state, el) => {
  let parentRow = el;

  while (parentRow.tagName !== 'TR') {
    parentRow = parentRow.parentNode;
  }

  if (state === true) {
    parentRow.classList.add('c-table__row--selected');
  } else {
    parentRow.classList.remove('c-table__row--selected');
  }
};

// Handle click on row
const handleRowClick = e => {
  const currentRow = e.currentTarget;
  const currentCheckbox = currentRow.querySelector(
    'td:first-child input[type="checkbox"]'
  );
  if (currentRow.classList.contains('c-table__row--selected')) {
    currentRow.classList.remove('c-table__row--selected');
    currentCheckbox.checked = false;
  } else {
    currentRow.classList.add('c-table__row--selected');
    currentCheckbox.checked = true;
  }
};

// Iterate over data tables
for (let i = 0; i < tables.length; i += 1) {
  const currentTable = tables[i];
  const tableRows = currentTable.querySelectorAll('tbody tr');
  const selectAllCheckbox = currentTable.querySelector(
    'thead input[type="checkbox"]'
  );
  const selectCheckboxes = currentTable.querySelectorAll(
    'tbody td:first-child input[type="checkbox"]'
  );

  // Add event listener to select all checkbox
  if (selectAllCheckbox !== null) {
    selectAllCheckbox.addEventListener(
      'change',
      e => {
        handleSelectAll(e, selectCheckboxes);
      },
      false
    );
  }

  // Add event listener to row checkboxes
  for (let j = 0; j < selectCheckboxes.length; j += 1) {
    selectCheckboxes[j].addEventListener(
      'change',
      e => {
        handleSelect(e.currentTarget.checked, e.currentTarget);
      },
      false
    );
  }

  // Add event listener to rows
  for (let k = 0; k < tableRows.length; k += 1) {
    tableRows[k].addEventListener('click', handleRowClick, false);

    // Don't propagate click event on child buttons and links
    const currentButtonsLinks = tableRows[k].querySelectorAll('button, a');
    for (let l = 0; l < currentButtonsLinks.length; l += 1) {
      currentButtonsLinks[l].addEventListener('click', e => {
        e.stopPropagation();
      }, false);
    }
  }
}
