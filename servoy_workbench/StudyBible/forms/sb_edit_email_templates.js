/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6F6C0D3E-6282-4257-B920-66CA0508455F"}
 */
var searchField = null;

/**
 * @properties={typeid:24,uuid:"19862324-1700-4CF6-9F4A-5EC33D254B93"}
 */
function BTN_delete() {
	var vQuestion = plugins.dialogs.showQuestionDialog('i18n:cvb.btn.delete', 'i18n:cvb.lbl.deleteMessage', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');

	if (vQuestion == i18n.getI18NMessage('i18n:cvb.btn.yes')) {
		controller.deleteRecord();
	}
}

/**
 * @properties={typeid:24,uuid:"1CF31047-4B6B-47D1-A940-2E466535E715"}
 */
function BTN_details() {
	databaseManager.setAutoSave(false)
	
	//application.showFormInDialog( forms.sb_edit_paragraphs_dlg,  -1, -1,  -1,  -1,  "i18n:btn_edit_articles",  false,  false, 'sb_edit_paragraphs_dlg',  true)
	//SMM 20-05-2011
	var vForm = application.createWindow('sb_edit_email_templates_dlg', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:btn_edit_articles';
	vForm.resizable = true;
	vForm.show(forms.sb_edit_email_templates_dlg);

}

/**
 * @properties={typeid:24,uuid:"D8E84E7B-5A84-4E96-B572-7B82D763847F"}
 */
function BTN_new() {
	// set autosave false for rollback.
	databaseManager.setAutoSave(false);
	/** @type JSRecord<db:/sb_data/mail_templates> */
	var vRecord = foundset.getRecord(foundset.newRecord());
	
	var vForm = application.createWindow('sb_edit_email_templates_dlg', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:btn_edit_article';
	vForm.show(forms.sb_edit_email_templates_dlg);
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"CBCD9D2E-7C12-43B3-9105-03CADC418028"}
 * @AllowToRunInFind
 */
function doSearch(oldValue, newValue, event) {

	if (foundset.find()) {
		name = '#%' + newValue + '%';
		foundset.newRecord(null, null);
		identifier = '#%' + newValue + '%';
		foundset.search(true, false);
	}

	return true
}
