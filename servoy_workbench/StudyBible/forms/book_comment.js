/**
 * @properties={typeid:24,uuid:"43fedbcd-a8b0-4995-85ad-7af6ec9c5e9c"}
 */
function btnEdit() {

	if (!utils.hasRecords(commentaries_to_verses_to_commentary_blocks)) {
		//application.closeFormDialog('sb_edit_EditCommentaryBlocks');
		//application.getWindow('sb_edit_EditCommentaryBlocks').hide();
		if(forms.sb_edit_EditCommentaryBlocks.controller.getWindow()) {
			forms.sb_edit_EditCommentaryBlocks.controller.getWindow().hide();
		}
		
		var vQuestion = plugins.dialogs.showQuestionDialog('', 'i18n:cvb.msg.noCommentaryFound', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no')
		if (vQuestion == i18n.getI18NMessage('cvb.btn.yes')) {
			// Show import dialog.
			forms.sb_edit_EditCommentaryBlocks.ImportCommentaryBlock();
		}
		return true;
	}

	// get the commentary id
	//globals.sb_import_backupCommentaryId = globals.commentary_id
	globals.sb_import_backupCommentaryId = commentaries_to_verses_to_commentary_blocks.commentary_id;

	//Default processing when showing the Edit Commentary window
	
	databaseManager.setAutoSave(false);
	
	globals.sb_edit_EditCommentaryBlocksVisible = 1
	globals.sb_edit_htmlTextCommentary = ""
	globals.sb_edit_htmlTextFootnote = ""
	// MAURICE: if there are no related records show import dialog.

	// MAURICE: Load selected commentary_block edit screen.
	var vSQL = "SELECT pk FROM commentary_blocks WHERE pk = ?"
	if (!commentary_id) {
		plugins.dialogs.showInfoDialog('', "No commentary id.", "OK");
	}
	forms.sb_edit_EditCommentaryBlocks.foundset.loadRecords(vSQL, [commentary_id])
	
	forms.sb_edit_EditCommentaryBlocks.foundset.plaintext = utils.stringReplace(forms.sb_edit_EditCommentaryBlocks.foundset.plaintext, "<BR>", "<br />");
//	forms.sb_edit_EditCommentaryBlocks.foundset.plaintext = utils.stringReplace(forms.sb_edit_EditCommentaryBlocks.foundset.plaintext, "\n", "<br />");
	
	// MAURICE: dirty, default action is rollback. if user clicked save button in popup, this global becomes false.
	globals.doRollback = true;
	// MAURICE: Show edit dialog.
	//application.showFormInDialog( forms.sb_edit_EditCommentaryBlocks,  -1, -1, 770, 700,  "i18n:cvb.title.editCommentary",  true,  false,  'commentaryEditForm', true)
	var vForm = application.createWindow('commentaryEditForm', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.title.editCommentary';
	vForm.show(forms.sb_edit_EditCommentaryBlocks);

	return true
}

/**
 * @properties={typeid:24,uuid:"80a8e0ca-0a05-466b-9119-866a968aeef0"}
 * @param {*} [fromFlink]
 */
function EVENT_onRecordSelection(fromFlink) {
	if(fromFlink instanceof JSEvent) {
		fromFlink = false;
	}
	
	application.output("FLINK clicked? " + fromFlink)
	var vSQL = "SELECT pk FROM commentaries_to_verses WHERE verse_id = ?"
	EVENT_loadBookNotes(null, fromFlink);

	if(!fromFlink) {
		globals.commentary_id = commentary_id
	}
	
	var vHTML = "";
	
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT && utils.hasRecords(commentaries_to_verses_to_commentary_blocks)) {
		vSQL = "SELECT * FROM usernotes WHERE user_id = ? AND commentary_block_id = ? ORDER BY usernote_id DESC"
		var vDS = databaseManager.getDataSetByQuery('sb', vSQL, [globals.sb_gCurrentUserID, commentaries_to_verses_to_commentary_blocks.pk], -1);
		
		if(vDS.getMaxRowIndex() == 0) {
			vHTML = '<p>' + i18n.getI18NMessage('cvb.lbl.no_notes') + '</p>';
		} else {
			vHTML = '<div class="notes">';
			var vRec;
			for(var i = 0; i < vDS.getMaxRowIndex(); i++) {
				vRec = vDS[i];
				
				var vTitle =  ((vRec['usernote_description'])?vRec['usernote_description']:"Geen titel");
				var vDate = utils.dateFormat(vRec['usernote_date'], 'dd-MM-yyyy');
				var vNote = ((vRec['usernote_note'])?vRec['usernote_note']:"");
				
				vHTML += '<div>\n\
					<div class="title-header">\n\
						<div class="pull-left"><p><strong>' + vTitle +  '</strong></p></div>\n\
						<div class="pull-right">' + vDate +  '</div>\n\
					</div>\n\
					<div class="clearfix"></div>\n\
					<p>' + vNote + '</p>\n\
					<br /><br />\n\
					</div>';
			}
			vHTML += '</div>';
		}
		forms.web_user_notes.fv_html = vHTML;
	}
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} [event] the event that triggered the action
 * @param {*} [fromFlink]
 *
 * @properties={typeid:24,uuid:"10572EE0-BEDB-4081-9EA1-0A702464A992"}
 */
function EVENT_loadBookNotes(event, fromFlink) {
	// New test function by Rick!

	//Migratie: SQL aanpassen list werkt niet op PostgreSQL
	/*var query = "SELECT list('<f><b>' || f.footnote_number || '</b></f>&nbsp;' || f.htmltext, '<br>'  ORDER BY f.footnote_number) as footnote FROM footnotes AS f" +
	 " WHERE f.commentary_block_id = ?"*/
	var query = "SELECT array[' <f><b>' || f.footnote_number || '</b></f>&nbsp;' || f.htmltext || '<br>'] as footnote FROM footnotes AS f" + " WHERE f.commentary_block_id = ? ORDER BY f.footnote_number"
		//var res = databaseManager.getDataSetByQuery(forms.articles.controller.getServerName(),query,[commentary_id], -1)
	//Migratie: aanpassen; je mag geen databaseManager meer gebruiken in een calculatie!
	var res = databaseManager.getDataSetByQuery('sb', query, [commentary_id], -1)

	//Migratie: loop maken ter vervanging van de list functie
	var vFootnoteValue = ""
	for (var i = 1; i <= res.getMaxRowIndex(); i++) {
		vFootnoteValue += res.getValue(i, 1).substring(2, res.getValue(i, 1).length - 2)
	}

	// remove the \\" for the " so the webclient works
	vFootnoteValue = utils.stringReplace(vFootnoteValue, '\\"', '"');

	var vExtraHTML = ""
	if (globals.sb_gSelectedFootNoteNo > 0) {
		var vSQL = "SELECT footnote_number, htmltext FROM footnotes WHERE commentary_block_id = ? AND footnote_number = ?"
		var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [commentary_id, globals.sb_gSelectedFootNoteNo], 1);
		vExtraHTML = "<strong>" + vResult.getValue(1, 1) + "</strong> " + vResult.getValue(1, 2) + "<br /><br />";
		globals.sb_gSelectedFootNoteNo = null; //SMM 03-11-2011 NEW VERSE THEN START IN footnote_number = 1
	}

	var vHTML = "<html><body>" + vExtraHTML + vFootnoteValue + "</body></html>";
	forms.book_notes.footnotes = vHTML;
	// temp test

//	globals.notes = vHTML;
	// #LTF-508196 : commentaar NT begint niet bovenaan
	if(!fromFlink) {
		elements.commentary.setScroll(0, 0);
	}
	
	forms.book_notes.EVENT_loadNotes(vHTML);
}



/**
 * @properties={typeid:24,uuid:"bec7c25e-bb00-452a-ab77-6a2f5837d95e"}
 */
function init() {
	//foundset.clearFoundSet()
}

/**
 * @properties={typeid:24,uuid:"fcac8816-0871-48c0-bfea-66263ec0c982"}
 */
function newWindow() {
	if (globals.selected_verse_id < 1) {
		return
	}
	globals.showCommentaryInDialog(globals.commentary_id)
}

/**
 * @properties={typeid:24,uuid:"acd6af5a-f69a-4d1e-977c-df5375292798"}
 */
function openNotes() {
	databaseManager.setAutoSave(true)

	var vSQL = "SELECT usernote_id FROM usernotes WHERE user_id = ? AND commentary_block_id = ?"
	forms.usernotes_lst.elements.btn_new.visible = true
	forms.usernotes_lst.elements.lbl_new.visible = true;
	forms.usernotes_lst.elements.btn_print.visible = true;
	forms.usernotes_lst.foundset.loadRecords(vSQL, [globals.sb_gCurrentUserID, globals.commentary_id]);

	//application.showFormInDialog(forms.usernotes_lst,  -1, -1, -1, -1, 'i18n:cvb.lbl.usernotes', false,  false,  'myNotes',  false)
	//SMM 20-05-2011
	var vForm = application.createWindow('myNotes', JSWindow.DIALOG, null);
	vForm.title = 'i18n:cvb.lbl.usernotes';
	vForm.setInitialBounds(10, 20, 600, 300)
	vForm.show(forms.usernotes_lst);

}

/**
 * @properties={typeid:24,uuid:"9be03a62-294b-4f7b-b031-4fba35cacb6f"}
 * @AllowToRunInFind
 */
function printForm() {
	/*globals.print3 = 'Commentaar'
	 globals.print2 = ''
	 globals.print1 = ''
	 globals.print4 = ''
	 globals.print5 = ''
	 globals.print6 = ''
	 globals.print7 = ''
	 globals.print8 = ''
	 globals.print_abrev = ''
	 globals.print_AlleenGrieks = ''
	 globals.print_versions = ''
	 globals.print_WordStudy = ''

	 var vFoundset = databaseManager.getFoundSet('sb', 'commentary_blocks');
	 if(vFoundset.find())
	 {
	 vFoundset.pk = globals.commentary_id//globals.commentary_print
	 vCount = vFoundset.search();
	 }

	 if(vCount == 1)
	 {
	 globals.commentary_print = vFoundset.showCommentary
	 }

	 globals.printForm()*/

	globals.sb_print_bibleTranslations = 0
	//application.showFormInDialog( forms.print_commentary_dlg,  -1, -1, -1, -1, 'i18n:cvb.lbl.print', false, false, 'printDLG', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('printDLG', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.lbl.print';
	vForm.setInitialBounds(-1,-1,-1,-1);
	vForm.show(forms.print_commentary_dlg);
}

/**
 * @properties={typeid:24,uuid:"fa832e32-2939-410c-acb5-124a7ad6b48c"}
 * @param {String} inp
 */
function wlink(inp) {

	//var arg = ''
	//arg = arg.concat(arguments[0])
	//scopes.tools.output('wlink='+arg)
	//globals.selectedWordStudy = arg
	//forms.word_study.viewWordStudy()

	globals.wlink(inp, null, null, null);

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"EE9D6D39-752C-4F61-8394-519583132C1B"}
 */
function onAction_clipboard(event) {
	// clipboard test.

}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9F43079C-35B7-4667-B3A4-2D39FE7134D4"}
 */
function onShow(firstShow, event) {
	/** @type {*} */
	var vUserAgent = Packages.org.apache.wicket.RequestCycle.get().getClientInfo().getUserAgent() + "";
	if(vUserAgent.match(/iPad/gi))
	{
		forms.sb_form.BTN_DeafultSplitPanels(event);
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"56C3E402-15B9-4133-869B-0B8BC50C9B28"}
 */
function BTN_read(event) {
	if(utils.hasRecords(foundset.commentaries_to_verses_to_commentary_blocks)) {
		forms.web_sb_read.fv_title = i18n.getI18NMessage('lbl_commentary');
		forms.web_sb_read.fv_html = foundset.commentaries_to_verses_to_commentary_blocks.showCommentary;
		forms.web_sb_read.fv_print = printForm;
		
		forms.web_sb_read.elements.html.caretPosition = 0;
		forms.web_sb_read.elements.html.setScroll(0,0);
		
		forms.web_sb_form.elements.tab_notes.tabIndex = 4;
		forms.web_sb_form.elements.tab_notes.visible = true;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EA3CE2A5-8FA6-4774-B6A3-0AC9F99C7B30"}
 */
function onAction(event) {
}
