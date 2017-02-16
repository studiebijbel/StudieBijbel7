/**
 * @properties={typeid:24,uuid:"9630943e-42d0-4d42-bf91-32dda24b5ec5"}
 */
function printen()
{
forms.d_book_comment.controller.print();
}

/**
 * @properties={typeid:24,uuid:"4379ae92-1355-4577-ba0e-2e9c0397b359"}
 */
function printForm()
{
	//application.closeFormDialog()
	//SMM - 23-05-2010
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}
	forms.book_comment.printForm();
}

/**
 * @properties={typeid:24,uuid:"177468e8-d949-441e-8599-31a67ee9c351"}
 * @param {String} inp
 */
function wlink(inp)
{
forms.book_comment.wlink(inp);

if(globals.flag == false)
{
	globals.flag = true;
	forms.book_comment.wlink(inp);
	//scopes.tools.output("double");
}
}
