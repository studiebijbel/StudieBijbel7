/**
 * @properties={typeid:24,uuid:"57464634-6561-407A-8DD6-729A93A13A6A"}
 */
function DIALOG_showContactDialog() {
	databaseManager.setAutoSave(false)

	var vDialogForm = 'sb_contact_subscription_dtl'
	var vID = sb_subscription_to_contact_id
	//forms[vDialogForm].foundset.loadRecords(databaseManager.convertToDataSet([vID]))
	var vSQL = "SELECT sb_subscription_to_contact_id FROM sb_subscription_to_contact WHERE sb_subscription_to_contact_id = ?"
	forms.sb_contact_subscription_dtl.foundset.loadRecords(vSQL, [vID])

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
 * @properties={typeid:24,uuid:"515E59B5-29FD-4BAD-9363-D493E26C1F32"}
 */
function deleteContact(event) {
	var vAnsw = plugins.dialogs.showQuestionDialog('i18n:cvb.message.deleteRecord', 'i18n:cvb.message.deleteRecord', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no')
	if (vAnsw != i18n.getI18NMessage('i18n:cvb.btn.yes')) {
		return false
	}
	controller.deleteRecord();
	return true;
}
