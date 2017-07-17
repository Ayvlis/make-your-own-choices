# make-your-own-choices
A way to import a dialog with a multiple choices path using a .json as source

# Dependencies
- jQuery
- jQuery UI
- Font Awesome (will be removed)

# How it works
Import make-your-own-choices .js and .css files into your project
	
	<!-- index.html -->
	<link rel="stylesheet" href="dist/css/make-your-own-choices.min.css">
	<script src="dist/js/dialog.min.js"></script>
	
then add the class `"dialog-trigger"` to the link that opens the dialog and add a `<div>` element with `id=myoc-dialog` that contains an empty `div` element with `class="myoc-dialog__body"`

	<!--index.html-->
	<button class="trigger"> Open the Dialog! </button>

	<div id="myoc-dialog" title="Dialog">
		<div class="myoc-dialog__body"></div>
	</div>

# The .json file
In the `.json` file you need to annidate the various paths user will follow depending on which option they choose, like this:

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
