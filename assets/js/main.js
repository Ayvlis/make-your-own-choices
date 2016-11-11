$(document).ready(function() {

 /* content of the checklist, simple json file */
 $.getJSON('assets/dialog.json', function(json) {
  choicesDialog(json);
});
});


