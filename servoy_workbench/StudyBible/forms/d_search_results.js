/**
 * @properties={typeid:24,uuid:"73f0c1be-e1eb-4945-b4b7-8e7a169366ed"}
 */
function printen()
{
forms.d_search_results.controller.print() 
}

/**
 * @properties={typeid:24,uuid:"8f6f038f-5d9a-4e3c-a032-8a6ab1e375a6"}
 * @AllowToRunInFind
 */
function printForm()
{
//SMM - 23-05-2010
var win = controller.getWindow()
if (win) {
	win.hide()
}
//forms.search_results.printForm();
}
