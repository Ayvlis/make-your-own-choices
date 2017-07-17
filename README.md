# make-your-own-choices
A way to import a dialog with a multiple choices path using a .json as source

# Dependencies
- jQuery
- jQuery UI
- Font Awesome (will be removed)

# How it works
simply import make-your-own-choices .js and .css files into your project
	
	<!-- index.html -->
	<link rel="stylesheet" href="dist/css/make-your-own-choices.min.css">
	<script src="dist/js/dialog.min.js"></script>
	
then add the class `"dialog-trigger"` to the link that opens the dialog and add a `<div>` element with `id=myoc-dialog` that contains an empty `div` element with `class="myoc-dialog__body"`

	<!--index.html-->
	<button class="trigger"> Open the Dialog! </button>

	<div id="myoc-dialog" title="Dialog">
		<div class="myoc-dialog__body"></div>
	</div>


