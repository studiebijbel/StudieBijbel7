/**
 * @properties={typeid:24,uuid:"968B3616-64CE-4EB1-BF40-48BC7B629E52"}
 */
function BTN_cancel() {
	databaseManager.revertEditedRecords();
	
	application.getWindow("study_words_edit").hide();
	
}

/**
 * @properties={typeid:24,uuid:"44C63ED4-9DFA-415D-AADB-8378059754D3"}
 */
function BTN_edit() {
	// get the pk
//	var iVerseId = globals.selected_verse_id;
//	var vSQL = "SELECT pk FROM words WHERE verse_id = '" + iVerseId + "'";

}

/**
 * @properties={typeid:24,uuid:"63D71B51-2D3F-4943-A4CA-3D52779EC115"}
 */
function BTN_save() {
	/** @type JSRecord<db:/sb/words> */
	var vRecord
	for (var i = 1; i < foundset.getSize(); i++) {
		vRecord = foundset.getRecord(i);
		vRecord.word_orginal_unicode = globals.stringToCharNo(vRecord.word_original);
	}

	databaseManager.saveData();
	if(application.getWindow("study_words_edit"))
		application.getWindow("study_words_edit").hide();

	globals.sb_edit_WordsTranslationToHTML_ot(globals.verse_id)

}

/**
 * @properties={typeid:24,uuid:"9075B8F1-4066-455F-80DD-2BCF898D8D58"}
 */
function FORM_onShow() {
	//elements.word_original.setFont("SIL Ezra")

}

/**
 * @properties={typeid:24,uuid:"BB46668A-5917-4E52-A412-B30504EC9BCB"}
 */
function BTN_newOrEdit() {
	var vSQL; 
	var vStrong = word_strong.split('.');

	if (!calc_search_word_study_chk) {
		/** @type JSRecord<db:/sb/word_study> */
		var vRecord = forms.sb_edit_word_study_dlg.foundset.getRecord(forms.sb_edit_word_study_dlg.foundset.newRecord());
		vRecord.word_strong = vStrong[0]
		vRecord.original = word_original
		vRecord.transliteration = word_transliteration
		databaseManager.saveData();

	}

	databaseManager.setAutoSave(false);
	vSQL = "SELECT pk FROM word_study WHERE word_strong = ?"
	forms.sb_edit_word_study_dlg.foundset.loadRecords(vSQL, [vStrong[0]])
	
	
	forms.sb_edit_word_study_dlg.foundset.plaintext = utils.stringReplace(forms.sb_edit_word_study_dlg.foundset.plaintext, "<BR>", "<br />");
//	forms.sb_edit_word_study_dlg.foundset.plaintext = utils.stringReplace(forms.sb_edit_word_study_dlg.foundset.plaintext, "\n", "<br />");
	
	//application.showFormInDialog(forms.sb_edit_word_study_dlg, -1, -1, -1, -1, 'i18n:cvb.wordstudy.WordStudy', true, false, 'i18n:cvb.wordstudy.WordStudy', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('WordStudyDLGForm', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.wordstudy.WordStudy';
	vForm.show(forms.sb_edit_word_study_dlg);	
}
