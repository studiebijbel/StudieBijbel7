/**
 * @properties={typeid:24,uuid:"ECA25986-3C30-4FAB-AE68-126B08B93E5D"}
 */
function BTN_close()
{
//application.closeFormDialog('datail');
	controller.getWindow().hide();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"59B27F3F-CF26-4AAB-84C0-ED0D84A4A948"}
 */
function BTN_Edit(event) {
	//SMM 20-06-2011
	forms.usernotes_dtl.foundset.loadRecords("SELECT usernote_id FROM usernotes WHERE usernote_id = ?", [usernote_id]);
	//SMM 20-05-2011
	var vForm = application.createWindow('edit_usernote', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.lbl.usernotes_dtl';
	vForm.show(forms.usernotes_dtl);
}
