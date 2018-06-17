import mdcAutoInit from '@material/auto-init/dist/mdc.autoInit';

export default function MDCDataTable() {
  mdc.mdcAutoInit();
  // Get elements
  const dataTable = document.querySelector(".mdc-data-table");
  const thead = dataTable.querySelector("thead");
  const tbody = dataTable.querySelector("tbody");
  let sortableEl = null;

  thead.addEventListener("click", e => {
    if (!e.target.classList.contains("mdc-data-table__header--sortable"))
      return;

    if (sortableEl === e.target) {
      const order = sortableEl.getAttribute("aria-sort");
      sortableEl.setAttribute(
        "aria-sort", order === "descending"
        ? "ascending"
        : "descending");
    } else {
      if (sortableEl != null) {
        sortableEl.removeAttribute("aria-sort");
      }
      e.target.setAttribute("aria-sort", "descending")
      sortableEl = e.target;
    }
  });

  tbody.addEventListener("click", e => {
    console.log(e.target);
  });

  const checkboxes = tbody.querySelectorAll(".mdc-checkbox");
  const rows = tbody.querySelectorAll(".mdc-data-table__row");

  const globalCheckbox = thead.querySelector(".mdc-checkbox");
  let lel = 0;

  function selectRow(row, checked = null) {
    const {MDCCheckbox} = row.querySelector(".mdc-checkbox");
    if (checked == null) {
      checked = row.classList.contains("mdc-data-table__row--selected");
    }

    if (checked) {
      row.classList.remove("mdc-data-table__row--selected");
      if (MDCCheckbox)
        MDCCheckbox.checked = false;
      globalCheckbox.MDCCheckbox.checked = false;
    } else {
      row.classList.add("mdc-data-table__row--selected");
      if (MDCCheckbox)
        MDCCheckbox.checked = true;

      if (Array.from(checkboxes).filter(box => box.MDCCheckbox.checked).length === rows.length) {
        globalCheckbox.MDCCheckbox.checked = true;
      }
    }
  }

  rows.forEach(row => {
    const fn = e => {
      const {checked} = e.target;
      selectRow(row, checked);
    };
    row.addEventListener("click", fn);
    row.addEventListener("change", fn);
  });

  // Listen for the checkboxes clicked
  /*checkboxes.forEach(child => {
    const checkbox = child.MDCCheckbox;
    checkbox.listen("change", e => {
      const { checked } = e.target;
      if(!checked && globalCheckbox.checked) {
        globalCheckbox.checked = false;
      }
    });
  });*/

  // Arrange other checkboxes to the global one
  globalCheckbox.MDCCheckbox.listen("change", e => {
    const {checked} = e.target;
    rows.forEach(row => {
      selectRow(row, !checked);
    });
    /*checkboxes.forEach(child => {
      child.MDCCheckbox.checked = checked;
    });*/
  });

};
