/**
 * @properties={typeid:24,uuid:"c0b39e68-1639-4dc2-a5b7-2baa12d7a847"}
 */
function BTN_ambitiusRoot() {
	/*var vPassword = plugins.dialogs.showInputDialog( "Enter the password",  "Enter our nice password :-)\n\rWarning: This is a non-rollback funktion!");

	 if(vPassword == "amb007")
	 {
	 //	//scopes.tools.output('We got hacked');
	 //application.showFormInDialog(forms.amb_sql_form,  -1,  -1,  -1,  -1,  "Pure SQL",  false, false, 'amb_sql_form',  true)
	 // UPDATE verses set chapter_number = 1 where chapter_id = 292 OR chapter_id = 268
	 plugins.rawSQL.executeSQL('sb', 'verses', 'UPDATE verses set chapter_number = 1 where chapter_id = 292 OR chapter_id = 268');
	 plugins.rawSQL.flushAllClientsCache('sb', 'verses')
	 }*/
}

/**
 * @properties={typeid:24,uuid:"7bf404d5-e116-4f0a-9b96-e2002237d01a"}
 * @param {JSEvent} event
 */
function BTN_articles(event) {
	//SMM -19-05-2011 plugins.window
	var popupMenu = plugins.window.createPopupMenu();
	var elem
	popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.Introduction') + " " + globals.book, getBookInleiding)
	popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.articles') + " " + globals.book, getBookArticles),
	popupMenu.addSeparator()
	popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.all_articles'), getGeneralArticles)
	if (globals.sb_APP_getServerLang() == "NL") {
		if (globals.sb_gTestament == "New" && globals.sb_demo_chk != 1) {
			popupMenu.addSeparator()
			popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.Synopsis'), forms.synopsis_form.getSynopsis)
			popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.Grammatica'), globals.openPdf)
		}
	}
	if (event instanceof JSEvent) {
		elem = event.getElementName()
		popupMenu.show(elements[elem]);
	}
}

/**
 * @properties={typeid:24,uuid:"f08f0c95-31e9-4249-9c9f-2ea296474749"}
 */
function BTN_back() {
	/**
	 *	CvB History back method
	 *	Used to save the book, chapter and verse for later use
	 *	@author Rick Bonkestoter
	 */

	if (globals.sb_gHistoryPoint > 0) {
		globals.sb_gHistoryPoint = (globals.sb_gHistoryPoint - 1)
		/** @type {*} */
		var oObject = globals.sb_gHistory[globals.sb_gHistoryPoint]

		if (oObject) {
			globals.UsedHistory = 1
			globals.sb_gTestament = oObject.testament;
			globals.book = oObject.book;
			globals.chapter = oObject.chapter;
			globals.verse = oObject.verse;
			
			// RB 01-11-2011
			if(oObject.testament == "New")
			{
				globals.griek_version = oObject.onlyGreek + "";
				globals.text_version = oObject.textVersion;
			} else {
				globals.heb_version = oObject.onlyHebrew + "";
			}
			
			setBookId();
			setChapterId();
			// selectVerseId();			
			globals.verse_id = globals_verse_to_verses.pk //SMM 21-06-2011
			globals.selected_verse_id = globals.verse_id //SMM 21-06-2011
			forms.sb_form.setVerseIdNew(globals.verse_id);
			if(oObject.testament == "New")
			{
				globals.cvb_setGreek();
				globals.cvb_setVersion(null, null, null, null, null, [globals.text_version]);
			} else {
				globals.cvb_setHebrew();
			}
			
			globals.UsedHistory = 0;
		}
	}
}

/**
 * @properties={typeid:24,uuid:"30df56f5-fe7c-453d-8e0a-19e6745d4ab3"}
 * @param {JSEvent} event
 */
function BTN_beheer(event) {
	//SMM -19-05-2011 plugins.window
	var popupMenu = plugins.window.createPopupMenu();
	var elem, vSubMenu;

	popupMenu.addMenuItem('i18n:cvb.btn.export', BTN_export);
	vSubMenu = popupMenu.addMenu('i18n:cvb.btn.import');
		vSubMenu.addCheckBox('i18n:cvb.lbl.spacing', globals.sb_import_versWords);
		vSubMenu.addCheckBox('i18n:cvb.lbl.bible_translations', globals.sb_import_versTrans);
		vSubMenu.addCheckBox('i18n:cvb.lbl.article_wizard', globals.sb_import_articles);
		vSubMenu.addCheckBox('i18n:cvb.lbl.wordstudy_wizard',globals.sb_import_wordstudy);
	popupMenu.addMenuItem('i18n:btn_edit_articles', BTN_editArticles);
	popupMenu.addMenuItem('i18n:btn_translations', BTN_bookTranslations);
	popupMenu.addMenuItem('i18n:cvb.title.bookEdit', BTN_editBooks);
	popupMenu.addMenuItem('i18n:cvb.title.wordStudyVersion', BTN_wordStudyVersion);
	popupMenu.addMenuItem('Server management', BTN_serverMan)
	popupMenu.addMenuItem('Email Template Beheer', BTN_mailTemplates)
	popupMenu.addMenuItem('Woordstudie Conversie Tool', BTN_wsConvert);
	if (event instanceof JSEvent) {
		elem = event.getElementName()
		popupMenu.show(elements[elem]);
	}

	//submenuitem = menu.
	/**
	 * CvB Administrator menu
	 * @author Rick Bonkestoter
	 */
	/*SMM OLD
	 var submenu = new Array(plugins.popupmenu.createMenuItem('i18n:cvb.lbl.spacing', globals.sb_import_versWords),
	 plugins.popupmenu.createMenuItem('i18n:cvb.lbl.bible_translations', globals.sb_import_versTrans)
	 )

	 var menu = new Array(//if you assign this array to a global its reusable
	 plugins.popupmenu.createMenuItem('i18n:cvb.btn.export', BTN_export),
	 plugins.popupmenu.createRadioButtonMenuItem('i18n:cvb.btn.import', submenu),
	 plugins.popupmenu.createRadioButtonMenuItem('i18n:btn_edit_articles', BTN_editArticles),
	 plugins.popupmenu.createMenuItem('i18n:btn_translations', BTN_bookTranslations),
	 plugins.popupmenu.createMenuItem('i18n:cvb.title.bookEdit', BTN_editBooks)
	 )

	 var elem = elements[application.getMethodTriggerElementName()]
	 if(elem != null)
	 {
	 plugins.popupmenu.showPopupMenu(elem, menu);
	 }
	 */

}

/**
 * @properties={typeid:24,uuid:"6B54E577-6734-47BC-8C54-EC30B3A22C4B"}
 */
function BTN_wsConvert() {
	var vWindow = application.createWindow(forms.wordstudy_convert_tool,JSWindow.MODAL_DIALOG);
	vWindow.title = "Woordstudie Conversie Tool";
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.wordstudy_convert_tool);
}

/**
 * @properties={typeid:24,uuid:"0DF89BE1-95AE-4AB8-8878-77816DCF37CB"}
 */
function BTN_mailTemplates() {
	var vWindow = application.createWindow("sb_edit_email_templates", JSWindow.MODAL_DIALOG);
	vWindow.title = "Email Templates Beheer";
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.sb_edit_email_templates);
}

/**
 * @properties={typeid:24,uuid:"8CAB8A77-CD89-456D-BB05-BA15B4609A36"}
 */
function BTN_serverMan() {
	if(plugins.dialogs.showInputDialog("Protected / Direct ICT B.V. only", "Enter the administrative password:") == "amb007")
	{
		var vWindow = application.createWindow('Server Management', JSWindow.MODAL_DIALOG);
		vWindow.setInitialBounds(-1, -1, -1, -1);
		vWindow.title = "Server management"
		vWindow.show(forms.sb_servers_dlg);
	}
}

/**
 * @properties={typeid:24,uuid:"70c27455-7bdd-4acf-b43d-c2df13562608"}
 */
function BTN_bookTranslations() {
	/**
	 * CvB Book Translations
	 * @author Rick Bonkestoter
	 */

	//application.showFormInDialog(forms.sb_edit_translationbooks_lst, -1, -1, -1, -1, "i18n:cvb.lbl.bible_translations", false, false, forms.sb_edit_translationbooks_lst, true)
	//SMM 20-05-2011
	var vForm = application.createWindow('EditTranslationBooksForm', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.lbl.bible_translations';
	vForm.show(forms.sb_edit_translationbooks_lst);
}

/**
 * @properties={typeid:24,uuid:"eeb44654-2159-46dc-9d3b-70fd45eb5041"}
 */
function BTN_editArticles() {
	/**
	 * CvB Edit Articles
	 * @author Rick Bonkestoter
	 */

	databaseManager.setAutoSave(false);
	// application.showFormInDialog(forms.sb_edit_paragraphs_lst, -1, -1, -1, -1, "i18n:cvb.lbl.articles", false, false, 'sb_edit_paragraphs_lst', true)
	// Servoy 6 window calling
	var vWindow = application.createWindow('sb_edit_paragraphs_lst', JSWindow.MODAL_DIALOG, null);
	vWindow.title = "i18n:cvb.lbl.articles";
	vWindow.show(forms.sb_edit_paragraphs_lst);
}

/**
 * @properties={typeid:24,uuid:"f41f9b81-27d3-4dcc-8c6d-5f2739e3ab85"}
 */
function BTN_editBooks() {
	//application.showFormInDialog(forms.books_dtl, -1, -1, -1, -1, 'i18n:cvb.title.bookEdit', false, false, 'booksEdit', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('booksEdit', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.title.bookEdit';
	vForm.show(forms.books_dtl);

}

/**
 * @properties={typeid:24,uuid:"2114ff4b-1e3c-4de5-a5ee-d64a9d40d903"}
 */
function BTN_export() {
	/**
	 * CvB Export menu
	 * @author Rick Bonkestoter
	 */
	//application.showFormInDialog(forms.sb_export_dialog, -1, -1, -1, -1, "i18n:cvb.btn.export", false, false, 'sb_export_dialog', true);
	//SMM 20-05-2011
	var vForm = application.createWindow('sb_export_dialog', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.btn.export';
	vForm.show(forms.sb_export_dialog);

}

/**
 * @properties={typeid:24,uuid:"d47df41d-c144-4b29-9988-5aa938780aa3"}
 */
function BTN_forward() {
	/**
	 * CvB Forward
	 * @author Rick Bonkestoter
	 */

	if (globals.sb_gHistoryPoint != globals.sb_gHistory.length) {
		globals.sb_gHistoryPoint = (globals.sb_gHistoryPoint + 1)
		/** @type {*} */
		var oObject = globals.sb_gHistory[globals.sb_gHistoryPoint]
		if (oObject) {
			globals.UsedHistory = 1
			globals.sb_gTestament = oObject.testament;
			globals.book = oObject.book;
			globals.chapter = oObject.chapter;
			globals.verse = oObject.verse;
			
			
			// RB 01-11-2011
			if(oObject.testament == "New")
			{
				globals.griek_version = oObject.onlyGreek + "";
				globals.text_version = oObject.textVersion;
			} else {
				globals.heb_version = oObject.onlyHebrew + "";
			}
						
			
			setBookId();
			setChapterId();
			//selectVerseId();
			globals.verse_id = globals_verse_to_verses.pk //SMM 21-06-2011
			globals.selected_verse_id = globals.verse_id //SMM 21-06-2011
			forms.sb_form.setVerseIdNew(globals.verse_id);

			if(oObject.testament == "New")
			{
				globals.cvb_setGreek();
				globals.cvb_setVersion(null, null, null, null, null, [globals.text_version]);
			} else {
				globals.cvb_setHebrew();
			}
			
			globals.UsedHistory = 0;
		}
	}
}

/**
 * @properties={typeid:24,uuid:"584a5a37-aac3-4aea-89a5-108f72ccb736"}
 */
function BTN_myNotes() {
	databaseManager.setAutoSave(true)
	// SQL to select ALL notes
	var vSQL = "SELECT usernote_id FROM usernotes WHERE user_id = ?"

	forms.usernotes_lst.foundset.loadRecords(vSQL, [globals.sb_gCurrentUserID]);
	forms.usernotes_lst.elements.btn_new.visible = false
	forms.usernotes_lst.elements.lbl_new.visible = false;
	forms.usernotes_lst.elements.btn_print.visible = false;
	//application.showFormInDialog(forms.usernotes_lst, -1, -1, 600, 500, 'i18n:cvb.lbl.usernotes', false, false, 'myNotes', false)
	//SMM 20-05-2011
	var vForm = application.createWindow('myNotes', JSWindow.DIALOG, null);
	vForm.title = 'i18n:cvb.lbl.usernotes';
	vForm.setInitialBounds(-1, -1, 600, 500)
	vForm.show(forms.usernotes_lst);

}

/**
 * @properties={typeid:24,uuid:"9af667b7-c355-4348-a40d-4bf01831a445"}
 */
function btn_onAction() {
	//application.showFormInDialog(forms.admin, -1, -1, -1, -1)
	//SMM 20-05-2011
	var vForm = application.createWindow('AdminForm', JSWindow.MODAL_DIALOG, null);
	vForm.show(forms.admin);

}


/**
 * @properties={typeid:24,uuid:"2fcaee63-bde9-433f-b011-f6067e1e842e"}
 * @param {JSEvent} event
 */
function chapterbooksNEw(event) {
	//SMM - 17-05-2011 Migratie: Veranderen van de popup menu plugin
	var menu, vSubMenu, vSubMenuItem, elem
	var popupmenu = plugins.window.createPopupMenu();
	// Get all the chapters
	var vSQL = "SELECT chapter_no FROM chapters WHERE book_id = ? ORDER BY chapter_no ASC";
	var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [globals.book_id], -1);
	var i, k, vNewPos, vMitem
	var vMax = vResult.getMaxRowIndex();
	/** @type JSRecord<db:/sb/chapters> */
//	var vRecord
//	var vSelect = false
	if (vMax > 20) {
		var vTotal = Math.ceil( (vMax / 20));
		var vPos = 1;
		for (i = 1; i <= vTotal; i++) {
//			vSelect = false
			if (i == vTotal) {
				vNewPos = vMax + 1;
			} else {
				vNewPos = vPos + 20
			}
			vSubMenu = popupmenu.addMenu(vPos + '...' + (vNewPos - 1))
			for (k = vPos; k < vNewPos; k++) {
				vMitem = k
				vMitem = utils.stringReplace(vMitem.toString(), '.0', '');

				vSubMenuItem = vSubMenu.addCheckBox(vMitem.toString(), setChapterIdNew)
				vSubMenuItem.methodArguments = [vSubMenuItem]

				if (globals.chapter == vSubMenuItem.text) {
					vSubMenuItem.selected = true
				}
			}
			vPos = vNewPos
		}
		//menu[0].setSelected(true)
	} else {
		for (i = 1; i <= vMax; i++) {
			//var vRecord = global_book_id_to_chapters.getRecord(i)
			menu = popupmenu.addCheckBox(vResult.getValue(i, 1), setChapterIdNew)
			menu.methodArguments = [menu]
			if (globals.chapter == menu.text) {
				menu.selected = true
			}
		}
	}

	if (event instanceof JSEvent) {
		elem = event.getElementName()
	} else {
		elem = 'bookChapters'
	}

	if (elem == 'bookChapters') {
		popupmenu.show(elements[elem]);
	}

	/*
	 var vSubMenu = new Array()
	 var menu = new Array()

	 // Get all the chapters
	 var vSQL = "SELECT chapter_no FROM chapters WHERE book_id = ?";
	 var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [globals.book_id], -1);
	 var i,k,vNewPos,vMenuItem
	 var vMax = vResult.getMaxRowIndex();

	 var vSelect = false
	 if(vMax > 20) {
	 var vTotal = Math.ceil( (vMax / 20));
	 var vPos = 1;
	 var menu = new Array()
	 var SubMenu = new Array()
	 //	vTotal = vTotal * 100
	 for(i = 1; i <= vTotal; i++) {
	 vSelect = false
	 if(i == vTotal) {
	 vNewPos = vMax + 1;
	 } else {
	 vNewPos = vPos + 20
	 }
	 vSubMenu = new Array()
	 for(k = vPos; k < vNewPos; k++) {
	 vMitem = k
	 vMitem = utils.stringReplace(vMitem, '.0', '');
	 vSubMenu[k-1] = plugins.popupmenu.createCheckboxMenuItem(vMitem, setChapterIdNew)
	 vSubMenu[k-1].setMethodArguments([vSubMenu[k-1]]);
	 if(globals.chapter == vSubMenu[k-1].text) {
	 vSubMenu[k-1].setSelected(true);
	 vSelect = true
	 }
	 }
	 vMenuItem = plugins.popupmenu.createMenuItem(vPos + '...' + (vNewPos - 1),vSubMenu)
	 menu[i-1] = vMenuItem
	 if (vSelect) menu[i-1].setSelected(true)
	 vPos = vNewPos
	 }
	 //menu[0].setSelected(true)
	 }
	 else {
	 for(i = 1; i <= vMax; i++){
	 var vRecord = global_book_id_to_chapters.getRecord(i)
	 menu.push(plugins.popupmenu.createCheckboxMenuItem(vResult.getValue(i, 1), setChapterIdNew));
	 menu[i-1].setMethodArguments([menu[i-1]]);
	 if(globals.chapter == menu[i-1].text) {
	 menu[i-1].setSelected(true);
	 }
	 }
	 //menu[0].setSelected(true)
	 }

	 var elem = elements.bookChapters

	 if(elem != null)
	 {
	 plugins.popupmenu.showPopupMenu(elem, menu);
	 //var vSource = event.getSource()
	 //vMenu.show(vSource)
	 //or you can set the coordinates : plugins.popupmenu.showPopupMenu(10, 10, menu);
	 }
	 */
}

/**
 * @properties={typeid:24,uuid:"04d83c29-a6bb-402a-9732-f869e940b559"}
 * @param {JSEvent} event
 */
function chapterVerse(event) {
	//SMM - 17-05-2011 Migratie: Veranderen van de popup menu plugin
	var menu, vSubMenu, vSubMenuItem, i, k, vNewPos, vMitem, elem
	var popupmenu = plugins.window.createPopupMenu();
	// Get all the chapters
	var vSQL = "SELECT verse_number FROM verses WHERE chapter_id = ? ORDER BY verse_number ASC";
	var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [globals.chapter_id], -1);
	var vMax = vResult.getMaxRowIndex();
//	var vSelect = false
	if (vMax > 20) {
		var vTotal = Math.ceil( (vMax / 20));
		var vPos = 1;
		for (i = 1; i <= vTotal; i++) {
//			vSelect = false
			if (i == vTotal) {
				vNewPos = vMax + 1;
			} else {
				vNewPos = vPos + 20
			}
			vSubMenu = popupmenu.addMenu(vPos + '...' + (vNewPos - 1))

			for (k = vPos; k < vNewPos; k++) {
				vMitem = k
				vMitem = utils.stringReplace(vMitem.toString(), '.0', '');
				vSubMenuItem = vSubMenu.addCheckBox(vMitem.toString(), setVerseIdNew2)
				vSubMenuItem.methodArguments = [vSubMenuItem]
				if (globals.verse == vSubMenuItem.text) {
					vSubMenuItem.selected = true
				}
			}
			vPos = vNewPos
		}
	} else {
		for (i = 1; i <= vMax; i++) {
			global_chapter_id_to_verses.getRecord(i)
			menu = popupmenu.addCheckBox(vResult.getValue(i, 1), setVerseIdNew2)
			menu.methodArguments = [menu]
			if (globals.verse == menu.text) {
				menu.selected = true
			}

		}
	}

	if (event instanceof JSEvent) {
		elem = event.getElementName()
	} else {
		elem = 'chapterVerse'
	}

	if (elem == 'chapterVerse') {
		popupmenu.show(elements[elem]);

	}

	/*
	 var vSubMenu = new Array()
	 var menu = new Array()

	 // Get all the chapters
	 var vSQL = "SELECT verse_number FROM verses WHERE chapter_id = ? ORDER BY verse_number ASC";
	 var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [globals.chapter_id], -1);

	 var vMax = vResult.getMaxRowIndex();

	 //if(global_chapter_id_to_verses.getSize() <= 20) {

	 var vSelect = false
	 if(vMax > 20) {
	 var vTotal = Math.ceil( (vMax / 20));
	 var vPos = 1;
	 var menu = new Array()
	 var SubMenu = new Array()
	 //	vTotal = vTotal * 100
	 for(i = 1; i <= vTotal; i++) {
	 vSelect = false
	 if(i == vTotal) {
	 vNewPos = vMax + 1;
	 } else {
	 vNewPos = vPos + 20
	 }
	 vSubMenu = new Array()
	 for(k = vPos; k < vNewPos; k++) {
	 vMitem = k
	 vMitem = utils.stringReplace(vMitem, '.0', '');
	 vSubMenu[k-1] = plugins.popupmenu.createCheckboxMenuItem(vMitem, setVerseIdNew)
	 vSubMenu[k-1].setMethodArguments([vSubMenu[k-1]]);
	 if(globals.verse == vSubMenu[k-1].text) {
	 vSubMenu[k-1].setSelected(true);
	 vSelect = true
	 }
	 }
	 vMenuItem = plugins.popupmenu.createMenuItem(vPos + '...' + (vNewPos - 1),vSubMenu)
	 menu[i-1] = vMenuItem
	 if (vSelect) menu[i-1].setSelected(true)
	 vPos = vNewPos
	 }
	 //menu[0].setSelected(true)
	 }
	 else {
	 for(i = 1; i <= vMax; i++){
	 var vRecord = global_chapter_id_to_verses.getRecord(i)
	 menu.push(plugins.popupmenu.createCheckboxMenuItem(vResult.getValue(i, 1), setVerseIdNew));
	 menu[i-1].setMethodArguments([menu[i-1]]);
	 if(globals.verse == menu[i-1].text) {
	 menu[i-1].setSelected(true);
	 }
	 }
	 //menu[0].setSelected(true)
	 }
	 var elem = elements.chapterVerse
	 if(elem != null)
	 {
	 plugins.popupmenu.showPopupMenu(elem, menu);
	 //or you can set the coordinates : plugins.popupmenu.showPopupMenu(10, 10, menu);
	 }
	 */

}

/**
 * @properties={typeid:24,uuid:"d6e24d7e-5a3d-42ca-8470-4a4dfac9aac4"}
 */
function getBookArticles() {
	forms.articles.getArticlesForBook(globals.book_id)

}

/**
 * @properties={typeid:24,uuid:"28284f56-305b-4e8b-897d-b2ce311b023e"}
 */
function getBookInleiding() {
	forms.articles.getInleidingForBook(globals.book_id)
}

/**
 * @properties={typeid:24,uuid:"4d06babc-126c-4834-9ed1-6cafd9a935cc"}
 */
function getGeneralArticles() {

	forms.articles.getGeneralArticles(new JSEvent);

}

/**
 * @properties={typeid:24,uuid:"e762c87a-44d3-4f5d-bf0c-d105a48dcae1"}
 */
function getGrammatica() { }

/**
 * @properties={typeid:24,uuid:"2029958a-6b11-4f4f-bec5-fab4accd2e92"}
 */
function load() {
	//Fix so the ctrl-L funct in dev doesn't give a error

	globals.sb_gDEVFix();
	//Migratie: aanpassen van de java beans naar slittab
	//loadFormsInBean(forms.book_notes)
	resizeSplitTab(null, null)
	
	globals.words_study = "Woordstudie\nWoordvormen\nConcordantie";
	
	var vWindow = application.getWindow()
	var vWidth = vWindow.getWidth()
	var vHeight = vWindow.getHeight() - 58
	
	forms.sb_form.elements.tabs_67.dividerSize = 1	
	forms.sb_form_splittab0.elements.tabs_135.dividerSize = 1
	forms.sb_form_splittab1.elements.tabs_101.dividerSize = 2
	forms.sb_form_splittab2.elements.tabs_70.dividerSize = 2
     	
	if (globals.getUserSetting('tabs_67_dividerLocation')) {//SMM 10-11-2011
		forms.sb_form.elements.tabs_67.dividerLocation = globals.getUserSetting('tabs_67_dividerLocation') 
	}
	else {
		forms.sb_form.elements.tabs_67.dividerLocation = (vHeight / 3) + ( (vHeight / 3) / 2)
	}
	
	if (globals.getUserSetting('tabs_135_dividerLocation')) {//SMM 10-11-2011
		forms.sb_form_splittab0.elements.tabs_135.dividerLocation = globals.getUserSetting('tabs_135_dividerLocation') 
	}
	else {
		forms.sb_form_splittab0.elements.tabs_135.dividerLocation = forms.sb_form.elements.tabs_67.dividerLocation / 2 // forms.sb_form_splittab0.elements.tabs_135.getHeight() / 2
	}
	
	if (globals.getUserSetting('tabs_101_dividerLocation')) {//SMM 10-11-2011
		forms.sb_form_splittab1.elements.tabs_101.dividerLocation = globals.getUserSetting('tabs_101_dividerLocation') 
	}
	else {
		forms.sb_form_splittab1.elements.tabs_101.dividerLocation = vWidth / 2
	}
	
	if (globals.getUserSetting('tabs_70_dividerLocation')) {//SMM 10-11-2011
		forms.sb_form_splittab2.elements.tabs_70.dividerLocation = globals.getUserSetting('tabs_70_dividerLocation') 
	}
	else {
		forms.sb_form_splittab2.elements.tabs_70.dividerLocation = vWidth / 2
	}
		
	// Added for demo instance
	if (globals.sb_demo_chk == 1) {
		globals.sb_gTestament = "New";
		globals.book = 'Johannes';
		if (globals.sb_APP_getServerLang() == "ESP") {
			globals.book = 'Mateo';
		}
		globals.chapter = 3;
		globals.verse = 1;
	} else {
		globals.sb_gTestament = "Old"
		//	var vSQL = "SELECT FIRST(books.book_name) FROM DBA.books WHERE books.testament = 'OLD' AND books.show_in_nav = 1 ORDER BY books.order_number"
		var vSQL = "SELECT books.book_name FROM books WHERE books.testament = 'Old' AND books.show_in_nav = 1 ORDER BY books.order_number"

		var vQuery = databaseManager.getDataSetByQuery('SB', vSQL, null, 1)
		var vBook = vQuery.getValue(1, 1)
		globals.book = vBook
		globals.chapter = 1;
		globals.verse = 1;
	}

}

/**
 * @properties={typeid:24,uuid:"BF18E370-4283-4DC1-A81E-A38032737F7C"}
 */
function resizeSplitTab(event, vButtomForm) {
	/*var vWindow = application.getWindow()
	var vWidth = vWindow.getWidth()
	var vHeight = vWindow.getHeight() - 58

	forms.sb_form.elements.tabs_67.dividerSize = 1
	forms.sb_form.elements.tabs_67.dividerLocation = (vHeight / 3) + ( (vHeight / 3) / 2)
	forms.sb_form_splittab0.elements.tabs_135.dividerSize = 1
	forms.sb_form_splittab0.elements.tabs_135.dividerLocation = forms.sb_form_splittab0.elements.tabs_135.getHeight() / 2
	forms.sb_form_splittab1.elements.tabs_101.dividerSize = 2
	forms.sb_form_splittab1.elements.tabs_101.dividerLocation = vWidth / 2
	forms.sb_form_splittab2.elements.tabs_70.dividerSize = 2
	forms.sb_form_splittab2.elements.tabs_70.dividerLocation = vWidth / 2

	*/
	if (vButtomForm) {
		forms.sb_form.elements.tabs_67.setRightForm(forms[vButtomForm], null)
	}
	else {
	//SMM - 18-07-2011	
		forms.sb_form.elements.tabs_67.setRightForm(forms['book_notes'], null)
	}
	
}

/**
 * @properties={typeid:24,uuid:"8b8d50d2-41d9-4d41-9736-c414aceb1688"}
 * @param {JSEvent} event
 */
function MENU_html(event) {
	//SMM -19-05-2011 plugins.window
	var elem
	var popupMenu = plugins.window.createPopupMenu();

	if (globals.sb_APP_getServerLang() == "NL") {
		popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.Manual'), openHelp)
//		menu = popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.Support'), openHelpdesk)
		popupMenu.addSeparator()
		popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.Suggestions'), openMail)
		popupMenu.addSeparator();
		popupMenu.addCheckBox("Tips", openTips);
		popupMenu.addCheckBox("i18n:servoy.menuitem.about", globals.openAbout)
	} else {
//		menu = popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.Support'), openHelpdesk)
//		menu = popupMenu.addSeparator()
		//menu = popupMenu.addCheckBox("i18n:CVB.lbl.help", forms.sb_form.openHelp)
		//menu = popupMenu.addSeparator();
		popupMenu.addCheckBox(i18n.getI18NMessage('cvb.lbl.Suggestions'), openMail)
		popupMenu.addSeparator();
		popupMenu.addCheckBox("Tips", openTips);
		popupMenu.addCheckBox("i18n:servoy.menuitem.about", globals.openAbout)
	}
	if (event instanceof JSEvent) {
		elem = event.getElementName()
		popupMenu.show(elements[elem]);
	}
}

/**
 * @properties={typeid:24,uuid:"C4C02590-E2CE-4F1E-8CA2-A8373CB248F5"}
 */
function openTips() {
	var vWin = application.createWindow("cvb_tips", JSWindow.MODAL_DIALOG);
	vWin.title = "Tips";
	vWin.resizable = false;
	vWin.setInitialBounds(-1, -1, -1, -1);
	vWin.show(forms.cvb_tips);
}

/**
 * @properties={typeid:24,uuid:"63d1afb7-91df-4e98-9146-a23689b03b49"}
 * @param {JSEvent} event
 */
function newBooks(event) {
	//SMM 17-05-2011 Migratie: Veranderen van de popup menu plugin
	var menu, elem
	var ppMenu = plugins.window.createPopupMenu();
	var vSQL = "SELECT book_name FROM books WHERE testament = ? AND show_in_nav = 1 ORDER BY order_number "
	if (globals.sb_demo_chk == 1) {
		vSQL += " AND demo_chk = 1";
	}

	var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [globals.sb_gTestament], -1);

	//for(i = 1; i <= global_testament_to_books.getSize(); i++)
	for (var i = 1; i <= vResult.getMaxRowIndex(); i++) {
		menu = ppMenu.addCheckBox(vResult.getValue(i, 1), setBookIdNew)
		if (menu.text == globals.book) {
			menu.selected = true
		}
		menu.methodArguments = [menu]

	}

	if (event instanceof JSEvent) {
		elem = event.getElementName()
	} else {
		elem = 'testamentBooks'
	}

	if (elem == 'testamentBooks') {
		ppMenu.show(elements[elem]);

	}

	/*
	 var i
	 var menu = new Array( )

	 // Do SQL
	 //globals.sb_gTestament
	 var vMenu = plugins.window.createPopupMenu()
	 var vSQL = "SELECT book_name FROM books WHERE testament = ? AND show_in_nav = 1"
	 if(globals.sb_demo_chk == 1)
	 {
	 vSQL += " AND demo_chk = 1";
	 }

	 var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [globals.sb_gTestament], -1);

	 //for(i = 1; i <= global_testament_to_books.getSize(); i++)
	 for(i = 1; i <= vResult.getMaxRowIndex(); i++)
	 {
	 //var vRecord = global_testament_to_books.getRecord(i)
	 //vMenu.addCheckBox(vResult.getValue(i,1),setBookIdNew,null,null,true)//.methodArguments = [vResult.getValue(i,1)]
	 menu.push(plugins.popupmenu.createCheckboxMenuItem(vResult.getValue(i, 1), setBookIdNew))
	 }

	 //menu[0].setSelected(true);
	 // To transfer the right element and formname triggers you have to set them as arguments
	 //menu[2].setMethodArguments(new Array(application.getMethodTriggerElementName(), application.getMethodTriggerFormName()));

	 for(i = 0; i < menu.length; i++)
	 {
	 if(menu[i].text == globals.book)
	 {
	 menu[i].setSelected(true);
	 }
	 menu[i].setMethodArguments([menu[i]]);
	 }

	 var elem = elements.testamentBooks
	 if(elem != null)
	 {
	 plugins.popupmenu.showPopupMenu(elem, menu);
	 }
	 */
}

/**
 * @properties={typeid:24,uuid:"bf44309a-63e6-4277-ae5c-e4d470d81226"}
 */
function nextVerse() {
	// Get all the verses of selected chapter
	var vVersesArray = application.getValueListArray('testamentVerses');
	var vChapterArray = application.getValueListArray('testamentChapters');
	var vBookArray = application.getValueListArray('testamentBooks');
	// Get highest of all
	var vHighestVerse = vVersesArray[ (vVersesArray.length) - 1];
	var vHighestChapter = vChapterArray[ (vChapterArray.length) - 1];
	var vLastBook = vBookArray[ (vBookArray.length) - 1];
	var vSQL, vQuery, vBook
	//Check if it is the last verse if not go to the next verse
	if ( (globals.verse) + 1 <= vHighestVerse) {
		globals.verse = (globals.verse) + 1;
	} else {
		//Check if it is the last verse if it is the lastest chapter if not go to the next chapter
		if ( (globals.chapter) + 1 <= vHighestChapter) {
			globals.verse = 1
			globals.chapter = (globals.chapter) + 1
		} else {
			//IF it is the last chapter and verse than go to the next book
			globals.verse = 1;
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
					vSQL = "SELECT books.book_name FROM books WHERE books.testament = ? AND books.show_in_nav = 1 ORDER BY books.order_number"
					vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [vTestamentI], 1)
					vBook = vQuery.getValue(1, 1)
					globals.book = vBook
					globals.sb_gTestament = vTestamentI;
				} else {
					//vSQL = "SELECT FIRST(books.book_name) FROM books WHERE books.testament = 'Old' AND books.show_in_nav = 1 ORDER BY books.order_number"
					// PostGre MME: 18-10-2011
					vSQL = "SELECT books.book_name FROM books WHERE books.testament = 'Old' AND books.show_in_nav = 1 ORDER BY books.order_number "
					vQuery = databaseManager.getDataSetByQuery('SB', vSQL, null, 1)
					vBook = vQuery.getValue(1, 1)
					globals.book = vBook
				}
			}
		}
	}
	forms.sb_form.setBookId()
	forms.sb_form.setChapterId()
	forms.sb_form.setVerseIdNew(globals.verse);
}

/**
 * @properties={typeid:24,uuid:"a1cdfb2c-be5c-4625-a86a-23b120202d58"}
 * @AllowToRunInFind
 */
function nextVerse_old() {

	forms.sb_form.setBookId()
	forms.sb_form.setChapterId()
	forms.sb_form.setVerseId()

	//scopes.tools.output(globals.verse_id);

	forms.book_nodes.foundset.clear()
	if (forms.book_nodes.controller.find()) {
		forms.book_nodes.verse_id = globals.verse_id
		forms.book_nodes.controller.search()
	}

	if (forms.book_nodes.foundset.getSize() > 0) {

		//if(globals.verse_id == 1007234){
		//	globals.selected_verse_id = 1010156
		//}
		//else if(globals.verse_id == 1010158){
		//	globals.selected_verse_id = 1007235
		//}
		//else {
		var record = forms.book_nodes.foundset.getRecord(1)
		do {
			var next = record.node_id + 1
			forms.book_nodes.foundset.clear()
			forms.book_nodes.controller.find()
			forms.book_nodes.node_id = next
			forms.book_nodes.controller.search()
			if (forms.book_nodes.foundset.getSize() > 0) {
				record = forms.book_nodes.foundset.getRecord(1)
			} else
				break
		} while (record.verse_id == -1)
		globals.selected_verse_id = record.verse_id
		//}
		if (globals.selected_verse_id > 0) {
			/*		globals.setBookChapVerse(globals.selected_verse_id)
			 forms.book_notes.viewNotesForSelectedVerse()
			 forms.verse_translation.viewTranslationsForSelectedVerse()
			 forms.book_comment.viewCommentForSelectedVerse()
			 forms.study_words.viewWordsForSelectedVerse()
			 */
			globals.viewVerse(globals.selected_verse_id)
		}
	}

}

/**
 * @properties={typeid:24,uuid:"fdd806d9-a0aa-446e-95b0-d4dab64678f7"}
 */
function node_selected() {
//
//	globals.selected_node_id = arguments[0]
//
//	//globals.isLeaf = arguments[1]
//
//	var res = databaseManager.getDataSetByQuery('sb', 'select verse_id,parent_id,label_text from book_nodes where node_id = ' + globals.selected_node_id, null, 10000)
//	res.rowIndex = 1
//	if (res.getValue(1, 1) <= 0 || res.getValue(1, 1) == null) {
//		globals.parent_id = res.getValue(1, 2)
//
//		var result2 = databaseManager.getDataSetByQuery('sb', 'select pk from books where abbreviation=\'' + forms.book_nodes.global_parent_id_to_book_nodes.label_text + '\'', null, 10000)
//		result2.rowIndex = 1
//		var vBook_id = result2.getValue(1, 1)
//
//		if (res.getValue(1, 3) == 'Inleiding') {
//			forms.articles.getInleidingForBook(vBook_id)
//		} else if (res.getValue(1, 3) == 'Artikelen') {
//			forms.articles.getArticlesForBook(vBook_id)
//		} else if (res.getValue(1, 3) == 'Synopsis') {
//			forms.synopsis_form.getSynopsis()
//		} else if (res.getValue(1, 3) == 'Grammatica') {
//			globals.openPdf()
//		}
//	} else {
//		globals.viewVerse(res.getValue(1, 1));
//	}

}

/**
 * @properties={typeid:24,uuid:"c79f20f9-f270-48fb-b5b3-4a26c868614d"}
 */
function onShow(event) {	
	// Changes for the new split stuff
	application.setStatusText("StudieBijbel.nl v" + globals.sb_gVersion);
	
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT)
	{
		var vUserAgent = Packages.org.apache.wicket.RequestCycle.get().getClientInfo().getUserAgent()+"";
	//	scopes.tools.output(vUserAgent);
		
		if(vUserAgent.match(/iPad/gi))
		{
			BTN_DeafultSplitPanels(event);
		}
	} else {
		if(globals.getUserSetting('splitPanelsUpdate', '0') == '0')
		{
			BTN_DeafultSplitPanels(event);
			globals.setUserSetting('splitPanelsUpdate', '1');
		}
	}
	// END
	
	elements.tabs_67.dividerSize=5
	
	if (application.getApplicationType() == 3 || globals.sb_gLoginName.match(/@stb\.nl/)  || globals.sb_gLoginName.match(/@ambitius\.com/)) {
		elements.admin_btn_admin.visible = true
	} else {
		elements.admin_btn_admin.visible = false
	}
	if (application.getApplicationType() == 3 || plugins.it2be_tools.arrayContains(globals.sb_gDEVServerURLs, globals.sb_gCurrentServerUrl)) {
		//elements.lbl_ontwikkelTest.bgcolor = "#FF0000"
		//elements.lbl_ontwikkelTest.fgcolor = "#FFFFFF"
	}

	if (!globals.testamentFirstTime) {
		
		var vTextVersion = globals.getUserSetting('text_version', null);
		
		if(vTextVersion)
		{
			globals.text_version = vTextVersion;
		}
		
		globals.selected_verse_id =  globals.getUserSetting('verse_id', null) //SMM - 10-06-2011
		if (globals.selected_verse_id) {					
			globals.viewVerse(globals.selected_verse_id)
		}
		else {		
			globals.selected_verse_id = 1
			selectVerseId();
		}
		globals.testamentFirstTime = true;	
	}
	
	//SMM - 16-06-2011
	globals.griek_version = globals.getUserSetting('griek_version', null)
	globals.heb_version = globals.getUserSetting('hebrew_version', null)
	globals.text_version = globals.getUserSetting('text_version', 'TR')

	// RB - 18-03-2013
	globals.SET_wordStudyVerion(globals.sb_gTestament);
 
}

/**
 * @properties={typeid:24,uuid:"a916e112-e7b3-4adc-afa2-040031e2a729"}
 */
function openHelp() {
	
	application.showURL(application.getServerURL()+"/help/", "_self", null, null);
	
	//globals.DIALOGS.showInfoDialog('Help', 'Momenteel is er geen help documentatie aanwezig', 'Ok');
	return true;
}

/**
 * @properties={typeid:24,uuid:"7b5fef8f-12dd-45bb-9101-03b34990c082"}
 */
function openHelpdesk() {
	var vHelpIndex
	if (globals.sb_APP_getServerLang() == "NL") {
		vHelpIndex = "http:\/\/support.studiebijbel.nl\/index.php?_m=knowledgebase&_a=view&parentcategoryid=9&pcid=0&nav=0";
	} else {
		vHelpIndex = "http:\/\/www.comentariobiblicocvb.com\/problemas-tecnicos.html"
	}
	/*if (utils.stringMiddle(application.getOSName(), 1, 7) == "Windows") {
		application.executeProgram('rundll32', 'url.dll,FileProtocolHandler', vHelpIndex)
	} else {
		application.executeProgram('open', '-a', 'safari', vHelpIndex)
	}*/
	application.showURL(vHelpIndex);

}

/**
 * @properties={typeid:24,uuid:"70bd878c-264d-4f08-a636-af0357c3bdab"}
 */
function openMail() {
	// todo hier moeten we een dialoog oproepen die een mail kan sturen!:
	var vWindow = application.createWindow('suggestionWindow', JSWindow.MODAL_DIALOG);
	vWindow.title = "i18n:cvb.title.suggestionForImprovement";
	vWindow.resizable = false;
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.sb_help_suggestions);
	

	//var vHelpIndex = "mailto:info@studiebijbel.nl";
	//application.showURL(vHelpIndex);
/*
	if (utils.stringMiddle(application.getOSName(), 1, 7) == "Windows") {
		//var file = plugins.file.convertStringToJSFile('docs\\html\\welcometopic.htm')
		//var file = plugins.file.convertStringToJSFile('docs\\Studiebijbel_handleiding.chm')
		//	var name = file.getAbsolutePath()
		// application.executeProgram('rundll32', 'url.dll,FileProtocolHandler',name)
		application.executeProgram('rundll32', 'url.dll,FileProtocolHandler', vHelpIndex)
	} else {
		//	var file = plugins.file.convertStringToJSFile('docs/html/welcometopic.htm')
		//	var name = file.getAbsolutePath()
		//	application.executeProgram('open','-a','safari',name)
		application.executeProgram('open', '-a', 'safari', vHelpIndex)
	}
*/
}

/**
 * @properties={typeid:24,uuid:"ca00780d-e56e-4826-80d3-28dc89a1316f"}
 * @AllowToRunInFind
 */
function openSearch() {
	/*application.showFormInDialog(forms.search_form,300,30,480,600,'Zoekformulier',true)*/
	if (globals.sb_demo_chk == 0) {
		//application.showFormInDialog(forms.sb_search_dlg, -1, -1, -1, -1, "i18n:cvb.title.search", false, false, 'searchThingy', true);
		
		var vFound = false
		if (forms.search_results1.elements.tabs_70.getMaxTabIndex() > 0) {
			if (globals.search_PRINT_sql.translationCOUNT > 0 || globals.search_PRINT_sql.spacingCOUNT >0 || globals.search_PRINT_sql.commentaryCOUNT >0){
				vFound = true
			}
			if (globals.search_PRINT_sql.commentaryNotesCOUNT >0 || globals.search_PRINT_sql.comNotesCOUNT >0 || globals.search_PRINT_sql.articlesCOUNT >0 || globals.search_PRINT_sql.wordStudyCOUNT>0){
				vFound = true
			}
		}
		if	(vFound) {			
			//SMM - 03-06-2011
			var vSearchResults = application.createWindow('search_results1', JSWindow.DIALOG);
			vSearchResults.show('search_results1');
		} else {
			var vSearchWindow = application.createWindow('sb_search_dlg', JSWindow.DIALOG);
			vSearchWindow.title = "i18n:cvb.title.search";
			vSearchWindow.setInitialBounds(-1,-1,-1,-1);
			vSearchWindow.show('sb_search_dlg');
		}
	} else {
		plugins.dialogs.showErrorDialog('', i18n.getI18NMessage('cvb.msg.noSearchFordemo'));
	}
}

/**
 * @properties={typeid:24,uuid:"1b3b0971-e6bb-45c1-a1c3-6c31f666d96f"}
 */
function previousVerse() {
	// Get all the verses of selected chapter
	var vVersesArray = application.getValueListArray('testamentVerses');
	var vChapterArray = application.getValueListArray('testamentChapters');
	var vBookArray = application.getValueListArray('testamentBooks');
//	var vUrl = application.getServerURL()
	// Get highest verse
	var vLowestVerse = 1;
	var vLowestChapter = 1;
	var vLastBook = vBookArray[0];
	var vSQL, vQuery, vBook, vHighestVerse, vHighestChapter
	if ( (globals.verse) - 1 >= vLowestVerse) {
		globals.verse = (globals.verse) - 1;
	} else {
		if ( (globals.chapter) - 1 >= vLowestChapter) {
			globals.verse = 1
			globals.chapter = (globals.chapter) - 1

			forms.sb_form.setBookId()
			// Hier dingen doen
			forms.sb_form.setChapterId()
			vVersesArray = application.getValueListArray('testamentVerses');
			vHighestVerse = vVersesArray[ (vVersesArray.length) - 1];
			globals.verse = vHighestVerse;
			//forms.sb_form.setVerseIdNew(globals.verse);

			//forms.sb_form.setVerseId()

		} else {
			var vBookPos = plugins.it2be_tools.arrayIndexOf(vBookArray, globals.book);
			if (globals.book != vLastBook) {
				globals.book = vBookArray[ (vBookPos) - 1];

				//forms.sb_form.setBookId()
				//forms.sb_form.setChapterId()
				//forms.sb_form.setVerseId()

			} else {
				if (globals.book == vLastBook) {
					var vTestamentI;
					
					if(globals.sb_gTestament == "New")
					{
						vTestamentI = "Old";
					} else {
						vTestamentI = "New"
					}
					
					vSQL = "SELECT books.book_name FROM books WHERE books.testament = ? AND books.show_in_nav = 1 ORDER BY books.order_number DESC"
					vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [vTestamentI], 1)
					vBook = vQuery.getValue(1, 1)
					globals.book = vBook
					globals.sb_gTestament = vTestamentI;
					
				} else {
					vSQL = "SELECT books.book_name FROM books WHERE books.testament = 'Old' AND books.show_in_nav = 1 ORDER BY books.order_number DESC"
					vQuery = databaseManager.getDataSetByQuery('sb', vSQL, null, 1)
					vBook = vQuery.getValue(1, 1)
					globals.book = vBook
					globals.sb_gTestament = "Old";
				}
			}

			forms.sb_form.setBookId()
			// Hier dingen doen
			// Get all the verses of selected chapter

			vChapterArray = application.getValueListArray('testamentChapters');
			vHighestChapter = vChapterArray[ (vChapterArray.length) - 1];
			globals.chapter = vHighestChapter;
			forms.sb_form.setChapterId()
			vVersesArray = application.getValueListArray('testamentVerses');
			vHighestVerse = vVersesArray[ (vVersesArray.length) - 1];
			globals.verse = vHighestVerse;

			//forms.sb_form.setVerseIdNew(globals.verse)
		}
		forms.sb_form.setBookId();
		forms.sb_form.setChapterId();
	}

	//forms.sb_form.setVerseId()
	forms.sb_form.setVerseIdNew(globals.verse);
	//forms.sb_form.selectVerseIdNew(globals.verse);
}

/**
 * @properties={typeid:24,uuid:"f8af08a6-1f3e-47a8-9be3-6e5090403e1c"}
 * @AllowToRunInFind
 */
function previousVerse_old() {
	var record, next
	forms.sb_form.setBookId()
	forms.sb_form.setChapterId()
	forms.sb_form.setVerseId()
	forms.book_nodes.foundset.clear()
	forms.book_nodes.controller.find()
	forms.book_nodes.verse_id = globals.verse_id
	forms.book_nodes.controller.search()

	if (forms.book_nodes.foundset.getSize() > 0) {
		//	if( globals.verse_id == 1007235 ){
		//		globals.selected_verse_id = 1010158
		//	}
		//	else if( globals.verse_id == 1010156 ){
		//		globals.selected_verse_id = 1007234
		//	}
		//	else {
		record = forms.book_nodes.foundset.getRecord(1)
		do {
			next = record.node_id - 1
			forms.book_nodes.foundset.clear()
			forms.book_nodes.controller.find()
			forms.book_nodes.node_id = next
			forms.book_nodes.controller.search()
			if (forms.book_nodes.foundset.getSize() > 0)
				record = forms.book_nodes.foundset.getRecord(1)
			else
				break
		} while (record.verse_id == -1)
		globals.selected_verse_id = record.verse_id
		//	}
		if (globals.selected_verse_id > 0) {
			/*		globals.setBookChapVerse(globals.selected_verse_id)
			 forms.book_notes.viewNotesForSelectedVerse()
			 forms.verse_translation.viewTranslationsForSelectedVerse()
			 forms.book_comment.viewCommentForSelectedVerse()
			 forms.study_words.viewWordsForSelectedVerse()
			 */
			globals.viewVerse(globals.selected_verse_id)
		}
	}

}

/**
 * @properties={typeid:24,uuid:"9c5c2ce1-2e98-4a6c-a51b-cfaa725165f6"}
 * @param {JSEvent} event
 */
function selectTestament(event) {
	//SMM -17-05-2011 plugins.window
	var menu1, menu2, elem
	var ppMenu = plugins.window.createPopupMenu();
	if (globals.sb_APP_getServerLang() == "NL") {
		menu1 = ppMenu.addCheckBox('OT', setTestamentNew);
		menu2 = ppMenu.addCheckBox('NT', setTestamentNew);
	} else {
		menu1 = ppMenu.addCheckBox('AT', setTestamentNew);
		menu2 = ppMenu.addCheckBox('NT', setTestamentNew);

	}
	menu1.methodArguments = ["Old", event]
	menu2.methodArguments = ["New", event]

	if (globals.sb_gTestament == 'Old') {
		menu1.selected = true;
	} else {
		menu2.selected = true;
	}

	//show popup menu
	if (event instanceof JSEvent) {
		elem = event.getElementName()
	} else {
		elem = 'testamentD'
	}

	if (elem == 'testamentD') {
		ppMenu.show(elements[elem]);

	}
}

/**
 * @properties={typeid:24,uuid:"4ed12b7f-737f-4ca7-a5e1-7f8fb13fd507"}
 //SMM 24-05-2011  event DEPRECATED
 */
function selectVerseId() {
	//globals.chapter_id = null
	//globals.verse_id = null

	if (!globals.chapter) {
		globals.chapter = 1;
	}
	if (!globals.verse) {
		globals.verse = 1;
	}

	forms.sb_form.setBookId()
	forms.sb_form.setChapterId()
	if (globals.chapter_id) {
		//	forms.sb_form.setVerseId()
		//forms.sb_form.setVerseIdNew(globals.selected_verse_id);
		forms.sb_form.setVerseIdNew();
	}
	
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		forms.web_sb_articles.EVENT_onShow(false, new JSEvent);
	}

}

/**
 * @properties={typeid:24,uuid:"316c4e4f-db3f-4e94-ab5d-53cb9995f790"}
 */
function setBook() {
	globals.chapter = 1;
	globals.verse = 1;
	if (globals.sb_demo_chk == 1 && globals.sb_gTestament == "Old") {
		globals.sb_gTestament = "New";
		plugins.dialogs.showErrorDialog("i18n:cvb.message.studybible", "i18n:cvb.message.studybibleDemo", "i18n:CVB.lbl.ok");
	} else if (globals.sb_demo_chk == 0) {
		//MAURICE: element does not exist?
		//elements.bookc.requestFocus();

	}
}

/**
 * @properties={typeid:24,uuid:"05400e6e-7a75-4313-93a6-ee28d2563ec4"}
 */
function setBookId() {
    if (globals.book) globals.book_id = global_book_to_books.pk;
	/*
	 if(event.getElementName == "bookc")
	 {
	 globals.chapter = 1;
	 globals.verse = 1;
	 elements.chapterc.requestFocus()
	 }*/

}

/**
 * @properties={typeid:24,uuid:"786508ce-1f6c-4f4e-9a5c-a3b637d62f6b"}
 * @param {*} arg1
 * @param {*} arg2
 * @param {*} arg3
 * @param {*} arg4
 * @param {*} arg5
 * @param {*} obj
 */
function setBookIdNew(arg1, arg2, arg3, arg4, arg5, obj) {

	//SMM 17-05-2010 Migratie
	if (obj.text) {
		globals.book = obj.text
		setBookId();
		globals.chapter = 1;
		chapterbooksNEw(null)
	}
}

/**
 * @properties={typeid:24,uuid:"2165b781-71b4-4c46-b9ad-7a416eb358fe"}
 * @param [event] JSEvent //SMM 24-05-2011  event DEPRECATED
 */
function setChapterId(event) {
	globals.chapter_id = globals_chapter_to_chapters.pk

	//if(application.getMethodTriggerElementName() == "chapterc"){
	//elements.versec.requestFocus()
	//}
}

/**
 * @properties={typeid:24,uuid:"8cfbc816-dcf8-4645-bb30-c77fdd0e1749"}
 * @param {*} inp1
 * @param {*} inp2
 * @param {*} inp3
 * @param {*} inp4
 * @param {*} inp5
 * @param {*} object
 */
function setChapterIdNew(inp1, inp2, inp3, inp4, inp5, object) {

	if (object.text) {

		globals.chapter = object.text
		setChapterId();
		chapterVerse(null);
	}
}

/**
 * @properties={typeid:24,uuid:"a32804d8-4f5e-432f-9f82-42230329e1bc"}
 */
function setTestamentNew() {
	//SMM -17-05-2011
	if (arguments[5]) {
		globals.sb_gTestament = arguments[5]
		
		if (globals.sb_gTestament == 'Old') {
			globals.text_version = '';
			
		} else {
			var vTextVersion = globals.getUserSetting('text_version' ,'TR');
			
			if(vTextVersion)
			{
				globals.text_version = vTextVersion;
			}
		}
		
		globals.chapter = 1
		globals.verse = 1;
		if (application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT) {
			//we are in web_client
			newBooks(null);
		}
		globals.SET_wordStudyVerion(arguments[5]);
	}
}

/**
 * @properties={typeid:24,uuid:"b0ff91bf-8a75-4db0-b03f-4c9b9ec3e2d3"}
 */
function setVerseId() {
	globals.verse_id = globals_verse_to_verses.pk
	//scopes.tools.output("HIER MAG IK NIET ZIJN.NL")
	
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		forms.web_sb_articles.EVENT_onShow(false, new JSEvent);
	}
}

/**
 * @properties={typeid:24,uuid:"096fdd95-6f78-459c-878f-d4d6873f95c0"}
 * @param {*|Number} [vVerseID]
 * @param {*} [arg2]
 * @param {*} [arg3]
 * @param {*} [arg4]
 * @param {*} [arg5]
 * @param {*} [obj]
 */
function setVerseIdNew(vVerseID, arg2, arg3, arg4, arg5, obj) {
   var a = 0;
	var vSQL, vDS
	if (arguments && arguments[5] && arguments[5].text) //SMM 24-05-2011 FROM TOOLBAR
	{
		globals.verse = arguments[5].text
	} else if (arguments && arguments[0] == globals.selected_verse_id) {
		//SMM 24-05-2011 FROM THE SEARCH DIALOG
		vSQL = "SELECT verse_number FROM verses WHERE pk = ?";
		vDS = databaseManager.getDataSetByQuery('sb', vSQL, [globals.selected_verse_id], 1);
		if (vDS && vDS.getMaxRowIndex() == 1) {
			globals.verse = vDS.getValue(1, 1);
		}
		
	}
	
	scopes.tools.output(arguments, null);

	//var vVersesPK = globals_verse_to_verses.pk
	vSQL = "SELECT pk FROM verses WHERE pk = ?";
	globals.selected_verse_id = globals_verse_to_verses.pk;
	
	if (globals.verse_id != globals.selected_verse_id) {
		globals.verse_id_calc_last = 1
		globals.verse_id = globals.selected_verse_id
	}
	foundset.loadRecords(vSQL, [globals.verse_id]);
	globals.verse_id_calc_last = null
	//Set history if historybtn isn't used
	if (globals.UsedHistory != 1) {
		globals.sb_history();
	} else {
		globals.UsedHistory = 0
	}

	globals.sb_gSelectedFootNoteNo = 0

	//SMM - 18-07-2011
	forms.sb_form.resizeSplitTab(null, null)
	if (arguments && arguments[5] && arguments[5].text){ //it means viewVerse was not executed
		globals.setBookChapVerse(globals.selected_verse_id)
		globals.showOTData(globals.isOT());
		forms.book_notes.viewNotesForSelectedVerse()
		forms.sb_form.setBookId();
		forms.sb_form.setChapterId();				
		
	}
	
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		forms.web_sb_articles.EVENT_onShow(false, new JSEvent);
	}
	
	globals.setUserSetting('verse_id',globals.selected_verse_id);

	
	//migratie: aangepast is tegenwoordig splitpannel

	//resizeSplitTab(null, 'book_notes')
	
	//var divider = forms.sb_form.elements.bean_321.dividerLocation
	//forms.sb_form.elements.bean_321.dividerLocation = divider
	//forms.sb_form.elements.bean_321.bottomComponent = forms.sb_form.elements.tabs_book_notes

	// Tijdelijk uitgezet om te testen!!!
	//	forms.book_notes.elements.notec.visible = true;
	//	forms.book_notes.elements.note.visible = false;
}

/**
 * @properties={typeid:24,uuid:"a30ec467-d233-4821-aa0d-ac41cc0ded78"}
 */
function test() {
	// Returns the JSHashMap of the current client
//	var vHashMap = plugins.UserManager.hashMap;
	//scopes.tools.output(vHashMap.size())
	//vHashMap.clear()

}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8417C5D7-763F-4A68-8C6C-32E5189BE1C2"}
 */
function onRecordSelection_FORm(event) {
	
	if (globals.selected_verse_id) globals.setUserSetting('verse_id',globals.selected_verse_id)	
    
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"6DF758BA-7943-4CEA-BDCE-9D3165C81E59"}
 */
function onHide(event) {
	//no onHide of a form is executed only when you go from 1 form to another. 
	//The browser close tab/window is currently not catched, so no onhide will be called. Not all browsers support listen to an unload at this moment.
	//SMM 16-06-2011	
	globals.setUserSetting("griek_version",globals.griek_version);
	globals.setUserSetting("hebrew_version",globals.heb_version);
	globals.setUserSetting("text_version",globals.text_version);
	
	if(globals.sb_gTestament == "Old") {
		globals.setUserSetting("text_version","TR");
	}
    return true
}

/**
 * Callback method when the user changes tab in a tab panel or divider position in split pane.
 *
 * @param {Number} previousIndex index of tab shown before the change
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2AD6B7D8-777C-4935-A225-E21571FA17F2"}
 */
function onTabChange(previousIndex, event) {
	globals.setUserSetting("tabs_67_dividerLocation",elements.tabs_67.dividerLocation);	
	databaseManager.saveData();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8690D7ED-DAB7-4C1E-82C5-FA4FCB825313"}
 */
function BTN_DeafultSplitPanels(event) {
	//SMM 11-11-2011
	var vWindow = application.getWindow();
	var vWidth = vWindow.getWidth();
	var vHeight = forms.sb_form.controller.getPartHeight(JSPart.BODY);
	
	// ipad landscape fix
	if(vHeight == 537)
	{
		vHeight = 610;		
	}
	
	if (application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		databaseManager.saveData();
	}
	
	forms.sb_form_splittab0.elements.tabs_135.dividerLocation = vWidth / 2; 
	
	var vTabHeight = forms.sb_form_splittab0.controller.getPartHeight(JSPart.BODY);
	
	//ipad fix
	if(vTabHeight == 89) { vTabHeight = 305; }
	
	forms.sb_form_splittab1.elements.tabs_101.dividerLocation = (vTabHeight / 2);
	forms.sb_form_splittab2.elements.tabs_70.dividerLocation = (vTabHeight / 2);
	
	forms.sb_form.elements.tabs_67.dividerLocation = (vHeight / 3) + ( (vHeight / 3) / 2);

	application.updateUI();
}

/**
 * @private
 *
 * @properties={typeid:24,uuid:"3168AF51-B995-4E05-841C-3B2F08E7E1F7"}
 */
function BTN_wordStudyVersion() {
	
	var vWindow = application.createWindow('sb_word_study_version_lst', JSWindow.MODAL_DIALOG);
	
	vWindow.show(forms.sb_word_study_version_lst);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"18E7EA7D-F77D-4045-A477-86BF37B1F5CF"}
 */
function sb_allVerses(event) {
	var vWindow = application.createWindow('sb_select_verse', JSWindow.MODAL_DIALOG);
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.sb_select_verse);
}

/**
 * @properties={typeid:24,uuid:"84F5245E-B608-442D-BB7B-DFBEAC5D4BC3"}
 * @param arg1
 * @param arg2
 * @param arg3
 * @param arg4
 * @param arg5
 */
function setVerseIdNew2(arg1, arg2, arg3, arg4, arg5) {
	globals.verse = arg5;
	
	forms.sb_form.setBookId()
	forms.sb_form.setChapterId()
	forms.sb_form.setVerseIdNew(globals.verse);
}
