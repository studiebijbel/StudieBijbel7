/**
 * @properties={typeid:35,uuid:"C6F4A50C-1F69-4A97-B882-22944427EDD9",variableType:-4}
 */
var fv_html_editor = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"57CFF27F-58DC-4128-96B8-9AC02DB18DDC",variableType:4}
 */
var fvBookId = null;
/**
 * @type {String}
 * @properties={typeid:35,uuid:"96A6F09F-1217-4927-93FD-20FDFA4F55BC"}
 */
var fvChapterId = null;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"56716241-87E9-4BB5-8A5B-5359676CA16F"}
 */
var fvVerseId = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9B5AC648-8E0B-464E-B403-71B26AC6C3CC",variableType:4}
 */
var fvSelectedIndex = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A433FF32-A3C7-4E7A-B499-2208094BDAD6"}
 */
var text = null;


/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"546C912E-BA87-46C1-95EC-9825CE723938"}
 */
function onLoad(event) {
	fv_html_editor = new scopes.TinyMCE.Editor(elements.html_editor);
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9322A859-03E3-43EB-B95B-C66A393AD8D5"}
 */
function onRecordSelection(event) {
	// testing
	if(fvSelectedIndex != 0)
	{
//		var vRecord = foundset.getRecord(fvSelectedIndex)
//		vRecord.word_text = elements.bean_88.html;
//		scopes.tools.output(text);
	}
	
	// Read the stuff!
	fvSelectedIndex = foundset.getSelectedIndex();
	text = word_text;
	
	getVerseInfo(verse_id);
	
	fv_html_editor.setContent(text);
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {Number} vVerse_id
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B1659084-11AD-4A4D-9031-C6C6DB636AFF"}
 */
function getVerseInfo(vVerse_id) {
	var vSQL 	= "SELECT book_id, chapter_id, pk AS verse_id FROM verses WHERE pk = ?";
	var vDS		= databaseManager.getDataSetByQuery('sb', vSQL, [vVerse_id], 1);
	
	if(vDS.getMaxRowIndex() > 0)
	{
		fvBookId 	= vDS[0]["book_id"];
		fvChapterId = vDS[0]["chapter_id"];
		fvVerseId	= vVerse_id	
		
		Books_ODC(null, null, null, fvBookId);
		Chapters_ODC(null, null, null, fvChapterId)
	}
}
/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 * @param {Number} book_id
 * 
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"952400A0-848E-4491-B60E-D6D161542887"}
 */
function Books_ODC(oldValue, newValue, event, book_id) {
	var vBookID;
	if(newValue != null)
	{
		vBookID = newValue;
	} else {
		vBookID = book_id;
	}
	
	var vSQL 		= "SELECT pk, chapter_no FROM chapters WHERE book_id = ? ORDER BY chapter_no ASC";
	var vDS			= databaseManager.getDataSetByQuery('sb', vSQL, [vBookID], -1);
	var vDisplay	= vDS.getColumnAsArray(2);
	var vReturn		= vDS.getColumnAsArray(1);
	
//	application.setValueListItems(name,displayValArray/dataset,[realValuesArray],[autoconvert(false)])
	application.setValueListItems('sb_edit_con_chapters', vDisplay, vReturn)
	
	// Ok, now we should have a book_id, if not we have a pretty big error ;-)
	
	return true
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 * @param chapter_id
 *
 * @returns {Boolean}
 * 
 * @private
 *
 * @properties={typeid:24,uuid:"5DE726E1-104D-4B53-8FC8-B8ADE33D0D90"}
 */
function Chapters_ODC(oldValue, newValue, event, chapter_id) {
	
	var vChapterID;
	if(newValue != null)
	{
		vChapterID = newValue;
	} else {
		vChapterID = chapter_id;
	}
	
	var vSQL 		= "SELECT pk, verse_number FROM verses WHERE chapter_id = ? ORDER BY verse_number ASC";
	var vDS			= databaseManager.getDataSetByQuery('sb', vSQL, [parseInt(vChapterID)], -1);
	var vDisplay	= vDS.getColumnAsArray(2);
	var vReturn		= vDS.getColumnAsArray(1);
	
//	application.setValueListItems(name,displayValArray/dataset,[realValuesArray],[autoconvert(false)])
	application.setValueListItems('sb_edit_con_verses', vDisplay, vReturn)
	
	// Ok, now we should have a book_id, if not we have a pretty big error ;-)
	
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"05D46E49-1E7C-4290-B03B-DD292113AF16"}
 */
function BTN_cancel(event) {
//	databaseManager.rollbackEditedRecords()
	databaseManager.revertEditedRecords();
	//application.closeFormDialog()

	//SMM - 23-05-2010
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8E5C966A-22AA-4D44-9E35-93574CE5389D"}
 */
function BTN_save(event) {
	if(fvSelectedIndex != 0)
	{
		var vRecord = foundset.getRecord(fvSelectedIndex)
		vRecord.word_text = fv_html_editor.getContent();
	}
	
	databaseManager.saveData();
	
	// RB - nice fix
//	controller.getWindow().hide();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"55D574BA-73D3-460D-9080-422800A983AD"}
 */
function onShow(firstShow, event) {
	fvSelectedIndex = 1;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"703B7DEE-B899-4EE7-9C8D-7D5A1BE0AFC2"}
 */
function BTN_new(event) {
	var vRecord = foundset.getRecord(foundset.newRecord())
	vRecord.calc_word_study_id;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"ACC6C6B8-D88C-4775-BF7C-BB98F8F5129F"}
 */
function openWords(event) {
	var vWordStudyID = word_study_concordance_to_analyze_concordance.calc_word_study_id;
	var vSQL = "SELECT pk FROM analyze_concordance WHERE analyze_id IN (SELECT analyze_id FROM analyze_concordance WHERE calc_word_study_id = ? GROUP BY analyze_id)";
	forms.sb_edit_concordanceAnalyze_list.foundset.loadRecords(vSQL, [vWordStudyID]);
	
	var vWindow = application.createWindow('conco_wo', JSWindow.MODAL_DIALOG, null);
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.sb_edit_concordanceAnalyze_edit);
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
 * @private
 *
 * @properties={typeid:24,uuid:"3BD978AF-12B8-4BAA-9355-E991159072D0"}
 */
function FORM_saveVerseID(oldValue, newValue, event) {
	var vRec = foundset.getRecord(foundset.getSelectedIndex());
	vRec.verse_id = newValue;
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4C406C88-66DB-4C3F-9CE4-0DD58AE0CA96"}
 */
function BTN_getHtml(event) {
}

/**
 * @properties={typeid:24,uuid:"5A61A34F-D378-44F7-B6BC-F15AFBA9DC07"}
 */
function onDataChange() {
	// TODO Auto-generated method stub
	scopes.tools.output(fv_html_editor.getContent());
}