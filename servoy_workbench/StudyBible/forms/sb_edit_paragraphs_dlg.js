/**
 * @properties={typeid:35,uuid:"064D54B9-C161-498B-954E-4B60AAC9B657",variableType:-4}
 */
var fv_web = null;

/**
 * @properties={typeid:24,uuid:"D2D8C3DD-3370-4C04-BA28-FA672ED81F35"}
 */
function BTN_cancel() {

	globals.sb_frmOnHideCHK = 0

//	application.closeFormDialog('sb_edit_paragraphs_dlg');
	controller.getWindow().hide();
}

/**
 * @properties={typeid:24,uuid:"FEB4A535-CAA7-4FE5-A4E4-B3DE7C2191C0"}
 */
function BTN_migrate() {
	databaseManager.setAutoSave(true);
	/** @type JSRecord<db:/sb/articles> */
	var vRecord, vText, i
	application.setStatusText('Updateing HTML to TEXT')
	for (i = 1; i <= foundset.getSize(); i++) {
		vRecord = foundset.getRecord(i);
		vText = globals.ConvertHtmlToText(vRecord.article_html);

		vText = utils.stringReplace(vText, '<html><body>', '')
		vText = utils.stringReplace(vText, '</body></html>', '')

		vRecord.article_text = vText;
		application.setStatusText('Updateing HTML to TEXT ' + i + ' of ' + foundset.getSize())
	}
	databaseManager.saveData();

	application.setStatusText('Updateing TEXT to HTML')
	for (i = 1; i <= foundset.getSize(); i++) {
		vRecord = foundset.getRecord(i);
		vRecord.article_html = '<html><body>' + globals.ConvertTextToHtml(vRecord.article_text) + '</body></html>';
		application.setStatusText('Updateing TEXT to HTML ' + i + ' of ' + foundset.getSize())
	}
	databaseManager.saveData();

	application.setStatusText('Done :-)')
}

/**
 * @param {JSEvent} event
 * @properties={typeid:24,uuid:"1C711B3B-B1D7-45CE-A0F3-B13CF9E13E28"}
 */
function BTN_replace(event) {
	globals.far_arguments = new Object();
	globals.far_arguments.formname = event.getFormName(); // application.getMethodTriggerFormName();
	globals.far_arguments.column = "article_text";
	globals.far_arguments.element = "fck_edit"
	globals.far_arguments.text = fv_web.getContent(); //article_text;

	//application.showFormInDialog(forms.findreplace_form, -1, -1, -1, -1, 'i18n:cvb.title.findReplace', false, false, 'replace', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('replace', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.title.findReplace';
	vForm.show(forms.findreplace_form);

}

/**
 * @properties={typeid:24,uuid:"EDBAE04E-4404-491A-AA57-EC5D182A71BC"}
 * @param {JSEvent} [event]
 */
function BTN_save(event) {
	//Method call
	if (BTN_update(event)) {

		databaseManager.saveData();
		//scopes.tools.output(databaseManager.saveData())
		globals.sb_frmOnHideCHK = 1
//		application.closeFormDialog('sb_edit_paragraphs_dlg');
		if(controller.getWindow()) {
			controller.getWindow().hide();
		} else {
			application.getWindow(event.getFormName()).hide();
		}
	}
}

/**
 * @properties={typeid:24,uuid:"67A11E21-F00C-4D99-9FB9-46B81A02B0CB"}
 * @param {JSEvent|*} [event] 
 */
function BTN_update(event) {
	var splitWord;
	
	if(event instanceof JSEvent)
	{
		article_text = fv_web.getContent(); //fv_web.executeScriptAndWait("tinyMCE.activeEditor.getContent()");
	
		scopes.tools.output(article_text)
		
		if (!article_text) {
			return false;
		}
	}

	var vHTML = globals.ConvertTextToHtml(article_text)

	var vWordSplit = vHTML.split('<font face="SIL Heb Trans">');
	// Loop trough stringlength
	for (var k = 1; k < vWordSplit.length; k++) {
		if (vWordSplit[k]) {
			splitWord = vWordSplit[k].split('</font>');
			vHTML = utils.stringReplace(vHTML, splitWord[0], globals.stringToCharNo(splitWord[0]))
		}

	}
	article_html = '<html><body>' + vHTML + '</body></html>';

	return true;
}

/**
 * @properties={typeid:24,uuid:"EE4AE009-F860-4956-86DF-4096CE8D8BF8"}
 */
function onHide() {
	if (globals.sb_frmOnHideCHK == 0) {
		// only rollback if data is not manually saved!
		databaseManager.revertEditedRecords()
	}
	globals.sb_frmOnHideCHK = 0
	databaseManager.saveData()
	databaseManager.setAutoSave(true)
}

/**
 * @properties={typeid:24,uuid:"0CCEEFD7-6E8B-448D-8B21-B5214A06BCC2"}
 */
function onRecordSelection() {
	return //SMM - 08-11-2011
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EF06F2C0-28A2-4897-8A67-E689E15F4A83"}
 */
function onLoad(event) {
	fv_web = new scopes.TinyMCE.Editor(elements.tabless);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A8A7EFDF-AFE9-4A55-BA86-4B6F789C969B"}
 */
function btnPreview(event) {
	var vContent = fv_web.getContent(); //
	var html = globals.ConvertTextToHtml(vContent, "Gen.", 1);
		
	forms.sb_edit_EditCommentaryBlocks_preview.html = "<html><body>" + foundset.filename + "<br /><br />" + html + "<body></html>";

	var vWindow = application.createWindow('sb_edit_EditCommentaryBlocks_preview', JSWindow.DIALOG, null);
	vWindow.title = "Preview";
	vWindow.show('sb_edit_EditCommentaryBlocks_preview');
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"11C75BCF-E12C-4C44-9B52-F59583748A97"}
 */
function onRecordSelection1(event) {
//	foundset.article_text = foundset.article_text.replace(/\<BR\>/,"<br />");
//	foundset.article_text = foundset.article_text.replace(/\\n/,"<br />");
	
	foundset.article_text = utils.stringReplace(foundset.article_text, "<BR>", "<br />");
	foundset.article_text = utils.stringReplace(foundset.article_text, "\n", "<br />");
/*	
	elements.fck_edit.html = "";
	elements.fck_edit.html = foundset.article_text;*/
}


/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"99EB90A2-9386-4A25-B28D-C907369C6B81"}
 */
function onRecordSelection2(event) {
	// Support Ticket #FNF-919346
	//foundset.article_text = utils.stringReplace(foundset.article_text, "<BR>", "\n");
	//foundset.article_text = utils.stringReplace(foundset.article_text, "<br />", "\n");
	foundset.article_text = utils.stringReplace(foundset.article_text, "\n", "");
	fv_web.setContent(foundset.article_text);
}
