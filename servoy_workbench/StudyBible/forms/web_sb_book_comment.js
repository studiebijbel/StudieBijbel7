/**
 * @properties={typeid:24,uuid:"2BA66C4E-56E8-453E-B668-C25474E2EF1D"}
 */
function btnEdit() {

	if (!utils.hasRecords(commentaries_to_verses_to_commentary_blocks)) {
//		application.closeFormDialog('sb_edit_EditCommentaryBlocks');
		forms.sb_edit_EditCommentaryBlocks.controller.getWindow().hide();
		//application.getWindow('sb_edit_EditCommentaryBlocks').close();

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
 * @properties={typeid:24,uuid:"78F0615C-ABF8-4D50-B5FC-7F273C5DBAF6"}
 */
function EVENT_onRecordSelection() {
//	if (globals.sb_gTestament == "Old") {
		// Migratie: de SQL hier moet worden verandert, zeer knap dat dit nu werkt!
		//var vSQL = "SELECT pk FROM footnotes WHERE commentary_block_id = ?"
		var vSQL = "SELECT pk FROM commentaries_to_verses WHERE verse_id = ?"
			//application.sleep(500);
			//forms.book_notes.foundset.loadRecords(vSQL, [globals.verse_id])
		//forms.book_notes.footnotes = "<html><body>AlloAllo!!!</body></html>"
		EVENT_loadBookNotes();
//	}
	globals.commentary_id = commentary_id

	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		vSQL = "SELECT * FROM usernotes WHERE user_id = ? AND commentary_block_id = ? ORDER BY usernote_id DESC"
		var vDS = databaseManager.getDataSetByQuery('sb', vSQL, [globals.sb_gCurrentUserID, commentary_id], -1);
		
		if(vDS.getMaxRowIndex() == 0) {
			forms.web_user_notes.fv_html = '<p>U heeft geen notities voor dit commentaar!</p>';
		} else {
			forms.web_user_notes.fv_html = '<div class="notes">';
			var vRec;
			for(var i = 0; i <= vDS.getMaxRowIndex(); i++) {
				vRec = vDS[i];
				forms.web_user_notes.fv_html += '<div class="title-header">\
				<div class="pull-left"><p><strong>' + vRec['usernote_description'] +  '</strong></p></div>\
				<div class="pull-right">' + utils.dateFormat(vRec['usernote_date'], 'dd-MM-YYYY') +  '</div>\
			</div>\
			<div class="clearfix"></div>\
			<p>' + vRec['usernote_note'] + '</p>\
			<br />';
			}
			forms.web_user_notes.fv_html += '</div>';
		}
		
		//forms.web_user_notes.foundset.loadRecords(vSQL, [globals.sb_gCurrentUserID, commentary_id]);
	}
	
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} [event] the event that triggered the action
 *
 *
 * @properties={typeid:24,uuid:"63D7CAF7-1A4F-4E8A-9146-16F539C3D0CD"}
 */
function EVENT_loadBookNotes(event) {
	// New test function by Rick!

	//Migratie: SQL aanpassen list werkt niet op PostgreSQL
	/*var query = "SELECT list('<f><b>' || f.footnote_number || '</b></f>&nbsp;' || f.htmltext, '<br>'  ORDER BY f.footnote_number) as footnote FROM footnotes AS f" +
	 " WHERE f.commentary_block_id = ?"*/
	var query = "SELECT array['<f><b>' || f.footnote_number || '</b></f>&nbsp;' || f.htmltext || '<br>'] as footnote FROM footnotes AS f" + " WHERE f.commentary_block_id = ? ORDER BY f.footnote_number"
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
	globals.notes = vHTML;
	forms.book_notes.fv_html = vHTML;
	databaseManager.saveData();
}

/**
 * @properties={typeid:24,uuid:"79EFD20E-1AFC-4F18-BB27-C220B03B9320"}
 */
function init() {
	//foundset.clearFoundSet()
}

/**
 * @properties={typeid:24,uuid:"000D4F95-35E3-4A1B-A439-688A16DF0AB4"}
 */
function newWindow() {
	if (globals.selected_verse_id < 1) {
		return
	}
	globals.showCommentaryInDialog(globals.commentary_id)
}

/**
 * @properties={typeid:24,uuid:"45180B27-84EE-4995-B36A-E803B239009C"}
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
 * @properties={typeid:24,uuid:"F8C7689A-36E8-4B74-ADF9-B22CDEDBE66B"}
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
	vForm.show(forms.print_commentary_dlg);
}

/**
 * @properties={typeid:24,uuid:"5937E203-95F3-45EA-9B11-2CF05F24916A"}
 */
function wlink() {

	//var arg = ''
	//arg = arg.concat(arguments[0])
	//scopes.tools.output('wlink='+arg)
	//globals.selectedWordStudy = arg
	//forms.word_study.viewWordStudy()

	globals.wlink(arguments[0]);

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2707DCE4-C7D7-43DA-805B-2B5388442CD6"}
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
 * @properties={typeid:24,uuid:"9F04EAC4-DBC5-4C08-B762-8AB240185365"}
 */
function onShow(firstShow, event) {
	var vUserAgent = Packages.org.apache.wicket.RequestCycle.get().getClientInfo().getUserAgent()+"";
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
 * @properties={typeid:24,uuid:"2E8B0794-B0E4-481F-9F12-67D31FA6316A"}
 */
function BTN_home(event) {
	forms.web_sb_form.elements.tab_notes.visible = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D8DDD1F1-C6AD-42DE-81D8-24B6E5623D5D"}
 */
function _TEST(event) {
	// TODO Auto-generated method stub
}
