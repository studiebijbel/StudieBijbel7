/**
 * @properties={typeid:35,uuid:"78450EDD-56FF-46C3-AC87-9295E0B256AF",variableType:-4}
 */
var fv_html_editor_content = null;

/**
 * @properties={typeid:35,uuid:"8FBEADD8-F3DE-45CE-BA28-3356ECAC86E0",variableType:-4}
 */
var fv_html_editor_firstline = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5A6D373D-503C-4F5F-BF65-A586C15DFAAE"}
 */
var fv_firstline = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"54964B7F-706F-4FAA-B100-C3B9CD93FF9F"}
 */
var fv_firstline_plaintext = null;

/**
 * @properties={typeid:24,uuid:"9F24A104-857E-4136-A81F-D5FA7D492CB6"}
 */
function BTN_cancel() {
//	databaseManager.rollbackEditedRecords()
	databaseManager.revertEditedRecords();
	//application.closeFormDialog()

	//SMM - 23-05-2010
	controller.getWindow().hide();
}

/**
 * @properties={typeid:24,uuid:"E6526FFA-0FCB-4596-AA5F-5221D6413E4E"}
 */
function BTN_delete() {
	var vQuestion = plugins.dialogs.showInfoDialog('i18n:cvb.lbl.deleteMessage', 'i18n:cvb.lbl.deleteMessage', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no')

	if (vQuestion == i18n.getI18NMessage('cvb.btn.yes')) {
		foundset.deleteRecord()
		databaseManager.saveData()
		//application.closeFormDialog()
		//SMM - 23-05-2010
		var win = controller.getWindow()
		if (win) {
			win.hide()
		}

	}
}

/**
 * @properties={typeid:24,uuid:"592A4883-7DD7-447D-950B-64BA6FAA6DB5"}
 */
function BTN_migrate() {
	databaseManager.setAutoSave(true);
	foundset.loadAllRecords()
	/** @type JSRecord<db:/sb/word_study> */
	var vRecord
	var vText, i

	application.setStatusText('Updateing HTML to TEXT')
	for (i = 1; i <= foundset.getSize(); i++) {
		vRecord = foundset.getRecord(i);
		vText = globals.ConvertHtmlToText(vRecord.word_text);

		vText = utils.stringReplace(vText, '<html><body>', '')
		vText = utils.stringReplace(vText, '</body></html>', '')

		vRecord.plaintext = vText;
		application.setStatusText('Updateing HTML to TEXT ' + i + ' of ' + foundset.getSize())
	}
	databaseManager.saveData();

	application.setStatusText('Updateing TEXT to HTML')
	for (i = 1; i <= foundset.getSize(); i++) {
		vRecord = foundset.getRecord(i);
		vRecord.word_text = '<html><body>' + globals.ConvertTextToHtml(vRecord.plaintext) + '</body></html>';
		application.setStatusText('Updateing TEXT to HTML ' + i + ' of ' + foundset.getSize())
	}
	databaseManager.saveData();

	application.setStatusText('Done :-)')
}

/**
 * @properties={typeid:24,uuid:"F9483F46-CEAB-43E7-B2CF-6342FD3D98C9"}
 */
function BTN_replace(event) {
	globals.far_arguments = new Object();
	globals.far_arguments.formname = event.getFormName()//SMM application.getMethodTriggerFormName();
	globals.far_arguments.column = "plaintext";
	globals.far_arguments.text = plaintext;

	//application.showFormInDialog( forms.findreplace_form,  -1,-1,-1,-1,  'i18n:cvb.title.findReplace', false,  false, 'replace', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('replace', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.title.findReplace';
	vForm.show(forms.findreplace_form);

}

/**
 * @properties={typeid:24,uuid:"2D61BA22-6C95-4F9B-89D6-A979DE43CE76"}
 * @param {JSEvent} event
 */
function BTN_save(event) {
	BTN_update(event);
	databaseManager.saveData();
	forms.word_study.viewWordStudy()
	//application.closeFormDialog('forms.sb_edit_word_study_dlg')

	//SMM - 23-05-2010
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}

}

/**
 * @properties={typeid:24,uuid:"6BF2C9F4-70AD-4C4D-A7BA-01612B076FF3"}
 * @param {JSEvent} [event]
 */
function BTN_update(event) {
	if(fv_html_editor_content.getContent() && event instanceof JSEvent)
	{
		plaintext = fv_html_editor_content.getContent();
		first_line = fv_html_editor_firstline.getContent();
	}
	
	var vHtml = globals.ConvertTextToHtml(plaintext, null, null);
	var vFirst_line = globals.ConvertTextToHtml(first_line, null, null);
	first_line = vFirst_line;
	word_text = '<html><body>' + (vHtml) + '</body></html>';
}

/**
 * @properties={typeid:24,uuid:"0DAF135A-05C1-4AD8-83CD-2434B76F7D4E"}
 */
function FRM_onShow() {
	//elements.bean_342.html = plaintext
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"444BE937-CC09-4B5C-843F-B66A7CB659FF"}
 */
function onLoad(event) {
	fv_html_editor_firstline = new scopes.TinyMCE.Editor(elements.first_line);
	fv_html_editor_content = new scopes.TinyMCE.Editor(elements.content);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"52D52853-22ED-4C13-BB22-33EF0DB97F39"}
 */
function html_preview(event) {
	var vHtml = globals.ConvertTextToHtml(fv_html_editor_content.getContent(), null, null);
		
	var vFirst_line = globals.ConvertTextToHtml(fv_html_editor_firstline.getContent(), null, null);
	forms.sb_edit_EditCommentaryBlocks_preview.html = "<html><body>" + vFirst_line + "<br /><br />" + vHtml + "<body></html>";

	var vWindow = application.createWindow('sb_edit_EditCommentaryBlocks_preview', JSWindow.DIALOG, null);
	vWindow.show('sb_edit_EditCommentaryBlocks_preview');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"064F0C6B-D268-40F1-8F0E-8740A23347ED"}
 */
function BTN_concordance(event) {
	
	databaseManager.setAutoSave(false);
	
	var vSQL	= "SELECT pk FROM word_study_concordance WHERE calc_word_study_id = ?";
	forms.sb_edit_concordance_list.foundset.loadRecords(vSQL, [ pk ]);
	
	if(forms.sb_edit_concordance_list.foundset.getSize() == 0)
	{
		plugins.dialogs.showErrorDialog('i18n:CvB.lbl.errorMessage','i18n:CvB.lbl.errorNoConcordance');
		return false;
	}
	
	var vWindow = application.createWindow("sb_edit_concordance_list", JSWindow.MODAL_DIALOG, null);
		vWindow.title = "i18n:cvb.wordstudy.WordConcordance";
		vWindow.show(forms.sb_edit_concordance_list);
		
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0549E1E9-27E1-441A-8A07-9DC2D3DE369E"}
 */
function openWords(event) {
	databaseManager.setAutoSave(false);
	var vWordStudyID = pk;	
//	var vSQL = "SELECT pk FROM analyze_concordance WHERE analyze_id IN (SELECT analyze_id FROM analyze_concordance WHERE calc_word_study_id = ? GROUP BY analyze_id)";
	var vSQL = "SELECT pk FROM word_study_analyze WHERE word_study_id = ?";
	forms.sb_edit_concordanceAnalyze_list.foundset.loadRecords(vSQL, [vWordStudyID]);
	
	var vWindow = application.createWindow('conco_wo', JSWindow.MODAL_DIALOG, null);
	vWindow.title = 'i18n:i18n:cvb.lbl.wordvariants';
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.sb_edit_concordanceAnalyze_edit);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"62A9F21E-3583-4404-8F27-0DD6AA930C7C"}
 */
function BTN_firstline_to_plaintext(event) {
	fv_firstline = globals.ConvertHtmlToText(first_line);
	fv_html_editor_firstline.setContent(fv_firstline);
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2AD26BAF-CCAB-40B0-98E0-BC64DF95B668"}
 */
function onRecordSelection(event) {
	fv_firstline = globals.ConvertHtmlToText(first_line);
	fv_html_editor_firstline.setContent(fv_firstline);
	fv_html_editor_content.setContent(plaintext);
}
