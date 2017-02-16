/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FE96522B-4A5A-402D-A4F1-FE9344FF9EA1"}
 */
var f_tempuuid = null;

/**
 * @properties={typeid:24,uuid:"58B4BE32-A406-4250-8EAD-0B027CCD8C04"}
 */
function btnCancel() {
	databaseManager.revertEditedRecords()

//	application.closeFormDialog(forms.sb_import_ImportCommentaryBlocks);
	controller.getWindow().hide();
}

/**
 * @properties={typeid:24,uuid:"348A32B1-9522-4BD7-8294-845BC5D51985"}
 */
function btnSave() {

	if (globals.sb_import_commentaryAndFootnotesValidated == 0) {
		plugins.dialogs.showWarningDialog("i18n:cvb.message.error", "i18n:cvb.message.dataNotValidated", "i18n:CVB.lbl.ok")
		return false;
	}
	
	if(!f_tempuuid)
	{
		plugins.dialogs.showWarningDialog("i18n:cvb.message.error", "");
		return false;
	}
	
	databaseManager.saveData()

	//scopes.tools.output('Save status: ' + vSave);
	
	var vSQL = "SELECT pk FROM footnotes WHERE tmp_key = '" + f_tempuuid + "'";
	var vFS = databaseManager.getFoundSet('sb', 'footnotes');
	vFS.loadRecords(vSQL, null);
	
	// hopefully this will work.....
	var fsUpdater = databaseManager.getFoundSetUpdater(vFS)
	fsUpdater.setColumn('commentary_block_id', pk)
	fsUpdater.performUpdate()

	//Select the current commentary_block
	globals.commentary_id = pk

	//globals.sb_frmOnHideCHK = 1
	/**
	 * TODO: This is changed for SB-ESP since there issues with saving the imported files.
	 * This occured due to the change of the HTML Bean (by Patrick Talbot) to a self-implemented
	 * version of the TinyMCE editor in the JavaFX Webpanel, its not based on the foundset/datasource
	 * anymore but based on parameters which can be set. Check out the scopes.TinyMCE module
	 */
	forms.sb_edit_EditCommentaryBlocks.foundset.loadRecords("SELECT pk FROM commentary_blocks WHERE pk = ?", [pk]);
	forms.sb_edit_EditCommentaryBlocks.fv_html_editor.setContent(plaintext);
	// Continue with the original code so that everything else goes by the correct way.

	// check if range exists in commentaries_to_verses
	vSQL = "SELECT pk FROM commentaries_to_verses WHERE book_id = ? "
	vSQL += "AND (chapter_number > ?  OR (chapter_number = ?  AND verse_number >= ? )) "
	vSQL += "AND (chapter_number < ? OR (chapter_number = ? AND verse_number  <= ? )) ORDER BY chapter_number,verse_number "

	var vArgs = [globals.sb_import_bookId, chapter_from, chapter_from, verses_from, chapter_to, chapter_to, verses_to]

	var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, vArgs, -1);
	var vMax = vQuery.getMaxRowIndex();

	if (vMax > 0) {
		// There is already a commentary block for the given range.
		var vAnswer = plugins.dialogs.showQuestionDialog("i18n:CVB.dialog.attention", "i18n:cvb.message.overlapFound", "i18n:cvb.btn.yes", "i18n:cvb.btn.no")

		if (vAnswer == i18n.getI18NMessage("cvb.btn.yes")) {
			// Delete the previous commentaries.
			var vDelFS = databaseManager.getFoundSet('sb', 'commentaries_to_verses');
			vDelFS.loadRecords(vSQL, vArgs);
			if(vDelFS.getSize() > 0)
			{
				vDelFS.deleteAllRecords();
			}
			

			// Update new range.
			forms.sb_edit_EditCommentaryBlocks.UpdateCommentariesToVerses();
			
			// Save
			forms.sb_edit_EditCommentaryBlocks.btnSave(new JSEvent);

		} else if (vAnswer == i18n.getI18NMessage("cvb.btn.no")) {
			// stop processing!! don't save anything!
			return false
		}
		globals.sb_importCommentarie = 0
	} else {
		// Update new range.
		forms.sb_edit_EditCommentaryBlocks.UpdateCommentariesToVerses();
		
		// Save
		forms.sb_edit_EditCommentaryBlocks.btnSave(new JSEvent);
		
		forms.sb_edit_EditCommentaryBlocks.old_chapter_from = 0
		forms.sb_edit_EditCommentaryBlocks.old_chapter_to = 0
		forms.sb_edit_EditCommentaryBlocks.old_verses_from = 0
		forms.sb_edit_EditCommentaryBlocks.old_verses_to = 0
		globals.sb_importCommentarie = 1
		//	forms.sb_edit_EditCommentaryBlocks.UpdateCommentariesToVerses()
	}
	databaseManager.saveData()
	forms.sb_import_ImportCommentaryBlocks.controller.getWindow().hide();

	if (!utils.hasRecords(commentaries_to_verses_to_commentary_blocks)) {
		//application.showFormInDialog( forms.sb_edit_EditCommentaryBlocks,  -1, -1, 770, 700,  "i18n:cvb.title.editCommentary",  true,  false, 'sb_edit_EditCommentaryBlocks', true)
		//SMM 20-05-2011
		var vForm = application.createWindow('sb_edit_EditCommentaryBlocks', JSWindow.MODAL_DIALOG, null);
		vForm.title = 'i18n:cvb.title.editCommentary';
		vForm.setInitialBounds(-1, -1, 770, 700)
		vForm.show(forms.sb_edit_EditCommentaryBlocks);
	}

	//forms.sb_edit_EditCommentaryBlocks.onRecordSelection();
	globals.sb_import_commentary = ""
	globals.sb_import_footnotes = ""
	return true
}

/**
 * @properties={typeid:24,uuid:"EA93B14B-7DD9-45CE-9C9C-C800220D6F17"}
 */
function LockFields() {
	elements.cmbChapterFrom.enabled = false
	elements.cmbChapterTo.enabled = false
	elements.cmbSelectBook.enabled = false
	elements.cmbSelectCV.enabled = false
	elements.edtVerseFrom.enabled = false
	elements.edtVerseTo.enabled = false
	elements.editPlaintextCommentary.enabled = false
	elements.editPlaintextFootnote.enabled = false
}

/**
 * @properties={typeid:24,uuid:"E3E5574A-7557-47C3-A375-8C033818391B"}
 */
function onHide() {
	//AUTOSAVE can't be TRUE becorse you go to a other import screen else the code will fale there
	/*if(globals.sb_frmOnHideCHK == 1)
	 {
	 globals.sb_frmOnHideCHK = 0
	 databaseManager.setAutoSave(true)
	 } else {
	 databaseManager.rollbackEditedRecords()
	 globals.sb_frmOnHideCHK = 0
	 }*/
}

/**
 * @properties={typeid:24,uuid:"BCEF7925-B801-4F21-98D2-43AD538D80A6"}
 */
function onShow() {
	globals.sb_import_commentaryAndFootnotesValidated = 0
	globals.sb_import_commentaryError = ""
		
	globals.sb_import_commentary = null;
	globals.sb_import_footnotes = null;

	UnlockFields()
}

/**
 * @properties={typeid:24,uuid:"C48527CE-573D-43AE-A46B-2387BCCE36EF"}
 */
function UnlockFields() {
	elements.cmbChapterFrom.enabled = true
	elements.cmbChapterTo.enabled = true
	elements.cmbSelectBook.enabled = true
	elements.cmbSelectCV.enabled = true
	elements.edtVerseFrom.enabled = true
	elements.edtVerseTo.enabled = true
	elements.editPlaintextCommentary.enabled = true
	elements.editPlaintextFootnote.enabled = true
}

/**
 * @properties={typeid:24,uuid:"77FF556B-6652-4A98-8684-6C50F4518D39"}
 */
function Validate() {
	//AlreadyValidated
	if (globals.sb_import_commentaryAndFootnotesValidated == 1)
		return true;

	globals.sb_import_commentaryError = ""
	if (!globals.sb_import_commentary) {

		return false;
	}
	var chNumberFrom = sb_import_globalchfrom_to_chapters.chapter_no
	var chNumberTo = sb_import_globalchto_to_chapters.chapter_no

	//Check chapter, verse order
	if ( (chNumberFrom > chNumberTo) || (chNumberFrom == chNumberTo && globals.sb_import_verseFromId > globals.sb_import_verseToId)) {
		plugins.dialogs.showWarningDialog("i18n:cvb.message.error", "i18n:cvb.message.ChapterVerseIntervalNotValid", "i18n:CVB.lbl.ok")
		return false;
	}
	
	// create a temp id
	var vTempID = application.getUUID();
	f_tempuuid = vTempID;

	//Starting transaction
	databaseManager.setAutoSave(false)

	//Create the commentary
	/** @type JSRecord<db:/sb/commentary_blocks> */
	var vRecord2 = foundset.getRecord(foundset.newRecord())
	vRecord2.book_id = globals.sb_import_bookId
	vRecord2.chapter_from = chNumberFrom
	vRecord2.chapter_to = chNumberTo
	vRecord2.verses_from = globals.sb_import_verseFromId
	vRecord2.verses_to = globals.sb_import_verseToId
	vRecord2.commentary_id = globals.sb_import_commentaryId
	vRecord2.active_now = 1;
	vRecord2.tmp_key = vTempID;
	
	//controller.newRecord()
	//book_id 		= globals.sb_import_bookId
	//chapter_from 	= chNumberFrom
	//chapter_to 		= chNumberTo
	//verses_from 	= globals.sb_import_verseFromId
	//verses_to 		= globals.sb_import_verseToId
	//commentary_id 	= globals.sb_import_commentaryId
	//active_now 		= 1;

	//controller.saveData()
	var cb_id = databaseManager.getNextSequence(datasources.db.sb.commentary_blocks.getDatasource(), 'pk')

	//First extract the title
	var text = globals.sb_import_commentary
	var footnoteText = globals.sb_import_footnotes
	var comTitle = ""
	var matches = text.match(/^(\s*<h1>.+<\/h1>)/ig)
	if (matches)
		comTitle = matches[0]
	text = text.substring(comTitle.length)

	//Insert the text and the title
	vRecord2.plaintext = text
	vRecord2.title = comTitle

	//Then check the footnotes and the commentary have the same footnote references
	var footnotesAvailableOnlyInTheText = new Array()
	var footnotesMissingFromTheText = new Array()

	//Checks that all references in the cb are also in the footnotes
//	var regexpFootnoteReference = /(<f>(\d+)<\/f>)/g
	var regexpFootnoteReference = /(\[cvb_f\](\d+)\[\/cvb_f\]>)/g
	var match = regexpFootnoteReference.exec(text);
	while (match != null) {
		if (!footnoteText.match(match[1]))
			footnotesAvailableOnlyInTheText.push(match[2])
		match = regexpFootnoteReference.exec(text);
	}

	//Checks that all footnotes  are available in text and inserts the footnotes
	var allFootnotesOk = true
	//var regexpFootnote = /(<f>(\d+)<\/f>)\s?(.+)/g
	var regexpFootnote = /(\[cvb_f\](\d+)\[\/cvb_f\])\s?(.+)/g
	match = regexpFootnote.exec(footnoteText);
	
	var vFootFS = databaseManager.getFoundSet('sb', 'footnotes');
	
	while (match != null) {
		//match[1]
		if (!text.match(new RegExp("\\[cvb_f\\]"+match[2]+"\\[\\/cvb_f\\]", "g")))
			footnotesMissingFromTheText.push(match[2])
		else {
			//var query = "INSERT INTO footnotes(commentary_block_id, footnote_number, plaintext) VALUES (?,?,?)"
			//var insertArray = new Array()
			//insertArray[0] =  cb_id
			//insertArray[1] =  match[2]
			//insertArray[2] =  match[3]
			//	var succes = plugins.rawSQL.executeSQL(forms.books.controller.getServerName(),  'footnotes',  query, insertArray);
			//if(!succes)
			//	//scopes.tools.output("Error inserting footnote " +match[2])
			/** @type JSRecord<db:/sb/footnotes> */
			var vRecord = vFootFS.getRecord(vFootFS.newRecord())
			vRecord.commentary_block_id = cb_id
			vRecord.footnote_number = match[2]
			vRecord.plaintext = match[3]
			vRecord.tmp_key = vTempID;
			allFootnotesOk = allFootnotesOk;
		}
		match = regexpFootnote.exec(footnoteText);
	}
	//plugins.rawSQL.flushAllClientsCache(forms.books.controller.getServerName(), 'footnotes')
	//application.updateUI(2)

	//Validation error
	if (footnotesAvailableOnlyInTheText.length > 0 || footnotesMissingFromTheText.length > 0 || !allFootnotesOk) {
//		databaseManager.rollbackEditedRecords()
		databaseManager.revertEditedRecords();

		if (footnotesAvailableOnlyInTheText.length > 0)
			globals.sb_import_commentaryError += "Footnotes referenced in the commentary text but not present in the footnote text: " + footnotesAvailableOnlyInTheText.join(",") + "\n\n"
		if (footnotesMissingFromTheText.length > 0)
			globals.sb_import_commentaryError += "Footnotes present in the footnotes text but not referenced from the commentary text: " + footnotesMissingFromTheText.join(",") + "\n\n"
		if (!allFootnotesOk)
			globals.sb_import_commentaryError += "There are errors importing the footnotes in the footnotes table"
		return true;
	}
//	btnSavebtnSave();
	globals.sb_import_commentaryError = "Data successfully validated!"
	globals.sb_import_commentaryAndFootnotesValidated = 1
	LockFields()
	return true;
}
