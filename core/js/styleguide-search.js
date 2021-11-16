var searchDomEl = document.getElementById("styleguideSearch");

var inputVal = "";

if (typeof searchDomEl != "undefined" && searchDomEl != null) {
    searchDomEl.addEventListener("input", function (e) {
        inputVal = e.target.value.toUpperCase();
        filter();
        hideHeaders();
    });
}

function filter() {
    document.querySelectorAll(".br-docs-category").forEach((item) => {
        item.querySelectorAll("li a").forEach((item) => {
            const txtValue = item.textContent.toUpperCase();

            if (txtValue.indexOf(inputVal) > -1) {
                item.parentElement.style.display = "";
            } else {
                item.parentElement.style.display = "none";
            }
        });
    });
}

// Check if all list items are hidden, if that's the case, then hide the header as well

function hideHeaders() {
    var parents = document.querySelectorAll(".br-docs-category");
    parents.forEach((parent) => {
        if (
            parent.querySelectorAll(".br-docs-category-list-wrapper li").length ==
            parent.querySelectorAll(".br-docs-category-list-wrapper li[style='display: none;']")
                .length
        ) {
            parent.style.display = "none";
        } else {
            parent.style.display = "block";
        }
    });
}


