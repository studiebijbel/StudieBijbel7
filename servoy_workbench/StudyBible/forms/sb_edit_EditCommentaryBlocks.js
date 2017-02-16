/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EFFBBB5E-9253-4EC4-A591-4B16C48219AB"}
 */
var fv_html = null;

/**
 * @properties={typeid:35,uuid:"3CFBEFEF-5D3C-471F-85F0-FFD330E64210",variableType:-4}
 * @type {scopes.TinyMCE.Editor}
 */
var fv_html_editor = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6C1BF06F-AD34-482C-BB6E-4CFBC3DDA088"}
 */
var old_chapter_from = null;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"806AD912-E950-4C34-A6CD-503B74A8FBB8"}
 */
var old_chapter_to = null;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"67F97E51-8CA4-4E42-8749-9DC900205C4B"}
 */
var old_verses_from = null;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"51BCC448-E17B-496E-B77C-E4283762228F"}
 */
var old_verses_to = null;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"3E84A48A-27D4-44D8-9CCC-26304CE288E2"}
 */
var old_commentary_pt = null;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"EB61827D-97EF-47E4-8284-9F505F8EB61D"}
 */
var old_commentary_html = null;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"108B20C9-D18D-4BC2-A208-3777968A8DC0"}
 */
var old_commentary_html_short = null;

/**
 * @properties={typeid:24,uuid:"D52E3653-0B26-42C7-A9C8-6E44642F74A6"}
 */
function BTN_export() {
	// Verses
	var vDir = plugins.file.showDirectorySelectDialog();

	var vExportCommentary = title + "\n\r" + plaintext;
	var vExportFootnotes = "";
	// Loop trough
	for (var i = 1; i <= commentary_blocks_to_footnotes.getSize(); i++) {

		commentary_blocks_to_footnotes.setSelectedIndex(i) //setSeletedIndex(i);
		vExportFootnotes += "[cvb_f]" + commentary_blocks_to_footnotes.footnote_number + "[/cvb_f] " + commentary_blocks_to_footnotes.plaintext + "\n\r"
	}

	var vCharSet = globals.sb_export_charset
	var vOs = plugins.it2be_tools.client().osName;
	if (vOs.match("Windows")) {
		plugins.file.writeTXTFile(vDir + "\\export_commentaries.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vExportCommentary), vCharSet)
		plugins.file.writeTXTFile(vDir + "\\export_footnotes.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vExportFootnotes), vCharSet)
	} else if (vOs.match("Mac")) {
		plugins.file.writeTXTFile(vDir + "/export_commentaries.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vExportCommentary), vCharSet)
		plugins.file.writeTXTFile(vDir + "/export_footnotes.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vExportFootnotes), vCharSet)
	}
}

/**
 * @properties={typeid:24,uuid:"38FD2A90-BBC3-4354-BCAC-96E700F7D16B"}
 */
function BTN_replace(event) {
	globals.far_arguments = new Object();
	globals.far_arguments.formname = event.getFormName(); //application.getMethodTriggerFormName();
	globals.far_arguments.column = "plaintext";
	globals.far_arguments.text = fv_html_editor.getContent();
	globals.far_arguments.element = "fck_edit";

	//application.showFormInDialog( forms.findreplace_form,  -1,-1,-1,-1,  'i18n:cvb.title.findReplace', false,  false, 'replace', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('replace', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.title.findReplace';
	vForm.show(forms.findreplace_form);

}

/**
 * @properties={typeid:24,uuid:"53D2A06A-A77D-46A1-934B-692FBE796792"}
 */
function btnApply() {
	databaseManager.saveData()
	onRecordSelection()
}

/**
 * @properties={typeid:24,uuid:"017CA847-4C93-4D68-BF7F-ED84E40050A1"}
 */
function btnCancel() {
	if (globals.doRollback) {
		globals.sb_frmOnHideCHK = 1
		databaseManager.revertEditedRecords()
//		application.closeFormDialog(forms.sb_edit_EditCommentaryBlocks)
		forms.sb_edit_EditCommentaryBlocks.controller.getWindow().hide();
	}
}

/**
 * @properties={typeid:24,uuid:"054897A0-532E-4874-826F-40A78F166699"}
 */
function btnInsertFootnote() {
	// new method for the BrowserSuite

	fv_html_editor.execCommand('mceInsertRawHTML', false, '[!?]');
	foundset.plaintext = fv_html_editor.getContent();

	//Method to insert the footnote at the specified position in the text

	// Start time
//	var vStart = application.getServerTimeStamp();

	//The current position
	//var index = elements.editPlaintextCommentary.caretPosition

	/**
	 * @type {String}
	 */
	var vCompleteText = fv_html_editor.getContent();
	var vSplitText = vCompleteText.split('[!?]');
	/** @type {String} */
	var textBefore = vSplitText[0];
	/** @type {String} */
	var textAfter = (vSplitText[1]) ? vSplitText[1] : " ";

	//	var textBefore = foundset.plaintext.substring(0, index)
	//	var textAfter = foundset.plaintext.substr(index)

	//Find the correct footnote number
	var regexp = /\[cvb_f\]([\d]+)\[\/cvb_f\]/gi
	var matchesBefore = textBefore.match(regexp)
	var currentFootnoteNumber = 1
	if (matchesBefore)
		currentFootnoteNumber = matchesBefore.length + 1

	//Renumber the next footnotes
	textAfter = globals.sb_edit_ReorderFootnotes(textAfter, currentFootnoteNumber + 1);

	//Rebuild the plaintext
	var stringToInsert = "[cvb_f]" + currentFootnoteNumber + "[/cvb_f]"
	fv_html_editor.setContent(textBefore + stringToInsert + textAfter);

	/// THE NEW PART

	/// SQL bye bye
//	var vUpdateFN = currentFootnoteNumber;
	/** @type JSRecord<db:/sb/footnotes> */
	var vRecord = null;

	for (var i = 1; i <= forms.footnotes.foundset.getSize(); i++) {
		vRecord = forms.footnotes.foundset.getRecord(i);
		vRecord.footnote_number = i;
		if (vRecord.footnote_number >= currentFootnoteNumber) {
			vRecord.footnote_number = (vRecord.footnote_number) + 1;

			//if(i%100==0)
			//{
			//	databaseManager.saveData();
			//	}
		}
	}
	//databaseManager.saveData();

	/// THE OLD PART

	//Insert the new footnote
	if (forms.footnotes.foundset.newRecord(currentFootnoteNumber)) {
		forms.footnotes.footnote_number = currentFootnoteNumber
		//		forms.footnotes.controller.saveData()
	}
	forms.footnotes.foundset.setSelectedIndex(currentFootnoteNumber)
}

/**
 * @properties={typeid:24,uuid:"F660A84D-E098-4E40-BEDE-20E847386251"}
 * @param {JSEvent|*} event
 */
function btnSave(event) {
	if (fv_html_editor.getContent() && arguments[0] instanceof JSEvent) {
		// put the HTML text of the BrowserSuite into the plaintext field
		plaintext = fv_html_editor.getContent()  + "";
	}

	var vMax, vForm
	globals.doRollback = false;
	//Show a busy popup so they can't do anything

	//application.showFormInDialog( forms.busyPopup, -1, -1, -1, -1, "Progress", false, false, "Progress", false);
	//SMM 20-05-2011
	vForm = application.createWindow('Progress', JSWindow.DIALOG, null);
	vForm.title = 'Progress';
	vForm.show(forms.busyPopup);

	application.updateUI(10)
	//NOTE: BE SURE TO USE A TRY/FINALLY BLOCK! (or else an exception will cause the client to need a restart)
	// check if range exists in commentaries_to_verses
	var vSQL = "SELECT pk FROM commentaries_to_verses WHERE book_id = ? AND commentary_id != ? "
	vSQL += "AND (chapter_number > ?  OR (chapter_number = ?  AND verse_number >= ? )) "
	vSQL += "AND (chapter_number < ? OR (chapter_number = ? AND verse_number  <= ? )) ORDER BY chapter_number,verse_number "

	var vArgs = [book_id, pk, chapter_from, chapter_from, verses_from, chapter_to, chapter_to, verses_to]

	var vFS = databaseManager.getFoundSet("sb", "commentaries_to_verses")
	vFS.loadRecords(vSQL, vArgs)

	if (databaseManager.getFoundSetCount(vFS) > 0) {
		// already within range!
		var vAnswer = plugins.dialogs.showQuestionDialog("i18n:CVB.dialog.attention", "i18n:cvb.message.overlapFound", "i18n:cvb.btn.view", "i18n:cvb.btn.yes", "i18n:cvb.btn.no")
		if (vAnswer == i18n.getI18NMessage("cvb.btn.view")) {
			var vSQL2 = "SELECT v.calc_book_name, com.chapter_number, com.verse_number FROM commentaries_to_verses as com LEFT JOIN verses AS v ON v.pk = com.verse_id "
			vSQL2 += "WHERE com.book_id = ? AND com.commentary_id != ? AND (com.chapter_number > ?  OR (com.chapter_number = ?  AND com.verse_number >= ? )) "
			vSQL2 += "AND (com.chapter_number < ? OR (com.chapter_number = ? AND com.verse_number  <= ? )) "
			vSQL2 += "GROUP BY com.verse_number, com.chapter_number,com.verse_id, v.calc_book_name ORDER BY com.chapter_number,com.verse_number "

			var vQuery = databaseManager.getDataSetByQuery('sb', vSQL2, vArgs, -1)
			globals.showOverlapDLGHTML = "<HTML><BODY>"

			for (var h = 1; h <= vQuery.getMaxRowIndex(); h++) {
				globals.showOverlapDLGHTML += vQuery.getValue(h, 1) + " " + vQuery.getValue(h, 2) + ":" + vQuery.getValue(h, 3) + "<BR>"
			}
			globals.showOverlapDLGHTML += "</BODY></HTML>"

			// Show dialog with ranges that overlap.
			//forms.sb_showOverlap_dlg.foundset.loadRecords(vFS)
			//forms.sb_showOverlap_dlg.foundset.sort("chapter_number ASC, verse_number ASC")
			//application.showFormInDialog(forms.sb_showOverlap_dlg , -1, -1, 300, -1, "    ", false, false, 'sb_showOverlap_dlg', true)
			//SMM 20-05-2011
			vForm = application.createWindow('sb_showOverlap_dlg', JSWindow.MODAL_DIALOG, null);
			vForm.title = "    "
			vForm.setInitialBounds(-1, -1, 300, -1)
			vForm.show(forms.sb_showOverlap_dlg);

			// Yes to overwrite
			var vAnswer2 = plugins.dialogs.showQuestionDialog("i18n:CVB.dialog.attention", "i18n:cvb.message.overlapFound", "i18n:cvb.btn.yes", "i18n:cvb.btn.no")
			if (vAnswer2 == i18n.getI18NMessage("cvb.btn.yes")) {
				// Update new range.
				UpdateCommentariesToVerses()

			}
			if (vAnswer2 == i18n.getI18NMessage("cvb.btn.no")) {
				return false
			}
		}

		if (vAnswer == i18n.getI18NMessage("cvb.btn.yes")) {
			// Update new range.
			UpdateCommentariesToVerses();

		}
		if (vAnswer == i18n.getI18NMessage("cvb.btn.no")) {
			return false
			// stop processing!! don't save anything!
			//		plugins.busy.ready();
			//		application.showFormInDialog( forms.sb_edit_EditCommentaryBlocks,  -1, -1, 770, 700,  "i18n:cvb.title.editCommentary",  true,  false,  'commentaryEditForm', true)
		}

	} else {
		UpdateCommentariesToVerses(true);

	}

	//	plugins.busy.busy(i18n.getI18NMessage('cvb.msg.savingCommentary'), true, false)
	//	application.updateUI()
	databaseManager.saveData();
	// Get the first 500 words (or less) from plaintext
	if (plaintext) {
		var vSplittedPlainText = plaintext.split(' ');

		if (vSplittedPlainText.length > 100) {
			vMax = 100;
		} else {
			vMax = vSplittedPlainText.length
		}

		var newPlain = "";
		for (var i = 0; i < vMax; i++) {
			newPlain = newPlain.concat(vSplittedPlainText[i] + " ");
		}

		var vP = utils.stringPatternCount(newPlain, "<p>");
		var vEndP = utils.stringPatternCount(newPlain, "</p>");
		
		if(vEndP < vP)
		{
			newPlain += "</p>";
		}
		
		if (i == 100) {
			newPlain = newPlain.concat("<br><br /><p align='right'><a href=\"javascript:globals.showCommentaryInDialog(\'" + pk + "\')\">html_readMore</a>&nbsp;&nbsp;&nbsp;</p>");
		}
		
		htmltext_short = globals.ConvertTextToHtml(newPlain);

		//Update the commentary screen
		htmltext = globals.ConvertTextToHtml(plaintext);
	}
	//Method call
	//	updateCommentaryHtml()

	/** @type JSRecord<db:/sb/footnotes> */
	var vRecord
	var vHtml, vPlain;

	// Some dirty tricks
	for (i = 1; i <= commentary_blocks_to_footnotes.getSize(); i++) {
		vRecord = commentary_blocks_to_footnotes.getRecord(i)

		vPlain = vRecord.plaintext;
		if (vPlain) {
			vHtml = globals.ConvertTextToHtml(vPlain);
		}
		vRecord.htmltext = vHtml
	}

	//	eT2=application.getServerTimeStamp();

	databaseManager.saveData()
	//argument is vanaf de admin popup bij grote bijwerking alle verzen
	if (!(arguments[0] instanceof JSEvent) && arguments[0] != true) {
		databaseManager.recalculate(forms.book_notes.foundset)
		application.sleep(5)
		globals.sb_frmOnHideCHK = 1;
//		application.closeFormDialog("Progress");
		forms.busyPopup.controller.getWindow().hide();
//		application.closeFormDialog("commentaryEditForm")
		controller.getWindow().hide();
	}
	//	plugins.busy.ready();
	forms.busyPopup.controller.getWindow().hide();
	if(controller.getWindow()) {
		controller.getWindow().hide();
	}
	forms.book_comment.EVENT_loadBookNotes(null);
	return true
}

/**
 * @properties={typeid:24,uuid:"2659CFA0-92AA-48F9-B370-B354659AB477"}
 */
function chkRange() {
	var vChapterFrom = chapter_from;
	var vChapterTo = chapter_to;
	var vVerseFrom = verses_from;
	var vVerseTo = verses_to;
	var vVersesArray = application.getValueListArray('testamentVerses');
	var vChapterArray = application.getValueListArray('testamentChapters');

	var vOldChapterFrom = forms.sb_edit_EditCommentaryBlocks.old_chapter_from;
	var vOldChapterTo = forms.sb_edit_EditCommentaryBlocks.old_chapter_to;
	var vOldVersesFrom = forms.sb_edit_EditCommentaryBlocks.old_verses_from;
	var vOldVerseTo = forms.sb_edit_EditCommentaryBlocks.old_verses_to;

	//Check if
	if (vChapterTo < vChapterFrom) {
		chapter_to = vOldChapterTo
	} else if (vChapterFrom > vChapterTo) {
		chapter_from = vOldChapterFrom
	} else if (vVerseFrom > vVerseTo) {
		verses_from = vOldVersesFrom
	} else if (vVerseTo < vVerseFrom) {
		verses_to = vOldVerseTo
	}

	if (!plugins.it2be_tools.arrayContains(vChapterArray, vChapterTo)) {
		plugins.dialogs.showErrorDialog("Chapter te hoog", "Chapter te hoog")
		chapter_to = vOldChapterTo
	} else if (!plugins.it2be_tools.arrayContains(vChapterArray, vChapterFrom)) {
		plugins.dialogs.showErrorDialog("Chapter te laag", "Chapter te laag")
		chapter_from = vOldChapterFrom
	} else if (!plugins.it2be_tools.arrayContains(vVersesArray, vVerseFrom)) {
		plugins.dialogs.showErrorDialog("Verse te laag", "verse te laag")
		verses_from = vOldVersesFrom
	} else if (!plugins.it2be_tools.arrayContains(vVersesArray, vVerseTo)) {
		plugins.dialogs.showErrorDialog("Verse te hoog", "verse te hoog")
		verses_to = vOldVerseTo
	}

}

/**
 * @properties={typeid:24,uuid:"4EA13F9A-570F-4110-B7CE-48100FD51B2A"}
 */
function DeleteCommentaryBlock() {
	//Ask for confirmation
	var thePressedButton = plugins.dialogs.showQuestionDialog('i18n:cvb.title.confirmation',
		'i18n:cvb.message.delete_commentary_and_footnotes', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');
	if (thePressedButton != 'i18n:cvb.btn.yes')
		return

	//Delete commentary_block
	var query = "DELETE FROM commentary_blocks where pk=" + globals.commentary_id
	var done = plugins.rawSQL.executeSQL('sb', "commentary_blocks", query)
	if (!done)
	//scopes.tools.output("Error deleting commentary block " + globals.commentary_id)

	//Delete footnotes
		query = "DELETE FROM footnotes WHERE commentary_block_id=" + globals.commentary_id
	done = plugins.rawSQL.executeSQL('sb', "footnotes", query)
	if (!done)
	//scopes.tools.output("Error deleting footnotes for commentary block " + globals.commentary_id)

		btnSave(new JSEvent)

	//Restore commentary id
	globals.commentary_id = globals.sb_import_backupCommentaryId
}

/**
 * @properties={typeid:24,uuid:"3EE08CED-F2C4-47CC-95D7-639E693D240C"}
 */
function ImportCommentaryBlock() {
	databaseManager.saveData()
//	application.closeFormDialog('commentaryEditForm')
	if(controller.getWindow()){
		controller.getWindow().hide();
	}
	//application.showFormInDialog( forms.sb_import_ImportCommentaryBlocks,  -1, -1,  770, 700,  "i18n:CVB.title.importCommentary",  true,  false,  forms.sb_import_ImportCommentaryBlocks, true)

	//SMM 20-05-2011
	var vForm = application.createWindow('import_ImportCommentaryBlocks', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:CVB.title.importCommentary';
	vForm.setInitialBounds(-1, -1, 770, 700)
	vForm.show(forms.sb_import_ImportCommentaryBlocks);

}

/**
 * @properties={typeid:24,uuid:"EB13BC65-FEF7-48E4-8F61-C5E778B0A507"}
 */
function onHide() {
	if (globals.sb_frmOnHideCHK == 1) {
		globals.sb_frmOnHideCHK = 0
		databaseManager.setAutoSave(true)
	} else {
		globals.sb_edit_EditCommentaryBlocksVisible = 0
		databaseManager.revertEditedRecords()
	}
}

/**
 * @properties={typeid:24,uuid:"56E0C686-3B7A-4E5D-B77A-640B1E085449"}
 */
function onRecordSelection() {

	// test stuff for the BrowserBean

	// Store the old chapters and verses for the import
	old_chapter_from = chapter_from
	old_chapter_to = chapter_to
	old_verses_from = verses_from
	old_verses_to = verses_to
	old_commentary_pt = plaintext
	old_commentary_html = htmltext
	old_commentary_html_short = htmltext_short

	//All the modifications from now on will be possible to be rolled back
	databaseManager.setAutoSave(false)
	
	// changes for the faulty \n codes in the plaintext
	if(foundset.plaintext) 	foundset.plaintext = foundset.plaintext.replace(/\\n/,"<br />");
//	elements.fck_edit.html = "";
//	elements.fck_edit.html = foundset.plaintext;
	
	fv_html_editor.setContent(foundset.plaintext);
	
	//Fill in the html global field, to show it
	var vHtml = foundset.htmltext_new
	if (!vHtml)
		vHtml = foundset.htmltext

	//Fill in the plaintext from html, to be changed after database is filled with correct plaintext
	// Changed By RB / 20-05-2011
	// Reason: Deprecated, no need for this. There MUST be a plaintext, this is a mandatory something
	/*if(!foundset.plaintext)
	 foundset.plaintext = globals.ConvertHtmlToText(vHtml);
	 else*/

	// If there is no html, convert the plaintext to html
	if (!vHtml)
		vHtml = globals.ConvertTextToHtml(foundset.plaintext, null, null);

	foundset.htmltext = "<html>" + foundset.title + vHtml + "</html>"
	// MAURICE: What about autoSave ??? how can we rollback ???
	//forms.commentary_blocks.controller.saveData();

	//databaseManager.refreshRecordFromDatabase(commentary_blocks_to_footnotes, -1)
	//If we have footnotes, select the first one
	if (commentary_blocks_to_footnotes.getSize() > 0) {
		commentary_blocks_to_footnotes.sort('footnote_number ASC')
		commentary_blocks_to_footnotes.setSelectedIndex(1)
		elements.editFootnotes.enabled = true
	} else {
		elements.editFootnotes.enabled = false
	}
}

/**
 * @properties={typeid:24,uuid:"E2110AB9-82F7-4F26-8F7A-D8599698DD83"}
 */
function onShow() { }

/**
 * @param {*} [param]
 * @properties={typeid:24,uuid:"127B9F79-C102-416A-B8DF-4197D8981FDA"}
 */
function UpdateCommentariesToVerses(param) {
	// Store variables
	var vBook_id = parseInt(book_id.toString());
	var vChapter_from = parseInt(chapter_from.toString());
	var vChapter_to = parseInt(chapter_to.toString());
	var vVerses_from = parseInt(verses_from.toString());
	var vVerses_to = parseInt(verses_to.toString());
	var vCommentary_id = parseInt(pk.toString());
	var vDelSQL = "";
	var vDelFS;
	var i, h, n, m, vArgs, vSQL, vDS, vFS;
	var vSkip = arguments[0];
	/** @type JSRecord<db:/sb/commentaries_to_verses> */
	var vRecord
	
	/** @type {*} */
	var vDupFirstFS;
	/** @type {*} */
	var vDupSecondREC;
	
	if (globals.sb_importCommentarie == 1) {
		// delete the whole range
		/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
		vFS = databaseManager.getFoundSet("sb", "commentaries_to_verses")
		// First delete the hole range
		vFS.loadRecords("SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? ", [vCommentary_id])
		vFS.deleteAllRecords();
		databaseManager.saveData();

		// Create loop, and insert records in commentaries_to_verses
		vSQL = "SELECT book_id, chapter_number,verse_number, pk as verse_id FROM verses " + "WHERE book_id = ? " + "AND(chapter_number > ?  OR (chapter_number = ?  AND verse_number >= ? )) " + "AND (chapter_number < ? OR (chapter_number = ? AND verse_number  <= ? )) ORDER BY book_id,chapter_number, verse_number "

		vArgs = [vBook_id, vChapter_from, vChapter_from, vVerses_from, vChapter_to, vChapter_to, vVerses_to]
		vDS = databaseManager.getDataSetByQuery("sb", vSQL, vArgs, -1)
		vRecord = null
		// Insert into commentaries_to_verses
		for (i = 1; i <= vDS.getMaxRowIndex(); i++) {
			vRecord = vFS.getRecord(vFS.newRecord())

			vRecord.verse_id = vDS.getValue(i, 4)
			vRecord.commentary_id = vCommentary_id
			vRecord.verse_number = vDS.getValue(i, 3)
			vRecord.chapter_number = vDS.getValue(i, 2)
			vRecord.book_id = vDS.getValue(i, 1)

		}

		//Set the globals back to 0
		globals.sb_importCommentarie = 0

	} else {

		if (!vSkip) {
			// Check ofdat er ook veranderingen zijn
			if (old_chapter_from != chapter_from || old_chapter_to != chapter_to || old_verses_from != verses_from || old_verses_to != verses_to) {
				// Select met alle distinct commentary_id's met overlap.
				vSQL = "SELECT DISTINCT commentary_id FROM commentaries_to_verses WHERE book_id = ? AND commentary_id != ? "
				vSQL += "AND (chapter_number > ?  OR (chapter_number = ?  AND verse_number >= ? )) "
				vSQL += "AND (chapter_number < ? OR (chapter_number = ? AND verse_number  <= ? )) "
				vSQL += "ORDER BY commentary_id "

				vArgs = [vBook_id, pk, vChapter_from, vChapter_from, vVerses_from, vChapter_to, vChapter_to, vVerses_to]
				var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, vArgs, -1);
				var vMax = vQuery.getMaxRowIndex();
				var vInArray = new Array()

				// Loop door de ids en zet deze in een array
				for (i = 1; i <= vMax; i++) {
					vInArray.push(vQuery.getValue(i, 1))
				}

				if (vInArray.length > 0) {

					// Create Commentary_blocks foundset and load the correct record
					/** @type {JSFoundset<db:/sb/commentary_blocks>} */
					var vFS_CB = databaseManager.getFoundSet("sb", "commentary_blocks")
					vFS_CB.loadRecords("SELECT cb.pk FROM commentary_blocks AS cb WHERE cb.pk IN (" + vInArray.join(',') + ")");

					// Loop door de foundset en update waar nodig
					vRecord = null
					for (i = 1; i <= vFS_CB.getSize(); i++) {

						vRecord = vFS_CB.getRecord(i)

						// STAP 1 !!!!!!!!!
						if ( (vRecord.chapter_from < vChapter_from || (vRecord.chapter_from == vChapter_from && vRecord.verses_from <= vVerses_from)) && (vRecord.chapter_to < vChapter_to || (vRecord.chapter_to == vChapter_to && vRecord.verses_to <= vVerses_to))) {
							// Hoofdstuk van  is kleiner of gelijk aan "Hoofdstuk van nieuw commentaar" en vers van is kleiner of gelijk
							//	vRecord.chapter_to = vChapter_from
							// Controle op vers nivo??? verses_to -1 indien gelijk  ???
							// Einde vorig commentaar afhalen en nieuw commentaar genereren.
							// Stap 1 werkt nu volledig na richtlijnen.

							if (vChapter_from == 1 && vVerses_from == 1) {
								//  Commentaar verwijderen / inactief maken
								vRecord.active_now = 0;
								vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ?";
								/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
								vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
								vDelFS.loadRecords(vDelSQL, [vRecord.pk]);

								if (vDelFS.getSize() > 0) {
									vDelFS.deleteAllRecords();
								}

							} else if ( (vVerses_from) - 1 == 0) {
								// Records in tussen tabel verwijderen en 1 hoofdstuk terug
								var vCurChapter = (vChapter_from) - 1;
								if (vCurChapter >= 1) {
									vDelSQL = "SELECT MAX(verse_number) FROM verses WHERE book_id = ? AND chapter_number = ?"
									vDelFS = databaseManager.getDataSetByQuery('sb', vDelSQL, [vBook_id, vCurChapter], -1);
									var vCurVerse = vDelFS.getValue(1, 1);

									vRecord.chapter_to = vCurChapter;
									vRecord.verses_to = vCurVerse;

									vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? AND (chapter_number >= ?)";
									/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
									vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
									vDelFS.loadRecords(vDelSQL, [vRecord.pk, vChapter_from, vVerses_from]);

									if (vDelFS.getSize() > 0) {
										vDelFS.deleteAllRecords();
									}
								}
							} else {
								// Records in tussen tabel verwijderen
								vRecord.chapter_to = vChapter_from;
								vRecord.verses_to = (vVerses_from) - 1;

								vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? AND (chapter_number >= ?  AND verse_number > ?)";
								/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
								vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
								vDelFS.loadRecords(vDelSQL, [vRecord.pk, vRecord.chapter_to, vRecord.verses_to]);

								if (vDelFS.getSize() > 0) {
									vDelFS.deleteAllRecords();
								}

							}
						}

						// STAP 2 !!!!!!!!!
						if ( (vRecord.chapter_from > vChapter_from || (vRecord.chapter_from == vChapter_from && vRecord.verses_from >= vVerses_from)) && (vRecord.chapter_to < vChapter_to || (vRecord.chapter_to == vChapter_to && vRecord.verses_to <= vVerses_to))) {
							// Hoofdstuk van  is groter of gelijk aan "Hoofdstuk van nieuw commentaar" en vers van is groter of gelijk
							//	vRecord.chapter_from = vChapter_to
							// Controle op vers nivo??? verses_to -1 indien gelijk  ???

							// Haal de hoogste hoofdstuk en vers op
							vDelSQL = "SELECT MAX(verse_number), chapter_number FROM verses WHERE book_id = ? AND chapter_number IN (SELECT MAX(chapter_number) FROM verses WHERE book_id = ?) GROUP BY chapter_number"
							vDelFS = databaseManager.getDataSetByQuery('sb', vDelSQL, [vBook_id, vBook_id], -1)
							var vMaxChap = vDelFS.getValue(1, 2);
							var vMaxVers = vDelFS.getValue(1, 1);

							if (vChapter_to == vMaxChap && vVerses_to == vMaxVers) {
								// Commentaar verwijderen / inactief maken
								vRecord.active_now = 0;
								vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ?";
								/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
								vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
								vDelFS.loadRecords(vDelSQL, [vRecord.pk]);

								if (vDelFS.getSize() > 0) {
									vDelFS.deleteAllRecords();
								}

							} else if (vVerses_to == vMaxVers) {
								// Records in tussen tabel verwijderen en 1 hoofdstuk terug
								vCurChapter = (vChapter_to) + 1;
								if (vCurChapter <= vMaxChap) {
									vDelSQL = "SELECT MIN(verse_number) FROM verses WHERE book_id = ? AND chapter_number = ?"
									vDelFS = databaseManager.getDataSetByQuery('sb', vDelSQL, [vBook_id, vCurChapter], -1);
									vCurVerse = vDelFS.getValue(1, 1);

									vRecord.chapter_to = vCurChapter;
									vRecord.verses_to = vCurVerse;

									vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? AND (chapter_number <= ? AND verse_number <= ?)";
									/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
									vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
									vDelFS.loadRecords(vDelSQL, [vRecord.pk, vChapter_to, vVerses_to]);

									if (vDelFS.getSize() > 0) {
										vDelFS.deleteAllRecords();
									}
								}
							} else {
								// Records in tussen tabel verwijderen
								vRecord.chapter_to = vChapter_to;
								vRecord.verses_to = (vVerses_to);

								vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? AND (chapter_number <= ? AND verse_number <= ?)";
								/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
								vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
								vDelFS.loadRecords(vDelSQL, [vRecord.pk, vRecord.chapter_to, vRecord.verses_to]);

								if (vDelFS.getSize() > 0) {
									vDelFS.deleteAllRecords();
								}

							}
						}

						// STAP 3 !!!!!!!!!
						if ( (vRecord.chapter_from < vChapter_from || (vRecord.chapter_from == vChapter_from && vRecord.verses_from <= vVerses_from)) && (vRecord.chapter_to > vChapter_to || (vRecord.chapter_to == vChapter_to && vRecord.verses_to >= vVerses_to))) {
							// De nieuwe range valt binnen de oude range. er ontstaan dus twee DEZELFDE commentaren over verschillende ranges!!
							// Bestaande commentaar moet worden gedupliceerd en chapter_from chapter_to moet worden gezet. LET OP: Tussen tabel!!

							// Pas de range aan van het huidige commentary_block ( het eerste deel, het stuk wat voor het nieuwe commentaar valt)
							// Dupliceer het huidige commentary_block (en voetnoten!!!!!!!!)
							// Pas de range aan van het nieuwe duplicaat. ( het tweede deel, het stuk wat achter het nieuwe commentaar valt)
							// Update de tussen tabel.

							// To word From-1
							//vRecord.chapter_to = vChapter_from -1

							// Part 1 - crop the first commentary on the end!
							if (vChapter_from == 1 && vVerses_from == 1) {
								//  Commentaar verwijderen / inactief maken
								vRecord.active_now = 0;
								vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ?";
								/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
								vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
								vDelFS.loadRecords(vDelSQL, [vRecord.pk]);

								if (vDelFS.getSize() > 0) {
									vDelFS.deleteAllRecords();
								}

							} else if ( (vVerses_from) - 1 == 0) {
								// Records in tussen tabel verwijderen en 1 hoofdstuk terug
								vCurChapter = (vChapter_from) - 1;
								if (vCurChapter >= 1) {
									vDelSQL = "SELECT MAX(verse_number) FROM verses WHERE book_id = ? AND chapter_number = ?"
									vDelFS = databaseManager.getDataSetByQuery('sb', vDelSQL, [vBook_id, vCurChapter], -1);
									vCurVerse = vDelFS.getValue(1, 1);

									vRecord.chapter_to = vCurChapter;
									vRecord.verses_to = vCurVerse;

									vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? AND (chapter_number >= ?)";
									/** @type {JSFoundSet<db:/sb/commentaries_to_verses>} */
									vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
									vDelFS.loadRecords(vDelSQL, [vRecord.pk, vChapter_from, vVerses_from]);

									if (vDelFS.getSize() > 0) {
										vDelFS.deleteAllRecords();
									}
								}
							} else {
								//Selecteer de te verwijderen records uit de tussentabel die overlappen. (in tegenovergestelde richting)!!!!
								vDelSQL = "SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? AND ((verse_number between ? and ?) AND (chapter_number between ? and ?))"
								vArgs = [vRecord.pk, vVerses_from, vVerses_to, vChapter_from, vChapter_to]
								vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses')
								vDelFS.loadRecords(vDelSQL, vArgs);

								var vDoOther = 1

								if (vDelFS.getSize() > 0) {
									vDelFS.deleteAllRecords();
								}

								var vDupFirstSQL = "SELECT pk FROM commentary_blocks WHERE pk = ?"
								/** @type {JSFoundSet<db:/sb/commentary_blocks>} */
								vDupFirstFS = databaseManager.getFoundSet('sb', 'commentary_blocks');
								/** @type {JSFoundSet<db:/sb/commentary_blocks>} */
								var vDupSecondFS = databaseManager.getFoundSet('sb', 'commentary_blocks');
								vDupFirstFS.loadRecords(vDupFirstSQL, [vRecord.pk])
								vDupSecondFS.loadRecords(vDupFirstSQL, [vRecord.pk])
								if (vDupFirstFS.getSize() == 1) {
									vDupSecondREC = vDupSecondFS.getRecord(vDupSecondFS.duplicateRecord())
									if (vDupSecondREC) {
										//Range aanpassen in de foundsets
										vDupFirstFS.verses_to = (vVerses_from) - 1
										vDupFirstFS.chapter_to = vChapter_from
										vDupSecondREC.verses_from = (vVerses_to) + 1
										vDupSecondREC.chapter_to = vChapter_from
									}
									databaseManager.saveData()
									var vNewCommBlockPK = vDupSecondREC.pk
									var vOldCommBlockPK = vDupFirstFS.pk
								}
								//Duplicate the footnotes for the new/duplicated commentaryblock
								vSQL = "SELECT pk FROM footnotes WHERE commentary_block_id = ?"
								var vDupFootnotes = databaseManager.getFoundSet('sb', 'footnotes')
								vDupFootnotes.loadRecords(vSQL, [vOldCommBlockPK])
								var vMaxRecords = vDupFootnotes.getSize()
								for (m = 1; m <= vMaxRecords; m++) {
									var vRecord3 = vDupFootnotes.getRecord(vDupFootnotes.duplicateRecord(m))
									vRecord3.commentary_block_id = vNewCommBlockPK
								}
								databaseManager.saveData()

								//Duplicate the usernotes for the new/duplicated commentaryblock
								vSQL = "SELECT usernote_id FROM usernotes WHERE commentary_block_id = ?"
								var vDupUserNotes = databaseManager.getFoundSet('sb', 'usernotes')
								vDupUserNotes.loadRecords(vSQL, [vOldCommBlockPK])
								var vMaxRecords2 = vDupUserNotes.getSize()
								for (n = 1; n <= vMaxRecords2; n++) {
									var vRecord4 = vDupUserNotes.getRecord(vDupUserNotes.duplicateRecord(n))
									vRecord4.commentary_block_id = vNewCommBlockPK
								}
								databaseManager.saveData()

							}
						}
					}
				}
			}
		}
		if (vDoOther == 1) {
			// delete the whole range
			vFS = databaseManager.getFoundSet("sb", "commentaries_to_verses")
			// First delete the hole range
			vFS.loadRecords("SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? OR commentary_id = ? OR commentary_id = ?", [vCommentary_id, vOldCommBlockPK, vNewCommBlockPK])

			if (vFS.getSize() > 0) {
				vFS.deleteAllRecords();
			}
			databaseManager.saveData();

			// Create loop, and insert records in commentaries_to_verses
			vSQL = "SELECT book_id, chapter_number,verse_number, pk as verse_id FROM verses " + "WHERE book_id = ? " + "AND(chapter_number > ?  OR (chapter_number = ?  AND verse_number >= ? )) " + "AND (chapter_number < ? OR (chapter_number = ? AND verse_number  <= ? )) ORDER BY book_id,chapter_number, verse_number "
			vArgs = [vRecord.book_id, vDupFirstFS.chapter_from, vDupFirstFS.chapter_from, vDupFirstFS.verses_from, vDupSecondREC.chapter_to, vDupSecondREC.chapter_to, vDupSecondREC.verses_to]
			vDS = databaseManager.getDataSetByQuery("sb", vSQL, vArgs, -1)
			var vRecord2 = null
			// Insert into commentaries_to_verses
			for (h = 1; h <= vDS.getMaxRowIndex(); h++) {
				vRecord2 = vFS.getRecord(vFS.newRecord())

				vRecord2.verse_id = vDS.getValue(h, 4)

				if ( (vDS.getValue(h, 3) > vDupFirstFS.verses_to && vDS.getValue(h, 3) < vDupSecondREC.verses_from)) {
					vRecord2.commentary_id = vCommentary_id
				} else if (vDS.getValue(h, 3) <= vDupFirstFS.verses_to) {
					vRecord2.commentary_id = vOldCommBlockPK
				} else if (vDS.getValue(h, 3) >= vDupSecondREC.verses_from) {
					vRecord2.commentary_id = vNewCommBlockPK
				}
				vRecord2.verse_number = vDS.getValue(h, 3)
				vRecord2.chapter_number = vDS.getValue(h, 2)
				vRecord2.book_id = vDS.getValue(h, 1)

			}

			databaseManager.saveData()

		} else {
			// delete the whole range
			vFS = databaseManager.getFoundSet("sb", "commentaries_to_verses")
			// First delete the whole range
			vFS.loadRecords("SELECT pk FROM commentaries_to_verses WHERE commentary_id = ? ", [vCommentary_id])
			vFS.deleteAllRecords();
			databaseManager.saveData();

			// Create loop, and insert records in commentaries_to_verses
			vSQL = "SELECT book_id, chapter_number,verse_number, pk as verse_id FROM verses " + "WHERE book_id = ? " + "AND(chapter_number > ?  OR (chapter_number = ?  AND verse_number >= ? )) " + "AND (chapter_number < ? OR (chapter_number = ? AND verse_number  <= ? )) ORDER BY book_id,chapter_number, verse_number "

			vArgs = [vBook_id, vChapter_from, vChapter_from, vVerses_from, vChapter_to, vChapter_to, vVerses_to]
			vDS = databaseManager.getDataSetByQuery("sb", vSQL, vArgs, -1)
			vRecord = null
			// Insert into commentaries_to_verses
			for (i = 1; i <= vDS.getMaxRowIndex(); i++) {
				vRecord = vFS.getRecord(vFS.newRecord())

				vRecord.verse_id = vDS.getValue(i, 4)
				vRecord.commentary_id = vCommentary_id
				vRecord.verse_number = vDS.getValue(i, 3)
				vRecord.chapter_number = vDS.getValue(i, 2)
				vRecord.book_id = vDS.getValue(i, 1)

			}

		}
		databaseManager.saveData()

	}
	return true
}

/**
 * @properties={typeid:24,uuid:"0D4E5E41-D5E9-4569-8219-720C3CBDA80F"}
 */
function updateCommentaryHtml() {
	//Show busy popup
	//application.showFormInDialog( forms.busyPopup, -1, -1, -1, -1, "Progress", false, false, "Progress", false);
	//SMM 20-05-2011
	var vForm = application.createWindow('Progress', JSWindow.DIALOG, null);
	vForm.title = 'Progress';
	vForm.show(forms.busyPopup);
	application.updateUI(10)

	var html = globals.ConvertTextToHtml(fv_html_editor.getContent());
	globals.sb_edit_htmlTextCommentary = "<html><body>" + foundset.title + html + "<body></html>"

	//hide busy popup
//	application.closeFormDialog("Progress")
	forms.busyPopup.controller.getWindow().hide();
}

/**
 * @properties={typeid:24,uuid:"C94013C5-3A64-4905-BF07-EF2CAE202D6F"}
 */
function updateFootnoteHtml() {
	//Show busy popup
	//application.showFormInDialog( forms.busyPopup, -1, -1, -1, -1, "Progress", false, false, "Progress", false);
	//SMM 20-05-2011
	var vForm = application.createWindow('Progress', JSWindow.DIALOG, null);
	vForm.title = 'Progress';
	vForm.show(forms.busyPopup);
	application.updateUI(10)

	if (forms.footnotes.foundset.getSize() > 0) {
		var html = globals.ConvertTextToHtml(commentary_blocks_to_footnotes.plaintext);

		forms.footnotes.htmltext = html;

		globals.sb_edit_htmlTextFootnote = "<html><body>" + html + "</body></html>"
	}

	//Hide busy popup
//	application.closeFormDialog("Progress")
	forms.busyPopup.controller.getWindow().hide();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"90E2BFC5-EB00-400C-A389-0A5C4CCB3B5A"}
 */
function btnPreview(event) {
	var html = globals.ConvertTextToHtml(fv_html_editor.getContent());
	forms.sb_edit_EditCommentaryBlocks_preview.html = "<html><body>" + foundset.title + html + "<body></html>";

	var vWindow = application.createWindow('sb_edit_EditCommentaryBlocks_preview', JSWindow.DIALOG, null);
	vWindow.title = 'i18n:servoy.general.preview';
	vWindow.show('sb_edit_EditCommentaryBlocks_preview');

}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"56C18A79-2CBA-45A3-B1B9-E6A143B49F2E"}
 */
function onLoad(event) {
	fv_html_editor = new scopes.TinyMCE.Editor(elements.htmleditor);
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
 * @properties={typeid:24,uuid:"4053BB9A-B769-474C-833B-A24A011FB96E"}
 */
function onDataChange(oldValue, newValue, event) {
	// TODO Auto-generated method stub
	if(!newValue)
	{
		return false;
	}
	return true
}
