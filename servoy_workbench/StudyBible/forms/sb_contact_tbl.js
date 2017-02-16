/**
 * @properties={typeid:24,uuid:"D81DD55B-5DDC-47DF-A6CB-D22FDAF5412D"}
 */
function DIALOG_showContactDialog() {
	var vDialogForm = 'sb_contact_dlg'
	var vID = sb_contact_id
	//forms[vDialogForm].foundset.loadRecords(databaseManager.convertToDataSet([vID]))
	var vSQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?"
	forms.sb_contact_dlg.foundset.loadRecords(vSQL, [vID])

	//application.showFormInDialog( forms[vDialogForm],  -1, -1, -1, -1, 'i18n:CVB.dialog.contact_details', false, false, 'details')
	//SMM 20-05-2011
	var vForm = application.createWindow('details', JSWindow.MODAL_DIALOG);
	vForm.title = 'i18n:CVB.dialog.contact_details';
	vForm.setInitialBounds(-1, -1, -1, -1);
	vForm.show(forms[vDialogForm]);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DA96748E-B5BD-4602-AFA4-601F56D7BF49"}
 */
function deleteContact(event) {
	var vAnsw = plugins.dialogs.showQuestionDialog('i18n:cvb.message.deleteRecord', 'i18n:cvb.message.deleteRecord', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no')
	if (vAnsw != i18n.getI18NMessage('i18n:cvb.btn.yes')) {
		return false
	}
	controller.deleteRecord();
	return true;
}
