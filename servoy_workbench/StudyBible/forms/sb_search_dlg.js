/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4B063A10-6526-43BE-B496-BDBFEE4B7729"}
 */
var lbl_blabla = null;

/**
 * @properties={typeid:24,uuid:"2177A640-B78A-42EE-8365-786B50918D41"}
 */
function BTN_cancel() {
	//application.closeFormDialog();
	//SMM - 23-05-2010
	
	globals.sb_searchTransl_tabText = null //SMM 03-06-2011
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}
}

/**
 * @properties={typeid:24,uuid:"A472535F-F8D1-4C8A-AE07-7AA5DD1915DC"}
 */
function BTN_onLoad() {
	// Only execute on SMART CLIENT!
	if(globals.sb_gSearchType != 2) {
		elements.sb_search_bible_books.enabled = false;
		elements.sb_search_bible_booksc.enabled = false;

//		globals.sb_search_book_translations = 'SV\nNBG\nNBV'
		globals.sb_search_book_translations = "NBG";
	}
}

/**
 * @properties={typeid:24,uuid:"4FA33505-4B02-4F0E-9B83-E93510431405"}
 */
function BTN_toggleAllBooks() {
	if (globals.sb_search_allbooks) {
		globals.sb_search_books_all_ot = 1;
		globals.sb_search_books_all_nt = 1;
		elements.sb_search_bible_books.enabled = false;
		elements.sb_search_bible_booksc.enabled = false;
	} else {
		globals.sb_search_books_all_ot = 0;
		globals.sb_search_books_all_nt = 0;
		elements.sb_search_bible_books.enabled = true;
		elements.sb_search_bible_booksc.enabled = true;
	}
}

/**
 * @properties={typeid:24,uuid:"7F194792-96B6-47E4-BBDF-C6129F9DE1BD"}
 */
function BTN_toggleBooks() {
	globals.sb_search_allbooks = 0
	//BTN_toggleAllBooks();

	if (globals.sb_search_books_all_ot == 1) {
		//elements.sb_search_books_all_ot.enabled = false;
		elements.sb_search_bible_books.enabled = false;
	} else if (globals.sb_search_books_all_ot == 0) {
		elements.sb_search_bible_books.enabled = true;
	}

	/// NT

	if (globals.sb_search_books_all_nt == 1) {
		//elements.sb_search_books_all_nt.enabled = false;
		elements.sb_search_bible_booksc.enabled = false;
	} else if (globals.sb_search_books_all_nt == 0) {
		elements.sb_search_bible_booksc.enabled = true;
	}

	if (globals.sb_search_books_all_nt == 1 && globals.sb_search_books_all_ot == 1) {
		globals.sb_search_allbooks = 1;
	}
}

/**
 * @properties={typeid:24,uuid:"23E48D77-D5C3-46C4-910F-32944BDE9063"}
 */
function BTN_toggleCommentary() {
	if (globals.sb_search_search_commentary == 1) {
		elements.sb_search_search_footnotes.enabled = true;
		elements.sb_search_commentaryNotes.enabled = true;
	} else if (globals.sb_search_search_commentary == 0) {
		elements.sb_search_search_footnotes.enabled = false;
		elements.sb_search_commentaryNotes.enabled = false;
	}

}

/**
 * @properties={typeid:24,uuid:"16F49078-035C-4A16-ACFC-47D5F1E68897"}
 * @param {JSEvent|String} event
 */
function BTN_toggleSearchMethod(ov, nv, event) {
	var vElement;
	
	var a = 0;
	
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		vElement = event;
	} else {
		if(event) {
			vElement = event.getElementName();
		}
	}

	if (vElement == "sb_search_in_biblebooks") {
		if (globals.sb_search_in_biblebooks) {
			globals.sb_search_in_studywords = 0
		} else {
			globals.sb_search_in_studywords = 1
		}
	} else if (vElement == "sb_search_in_studywords") {
		if (globals.sb_search_in_studywords) {
			globals.sb_search_in_biblebooks = 0
		} else {
			globals.sb_search_in_biblebooks = 1
		}
	}

	if (globals.sb_search_in_biblebooks == 0) {
		elements.sb_search_search_translations.enabled = false;
		elements.sb_search_book_translations.enabled = false;
		elements.sb_search_search_spacing.enabled = false;
		elements.sb_search_search_commentary.enabled = false;
		if(application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT) {
			elements.sb_search_allbooks.enabled = false;
		}
		elements.sb_search_books_all_ot.enabled = false;
		elements.sb_search_bible_booksc.enabled = false;
		elements.sb_search_books_all_otc.enabled = false;
		elements.sb_search_bible_books.enabled = false;
		elements.sb_search_search_footnotes.enabled = false;
		elements.sb_search_search_articles.enabled = false;
		elements.sb_search_commentaryNotes.enabled = false;
	} else {
		elements.sb_search_search_translations.enabled = true;

		// Toggle the translations
		BTN_toggleTranslations();
		BTN_toggleBooks()
		BTN_toggleCommentary();

		elements.sb_search_search_spacing.enabled = true;
		elements.sb_search_search_commentary.enabled = true;
		if(application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT) {
			elements.sb_search_allbooks.enabled = true;
		}
		elements.sb_search_books_all_ot.enabled = true;
		elements.sb_search_books_all_otc.enabled = true;
		elements.sb_search_search_articles.enabled = true;
	}
}

/**
 * @properties={typeid:24,uuid:"BEB57B87-4B68-4EDD-87CE-A5E169A7309E"}
 */
function BTN_toggleTranslations() {
	if (globals.sb_search_search_translations) {
		elements.sb_search_book_translations.enabled = true;
	} else {
		elements.sb_search_book_translations.enabled = false;
	}
}

/**
 * @AllowToRunInFind
 * 
 * // TODO generated, please specify type and doc for the params
 * @param {Object|JSEvent} event
 *
 * @properties={typeid:24,uuid:"C3D60096-DD89-421A-8828-D82F74EB477F"}
 */
function EVENT_preSearch(event)
{
	
/*	if (globals.sb_search_criteria.length >= 3) {
		globals.search_PRINT_sql = new Object();
		elements.showLoad.visible = true
		elements.lbl_searchLoading.visible = true;
		controller.recreateUI();
		application.sleep(10);
	}
	*/
	//SMM 31-11-2011
	
	var error = 0;
	lbl_blabla = "";
//	currentcontroller.getWindow().hide();
	
	if (!globals.sb_search_in_studywords) {
		if ( (!globals.sb_search_bible_books && !globals.sb_search_bible_books_nt)/* && (globals.sb_search_bible_books != 0 && globals.sb_search_bible_books_nt != 0)*/) {
			if ( (!globals.sb_search_books_all_ot && !globals.sb_search_books_all_nt)) {
				//globals.DIALOGS.showErrorDialog("Warning", i18n.getI18NMessage("cvb.lbl.bookToSearch"), "Ok");
				lbl_blabla = i18n.getI18NMessage("cvb.lbl.bookToSearch")
				error++;
				return true;
			}
		}

		if (globals.sb_search_search_articles != 1 && globals.sb_search_search_commentary != 1 && globals.sb_search_search_translations != 1 && globals.sb_search_search_spacing != 1) {
//			globals.DIALOGS.showErrorDialog("Warning", i18n.getI18NMessage("cvb.lbl.itemToSearch"), "Ok");
			lbl_blabla = i18n.getI18NMessage("cvb.lbl.itemToSearch")						
			error++;
			return true;
		}
	}

	if (globals.sb_search_criteria.length >= 3) {
		
		
		if(error > 0)
		{
			vForm = application.createWindow('sb_search_dlg', JSWindow.MODAL_DIALOG);
			vForm.show(forms.sb_search_dlg);
		}
		
		var win = forms.sb_search_dlg.controller.getWindow()
		if (win && !error) {
			win.hide()
		}
		
		var vForm = application.createWindow('SearchProgressBar', JSWindow.MODAL_DIALOG, null);
		if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT){
			vForm.setSize(273,36)
		} else {
			vForm.setSize(250,70)
		}
		vForm.resizable = false
		vForm.title = i18n.getI18NMessage("cvb.lbl.loading_search_results")
		vForm.show(forms.sb_search_progress_bar)
		
	}
	else {
//		globals.DIALOGS.showErrorDialog('i18n:cvb.msg.errorSearch', i18n.getI18NMessage("cvb.msg.errorSearch"), "Ok");
		lbl_blabla = i18n.getI18NMessage("cvb.msg.errorSearch")
		error++;
		return true;
	}

	
	//EVENT_search(event);
	return true;
}

/**
 * @properties={typeid:24,uuid:"9C7A97F1-62BF-4F3E-975A-7BA59DB43199"}
 */
function process()
{
//       // always put your process in a try/catch/finally block:
//    try {
//        // your long process in a loop:
//        for (var i = 1; i < max; i++) {
// 
//            // do something here
//            
//            application.sleep(1000);
// 
//            // check for each iteration if the user has canceled:
////            if (plugins.busy.isCanceled()) {
////                
////                break;
////            }
//        }
// 
//    // trap any exception here (or throw)
//    } catch (e) {
//        
// 
//    // always unblock in a finally block (this will always happen!)
//    } finally {
//        plugins.busy.unblock();
//    }
//    
 
}

/**
 * @properties={typeid:24,uuid:"75CC4988-9942-44CA-ACE3-4B54FF255A42"}
 * @AllowToRunInFind
 */
function EVENT_search(event) {
	//SMM 1-11-2010 see sb_search_progress_bar
	return
}

/**
 * @properties={typeid:24,uuid:"2A531E6A-6C32-4114-AE47-A99963FE43B6"}
 */
function FORM_onShow() {
	//if (globals.sb_APP_getServerLang() != "NL") {

	//	elements.background_wordStudy.visible = false
	//	elements.sb_search_in_studywords.visible = false
	//} else {

	if(application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT) {
		elements.background_wordStudy.visible = true
		elements.sb_search_in_studywords.visible = true
		elements.showLoad.visible = false
		elements.lbl_searchLoading.visible = false;
	}
	//}

	//elements.showLoad.setLocation(5,20)
	

	//Method call
	BTN_toggleAllBooks()//Method call
	BTN_toggleBooks()//Method call
	BTN_toggleCommentary()//Method call
	BTN_toggleSearchMethod(new JSEvent)//Method call
	BTN_toggleTranslations()

	//elements.lbl_searchLoading.setLocation(110,420);

	//Selements.sb_search_criteria.putClientProperty('JTextField.variant','search')

}

/**
 * @properties={typeid:24,uuid:"632CF338-D3EE-49FB-9414-6F9E0CFCCFAD"}
 * @AllowToRunInFind
 */
function helpPopup() {
	globals.DIALOGS.showInfoDialog(i18n.getI18NMessage('i18n:CVB.label.search_info'), i18n.getI18NMessage('i18n:cvb.lbl.searchexplane'), "Ok");
}

/**
 * @properties={typeid:24,uuid:"1E79E8DC-0791-4A03-A504-AA687E238E01"}
 * @AllowToRunInFind
 */
function EVENT_search_old() {
	var vSQL = "";
	var vSELECT = "";
	var vFROMS = "";
	var vWHERE = "";
	var vINNER = "";
//	var vWhereValues;
	var vAllWh;

	/*
	 *	CvB Search Engine
	 *
	 * Addion for print :-)
	 */
	if (!globals.sb_search_in_studywords) {
		if ( (!globals.sb_search_bible_books && !globals.sb_search_bible_books_nt)/* && (globals.sb_search_bible_books != 0 && globals.sb_search_bible_books_nt != 0)*/) {
			if ( (!globals.sb_search_books_all_ot && !globals.sb_search_books_all_nt)) {
				globals.DIALOGS.showErrorDialog("Warning", i18n.getI18NMessage("cvb.lbl.bookToSearch"), "Ok")
				
				return
			}
		}

		if (globals.sb_search_search_articles != 1 && globals.sb_search_search_commentary != 1 && globals.sb_search_search_translations != 1 && globals.sb_search_search_spacing != 1) {
			globals.DIALOGS.showErrorDialog("Warning", i18n.getI18NMessage("cvb.lbl.itemToSearch"), "Ok");
			return
		}
	}
	if (globals.sb_search_criteria.length >= 3) {
		globals.search_PRINT_sql = new Object();

		elements.showLoad.visible = true
		elements.lbl_searchLoading.visible = true;
		application.updateUI()

		forms.search_results1.elements.tabs_70.removeAllTabs();

		if (globals.sb_search_in_biblebooks) {
			// Determine books
			var vAllBooks = "";
			if (!globals.sb_search_allbooks) {
				application.updateUI()
				if (!globals.sb_search_books_all_ot && globals.sb_search_bible_books) {
					vAllBooks = utils.stringReplace(globals.sb_search_bible_books, '\n', ', ');
				}
				if (!globals.sb_search_books_all_nt && globals.sb_search_bible_books_nt) {
					if (vAllBooks.length == 0) {
						vAllBooks = utils.stringReplace(globals.sb_search_bible_books_nt, '\n', ', ');
					} else {
						vAllBooks += ", " + utils.stringReplace(globals.sb_search_bible_books_nt, '\n', ', ');
					}
				}
			}
			application.updateUI()

			///////////////////

			vSQL = "SELECT ";
			vSELECT = "";
			vFROMS = "";
			vWHERE = "";
			vINNER = "";

			// Search translations
			if (globals.sb_search_search_translations) {				
				application.updateUI()
				// TR = abbrv. translations
				vFROMS += ",verse_translations AS tr ";
				vSELECT += ", DISTINCT tr.pk ";
				vINNER += "LEFT JOIN translation_books AS tb ON tr.translation_book_id = tb.pk ";
				var WHV = "'" + utils.stringReplace(globals.sb_search_book_translations, '\n', '\', \'') + "'";
				vWHERE += "OR (tr.translation_book_id IN (SELECT pk FROM translation_books WHERE code IN (" + WHV + "\)) AND tr.transl_text LIKE '%" + globals.sb_search_criteria + "%') ";
				if (vAllBooks.length > 0 || globals.sb_search_books_all_nt || globals.sb_search_books_all_ot) {
					vAllWh = 0;
					vWHERE += " AND (verse_id IN (SELECT pk FROM verses WHERE chapter_id IN (SELECT pk FROM chapters WHERE ";
					if (vAllBooks.length > 0) {
						vAllWh = 1;
						vWHERE += "book_id IN (" + vAllBooks + ")";
					}
					if (globals.sb_search_books_all_nt) {
						if (vAllWh == 1) {
							vWHERE += " OR";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'New' AND show_in_nav = 1)";
						vAllWh = 2
					}
					if (globals.sb_search_books_all_ot) {
						if (vAllWh == 1) {
							vWHERE += " OR";
						} else if (vAllWh == 2) {
							vWHERE += " OR";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'Old' AND show_in_nav = 1)";
						vAllWh = 1
					}

					vWHERE += ")))";
				}

				vFROMS = vFROMS.substring(1, vFROMS.length);
				vSELECT = vSELECT.substring(1, vSELECT.length)
				vWHERE = vWHERE.substring(2, vWHERE.length)
				vSQL += vSELECT + "FROM " + vFROMS + vINNER + "WHERE " + vWHERE;
				application.updateUI()

				globals.search_PRINT_sql.translationSQL = vSQL
				forms.sb_search_searchTransl.foundset.loadRecords(vSQL)
				forms.sb_search_searchTransl.foundset.sort("calc_book_name ASC")
				globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchTransl.foundset);

				globals.search_PRINT_sql.translationCOUNT = globals.sb_searchTransl_tabText

				forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchTransl, i18n.getI18NMessage('cvb.lbl.bibletranslations') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.bibletranslations') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				application.updateUI()

				vSQL = "SELECT ";
				vSELECT = "";
				vFROMS = "";
				vWHERE = "";
				vINNER = "";
			}

			// Woord voor Woord
			if (globals.sb_search_search_spacing) {
				// TR = abbrv. translations
				vFROMS += ",words AS w ";
				vSELECT += ",w.pk ";
				vINNER += "LEFT JOIN verses AS v ON w.verse_id = v.pk ";
				vWHERE += "OR ((w.word_original LIKE '%" + globals.sb_search_criteria + "%') OR (w.word_translation LIKE '%" + globals.sb_search_criteria + "%') OR (w.word_transliteration LIKE '%" + globals.sb_search_criteria + "%')) ";
				application.updateUI()

				if (vAllBooks.length > 0 || globals.sb_search_books_all_nt || globals.sb_search_books_all_ot) {
					vAllWh = 0;
					vWHERE += " AND (verse_id IN (SELECT pk FROM verses WHERE chapter_id IN (SELECT pk FROM chapters WHERE ";
					if (vAllBooks.length > 0) {
						vAllWh = 1;
						vWHERE += "book_id IN (" + vAllBooks + ")";
					}
					if (globals.sb_search_books_all_nt) {
						if (vAllWh == 1) {
							vWHERE += " OR";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'New')";
						vAllWh = 2
					}
					if (globals.sb_search_books_all_ot) {
						if (vAllWh == 1) {
							vWHERE += " OR";
						} else if (vAllWh == 2) {
							vWHERE += " OR";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'Old')";
						vAllWh = 1
					}
					vWHERE += ")))";
				}

				vFROMS = vFROMS.substring(1, vFROMS.length);
				vSELECT = vSELECT.substring(1, vSELECT.length)
				vWHERE = vWHERE.substring(2, vWHERE.length)
				vSQL += vSELECT + "FROM " + vFROMS + vINNER + "WHERE " + vWHERE;
				application.updateUI()

				globals.search_PRINT_sql.spacingSQL = vSQL

				forms.sb_search_searchInterlinie.foundset.loadRecords(vSQL)
				forms.sb_search_searchInterlinie.foundset.sort("calc_book_name ASC")
				globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchInterlinie.foundset);
				globals.search_PRINT_sql.spacingCOUNT = globals.sb_searchTransl_tabText
				forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchInterlinie, i18n.getI18NMessage('cvb.lbl.spacing') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.spacing') + ' \(' + globals.sb_searchTransl_tabText + '\)');

				vSQL = "SELECT ";
				vSELECT = "";
				vFROMS = "";
				vWHERE = "";
				vINNER = "";
			}
			application.updateUI()

			if (globals.sb_search_search_commentary == 1) {
				// Commentary thing :-)
				// TR = abbrv. translations
				vFROMS += ",commentary_blocks AS cb ";
				vSELECT += ",cb.pk ";
				vWHERE += "OR (title LIKE '%" + globals.sb_search_criteria + "%' OR plaintext LIKE '%" + globals.sb_search_criteria + "%') ";

				if (vAllBooks.length > 0 || globals.sb_search_books_all_nt || globals.sb_search_books_all_ot) {
					vAllWh = 0;
					//vWHERE += " AND (verse_id IN (SELECT pk FROM verses WHERE chapter_id IN (SELECT pk FROM chapters WHERE ";
					vWHERE += " AND ("
					if (vAllBooks.length > 0) {
						vAllWh = 1;
						vWHERE += " book_id IN (" + vAllBooks + ")";
					}
					if (globals.sb_search_books_all_nt) {
						if (vAllWh == 1) {
							vWHERE += " OR";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'New')";
						vAllWh = 2
					}
					if (globals.sb_search_books_all_ot) {
						if (vAllWh == 1) {
							vWHERE += " OR";
						} else if (vAllWh == 2) {
							vWHERE += " OR";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'Old')";
						vAllWh = 1
					}
					vWHERE += ")";
				}
				// ADDED BY rbonkestoter
				// ON 7th jan 2010
				// FOR CVB PERFORMANCE
				vWHERE += " AND cb.active_now = 1 ";
				// END OF ADDITION
				vFROMS = vFROMS.substring(1, vFROMS.length);
				vSELECT = vSELECT.substring(1, vSELECT.length)
				vWHERE = vWHERE.substring(2, vWHERE.length)
				vSQL += vSELECT + "FROM " + vFROMS + vINNER + "WHERE " + vWHERE;
				application.updateUI()

				globals.search_PRINT_sql.commentarySQL = vSQL

				forms.sb_search_searchCommentary.foundset.loadRecords(vSQL)
				globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchCommentary.foundset);
				globals.search_PRINT_sql.commentaryCOUNT = globals.sb_searchTransl_tabText
				forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchCommentary, i18n.getI18NMessage('cvb.lbl.commentary') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.commentary') + ' \(' + globals.sb_searchTransl_tabText + '\)');

				vSQL = "SELECT ";
				vSELECT = "";
				vFROMS = "";
				vWHERE = "";
				vINNER = "";

				if (globals.sb_search_search_footnotes == 1) {
					// Commentary thing :-)
					// TR = abbrv. translations
					vFROMS += ",footnotes AS fn ";
					vSELECT += ",fn.pk ";
					vWHERE += "OR (plaintext LIKE '%" + globals.sb_search_criteria + "%') ";

					if (vAllBooks.length > 0 || globals.sb_search_books_all_nt || globals.sb_search_books_all_ot) {
						vAllWh = 0;
						//vWHERE += " AND (verse_id IN (SELECT pk FROM verses WHERE chapter_id IN (SELECT pk FROM chapters WHERE ";
						vWHERE += " AND (commentary_block_id IN (SELECT pk FROM commentary_blocks WHERE "
						if (vAllBooks.length > 0) {
							vAllWh = 1;
							vWHERE += " book_id IN (" + vAllBooks + ")";
						}
						if (globals.sb_search_books_all_nt) {
							if (vAllWh == 1) {
								vWHERE += " AND";
							}
							vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'New')";
							vAllWh = 2
						}
						if (globals.sb_search_books_all_ot) {
							if (vAllWh == 1) {
								vWHERE += " OR";
							} else if (vAllWh == 2) {
								vWHERE += " OR";
							}
							vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'Old')";
							vAllWh = 1
						}

						vWHERE += "))";
					}

					vFROMS = vFROMS.substring(1, vFROMS.length);
					vSELECT = vSELECT.substring(1, vSELECT.length)
					vWHERE = vWHERE.substring(2, vWHERE.length)
					vSQL += vSELECT + "FROM " + vFROMS + vINNER + "WHERE " + vWHERE;
					application.updateUI()

					globals.search_PRINT_sql.commentaryNotesSQL = vSQL

					forms.sb_search_searchFootnotes.foundset.loadRecords(vSQL)
					globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchFootnotes.foundset);
					globals.search_PRINT_sql.commentaryNotesCOUNT = globals.sb_searchTransl_tabText
					forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchFootnotes, i18n.getI18NMessage('cvb.lbl.footnotes') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.footnotes') + ' \(' + globals.sb_searchTransl_tabText + '\)');

					vSQL = "SELECT ";
					vSELECT = "";
					vFROMS = "";
					vWHERE = "";
					vINNER = "";
				}

				if (globals.sb_search_commentaryNotes) {
					//TODO: create a nice search
					vSQL = "SELECT usernote_id FROM usernotes WHERE (usernote_description LIKE '%" + globals.sb_search_criteria + "%' OR usernote_note LIKE '%" + globals.sb_search_criteria + "%') AND user_id = " + globals.sb_gCurrentUserID
					globals.search_PRINT_sql.comNotesSQL = vSQL
					forms.sb_search_searchComNotes.foundset.loadRecords(vSQL);
					globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchComNotes.foundset);
					globals.search_PRINT_sql.comNotesCOUNT = globals.sb_searchTransl_tabText
					forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchComNotes, i18n.getI18NMessage('cvb.lbl.notes') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.notes') + ' \(' + globals.sb_searchTransl_tabText + '\)');

				}
			}

			vSQL = "SELECT ";
			vSELECT = "";
			vFROMS = "";
			vWHERE = "";
			vINNER = "";
			// Artikelen
			if (globals.sb_search_search_articles) {
				// TR = abbrv. translations
				vFROMS += ",articles AS a ";
				vSELECT += ",a.pk ";
				//vINNER += "LEFT JOIN verses AS v ON w.verse_id = v.pk ";
				vWHERE += "OR ((a.filename LIKE '%" + globals.sb_search_criteria + "%') OR (a.article_text LIKE '%" + globals.sb_search_criteria + "%') OR (a.article_small_title LIKE '%" + globals.sb_search_criteria + "%')) ";
				application.updateUI()

				if (vAllBooks.length > 0 || globals.sb_search_books_all_nt || globals.sb_search_books_all_ot) {
					vAllWh = 0;
					vWHERE += " AND (a.pk IN (SELECT article_id FROM book_article WHERE "//(verse_id IN (SELECT pk FROM verses WHERE chapter_id IN (SELECT pk FROM chapters WHERE ";
					if (vAllBooks.length > 0) {
						vAllWh = 1;
						vWHERE += "book_id IN (" + vAllBooks + ")";
					}
					if (globals.sb_search_books_all_nt) {
						if (vAllWh == 1) {
							vWHERE += " AND";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'New')";
						vAllWh = 2
					}
					if (globals.sb_search_books_all_ot) {
						if (vAllWh == 1) {
							vWHERE += " OR";
						} else if (vAllWh == 2) {
							vWHERE += " OR";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'Old')";
						vAllWh = 1
					}

					vWHERE += ")";

					// OR
					vAllWh = 0;
					vWHERE += " OR (a.pk IN (SELECT article_id FROM book_inleiding WHERE "//(verse_id IN (SELECT pk FROM verses WHERE chapter_id IN (SELECT pk FROM chapters WHERE ";
					if (vAllBooks.length > 0) {
						vAllWh = 1;
						vWHERE += "book_id IN (" + vAllBooks + ")";
					}
					if (globals.sb_search_books_all_nt) {
						if (vAllWh == 1) {
							vWHERE += " AND";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'New')";
						vAllWh = 2
					}
					if (globals.sb_search_books_all_ot) {
						if (vAllWh == 1) {
							vWHERE += " OR";
						} else if (vAllWh == 2) {
							vWHERE += " OR";
						}
						vWHERE += " book_id IN (SELECT pk FROM books WHERE testament = 'Old')";
						vAllWh = 1
					}
					vWHERE += ")))";
				}

				vFROMS = vFROMS.substring(1, vFROMS.length);
				vSELECT = vSELECT.substring(1, vSELECT.length)
				vWHERE = vWHERE.substring(2, vWHERE.length)
				vSQL += vSELECT + "FROM " + vFROMS + vINNER + "WHERE " + vWHERE;
				application.updateUI()
				//scopes.tools.output(vSQL)
				globals.search_PRINT_sql.articlesSQL = vSQL

				forms.sb_search_searchArticles.foundset.loadRecords(vSQL)
				globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchArticles.foundset);
				globals.search_PRINT_sql.articlesCOUNT = globals.sb_searchTransl_tabText
				forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchArticles, i18n.getI18NMessage('cvb.lbl.articles') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.articles') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				application.updateUI()
				vSQL = "SELECT ";
				vSELECT = "";
				vFROMS = "";
				vWHERE = "";
				vINNER = "";
			}
			application.updateUI()
		} else {
			application.updateUI()

			//Search trough the wordstudies
			//	var vSQL = "SELECT pk FROM word_study WHERE word_text LIKE '%" + globals.sb_search_criteria + "%' OR word_strong LIKE '%" + globals.sb_search_criteria + "%' OR original LIKE '%" + globals.sb_search_criteria + "%' OR transliteration LIKE '%" + globals.sb_search_criteria + "%' OR first_line LIKE '%" + globals.sb_search_criteria + "%' OR plaintext LIKE '%" + globals.sb_search_criteria + "%'";
			vSQL = "SELECT pk FROM word_study WHERE word_strong LIKE '%" + globals.sb_search_criteria + "%' OR original LIKE '%" + globals.sb_search_criteria + "%' OR transliteration LIKE '%" + globals.sb_search_criteria + "%' OR first_line LIKE '%" + globals.sb_search_criteria + "%'";
			globals.search_PRINT_sql.wordStudySQL = vSQL

			forms.sb_searchWordStudy.foundset.loadRecords(vSQL);
			globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_searchWordStudy.foundset);
			globals.search_PRINT_sql.wordStudyCOUNT = globals.sb_searchTransl_tabText
			forms.search_results1.elements.tabs_70.addTab(forms.sb_searchWordStudy, i18n.getI18NMessage('cvb.wordstudy.WordStudy') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.wordstudy.WordStudy') + ' \(' + globals.sb_searchTransl_tabText + '\)');
		}

		application.updateUI()
		//application.closeFormDialog();
		//SMM - 23-05-2010
		var win = controller.getWindow()
		if (win) {
			win.hide()
		}

		//var divider = forms.sb_form.elements.bean_321.dividerLocation
		//forms.search_results1.controller.show()
		//forms.sb_form.controller.show()
		if (arguments[0] != 1) {
			//Migratie: aanpassen bean wordt niet meer gebruikt

			//forms.sb_form.elements.bean_321.dividerLocation = divider
			//	forms.sb_form.elements.bean_321.bottomComponent = forms.search_results1
			//forms.sb_form.elements.bean_321.bottomComponent =forms.sb_form.elements.tabs_search_results1
			//forms.sb_form.
			//	forms.sb_form.resizeSplitTab(event,'search_results1')

			// open the new form
			var vSearchResults = application.createWindow('search_results1', JSWindow.DIALOG);
			vSearchResults.show('search_results1');
		}
	} else {
		globals.DIALOGS.showErrorDialog('i18n:cvb.msg.errorSearch', 'i18n:cvb.msg.errorSearch', "Ok");
	}
	
}
