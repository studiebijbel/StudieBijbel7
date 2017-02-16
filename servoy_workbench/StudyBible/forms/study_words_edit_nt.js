/**
 * @properties={typeid:24,uuid:"4BC92B0E-0963-4E15-8C11-CD07A870887F"}
 */
function BTN_cancel() {
	//databaseManager.rollbackEditedRecords()
	if (globals.sb_frmOnHideCHK == 1) {
		globals.sb_frmOnHideCHK = 0;
	} else {
		databaseManager.revertEditedRecords()
		globals.sb_frmOnHideCHK = 0;	
		application.getWindow("study_words_edit_nt").hide();
	}

}

/**
 * @properties={typeid:24,uuid:"62B33EE6-549B-46D5-871B-FFE029D58DBE"}
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

/**
 * @properties={typeid:24,uuid:"8428BAA3-5B81-4BD7-832E-174B596EDF61"}
 * @param {*} prm
 * @param {*} chk
 */
function BTN_save(prm, chk) {
	databaseManager.saveData()
	
	// RB - 24-11-2011: changed this because argumets[1] is only a boolean and arguments[0] is the REAL value
	if (arguments[1]) {
		globals.verse_id_calc_last = 1
		globals.sb_edit_WordsTranslationToHTML_nt(arguments[0])
	} else {
		globals.sb_edit_WordsTranslationToHTML_nt(verse_id)
	}
	//forms.study_words.viewWordsForSelectedVerse();
	//application.sleep(2)

	//argument is vanaf de admin popup bij grote bijwerking alle verzen
	if (arguments[1] != true) {
		globals.sb_frmOnHideCHK = 1
		forms.study_words.calc_study_words
		//application.closeFormDialog(forms.study_words_edit_nt)
		//SMM - 23-05-2010
		var win = controller.getWindow()
		if (win) {
			win.hide()
		}
		
	}
	//application.closeFormDialog(forms.study_words_edit_nt)

}

/**
 * @properties={typeid:24,uuid:"80B9260A-2985-47B6-8207-5F7111C8BE6D"}
 */
function BTN_save_old() {
	databaseManager.saveData()
//	application.closeFormDialog()
	controller.getWindow().hide();
	globals.sb_edit_WordsTranslationToHTML_nt(verse_id)
	//forms.study_words.viewWordsForSelectedVerse();

}

/**
 * @properties={typeid:24,uuid:"BA440398-E958-428B-A88B-1D9D8082E78F"}
 */
function BTN_showManuscripts() {
	forms.study_words.BTN_manuscriptEdit();
}


/**
 * Perform sort.
 *
 * @param {String} dataProviderID element data provider
 * @param {Boolean} asc sort ascending [true] or descending [false]
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"88E72A5F-6AC6-407D-80CA-AB82FE36B7E5"}
 */
function onSort(dataProviderID, asc, event) {
	return false;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"89487B38-1FFE-4740-B432-A7225248E36E"}
 */
function onShow(firstShow, event) {
	foundset.sort("word_order asc");
}
