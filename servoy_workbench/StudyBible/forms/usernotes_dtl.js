/**
 * @properties={typeid:24,uuid:"C39D4BAE-8A54-45EB-A6E1-93811A8505FC"}
 */
function BTN_close()
{
	//application.closeFormDialog('edit_usernote')	
	var win = controller.getWindow() //application.getWindow() 		
	if (win) {
		win.hide()
	}
	
}
