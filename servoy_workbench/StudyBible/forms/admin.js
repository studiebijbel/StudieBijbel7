/**
 * @properties={typeid:24,uuid:"30428b8e-0d48-4830-8cee-b62dafd90a0e"}
 */
function btn_rebuildRegex() { }

/**
 * @properties={typeid:24,uuid:"22ba3c1a-6629-40c6-9775-8a19330ae930"}
 */
function btn_resetMenu() {
	plugins.window.getMenuBar().reset();
	application.updateUI(5)
}

/**
 * @properties={typeid:24,uuid:"178e8fc0-0142-473a-826e-79b44bfef755"}
 */
function btn_updateWordStudy() {
	//var vSQL = "SELECT DISTINCT verse_id AS a FROM verse_translations"
	var vSQL = "select count(pk) from verses"
	var vQuery = databaseManager.getDataSetByQuery("sb", vSQL, null, -1)
	var vMax = vQuery.getValue(1, 1) - globals.countUpdateWordStudy
	var vCommentaarID = null
	var vUpdateInterlineaire = null
	var vUpdateCommentaar = null
	var vSkipOT = 0;
	var vSkipNT = 0;
	var vCurTest = "";
	var vBook;

	if (plugins.dialogs.showQuestionDialog("Update", "Interlineaire vertaling & Commentaar updaten?", "ja", "nee") == "ja") {
		if (plugins.dialogs.showQuestionDialog("Reset", "global count resetten?", "ja", "nee") == "ja") {
			globals.countUpdateWordStudy = 0
		}

		if (plugins.dialogs.showQuestionDialog("Update", "Interlineaire vertaling bijwerken?", "ja", "nee") == "ja") {
			vUpdateInterlineaire = 1
		}

		if (plugins.dialogs.showQuestionDialog("Update", "Comentaar bijwerken?", "ja", "nee") == "ja") {
			vUpdateCommentaar = 1
		}

		if (plugins.dialogs.showQuestionDialog("Update", "Wilt u het Oude Testament overslaan?", "ja", "nee") == "ja") {
			vSkipOT = 1;
		}

		if(plugins.dialogs.showQuestionDialog("Update","Wilt u het Nieuwe Testament overslaan?","ja","nee") == "ja")
		{
			vSkipNT = 1;
		}
		
		for (var i = 0; i <= vMax; i++) {
			if (vSkipOT == 1 && globals.sb_gTestament == "Old") {
				break;
			}

			if(vSkipNT == 1 && globals.sb_gTestament == "New") {
				break;
			}
			
			if(globals.sb_gTestament)
			{
				vCurTest = globals.sb_gTestament;
			} else {
				globals.sb_gTestament = vCurTest;
			}
			
			application.sleep(50); // 100
			
			application.setStatusText("Updaten van Interliniare vertalingen en commentaren" + i + "van de" + vMax)
			globals.countUpdateWordStudy = i
			if (i % 10 == 0) {
				application.updateUI(10)
			}

			//Update Interlineare vertaling
			if (vUpdateInterlineaire == 1) {
				var iVerseID = globals.selected_verse_id;
				var vType = globals.sb_gTestament 
				// 01-12-2011 MME: load the actual records in the foundset for the verse.
				vSQL = "SELECT pk FROM words WHERE verse_id = " + iVerseID + " ORDER BY word_order";
			
				if (vType == "Old" && iVerseID > 0) {
					
					forms.study_words_edit.foundset.loadRecords(vSQL);
					forms.study_words_edit.BTN_save();
					
				} else if (vType == "New" && iVerseID > 0) {
					
					forms.study_words_edit_nt.foundset.loadRecords(vSQL);
					forms.study_words_edit_nt.BTN_save(iVerseID, true);
				} else {
					
//					var vVersesArray = application.getValueListArray('testamentVerses');
					var vChapterArray = application.getValueListArray('testamentChapters');
					var vBookArray = application.getValueListArray('testamentBooks');
					
//					var vHighestVerse = vVersesArray[ (vVersesArray.length) - 1];
					var vHighestChapter = vChapterArray[ (vChapterArray.length) - 1];
					var vLastBook = vBookArray[ (vBookArray.length) - 1];
					
					var vCurVerse = globals.verse;
					var vCurChapter = globals.chapter;
					var vCurBook = globals.book;
					
					if ( (globals.chapter) + 1 <= vHighestChapter) {
						globals.verse = 0
						globals.chapter = (globals.chapter) + 1
					} else {
						//IF it is the last chapter and verse than go to the next book
						globals.verse = 0;
						globals.chapter = 1;
						var vBookPos = plugins.it2be_tools.arrayIndexOf(vBookArray, globals.book);
						if (globals.book != vLastBook) {
							globals.book = vBookArray[ (vBookPos) + 1];
						} else {
							//If it is the lastest book go to the other Testament
							
							var vTestamentI;
							
							if(globals.sb_gTestament == "New")
							{
								vTestamentI = "Old";
							} else {
								vTestamentI = "New"
							}				

							//if(globals.book == "Maleachi" ||globals.book == "Malaquías")
							if (globals.book == vLastBook) {
								//vSQL = "SELECT FIRST(books.book_name) FROM books WHERE books.testament = 'New' AND books.show_in_nav = 1 ORDER BY books.order_number"
								// PostGre MME: 18-10-2011
								vSQL = "SELECT books.book_name FROM books WHERE books.testament = ? AND books.show_in_nav = 1 ORDER BY books.order_number LIMIT 1"
								vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [vTestamentI], 1)
								vBook = vQuery.getValue(1, 1)
								globals.book = vBook
								globals.sb_gTestament = vTestamentI;
							} else {
								//vSQL = "SELECT FIRST(books.book_name) FROM books WHERE books.testament = 'Old' AND books.show_in_nav = 1 ORDER BY books.order_number"
								// PostGre MME: 18-10-2011
								vSQL = "SELECT books.book_name FROM books WHERE books.testament = 'Old' AND books.show_in_nav = 1 ORDER BY books.order_number LIMIT 1 "
								vQuery = databaseManager.getDataSetByQuery('SB', vSQL, null, 1)
								vBook = vQuery.getValue(1, 1)
								globals.book = vBook
							}
						}
					}
					
					forms.sb_form.nextVerse();
					
					plugins.file.appendToTXTFile('C:\\cvb_conversion_log.txt', "Conversie is verder gegaan na dat er een fout was opgetreden bij " + vCurBook + " " + vCurChapter + ":" + vCurVerse + " verder gegaan bij " + globals.book + " " +globals.chapter + ":" +globals.verse + "\n");
					
					scopes.tools.output("Fout");
					continue;
//					return false;
				}
				
				
			}

			//Update Commentaaar
			if (vUpdateCommentaar == 1) {
				if (forms.book_comment.commentary_id) {
					var vSQL2 = "SELECT pk FROM commentary_blocks WHERE pk = ?"
					forms.sb_edit_EditCommentaryBlocks.foundset.loadRecords(vSQL2, [forms.book_comment.commentary_id])
					if (forms.sb_edit_EditCommentaryBlocks.foundset.getSize() != 0 && vCommentaarID != forms.book_comment.commentary_id) {
						vCommentaarID = forms.book_comment.commentary_id
						forms.sb_edit_EditCommentaryBlocks.btnSave(true);
					}
				}
			}

			//Set the history to false
			globals.UsedHistory = 1
			forms.sb_form.nextVerse();
		}
		globals.countUpdateWordStudy = 0
	}

	application.setStatusText("Gereed")
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E38E68BA-E21E-4177-842B-8AB90E593523"}
 */
function BTN_wordStudies(event) {
	if (true == true) //plugins.dialogs.showQuestionDialog("Reset", "global count resetten?", "ja", "nee") == "ja")
	{
		globals.countUpdateWordStudy2 = 0
	}
	var vFoundset = databaseManager.getFoundSet('sb', 'word_study')
	vFoundset.loadAllRecords()
	/** @type {JSRecord<db:/sb/word_study>}*/
	var vRecord = null
	var vMax2 = databaseManager.getFoundSetCount(vFoundset) - globals.countUpdateWordStudy2
	var vSQL3 = "SELECT pk FROM word_study WHERE word_strong = ?"
	for (var j = 1; j <= vMax2; j++) {
		if (j % 10 == 0) {
			application.updateUI(10)
		}
		application.setStatusText("Updaten van woordstudy" + j + "van de" + vMax2)
		globals.countUpdateWordStudy2 = j
		vRecord = vFoundset.getRecord(j)
		globals.myWordStudyID = vRecord.word_strong
		globals.wlink(vRecord.word_strong)
		forms.sb_edit_word_study_dlg.foundset.loadRecords(vSQL3, [globals.myWordStudyID])
		forms.sb_edit_word_study_dlg.BTN_update();
		globals.wlink(vRecord.word_strong)
		databaseManager.saveData();

	}
	globals.countUpdateWordStudy2 = 0
}
