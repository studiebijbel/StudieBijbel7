/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2A452388-5821-4EA3-B568-7BC5103DB5CA"}
 */
var fv_test_to = null;

/**
 * @properties={typeid:35,uuid:"9C4D0CE6-C722-41F9-BE43-36F819A66312",variableType:-4}
 */
var fv_web = null;

/**
 * @properties={typeid:24,uuid:"D2FF6566-3B4C-4B7C-A68E-3B0CB1CC52F2"}
 */
function BTN_cancel() {

	globals.sb_frmOnHideCHK = 0

//	application.closeFormDialog('sb_edit_paragraphs_dlg');
	controller.getWindow().hide();
}

/**
 * @properties={typeid:24,uuid:"C74E9C7A-CCCF-4CDA-B02F-E3D9F85395DD"}
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
 * @properties={typeid:24,uuid:"4181460F-1855-4282-B2A1-0412B508984C"}
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
 * @properties={typeid:24,uuid:"6315A475-2BF2-4237-8C55-416030B87CF4"}
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
 * @properties={typeid:24,uuid:"A8B35DF5-1404-41C2-AC09-60771F1471ED"}
 * @param {JSEvent|*} [event] 
 */
function BTN_update(event) {	
	if(event instanceof JSEvent)
	{
		content = fv_web.getContent(); //fv_web.executeScriptAndWait("tinyMCE.activeEditor.getContent()");		
		if (!content) {
			return false;
		}
	}

	var vHTML = content;

	content = '<html><body>' + vHTML + '</body></html>';

	return true;
}

/**
 * @properties={typeid:24,uuid:"783AFB89-3F3C-40F2-8FFE-851A68B3E0EC"}
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
 * @properties={typeid:24,uuid:"38F8CC73-A6AB-4D3B-876D-65CE4FDA286A"}
 */
function onRecordSelection() {
	return //SMM - 08-11-2011
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C99E02BE-3705-4E6F-951D-E3416EEF4BDB"}
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
 * @properties={typeid:24,uuid:"DD3B932C-BC4B-4122-AAE3-9E16A24E1844"}
 */
function btnPreview(event) {
	var vContent = fv_web.getContent(); //
	
	vContent = utils.stringReplace(vContent, "{FirstName}", "Rick");
	vContent = utils.stringReplace(vContent, "{LastName}", "Bonkestoter");
	vContent = utils.stringReplace(vContent, "{EmailAddress}", "rick@directict.nl");
	vContent = utils.stringReplace(vContent, "{SiteUrl}", "https://www.studiebijbel.nl");
	vContent = utils.stringReplace(vContent, "{ExpireDate}", "31 december 2018");
	vContent = utils.stringReplace(vContent, "{Password}", "Wachtwoord123");
	
	// CSS stuff, so inline it will transfer :-)
	vContent = utils.stringReplace(vContent, "class=\"button\"", 'style="margin-bottom: 25px;padding: 10px 30px; background: transparent linear-gradient(to bottom, #6EC2DE 0%, #75BDD1 50%, #3EB3D6 100%) repeat scroll 0% 0%; color: #FFF;border-radius: 10px;"');
	
	
	forms.sb_edit_EditCommentaryBlocks_preview.html = "<html><body>" + vContent + "<body></html>";

	var vWindow = application.createWindow('sb_edit_EditCommentaryBlocks_preview', JSWindow.DIALOG, null);
	vWindow.title = "Preview";
	vWindow.show('sb_edit_EditCommentaryBlocks_preview');
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3174C409-0848-4371-AB51-16B597669085"}
 */
function onRecordSelection1(event) {
//	foundset.article_text = foundset.article_text.replace(/\<BR\>/,"<br />");
//	foundset.article_text = foundset.article_text.replace(/\\n/,"<br />");
	
	foundset.content = utils.stringReplace(foundset.content, "<BR>", "<br />");
	foundset.content = utils.stringReplace(foundset.content, "\n", "<br />");
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
 * @properties={typeid:24,uuid:"D1213FE9-F763-450B-B8C6-B3FEE5D928BF"}
 */
function onRecordSelection2(event) {
	fv_web.setContent(foundset.content);
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F69FF8C8-DBB8-436B-906A-8612E3DB7D7E"}
 */
function BTN_sendTestMail(event) {
	if(!fv_test_to) {
		plugins.dialogs.showErrorDialog("Error", "Je moet een emailadres specificeren!");
		return false;
	}
	
	var vSB = new scopes.StudyBible.StudieBijbel();
	
	application.output("Message will be sent from identifier " + identifier, LOGGINGLEVEL.DEBUG);
	
	vSB.SendMail(identifier, globals.sb_gCurrentUserID , {FirstName: 'Rick', LastName: "Bonkestoter", Password: "Password-Placeholder", ExpireDate: "31-12-2017"}, fv_test_to, false);
	
	application.output("Done: " + identifier, LOGGINGLEVEL.DEBUG);


	return true;
}
