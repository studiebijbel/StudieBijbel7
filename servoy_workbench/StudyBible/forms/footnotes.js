/**
 * @properties={typeid:24,uuid:"7A7232B5-5F2F-42E3-8947-563E21F20FEF"}
 */
function BTN_delete() {
	var vQuestion = plugins.dialogs.showQuestionDialog('i18n:cvb.btn.delete', 'i18n:cvb.lbl.deleteMessage', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');

	if (vQuestion == i18n.getI18NMessage('i18n:cvb.btn.yes')) {
		var currentFootnoteNumber = footnote_number
//		var vUpdateFN = currentFootnoteNumber;
		var vRecord = null; 
		/** @type {scopes.TinyMCE.Editor} */
		var vText = forms.sb_edit_EditCommentaryBlocks.fv_html_editor.getContent();
		/** @type {String} */
		var vPlain = vText.toString();
	
		foundset.deleteRecord();
		
		//Remove the deleted footnote form the plaintext
		vPlain = utils.stringReplace(vPlain, "[cvb_f]" + currentFootnoteNumber + "[/cvb_f]", "")

		
		for (var i = 1; i <= foundset.getSize(); i++) {
			vRecord = foundset.getRecord(i);
			vRecord.footnote_number = i;
			if (vRecord.footnote_number >= currentFootnoteNumber) {
				vRecord.footnote_number = (vRecord.footnote_number);
				//Change the footnote links in the plain text
				vPlain = utils.stringReplace(vPlain, "[cvb_f]" + ( (vRecord.footnote_number) + 1) + "[/cvb_f]", "[cvb_f]" + vRecord.footnote_number + "[/cvb_f]")
			}
		}
		//	foundset.loadAllRecords()

		//forms.sb_edit_EditCommentaryBlocks.plaintext = vPlain
		forms.sb_edit_EditCommentaryBlocks.fv_html_editor.setContent(vPlain);
		
		
		/*
		 for(i = 1; i <= foundset.getSize(); i++)
		 {
		 var vRecord = foundset.getRecord(i);
		 if(vRecord.footnote_number > currentFootnoteNumber)
		 {
		 vRecord.footnote_number = (vRecord.footnote_number)-1
		 }
		 }
		 databaseManager.saveData();
		 */
		application.updateUI(1)
	}
}

/**
 * @properties={typeid:24,uuid:"04804824-36B8-4EB9-ADA1-D23C32BA5D4E"}
 */
function onRecordSelection() {
	//Process variables for a proper showing on the sb_edit_EditCommentaryBlocks form

	var vHtmlFootnnote

	//Fill in the current footnote's plaintext, if not already present
//	var vFootnotePlaintext = foundset.plaintext

//	vHtmlFootnnote = globals.ConvertTextToHtml(foundset.plaintext, null, null);
//	foundset.htmltext = vHtmlFootnnote

	vHtmlFootnnote = foundset.htmltext; 
	
	//Fill in the global html footnote field, for showing
	globals.sb_edit_htmlTextFootnote = "<html>" + vHtmlFootnnote + "</html>"

	forms.sb_edit_EditCommentaryBlocks.elements.editFootnotes.enabled = true

}
