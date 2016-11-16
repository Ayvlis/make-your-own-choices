$(document).ready(function() {

	var $btn = $(".trigger"); //the button that opens the dialog

	
	$btn.click(function() {
		$.getJSON('dist/dialog.json', function(json) { //get the content of your dialog from json file

			choicesDialog(json); //set up the dialog
		});
	});
});


