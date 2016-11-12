$(document).ready(function() {

 /* content of the checklist, simple json file */
 $.getJSON('dist/dialog.json', function(json) {
  choicesDialog(json);
});
});


