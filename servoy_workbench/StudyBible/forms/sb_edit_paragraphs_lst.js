/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D4B34256-2C58-46AF-9914-B8C2D60045A3"}
 */
var searchField = null;

/**
 * @properties={typeid:24,uuid:"ADAC67D0-FF3F-4A89-9B97-D92AA1DA95B6"}
 */
function BTN_delete() {
	var vQuestion = plugins.dialogs.showQuestionDialog('i18n:cvb.btn.delete', 'i18n:cvb.lbl.deleteMessage', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');

	if (vQuestion == i18n.getI18NMessage('i18n:cvb.btn.yes')) {
		controller.deleteRecord();
	}
}

/**
 * @properties={typeid:24,uuid:"889A3D76-2245-484E-AC00-FF39B7E6017D"}
 */
function BTN_details() {
	databaseManager.setAutoSave(false)
	
	foundset.article_text = utils.stringReplace(foundset.article_text, "<BR>", "<br />");
//	foundset.article_text = utils.stringReplace(foundset.article_text, "\n", "<br />");
	
	//application.showFormInDialog( forms.sb_edit_paragraphs_dlg,  -1, -1,  -1,  -1,  "i18n:btn_edit_articles",  false,  false, 'sb_edit_paragraphs_dlg',  true)
	//SMM 20-05-2011
	var vForm = application.createWindow('sb_edit_paragraphs_dlg', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:btn_edit_articles';
	vForm.resizable = true;
	vForm.show(forms.sb_edit_paragraphs_dlg);

}

/**
 * @properties={typeid:24,uuid:"84C66637-F916-4779-8EAF-9A92F2DAEB6F"}
 */
function BTN_new() {
	// set autosave false for rollback.
	databaseManager.setAutoSave(false);
	/** @type JSRecord<db:/sb/articles> */
	var vRecord = foundset.getRecord(foundset.newRecord());
	/** @type JSRecord<db:/sb/paragraphs> */
	var vRecord2 = articles_to_paragraphs.getRecord(articles_to_paragraphs.newRecord())
	vRecord2.article_id = vRecord.pk;
	//application.showFormInDialog( forms.sb_edit_paragraphs_dlg,  -1, -1,  -1,  -1,  "i18n:btn_edit_articles",  false,  false, 'sb_edit_paragraphs_dlg',  true)
	//SMM 20-05-2011

	//SMM 08-11-2011
	globals.sb_edit_book_1 = null;
	globals.sb_edit_book_2 = null;
	
	var vForm = application.createWindow('sb_edit_paragraphs_dlg', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:btn_edit_article';
	vForm.show(forms.sb_edit_paragraphs_dlg);
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
 * @properties={typeid:24,uuid:"595DAFCD-19EF-47FF-A7BA-E533FFED0AB9"}
 * @AllowToRunInFind
 */
function doSearch(oldValue, newValue, event) {

	if (foundset.find()) {
		filename = '#%' + newValue + '%';
		foundset.newRecord(null, null);
		filename = '#%' + newValue + '%';
		foundset.search(true, false);
	}

	return true
}
