/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2ACEDACB-B54D-41AD-9A3F-781394686271"}
 */
function onShow(firstShow, event) {
	//elements.progress.setImageURL("media:///ProgressBar.gif")
	//plugins.WebClientUtils.executeClientSideJS("alert('test')");
	/*
    var js = ' \
	      alert("Hi Socorrito");\
	';
    plugins.WebClientUtils.executeClientSideJS(js);
     */
	
    var jsToExecute = "var sum = 1 + 2";
    //var jsToExecute = "var d = new Date().toUTCString();";
    //plugins.WebClientUtils.executeClientSideJS(jsToExecute, globals.callBackMethod(), ['d'])
    //plugins.WebClientUtils.executeClientSideJS(jsToExecute, TinyMCE_callback, ['sum'])
    
    if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT)
    {
    	plugins.WebClientUtils.executeClientSideJS(jsToExecute, search_event, [])
    }
    else {   
    	search_event();
    }
}

/**
 * @properties={typeid:24,uuid:"D9A70C25-B576-44C5-ACEE-BD14556CA94F"}
 * @AllowToRunInFind
 */
function search_event() {
	var vSQL = "";
	var vSELECT = "";
	var vFROMS = "";
	var vWHERE = "";
	var vINNER = "";
//	var vWhereValues;
	var vAllWh;
	var vSearchWindow;

	/*
	 *	CvB Search Engine
	 *
	 * Addion for print :-)
	 */
	if (!globals.sb_search_in_studywords) {
		if ( (!globals.sb_search_bible_books && !globals.sb_search_bible_books_nt)/* && (globals.sb_search_bible_books != 0 && globals.sb_search_bible_books_nt != 0)*/) {
			if ( (!globals.sb_search_books_all_ot && !globals.sb_search_books_all_nt)) {
				globals.DIALOGS.showErrorDialog("Warning", i18n.getI18NMessage("cvb.lbl.bookToSearch"), "Ok");
				vSearchWindow = application.createWindow('sb_search_dlg', JSWindow.DIALOG);
				vSearchWindow.title = "i18n:cvb.title.search";
				vSearchWindow.show('sb_search_dlg');
				return
			}
		}

		if (globals.sb_search_search_articles != 1 && globals.sb_search_search_commentary != 1 && globals.sb_search_search_translations != 1 && globals.sb_search_search_spacing != 1) {
			globals.DIALOGS.showErrorDialog("Warning", i18n.getI18NMessage("cvb.lbl.itemToSearch"), "Ok");
			vSearchWindow = application.createWindow('sb_search_dlg', JSWindow.DIALOG);
			vSearchWindow.title = "i18n:cvb.title.search";
			vSearchWindow.show('sb_search_dlg');
			return
		}
	}
	if (globals.sb_search_criteria.length >= 3) {
						
		globals.search_PRINT_sql = new Object();
		//elements.showLoad.visible = true
		//elements.lbl_searchLoading.visible = true;
		
		//SMM 31-10-201 controller.recreateUI();
		application.sleep(1000);
         
		if(globals.sb_gSearchType == 1) {
			forms.search_results1.elements.tabs_70.removeAllTabs();
		} else if(globals.sb_gSearchType == 2) {
			forms.web_sb_results.elements.tabs_70.removeAllTabs();
		}
		
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
				vSELECT += ",  tr.pk "; // DISTINCT
				vINNER += "LEFT JOIN translation_books AS tb ON tr.translation_book_id = tb.pk ";
		//		vINNER += "left join verses AS v ON tr.verse_id = v.pk ";
		//		vINNER += "left join books AS b on v.book_id = b.pk ";
		//		vINNER += "left join chapters AS c ON v.chapter_id = c.pk ";
				
				var WHV = "'" + utils.stringReplace(globals.sb_search_book_translations, '\n', '\', \'') + "'";
				vWHERE += "OR (tr.translation_book_id IN (SELECT pk FROM translation_books WHERE code IN (" + WHV + "\)) AND upper(tr.transl_text) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%') ";
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
				vSQL += vSELECT + "FROM " + vFROMS + vINNER + "WHERE " + vWHERE; // + " ORDER BY b.testament DESC, b.order_number ASC, c.chapter_no ASC, v.verse_number ASC";
				application.updateUI()
				
				globals.search_PRINT_sql.translationSQL = vSQL
								
				forms.sb_search_searchTransl.foundset.loadRecords(vSQL)
				
				//databaseManager.recalculate(forms.sb_search_searchTransl.foundset);//SMM 18-08-2011
				
				//forms.sb_search_searchTransl.foundset.sort("calc_book_name ASC")
				//forms.sb_search_searchTransl.foundset.sort("verse_translations_to_verses.verses_to_chapters.chapters_to_books.abbreviation,verse_translations_to_verses.verses_to_chapters.chapter_no ,verse_translations_to_verses.verse_number ASC") //SMM 2-11-2011
			
				forms.sb_search_searchTransl.foundset.sort("verse_translations_to_verses.verses_to_books.testament DESC,verse_translations_to_verses.verses_to_books.order_number,verse_translations_to_verses.verses_to_chapters.chapter_no ASC,verse_translations_to_verses.verse_number ASC") //SMM 2-11-2011
				
				globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchTransl.foundset);
				
				globals.search_PRINT_sql.translationCOUNT = globals.sb_searchTransl_tabText

				
				if(globals.sb_gSearchType == 1) {
					forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchTransl, i18n.getI18NMessage('cvb.lbl.bibletranslations') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.bibletranslations') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				} else if(globals.sb_gSearchType == 2) {
					
					// We need to generate some stuff!
					var vHTML = "";
					var vRec;
					for(var i = 1; i <= forms.sb_search_searchTransl.foundset.getSize(); i++) {
						vRec = forms.sb_search_searchTransl.foundset.getRecord(i);
						
						var vTranslText =  vRec.transl_text;
						if (globals.sb_search_search_translations == 1 && globals.sb_search_criteria){
							vTranslText = globals.cvb_doHighlight(vTranslText, globals.sb_search_criteria, null, null) //SMM - 18-08-2011
						}
						
						vHTML += "<a href=\"javascript:forms.web_sb_search_transl.EVENT_details('" + vRec.verse_id + "');\"><b>" + vRec.verse_translations_to_verses.verses_to_chapters.chapters_to_books.abbreviation + "</b>\
						&#160;&#160;<b>"+ vRec.verse_translations_to_verses.verses_to_chapters.chapter_no+"</b>\
						:<b>"+vRec.verse_translations_to_verses.verse_number+"</b>\
						&#160;&#160;<b>"+vRec.verse_translations_to_translation_books.code+"</b> " + vTranslText + "\
						</a><br /><br />";
						
						forms.web_sb_search_transl.fv_html = "<html><body><div class=\"search_results\">"+vHTML+"</div></body></html>";
						
					}
					
					// There where no results found!
					if(forms.sb_search_searchTransl.foundset.getSize() == 0) {
						forms.web_sb_search_transl.fv_html = "<html><body><div class=\"search_results\">" + i18n.getI18NMessage("cvb.lbl.no_results") + "</div></body></html>";
					}
					
					forms.web_sb_results.elements.tabs_70.addTab(forms.web_sb_search_transl, i18n.getI18NMessage('cvb.lbl.bibletranslations') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.bibletranslations') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				}
				
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
				vWHERE += "OR ((upper(w.word_original) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%') OR (upper(w.word_translation) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%') OR (upper(w.word_transliteration) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%')) ";
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
//				databaseManager.recalculate(forms.sb_search_searchInterlinie.foundset);//SMM 18-08-2011
				//forms.sb_search_searchInterlinie.foundset.sort("calc_book_name ASC")
//				forms.sb_search_searchInterlinie.foundset.sort("words_to_verses.calc_book_name,words_to_verses.chapter_number,words_to_verses.verse_number ASC") //SMM 2-11-2011
				forms.sb_search_searchInterlinie.foundset.sort("words_to_verses.verses_to_books.order_number,words_to_verses.chapter_number,words_to_verses.verse_number ASC") //SMM 2-11-2011

				globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchInterlinie.foundset);
				globals.search_PRINT_sql.spacingCOUNT = globals.sb_searchTransl_tabText

				if(globals.sb_gSearchType == 1) {
					forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchInterlinie, i18n.getI18NMessage('cvb.lbl.spacing') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.spacing') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				} else if(globals.sb_gSearchType == 2) {
					
					// We need to generate some stuff!
					vHTML = "";
					vRec = null;
					
					if(!solutionModel.getForm('web_sb_search_searchInterlinie')) {
						solutionModel.cloneForm("web_sb_search_searchInterlinie", solutionModel.getForm('web_sb_search_transl'));
					}
					
					for(i = 1; i <= forms.sb_search_searchInterlinie.foundset.getSize(); i++) {
						vRec = forms.sb_search_searchInterlinie.foundset.getRecord(i);
						vHTML += "<a href=\"javascript:forms.web_sb_search_searchInterlinie.EVENT_details('" + vRec.verse_id + "');\">\
						<strong>" + vRec.words_to_verses.calc_book_name + " " + vRec.words_to_verses.chapter_number+":"+ vRec.words_to_verses.verse_number + "</strong> " +  vRec.calc_testament +"\
					    " + vRec.calc_search_word_translation + "\
						</a><br /><br />";
						
						forms['web_sb_search_searchInterlinie'].fv_html = "<html><body><div class=\"search_results\">"+vHTML+"</div></body></html>";
					}
					
					// There where no results found!
					if(forms.sb_search_searchInterlinie.foundset.getSize() == 0) {
						forms['web_sb_search_searchInterlinie'].fv_html = "<html><body><div class=\"search_results\">" + i18n.getI18NMessage("cvb.lbl.no_results") + "</div></body></html>";
					}
					
					forms.web_sb_results.elements.tabs_70.addTab(forms['web_sb_search_searchInterlinie'],  i18n.getI18NMessage('cvb.lbl.spacing') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.spacing') + ' \(' + globals.sb_searchTransl_tabText + '\)');
					
				//	forms.web_sb_results.elements.tabs_70.addTab(forms.sb_search_searchInterlinie, i18n.getI18NMessage('cvb.lbl.spacing') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.spacing') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				}
				
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
				vWHERE += "OR (upper(title) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(plaintext) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%') ";

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
				//forms.sb_search_searchCommentary.foundset.sort("commentary_blocks_to_books.abbreviation, chapter_from, verses_from  ASC") //SMM 2-11-2011
//				databaseManager.recalculate(forms.sb_search_searchCommentary.foundset); //SMM 18-08-2011
				globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchCommentary.foundset);
				globals.search_PRINT_sql.commentaryCOUNT = globals.sb_searchTransl_tabText

				if(globals.sb_gSearchType == 1) {
					forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchCommentary, i18n.getI18NMessage('cvb.lbl.commentary') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.commentary') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				} else if(globals.sb_gSearchType == 2) {
					
					
					// We need to generate some stuff!
					vHTML = "";
					vRec = null;
					
					if(!solutionModel.getForm('web_sb_search_searchCommentary')) {
						solutionModel.cloneForm("web_sb_search_searchCommentary", solutionModel.getForm('web_sb_search_transl'));
					}
					
					for(i = 1; i <= forms.sb_search_searchCommentary.foundset.getSize(); i++) {
						vRec = forms.sb_search_searchCommentary.foundset.getRecord(i);
						vHTML += "<a href=\"javascript:globals.showCommentaryInDialog(" + vRec.pk + ", null, 'search');\">\
						" + vRec.titleOrfirstrow + "\
						</a><br /><br />";
						
						forms['web_sb_search_searchCommentary'].fv_html = "<html><body><div class=\"search_results\">"+vHTML+"</div></body></html>";
					}
					
					// There where no results found!
					if(forms.sb_search_searchCommentary.foundset.getSize() == 0) {
						forms['web_sb_search_searchCommentary'].fv_html = "<html><body><div class=\"search_results\">" + i18n.getI18NMessage("cvb.lbl.no_results") + "</div></body></html>";
					}
					
					forms.web_sb_results.elements.tabs_70.addTab(forms['web_sb_search_searchCommentary'], i18n.getI18NMessage('cvb.lbl.commentary') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.commentary') + ' \(' + globals.sb_searchTransl_tabText + '\)');	
			//		forms.web_sb_results.elements.tabs_70.addTab(forms.sb_search_searchCommentary, i18n.getI18NMessage('cvb.lbl.commentary') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.commentary') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				}
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
					vWHERE += "OR (upper(plaintext) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%') ";

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
					forms.sb_search_searchFootnotes.foundset.sort("footnotes_to_commentary_blocks.commentary_blocks_to_books.abbreviation, footnotes_to_commentary_blocks.chapter_from, footnotes_to_commentary_blocks.verses_from ASC")
//					databaseManager.recalculate(forms.sb_search_searchFootnotes.foundset); //SMM 18-08-2011
					globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchFootnotes.foundset);
					globals.search_PRINT_sql.commentaryNotesCOUNT = globals.sb_searchTransl_tabText
					
					if(globals.sb_gSearchType == 1) {	
						forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchFootnotes, i18n.getI18NMessage('cvb.lbl.footnotes') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.footnotes') + ' \(' + globals.sb_searchTransl_tabText + '\)');
					} else if(globals.sb_gSearchType == 2) {
						// We need to generate some stuff!
						vHTML = "";
						vRec = null;
						
						if(!solutionModel.getForm('web_sb_search_searchFootnotes')) {
							solutionModel.cloneForm("web_sb_search_searchFootnotes", solutionModel.getForm('web_sb_search_transl'));
						}
						
						for(i = 1; i <= forms.sb_search_searchFootnotes.foundset.getSize(); i++) {
							vRec = forms.sb_search_searchFootnotes.foundset.getRecord(i);
							vHTML += "<a href=\"javascript:globals.showFootnoteInDialog(" + vRec.commentary_block_id + ", "+ vRec.footnote_number +", 'search');\">\
							" + vRec.searchResult + "\
							</a><br /><br />";
							
							forms['web_sb_search_searchFootnotes'].fv_html = "<html><body><div class=\"search_results\">"+vHTML+"</div></body></html>";
						}
						
						// There where no results found!
						if(forms.sb_search_searchFootnotes.foundset.getSize() == 0) {
							forms['web_sb_search_searchFootnotes'].fv_html = "<html><body><div class=\"search_results\">" + i18n.getI18NMessage("cvb.lbl.no_results") + "</div></body></html>";
						}
						
						forms.web_sb_results.elements.tabs_70.addTab(forms['web_sb_search_searchFootnotes'], i18n.getI18NMessage('cvb.lbl.footnotes') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.footnotes') + ' \(' + globals.sb_searchTransl_tabText + '\)');	
				
					}
					
					vSQL = "SELECT ";
					vSELECT = "";
					vFROMS = "";
					vWHERE = "";
					vINNER = "";
				}

				if (globals.sb_search_commentaryNotes) {
					//TODO: create a nice search
					vSQL = "SELECT usernote_id FROM usernotes WHERE (upper(usernote_description) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(usernote_note) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%') AND user_id = " + globals.sb_gCurrentUserID
					globals.search_PRINT_sql.comNotesSQL = vSQL
					forms.sb_search_searchComNotes.foundset.loadRecords(vSQL);
					forms.sb_search_searchComNotes.foundset.sort("usernotes_to_commentary_blocks.commentary_blocks_to_books.abbreviation, usernotes_to_commentary_blocks.chapter_from, usernotes_to_commentary_blocks.verses_from ASC")
//					databaseManager.recalculate(forms.sb_search_searchComNotes.foundset);//SMM 18-08-2011
					globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchComNotes.foundset);
					globals.search_PRINT_sql.comNotesCOUNT = globals.sb_searchTransl_tabText

					if(globals.sb_gSearchType == 1) {
						forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchComNotes, i18n.getI18NMessage('cvb.lbl.notes') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.notes') + ' \(' + globals.sb_searchTransl_tabText + '\)');
					} else if(globals.sb_gSearchType == 2) {
						
						// We need to generate some stuff!
						vHTML = "";
						vRec = null;
						
						if(!solutionModel.getForm('web_sb_search_searchComNotes')) {
							solutionModel.cloneForm("web_sb_search_searchComNotes", solutionModel.getForm('web_sb_search_transl'));
						}
						
						for(i = 1; i <= forms.sb_search_searchComNotes.foundset.getSize(); i++) {
							vRec = forms.sb_search_searchComNotes.foundset.getRecord(i);
							vHTML += "<a href=\"javascript:forms.web_sb_search_searchComNotes.EVENT_commentaryNotes(" + vRec.usernote_id + ");\">\
							" + vRec.search_usernote_title + "\
							</a><br /><br />";
							
							forms['web_sb_search_searchComNotes'].fv_html = "<html><body><div class=\"search_results\">"+vHTML+"</div></body></html>";
						}
						
						// There where no results found!
						if(forms.sb_search_searchComNotes.foundset.getSize() == 0) {
							forms['web_sb_search_searchComNotes'].fv_html = "<html><body><div class=\"search_results\">" + i18n.getI18NMessage("cvb.lbl.no_results") + "</div></body></html>";
						}
						
						forms.web_sb_results.elements.tabs_70.addTab(forms['web_sb_search_searchComNotes'], i18n.getI18NMessage('cvb.lbl.notes') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.notes') + ' \(' + globals.sb_searchTransl_tabText + '\)');	
				
					}
					
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
				vWHERE += "OR ((upper(a.filename) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%') OR (upper(a.article_text) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%') OR (upper(a.article_small_title) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%')) ";
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
				forms.sb_search_searchArticles.foundset.sort("filename ASC")
//				databaseManager.recalculate(forms.sb_search_searchArticles.foundset);//SMM 18-08-2011
				globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_search_searchArticles.foundset);
				globals.search_PRINT_sql.articlesCOUNT = globals.sb_searchTransl_tabText
				
				if(globals.sb_gSearchType == 1) {
					forms.search_results1.elements.tabs_70.addTab(forms.sb_search_searchArticles, i18n.getI18NMessage('cvb.lbl.articles') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.articles') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				} else if(globals.sb_gSearchType == 2) {
					
					// We need to generate some stuff!
					vHTML = "";
					vRec = null;
					
					if(!solutionModel.getForm('web_sb_search_searchArticles')) {
						solutionModel.cloneForm("web_sb_search_searchArticles", solutionModel.getForm('web_sb_search_transl'));
					}
					
					for(i = 1; i <= forms.sb_search_searchArticles.foundset.getSize(); i++) {
						vRec = forms.sb_search_searchArticles.foundset.getRecord(i);
						vHTML += "<a href=\"javascript:forms.viewArticle.openArticle(" + vRec.pk + ");\">\
						" + vRec.search_filename + "\
						</a><br /><br />";
						
						forms['web_sb_search_searchArticles'].fv_html = "<html><body><div class=\"search_results\">"+vHTML+"</div></body></html>";
					}
					
					// There where no results found!
					if(forms.sb_search_searchArticles.foundset.getSize() == 0) {
						forms['web_sb_search_searchArticles'].fv_html = "<html><body><div class=\"search_results\">" + i18n.getI18NMessage("cvb.lbl.no_results") + "</div></body></html>";
					}
					
					forms.web_sb_results.elements.tabs_70.addTab(forms['web_sb_search_searchArticles'], i18n.getI18NMessage('cvb.lbl.articles') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.articles') + ' \(' + globals.sb_searchTransl_tabText + '\)');	
			
					
				//	forms.web_sb_results.elements.tabs_70.addTab(forms.sb_search_searchArticles, i18n.getI18NMessage('cvb.lbl.articles') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.lbl.articles') + ' \(' + globals.sb_searchTransl_tabText + '\)');
				}
				
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
			//	var vSQL = "SELECT pk FROM word_study WHERE upper(word_text) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(word_strong) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(original) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(transliteration) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(first_line) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(plaintext) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%'";
			vSQL = "SELECT pk FROM word_study WHERE upper(word_strong) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(original) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(transliteration) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%' OR upper(first_line) LIKE '%" + globals.sb_search_criteria.toUpperCase() + "%'";
			globals.search_PRINT_sql.wordStudySQL = vSQL
			forms.sb_searchWordStudy.foundset.loadRecords(vSQL);
//			databaseManager.recalculate(forms.sb_searchWordStudy.foundset);//SMM 18-08-2011
			globals.sb_searchTransl_tabText = databaseManager.getFoundSetCount(forms.sb_searchWordStudy.foundset);
			globals.search_PRINT_sql.wordStudyCOUNT = globals.sb_searchTransl_tabText
			if(globals.sb_gSearchType == 1) {
				forms.search_results1.elements.tabs_70.addTab(forms.sb_searchWordStudy, i18n.getI18NMessage('cvb.wordstudy.WordStudy') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.wordstudy.WordStudy') + ' \(' + globals.sb_searchTransl_tabText + '\)');
			} else if(globals.sb_gSearchType == 2) {
				
				// We need to generate some stuff!
				vHTML = "";
				vRec = null;
				
				if(!solutionModel.getForm('web_sb_searchWordStudy')) {
					solutionModel.cloneForm("web_sb_searchWordStudy", solutionModel.getForm('web_sb_search_transl'));
				}
				
				for(i = 1; i <= forms.sb_searchWordStudy.foundset.getSize(); i++) {
					vRec = forms.sb_searchWordStudy.foundset.getRecord(i);
					vHTML += "<a href=\"javascript:forms.web_sb_searchWordStudy.EVENT_showWordStudy('" + vRec.word_strong + "', '" + vRec.study_version + "');\">\
					<table width=\"100%\" padding=\"0\" spacing=\"0\">\
						<tr>\
							<td valign=\"top\"><font face=\""+vRec.c_font+"\"><em>"+vRec.original +"</em></font>&nbsp;&nbsp; </td>\
							<td width=\"100px\" valign=\"top\"><strong>"+vRec.word_strong+"</strong> &nbsp;&nbsp;  </td>\
							<td width=\"90%\" valign=\"top\">"+vRec.search_first_line+"</td>\
						</tr>\
					</table>\
					</a><br /><br />";
					
					forms['web_sb_searchWordStudy'].fv_html = "<html><body><div class=\"search_results\">"+vHTML+"</div></body></html>";
				}
				
				// There where no results found!
				if(forms.sb_searchWordStudy.foundset.getSize() == 0) {
					forms['web_sb_searchWordStudy'].fv_html = "<html><body><div class=\"search_results\">" + i18n.getI18NMessage("cvb.lbl.no_results") + "</div></body></html>";
				}
				
				forms.web_sb_results.elements.tabs_70.addTab(forms['web_sb_searchWordStudy'], i18n.getI18NMessage('cvb.wordstudy.WordStudy') + ' \(' + globals.sb_searchTransl_tabText + '\)', i18n.getI18NMessage('cvb.wordstudy.WordStudy') + ' \(' + globals.sb_searchTransl_tabText + '\)');	
			}
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

			if(globals.sb_gSearchType == 1) {
				// open the new form
				var vSearchResults = application.createWindow('search_results1', JSWindow.DIALOG);
				vSearchResults.setInitialBounds(-1, -1, -1, -1);
				vSearchResults.show(forms.search_results1);
			} else if (globals.sb_gSearchType == 2) {
				// This is for the NEW webclient
				forms.web_sb_subform.elements.tabs.setTabEnabledAt(6, true);
				// We need to change the tab indexes etc...
				forms.web_sb_form.elements.tab_notes.visible = false;
				
				var vMaxTabIndex = forms.web_sb_subform.elements.tabs.getMaxTabIndex();
				
				if(forms.web_sb_subform.elements.tabs.getTabFormNameAt(vMaxTabIndex) != "web_sb_results") {
					forms.web_sb_subform.elements.tabs.addTab(forms.web_sb_results, 'web_sb_results', i18n.getI18NMessage('cvb.lbl.seachresults'));
				}
				
				forms.web_sb_subform.elements.tabs.tabIndex = 6;
			}
		}
	} else {
		globals.DIALOGS.showErrorDialog('i18n:cvb.msg.errorSearch', 'i18n:cvb.msg.errorSearch', "Ok");
		vSearchWindow = application.createWindow('sb_search_dlg', JSWindow.DIALOG);
		vSearchWindow.title = "i18n:cvb.title.search";
		vSearchWindow.show(forms.sb_search_dlg);
	}

}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"64300ED3-C062-414A-9828-AFD9E2CB6EA0"}
 */
function onLoad(event) {
	// TODO Auto-generated method stub
//	elements.progress.setImageURL("media:///ProgressBar.gif")
	
}

/**
 * @properties={typeid:24,uuid:"8B040431-4FA6-488A-881B-BFBBA6AA2DFA"}
 */
function TinyMCE_callback(sum) {
	scopes.tools.output(sum)

}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3452643E-6AA9-460F-A326-071EF012580B"}
 */
function onResize(event) {	
	return
}
