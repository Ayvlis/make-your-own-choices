
/*the button that opens the dialog*/
var $btn = $(".myoc-trigger"); 

$btn.click(function() {
	/*get the content of your dialog from json file*/
	$.getJSON('dist/dialog.json', function(json) { 
		/*set up the dialog*/
		choicesDialog(json); 
	});
});


