var styleguideSearchDomEl =  document.getElementById('styleguideSearch');

if (typeof(styleguideSearchDomEl) != 'undefined' && styleguideSearchDomEl != null) {
  styleguideSearchDomEl.addEventListener("input", function (e) { const inputVal = e.target.value.toUpperCase() })
}

let docsCategories = document.getElementsByClassName("br-docs-category")

Array.from(docsCategories).forEach(docItem => {

  docItem.querySelectorAll(".br-docs-category-list-wrapper li a").each(function (el) {
    const txtValue = el.textContent.toUpperCase();
    if (txtValue.indexOf(inputVal) > -1) {
      docItem.style.display = "";
    } else {
      docItem.style.display = "none";
    }
  });

  docItem.style.display = "";

  if (docItem.querySelectorAll("li:hidden").length == docItem.getElementsByTagName('li').length) {
      docItem.style.display = "none";
    }
  }

});
