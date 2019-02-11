// @see https://github.com/developit/tags-input
var tagsInput = require('tags-input');

var myTagInputs = document.querySelectorAll('input[type="tags"]');

// Check for existence
if (typeof myTagInputs !== "undefined" && myTagInputs !== null) {
  for(let i = 0; i < myTagInputs.length; i++){
    tagsInput(myTagInputs[i]);
  } 
}
