/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4944AFD5-0B08-4CC9-9AD4-E9360B5019D3"}
 */
var f_filename = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0E122D5D-C42D-472D-8AF3-5952C05B2C90"}
 */
var f_results = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F79DE024-AAFB-4680-A125-796C4029A1AC"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	var vSource = forms.import_wordstudyWizard_step2_pan;
	
	var vWordStudyFS = databaseManager.getFoundSet('sb','word_study');
	// if found update record.
	if(vWordStudyFS.find()){
		vWordStudyFS.word_strong = vSource.f_wordstrong;
		vWordStudyFS.study_version	= vSource.f_wordstudy_version;
		var vCount = vWordStudyFS.search();
	}
	
	var vRecord;
	if(vCount == 1){
		/** @type {JSRecord<db:/sb/word_study>} */
		vRecord = vWordStudyFS.getRecord(1);
	}else{
		/** @type {JSRecord<db:/sb/word_study>} */
		vRecord = vWordStudyFS.getRecord(vWordStudyFS.newRecord());	
	}
	
	
	
	vRecord.word_text		= vSource.f_html
	vRecord.word_strong		= vSource.f_wordstrong
	vRecord.original		= vSource.f_original
	vRecord.transliteration	= vSource.f_transliteration;
	vRecord.first_line		= vSource.f_firstline;
	vRecord.plaintext		= vSource.f_plaintext;
	vRecord.study_version	= vSource.f_wordstudy_version;
	vRecord.testament		= vSource.f_testament;
	databaseManager.saveData();
	
	application.sleep(2000);
	
	forms.import_wordstudyWizard_dlg.elements.steps.tabIndex = 4;
}
