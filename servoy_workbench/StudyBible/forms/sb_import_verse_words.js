/**
 * @properties={typeid:24,uuid:"5B0C806E-C42B-4EB1-85EA-9D4A0B47FCA0"}
 */
function BTN_browse()
{
if(!globals.sb_import_book_id)
{
	plugins.dialogs.showErrorDialog('', 'i18n:cvb.message.NoSelectedFile');
	return;
} else if(!globals.sb_import_chapter)
{
	plugins.dialogs.showErrorDialog('', 'i18n:cvb.message.ChapterNotSelected!');
	return;
}

var vFile = plugins.file.showFileOpenDialog(1, plugins.file.getHomeFolder());
if(vFile)
{
	globals.sb_import_file = vFile
	
	// Lets read the file
	var vAbsoluteFile = vFile.getAbsoluteFile();
	var vFileRead = plugins.file.readTXTFile(vAbsoluteFile);
	
	var vSplittedRows = vFileRead.split('\n');
	
	var vColumns;
	
	if(globals.sb_import_testament == 'Old') 
	{
		vColumns = vSplittedRows[0].split(';');
	} else {
		vColumns = vSplittedRows[0].split('\t');
	}
	
	if(vColumns[0] != "Strong" && vColumns[1] != "Hebreeuws" && vColumns[2] != "transliteratie" && vColumns[3] != "vertaling")
	{
		plugins.dialogs.showErrorDialog( "i18n:cvb.btn.import",  "i18n:servoy.message.WrongImportFile", "i18n:servoy.button.ok");
		vFile = null;
		globals.sb_import_file = null;
		return;
	}
	
	// Check the chapter
//	vColumns = vSplittedRows[1].split(';');
	if(globals.sb_import_testament == 'Old') 
	{
		vColumns = vSplittedRows[1].split(';');
	} else {
		vColumns = vSplittedRows[1].split('\t');
	}
	if(vColumns[0])
	{
		var vInfo = vColumns[0].split('vs.');
		if(vInfo[0] != globals.sb_import_chapter)
		{
			var vQuestion = plugins.dialogs.showErrorDialog( "i18n:cvb.btn.import",  "i18n:servoy.message.chapterDoesNotMatch", "i18n:cvb.lbl.continue", "i18n:CVB.button.cancel")
			if(vQuestion == i18n.getI18NMessage("CVB.button.cancel"))
			{
				vFile = null;
				globals.sb_import_file = null;
				return;
			}
		}
	}


}

}

/**
 * @properties={typeid:24,uuid:"6D6D0B18-03EF-4363-943D-90AADAF75264"}
 * @AllowToRunInFind
 */
function BTN_import()
{
//var vStartTS = application.getServerTimeStamp();

if(!globals.sb_import_file)
{
	plugins.dialogs.showErrorDialog('', 'i18n:cvb.message.NoSelectedFile');
	return;
}

var vAbsoluteFile = globals.sb_import_file;
var vFileRead = plugins.file.readTXTFile(vAbsoluteFile, 'ISO8859_1')

var vSplittedRows = vFileRead.split('\n');

var iChapter = 0;
var iVerse = 0;
var iChapterID = 0;
var iVerseID = 0;
var vCount = 0;
var iWordOrder = 0;
var iDeleted = 0;
// Old
//databaseManager.setAutoSave(false)

// New
databaseManager.setAutoSave(false);

/** @type {JSFoundSet<db:/sb/chapters>} */
var vChapterFoundset = databaseManager.getFoundSet('sb', 'chapters');

/** @type {JSFoundSet<db:/sb/verses>} */
var vVerseFoundset = databaseManager.getFoundSet('sb', 'verses');

/** @type {JSFoundSet<db:/sb/words>} */
var vWordsFoundset = databaseManager.getFoundSet('sb', 'words');

var vColumns,  vRecord;
var aVersIDS = new Array();

for(var i = 1; i < vSplittedRows.length; i++)
{
//	//scopes.tools.output(vSplittedRows[i]);
//	vColumns = vSplittedRows[i].split(';');
	vColumns = vSplittedRows[i].split('\t');

	if(vColumns[0].match('vs.'))
	{	
		if(iVerseID)
		{
	//		globals.sb_edit_WordsTranslationToHTML_ot( iVerseID )
		}
		// Chapter is ALWAYS the chapter what is selected in the DIALOG!
		iChapter = globals.sb_import_chapter;
		// Get verseNr and chapterNr
		var getInfo = vColumns[0].split('vs.');
		iVerse = getInfo[1];
		
		/////// GET CHAPTER ID
		
		if(vChapterFoundset.find())
		{
			vChapterFoundset.chapter_no = iChapter
			vChapterFoundset.book_id = globals.sb_import_book_id
			vCount = vChapterFoundset.search();
		}
		
		if(vCount == 1)
		{
			iChapterID = vChapterFoundset.pk;
		}
		
		/////// GET VERSE ID
		
		if(vVerseFoundset.find())
		{
			vVerseFoundset.verse_number = iVerse
			vVerseFoundset.chapter_id = iChapterID
			vCount = vVerseFoundset.search();
		}
		
		if(vCount == 1)
		{
			iVerseID = vVerseFoundset.pk;
		} else {
			// Create new verse!
			/**
			 * @type {JSFoundset<db:/sb/verses>}
			 */
			vRecord = vVerseFoundset.getRecord(vVerseFoundset.newRecord());
			vRecord.verse_number = iVerse;
			vRecord.chapter_id = iChapterID
			vRecord.chapter_number = iChapter
			databaseManager.saveData();
			iVerseID = vRecord.pk;
			vRecord = null
		}
		aVersIDS.push(iVerseID)
		iWordOrder = 1;
		iDeleted = 0;
		continue;
	//	//scopes.tools.output('A chapter and verse found!');
	} else {
		if(vWordsFoundset.find())
		{
			vWordsFoundset.verse_id = iVerseID;
			vCount = vWordsFoundset.search();
		}
		
		if(iDeleted == 0 && vCount)
		{
			vWordsFoundset.deleteAllRecords();
			databaseManager.saveData()
			iDeleted = 1;
		}
		
		// Recreate the words!
		vRecord = vWordsFoundset.getRecord(vWordsFoundset.newRecord());
		databaseManager.saveData();
		vRecord.verse_id = iVerseID;
		vRecord.word_order = iWordOrder;
		vRecord.word_strong = vColumns[0];
		vRecord.word_original = vColumns[1];
		vRecord.word_transliteration = vColumns[2]
		vRecord.word_translation = vColumns[3]
		databaseManager.saveData();
		vRecord = null;
		
		iWordOrder++;
		
	}
	
}
var vQuestion = plugins.dialogs.showQuestionDialog("i18n:cvb.btn.import", "i18n:cvb.message.bibleChanges",  "i18n:cvb.btn.yes", "i18n:cvb.btn.no")
if(vQuestion == i18n.getI18NMessage("cvb.btn.yes"))
{
	databaseManager.saveData();
	for(i in aVersIDS)
	{
	//TODO: ff onderscheid maken tussen NT en OT
		globals.sb_edit_WordsTranslationToHTML_ot( aVersIDS[i] )
	}
} else {
//	databaseManager.rollbackEditedRecords();
	databaseManager.revertEditedRecords();
}


}

/**
 * @properties={typeid:24,uuid:"C4BA00FB-5487-4955-BF2B-71AFD2A0BEF2"}
 * @AllowToRunInFind
 */
function BTN_import_new()
{
	//var vStartTS = application.getServerTimeStamp();
	
	if(!globals.sb_import_file)
	{
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
	var vFileRead = plugins.file.readTXTFile(vAbsoluteFile, 'UTF8') // ISO8859_1 UTF8
	
	var vSplittedRows = vFileRead.split('\n');
	
	var iChapter = 0;
	var iVerse = 0;
	var iChapterID = 0;
	var iVerseID = 0;
	var vCount = 0;
	var iWordOrder = 0;
	var iDeleted = 0;
	var i;
	// Old
	//databaseManager.setAutoSave(false)
	
	// New
	databaseManager.setAutoSave(false);
	
	scopes.tools.output("Book ID = " + globals.sb_import_book_id)
	
	var vSQL1 = "SELECT b.pk as BOOK_PK, b.book_name, c.pk AS CHAPTER_PK, c.chapter_no, v.pk AS VERSE_PK , v.verse_number FROM books AS b "
			  + "LEFT JOIN chapters AS c ON c.book_id = b.pk "
			  + "LEFT JOIN verses AS v ON v.chapter_id = c.pk "
			  + "WHERE b.pk = ? "
			  + "ORDER BY c.chapter_no, v.verse_number"
	var vResult = databaseManager.getDataSetByQuery('sb', vSQL1, [globals.sb_import_book_id], -1);
	
	/** Result order
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
	
	for(i = 1; i <= vResult.getMaxRowIndex(); i++)
	{
		// Only when vCurChapt not is the current chapter
		if(vCurChapt != vResult.getValue(parseInt(i.toString()),4))
		{
			vCurChapt = vResult.getValue(parseInt(i.toString()),4);
			vSpecialArray[vCurChapt] = {};
			vSpecialArray[vCurChapt].chapterNo = vCurChapt;
			vSpecialArray[vCurChapt].chapterId = vResult.getValue(parseInt(i.toString()),3);
			vSpecialArray[vCurChapt].verses = [];
		}
		if(vResult.getValue(parseInt(i.toPrecision()),6) && vResult.getValue(parseInt(i.toPrecision()),5))
		{
			var vVerseObject = {};
				vVerseObject.verseNo = vResult.getValue(parseInt(i.toString()),6);
				vVerseObject.verseId = vResult.getValue(parseInt(i.toString()),5);
			
			vSpecialArray[vCurChapt].verses.push(vVerseObject);
		}
		// Lets continue
		
	}

	//var vChapterFoundset = databaseManager.getFoundSet('sb', 'chapters');
	/** @type JSFoundset<db:/sb/verses> */
	var vVerseFoundset = databaseManager.getFoundSet('sb', 'verses');
	/** @type JSFoundset<db:/sb/words> */
	var vWordsFoundset = databaseManager.getFoundSet('sb', 'words');
	
	var vRecord
	
	var vColumns;
	var aVersIDS = new Array();
	
	for(i = 1; i < vSplittedRows.length; i++)
	{
	//	//scopes.tools.output(vSplittedRows[i]);
	//	
	
		if(globals.sb_import_testament == 'Old') 
		{
			vColumns = vSplittedRows[i].split(';');
		} else {
			vColumns = vSplittedRows[i].split('\t');
		}
		
		if(vColumns[0].match('vs.'))
		{	
			if(iVerseID)
			{
		//		globals.sb_edit_WordsTranslationToHTML_ot( iVerseID )
			}
			// Chapter is ALWAYS the chapter what is selected in the DIALOG!
			iChapter = globals.sb_import_chapter;
			// Get verseNr and chapterNr
			var getInfo = vColumns[0].split('vs.');
			iVerse = getInfo[1];
			
			/////// GET CHAPTER ID
			if(vSpecialArray[iChapter])
			{
				if(vSpecialArray[iChapter].chapterNo == iChapter)
				{
					iChapterID = vSpecialArray[iChapter].chapterId;
				}
			}
			
			// Check if Verse exists
			
			if(vSpecialArray[iChapter])
			{
				if(vSpecialArray[iChapter].verses)
				{
					if(vSpecialArray[iChapter].verses[(iVerse)-1])
					{
						iVerseID = vSpecialArray[iChapter].verses[(iVerse)-1].verseId;
					//	continue;
					} else {
						vRecord = vVerseFoundset.getRecord(vVerseFoundset.newRecord());
						vRecord.verse_number = iVerse;
						vRecord.chapter_id = iChapterID
						vRecord.chapter_number = iChapter
						vRecord.book_id = globals.sb_import_book_id;
						databaseManager.saveData();
						iVerseID = vRecord.pk;
						vRecord = null
					//	continue;
					}
				}
			}	
			
			if(iVerseID)
			{
				aVersIDS.push(iVerseID);
			}
			iWordOrder = 1;
			iDeleted = 0;
			continue;
			
		} else {
			// OOPS BUG :-$
			// ff && iVerseID adden
			if(vWordsFoundset.find() && iVerseID)
			{
				vWordsFoundset.verse_id = iVerseID;
				vCount = vWordsFoundset.search();
			}
			
			if(iDeleted == 0 && vCount)
			{
				vWordsFoundset.deleteAllRecords();
				databaseManager.saveData()
				iDeleted = 1;
			} else if (vCount == 0) {
				iDeleted = 1;
			}
			// Recreate the words!
			/** @type{JSRecord<db:/sb/words>} */
			vRecord = vWordsFoundset.getRecord(vWordsFoundset.newRecord());
			databaseManager.saveData();
			vRecord.verse_id = iVerseID;
			vRecord.word_order = iWordOrder;
			vRecord.word_strong = vColumns[0];
			vRecord.word_original = vColumns[1];
			vRecord.word_transliteration = vColumns[2];
			vRecord.word_translation = vColumns[3];
			vRecord.word_orginal_unicode = globals.stringToCharNo(vRecord.word_original);
			
			if(globals.sb_import_testament == "New") {
				// Dit is het gedeelte voor de NT import waarbij de extra velden zitten!
				vRecord.tr = ((vColumns[4]=="1")?1:0);
				vRecord.hf = ((vColumns[5]=="1")?1:0);
				vRecord.n25 = ((vColumns[6]=="1")?1:0);
				vRecord.n27 = ((vColumns[7]=="1")?1:0);
				vRecord.code_no = ((vColumns[8] && vColumns[8].length > 0)?vColumns[8]:null);
			}
			
			databaseManager.saveData();
			vRecord = null;
		}
		iWordOrder++;
	}
	//var vStop1TS = application.getServerTimeStamp();
	
	databaseManager.saveData();
	
	
	
	if(globals.sb_import_testament == "Old")
	{
		// OT werkend nieuwe manier
		//	globals.sb_import_wordTransLOT(aVersIDS);
		// DO NOT FUCKING ENABLE !!!!! :@
		var vUSQL = "";
		/** @type {Array<String>} */
		var aUSQL = [];
		for(i in aVersIDS)
		{
			//TODO: ff onderscheid maken tussen NT en OT
			vUSQL += globals.sb_edit_WordsTranslationToHTML_ot( aVersIDS[i] )
			if(i%20==0)
			{
				aUSQL.push(vUSQL);
				vUSQL = "";
			}
			
		}
		
		if(vUSQL)
		{
			aUSQL.push(vUSQL);
			vUSQL = "";
		}
		
		for(var k in aUSQL)
		{
			plugins.rawSQL.executeSQL('sb',  "verses",  aUSQL[k].toString());
		}
		plugins.rawSQL.flushAllClientsCache('sb', 'verses');
	} else {
		for(i in aVersIDS)
		{
			// Dit is een snellere manier om  de informatie om te zetten
			globals.sb_edit_WordsTranslationToHTML_nt(aVersIDS[i]);
			//globals.sb_import_wordTransLNT(aVersIDS[i]);
		}
	}
	
	//var vStop2TS = application.getServerTimeStamp();
	//scopes.tools.output('Update data: '+((vStop1TS - vStartTS)/1000));
	//scopes.tools.output('Convert data: '+((vStop2TS - vStop1TS)/1000));
	
	elements.lbl_status.text = "i18n:cvb.lbl.doneImporting";
	elements.btn_browse.enabled = true;
	elements.btn_import.enabled = true;
	elements.sb_import_book_id.enabled = true;
	elements.sb_import_testament.enabled = true;
	application.updateUI();
}
