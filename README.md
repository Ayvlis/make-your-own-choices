# make-your-own-choices
Build a dialog with a multiple choices path using a `.json` file as source for the path.

# Dependencies
- jQuery
- jQuery UI
- Font Awesome (will be removed)

# How it works
Import make-your-own-choices .js and .css files into your project
	
	<!-- index.html -->
	<link rel="stylesheet" href="dist/css/make-your-own-choices.min.css">
	<script src="dist/js/make-your-own-choices.min.js"></script>
	
then add the class `"myoc-trigger"` to the link that opens the dialog and add a `<div>` element with `id=myoc-dialog` that contains an empty `div` element with `class="myoc-dialog__body"`

	<!--index.html-->
	<button class="myoc-trigger"> Open the Dialog! </button>

	<div id="myoc-dialog" title="Dialog">
		<div class="myoc-dialog__body"></div>
	</div>

In your main script, you have to call the `choicesDialog()` function passing the json object as a parameter like this:
	
	  // script.js
	  
	  /*the button that opens the dialog*/
	  var $btn = $(".myoc-trigger"); 

	  $btn.click(function() {
	    /*get the content of your dialog from json file*/
	    $.getJSON('example/dialog.json', function(json) { 
	      /*set up the dialog*/
	      choicesDialog(json); 
	    });
	  });

# The .json file
In the `.json` file you need to annidate the various paths user will follow depending on which option they choose, like this:
	
	// choices.json
	
	{
		"first": {
			"label": "option 1",
			"content": {
				"first": {
			  		"label": "option 1.1",
			  		"content": "end for 1.1"
				},
				"second": {
					"label": "option 1.2",
			  		"content": "end for 1.2"
				}
			}
		},
		"second": {
			"label": "option 2",
		  	"content": "end for 2"
		}
	}

In this example there will be two choices. The first will lead to another choice between two elements and the second one will lead to an end. 

	label: what will be displayed as the name of the option
	content: what will be displayed when the user choose this option. Can be recursively an object.
