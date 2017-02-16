/**
 * @properties={typeid:24,uuid:"a05df212-37a0-499a-9ad8-6cc068f5f842"}
 */
function BTN_cancel() {
	databaseManager.revertEditedRecords();
	globals.sb_frmOnHideCHK = 1;

	application.getWindow('verse_translation_Edit_dlg').hide();
}

/**
 * @properties={typeid:24,uuid:"339b3ed9-bbfd-4ebb-8b97-7aa4c1eaa145"}
 */
function BTN_delete() {
	var vQuestion = plugins.dialogs.showQuestionDialog('i18n:cvb.btn.delete', 'i18n:cvb.lbl.deleteMessage', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');
	if (vQuestion == i18n.getI18NMessage('i18n:cvb.btn.yes')) {
		foundset.omitRecord(foundset.getSelectedIndex());
	}

}

/**
 * @properties={typeid:24,uuid:"e1eeb6ea-f14c-4120-94cb-3c03e9dc6f81"}
 */
function BTN_save() {
	if (foundset.loadOmittedRecords()) {
		foundset.deleteAllRecords()
	}

	databaseManager.saveData();
	globals.sb_frmOnHideCHK = 1;
	globals.verse_id_calc_last = null
	databaseManager.recalculate(forms.verse_translation.foundset)
	forms.verse_translation_Edit_dlg.controller.getWindow().hide();
}

/**
 * @properties={typeid:24,uuid:"c7280849-6a7f-41de-bc11-430a8aec98bb"}
 */
function FORM_onHide() {
	if (globals.sb_frmOnHideCHK == 1) {
		globals.sb_frmOnHideCHK = 0;
	} else {
		databaseManager.revertEditedRecords();
//		application.closeFormDialog("forms.verse_translation_Edit_dlg");
		forms.verse_translation_Edit_dlg.controller.getWindow().hide();
	}
	databaseManager.setAutoSave(true)
}

/**
 * @properties={typeid:24,uuid:"f40a5282-bf11-487f-bd6b-f9ff300cc00f"}
 */
function FORM_onShow() {
	/** @type JSRecord<db:/sb/verse_translations> */
	var vRecord;

	for (var i = 1; i <= foundset.getSize(); i++) {
		vRecord = foundset.getRecord(i)
		vRecord.transl_text = globals.sb_edit_HtmlToTextChangeToSpecialChars(vRecord.transl_text);

	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3B1E4522-488C-4187-AF4D-CEC87640691F"}
 */
function BTN_new(event) {
	var vWindow = application.createWindow('verse_translation_new_dlg', JSWindow.MODAL_DIALOG);
	vWindow.title = '';
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.verse_translation_new_dlg);
}
