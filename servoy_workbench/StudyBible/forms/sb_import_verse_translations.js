/**
 * @properties={typeid:24,uuid:"1D1C3D49-374E-4B28-A373-65DBAEBC5B3D"}
 */
function BTN_browse() {
	if (!globals.sb_import_book_id) {
		plugins.dialogs.showErrorDialog('', 'i18n:cvb.message.PartNotSelected');
		return;
	}

	
	
	var vFile = plugins.file.showFileOpenDialog(1, plugins.file.getHomeFolder());
	if (vFile) {
		globals.sb_import_file = vFile

		// get book name
		var vSQL = "SELECT book_name FROM books WHERE pk = ?"
		var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [globals.sb_import_book_id], 1)

		var vAbsoluteFile = vFile.getAbsoluteFile();
		var vFileRead = plugins.file.readTXTFile(vAbsoluteFile)

		var vSplittedRows = vFileRead.split('\n');

		if (vQuery.getValue(1, 1) != vSplittedRows[0]) {
			plugins.dialogs.showQuestionDialog("", "i18n:cvb.message.BookPartdoesntMatch", "i18n:cvb.lbl.continue", "i18n:cvb.btn.cancel")

		}
	}
	//p
}

/**
 * @properties={typeid:24,uuid:"4AAB493A-DC0C-4645-9168-572398B3391F"}
 * @AllowToRunInFind
 */
function BTN_import() {
	//BTN_import_new();
	//return false;

	// OLD STUFF

	if (!globals.sb_import_file) {
		plugins.dialogs.showErrorDialog('', 'i18n:cvb.message.NoSelectedFile');
		return;
	}

	var vAbsoluteFile = globals.sb_import_file;
	var vFileRead = plugins.file.readTXTFile(vAbsoluteFile, 'ISO8859_1')

	var vSplittedRows = vFileRead.split('\n');

	var iChapterID = 0;
	var iVerseID = 0;
	var vCount = 0;
	var iSkip = 0
	var vCounter1;

	// Old
	//databaseManager.setAutoSave(false)

	// New
	databaseManager.setAutoSave(false);

	/** @type JSFoundset<db:/sb/chapters> */
	var vChapterFoundset = databaseManager.getFoundSet('sb', 'chapters');
	/** @type JSFoundset<db:/sb/verses> */
	var vVerseFoundset = databaseManager.getFoundSet('sb', 'verses');
	var vVerseTranslationFoundset = databaseManager.getFoundSet('sb', 'verse_translations');
	/** @type JSRecord<db:/sb/verse_translations> */
	var vRecord
	for (var i = 2; i < vSplittedRows.length; i++) {
		if (vSplittedRows[i].length > 1) {
			if (vSplittedRows[i].length < 15) {
				var vTest = vSplittedRows[i].split(', vs ');
				if (plugins.it2be_tools.isNumber(vTest[0])) {
					if (vChapterFoundset.find()) {
						vChapterFoundset.chapter_no = vTest[0]
						vChapterFoundset.book_id = globals.sb_import_book_id
						vCount = vChapterFoundset.search();
					}

					if (vCount == 1) {
						iChapterID = vChapterFoundset.pk;
					}

					////////////////////////////////////////////////////////////////

					if (vVerseFoundset.find()) {
						vVerseFoundset.verse_number = vTest[1]
						vVerseFoundset.chapter_id = iChapterID
						vCount = vVerseFoundset.search();
					}

					if (vCount == 1) {
						iVerseID = vVerseFoundset.pk;
						iSkip = 0
						continue;
					} else {
						iSkip = 1
						continue;
					}

					/*
					 if(iVerseID == 1020960)
					 {
					 var vBreekMe = 1;
					 }*/

					//scopes.tools.output(iVerseID)

					//	//scopes.tools.output('Chapter ' + vTest[0] + ' - Verse ' + vTest[1]);
					continue;
				}
			}

			//////////////// CHECK IF VERSE TRANSLATION DOES EXIST! /////////////////////
			if (!iSkip) {
				// Split the text
				var vVerseSplit = vSplittedRows[i].split('\t');

				// Get the translation book id
				var vTranslationBookCode = vVerseSplit[0];
				var vVerse = vVerseSplit[1];

				var vSQL = "SELECT pk FROM translation_books WHERE code = ?";
				var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [vTranslationBookCode], 1);
				//	var vTest = "";
				if (vQuery.getMaxRowIndex() >= 1) {
					//	var vTest = "output"
					// Check if verse exists
					if (vVerseTranslationFoundset.find()) {
						vVerseTranslationFoundset.translation_book_id = vQuery.getValue(1, 1)
						vVerseTranslationFoundset.verse_id = iVerseID;
						//	vVerseTranslationFoundset.transl_text = vVerse;
						vCounter1 = vVerseTranslationFoundset.search()
					}

					if (vCounter1 == 1) {
						vRecord = vVerseTranslationFoundset.getRecord(1);
//						cgxfvds = "Update!";
						vRecord.transl_text = vVerse
						databaseManager.saveData();
					} else if (vCounter1 == 0) {
						vRecord = vVerseTranslationFoundset.getRecord(vVerseTranslationFoundset.newRecord());
						databaseManager.saveData();
						vRecord.verse_id = iVerseID
						vRecord.translation_book_id = vQuery.getValue(1, 1);
						vRecord.transl_order = 1;
						vRecord.transl_text = vVerse
						databaseManager.saveData();
//						cgxfvds = "New!"
					}

				}
			}

			//	//scopes.tools.output('Vertaling: ' + vSplittedRows[i]);
		}
	}

	var vQuestion = plugins.dialogs.showQuestionDialog("i18n:cvb.btn.import", "i18n:cvb.message.bibleVerses", "i18n:cvb.btn.yes", "i18n:cvb.btn.no")
	if (vQuestion == i18n.getI18NMessage('i18n:cvb.btn.yes')) {
		databaseManager.saveData()
	} else {
		databaseManager.revertEditedRecords();
	}

}

/**
 * @properties={typeid:24,uuid:"61A1F48F-BF49-431C-A407-DD496385D378"}
 */
function BTN_import_new() {
	if (!globals.sb_import_file) {
		plugins.dialogs.showErrorDialog('', 'i18n:cvb.message.NoSelectedFile');
		return;
	}

	elements.lbl_status.text = "i18n:cvb.lbl.busyImporting";
	elements.btn_browse.enabled = false;
	elements.btn_import.enabled = false;
	elements.sb_import_book_id.enabled = false;
	elements.sb_import_testament.enabled = false;
	application.updateUI();
	var vAbsoluteFile = globals.sb_import_file;
	var vFileRead = plugins.file.readTXTFile(vAbsoluteFile, 'ISO8859_1')

	var vSplittedRows = vFileRead.split('\n');

	//var iChapter = 0;
	//var iVerse = 0;
	//var iChapterID = 0;
	var iVerseID = 0;
	//var vCount = 0;
	var iSkip = 0
	//var iNew = 0;
	//var iUpdated = 0
	var vUSQL = "";
	var i
	// Old
	//databaseManager.setAutoSave(false)

	// New
	//databaseManager.setAutoSave(false);
	//var vStartTS = application.getServerTimeStamp();
	var vSQL1 = "SELECT b.pk as BOOK_PK, b.book_name, c.pk AS CHAPTER_PK, c.chapter_no, v.pk AS VERSE_PK , v.verse_number FROM books AS b " + "LEFT JOIN chapters AS c ON c.book_id = b.pk " + "LEFT JOIN verses AS v ON v.chapter_id = c.pk " + "WHERE b.pk = ? " + "ORDER BY " + "c.chapter_no, v.verse_number"
	var vResult = databaseManager.getDataSetByQuery('sb', vSQL1, [globals.sb_import_book_id], -1);

	/* Result order
	 * 1 = Book PK
	 * 2 = Book name
	 * 3 = Chapter PK
	 * 4 = Chapter number
	 * 5 = Verse PK
	 * 6 = Verse number
	 */

	// Lets loop trough the result
	var vCurChapt = 0;
	var vSpecialArray = [];
	var vBookName = "";
	vBookName = vResult.getValue(1, 2);
	//scopes.tools.output("BookName: " + vBookName);
	for (i = 1; i <= vResult.getMaxRowIndex(); i++) {
		// Only when vCurChapt not is the current chapter
		if (vCurChapt != vResult.getValue(parseInt(i), 4)) {
			vCurChapt = vResult.getValue(parseInt(i), 4);
			vSpecialArray[vCurChapt] = { };
			vSpecialArray[vCurChapt].chapterNo = vCurChapt;
			vSpecialArray[vCurChapt].chapterId = vResult.getValue(parseInt(i), 3);
			vSpecialArray[vCurChapt].verses = [];
		}

		var vVerseObject = { };
		vVerseObject.verseNo = vResult.getValue(parseInt(i), 6);
		vVerseObject.verseId = vResult.getValue(parseInt(i), 5);

		vSpecialArray[vCurChapt].verses.push(vVerseObject);
		// Lets continue
	}

	// Fill up the translations rray
	var vTranslArray = [];
	vSQL1 = "SELECT pk, code FROM translation_books"
	vResult = databaseManager.getDataSetByQuery('sb', vSQL1, null, -1)

	for (i = 1; i <= vResult.getMaxRowIndex(); i++) {
		vTranslArray[vResult.getValue(parseInt(i), 2)] = vResult.getValue(parseInt(i), 1);
	}
	vResult = null;
	// Lets get the verse translations
	vSQL1 = "SELECT pk, verse_id, translation_book_id " + "FROM verse_translations " + "WHERE calc_book_name IN (SELECT book_name FROM books WHERE pk = ?)" + " ORDER BY verse_id";
	vResult = databaseManager.getDataSetByQuery('sb', vSQL1, [globals.sb_import_book_id], -1);

	/*
	 var vVersTranslArray = [];
	 var vCurVersi = 0;
	 for(i = 1; i <= vResult.getMaxRowIndex(); i++)
	 {
	 if(vCurVersi != vResult.getValue(i,2))
	 {
	 vCurVersi = vResult.getValue(i,2);
	 vVersTranslArray[vCurVersi] = [];
	 }
	 vVersTranslArray[vCurVersi].push(vResult.getValue(i,3))// = true;
	 }
	 */

	//return false;

	//var vChapterFoundset = databaseManager.getFoundSet('sb', 'chapters');
	//var vVerseFoundset = databaseManager.getFoundSet('sb', 'verses');
	//var vVerseTranslationFoundset = databaseManager.getFoundSet('sb', 'verse_translations');

	var aDeleteIDS = [];
	var aUSQL = [];
	var aDSQL = [];
	var vDSQL = "";
//	var iChapterID;

	for (i = 2; i < vSplittedRows.length; i++) {
		if (vSplittedRows[i].length > 1) {
			if (vSplittedRows[i].length < 15 && vSplittedRows[i].match(', vs ')) {
				var vTest = vSplittedRows[i].split(', vs ');
				if (plugins.it2be_tools.isNumber(vTest[0])) {
					// Check if Chapter exists
					if (vSpecialArray[vTest[0]]) {
						if (vSpecialArray[vTest[0]].chapterNo == vTest[0]) {
//							iChapterID = vSpecialArray[vTest[0]].chapterId;
						}
					}
					// Check if Verse exists
					if (vSpecialArray[vTest[0]]) {
						if (vSpecialArray[vTest[0]].verses) {
							if (vSpecialArray[vTest[0]].verses[ (vTest[1]) - 1]) {
								iSkip = 0
								iVerseID = vSpecialArray[vTest[0]].verses[ (vTest[1]) - 1].verseId;
								aDeleteIDS.push(iVerseID);
								continue;
							} else {
								iSkip = 1;
								iVerseID = null;
								continue;
							}
						}
					}
					continue;
				}
			}

			//////////////// CHECK IF VERSE TRANSLATION DOES EXIST! /////////////////////
			if (!iSkip) {
				// Split the text
				var vVerseSplit = vSplittedRows[i].split('\t');

				// Get the translation book id
				var vTranslationBookCode = vVerseSplit[0];
				var vVerse = vVerseSplit[1];

				if (vVerse == "12") {
//					a = 0;
				}

				if (vTranslArray[vTranslationBookCode]) {
					//if(vVersTranslArray.length > 0 && (vVersTranslArray[iVerseID] && (plugins.it2be_tools.arrayContains(vVersTranslArray[iVerseID], vTranslArray[vTranslationBookCode]))))
					//{
					//	vUSQL += "UPDATE verse_translations SET transl_text = '" + vVerse + "' WHERE verse_id = " + iVerseID + " AND translation_book_id = " + vTranslArray[vTranslationBookCode] + ";\n"
					//	cgxfvds = "Update!";
					//	iUpdated++;
					//} else {
					//	//scopes.tools.output("VerseID: " + iVerseID );
					//	//scopes.tools.output(vVersTranslArray[iVerseID] + " == " + vTranslArray[vTranslationBookCode])
					vUSQL = "INSERT INTO verse_translations(transl_text, verse_id, translation_book_id, calc_book_name) VALUES('" + vVerse + "'," + iVerseID + "," + vTranslArray[vTranslationBookCode] + ", '" + vBookName + "');\n"
					vDSQL = "DELETE FROM verse_translations WHERE verse_id = " + iVerseID + " AND translation_book_id IN (SELECT pk FROM translation_books WHERE code IN ('" + vTranslationBookCode + "'));"
					//					if(i%7==0)
					//					{
					aDSQL.push(vDSQL);
					aUSQL.push(vUSQL);
					vDSQL = "";
					vUSQL = "";
					//					}
					//scopes.tools.output("INSERT INTO verse_translations(transl_text, verse_id, translation_book_id, calc_book_name) VALUES('" + vVerse + "'," + iVerseID + "," + vTranslArray[vTranslationBookCode] + ", '" + vBookName + "');\n")
					//cgxfvds = "New!"
					//iNew++;
					//}
				}
			}
		}
	}
	if (vUSQL) {
		aDSQL.push(vDSQL);
		aUSQL.push(vUSQL);
		vUSQL = "";
		vDSQL = ""
	}

	// Create some new arrays
	/** @type {Array<String>} */
	var aDelArray = [];
	/** @type {Array<String>} */
	var aInsertArray = [];
	var vDel = "", vIns = "";
	for (i in aDSQL) {

		vDel += aDSQL[i];
		vIns += aUSQL[i];

		if (i % 20 == 0) {
			aDelArray.push(vDel);
			aInsertArray.push(vIns);
			vDel = "";
			vIns = "";
		}
	}

	if (vDel) {
		aDelArray.push(vDel);
		aInsertArray.push(vIns);
		vDel = "";
		vIns = "";
	}

	//var vDSQL = "DELETE FROM verse_translations WHERE verse_id IN (" + aDeleteIDS.join(',') + ")";
//	var vRawSQLStart = application.getServerTimeStamp();
	//plugins.rawSQL.executeSQL('sb', 'verse_translations',  vDSQL,  null)

	for (var j in aDelArray) {
		plugins.rawSQL.executeSQL('sb', 'verse_translations', aDelArray[j])
	}

	for (j in aInsertArray) {
		plugins.rawSQL.executeSQL('sb', 'verse_translations', aInsertArray[j])
	}

	plugins.rawSQL.flushAllClientsCache('sb', 'verse_translations')

//	var vStopTS = application.getServerTimeStamp();
	//scopes.tools.output(vUSQL);
	//scopes.tools.output('Raw SQL: ' + ((vStopTS-vRawSQLStart)/1000));
	//scopes.tools.output('Totaal: ' + ((vStopTS-vStartTS)/1000));

//	var iNew = 0;
//	var iUpdated = 0;
	vUSQL = null;
	elements.lbl_status.text = "i18n:cvb.lbl.doneImporting";
	elements.btn_browse.enabled = true;
	elements.btn_import.enabled = true;
	elements.sb_import_book_id.enabled = true;
	elements.sb_import_testament.enabled = true;
	application.updateUI();
}

/**
 * @properties={typeid:24,uuid:"F179E946-E945-4E09-A075-38E8F4F94A51"}
 */
function FORM_onShow() {
	elements.lbl_status.text = "";
	application.updateUI();
}
