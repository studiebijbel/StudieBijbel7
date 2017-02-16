/**
 * @properties={typeid:24,uuid:"79b01b9e-42df-4214-8061-1193f6a7ad07"}
 */
function BTN_edit() {
	var vSQL,vType,vQuery,i,vDialog;
	var iVerseID = globals.selected_verse_id;
	// Get the testament.
	vSQL 	= "SELECT testament FROM books WHERE book_name IN (SELECT calc_book_name FROM verses WHERE pk = " + iVerseID + ")"
	vQuery 	= databaseManager.getDataSetByQuery('sb', vSQL, null, 1)
	vType 	= vQuery.getValue(1, 1)
	// Second query, get pk from words table.
	vSQL = "SELECT pk FROM words WHERE verse_id = " + iVerseID + " ORDER BY word_order";
	/** @type JSRecord<db:/sb/words> */
    var vRecord
	databaseManager.setAutoSave(false);

	if (vType == "Old") {
		forms.study_words_edit.foundset.loadRecords(vSQL)

		for (i = 1; i <= forms.study_words_edit.foundset.getSize(); i++) {
			vRecord = forms.study_words_edit.foundset.getRecord(i)
			vRecord.word_transliteration = globals.sb_edit_HtmlToTextChangeToSpecialChars(vRecord.word_transliteration);
			databaseManager.saveData()
		}
		
		//application.showFormInDialog(forms.study_words_edit, -1, -1, -1, 500, 'i18n:cvb.title.word_translation', false, false, forms.study_words_edit, true)
		vDialog = application.createWindow("study_words_edit",JSWindow.MODAL_DIALOG,null);
		vDialog.title = "i18n:cvb.title.word_translation";
		vDialog.setInitialBounds(-1,-1,-1,500);
		vDialog.show("study_words_edit");
		
		
	} else if (vType == "New") {
		forms.study_words_edit_nt.foundset.loadRecords(vSQL)

		for (i = 1; i <= forms.study_words_edit_nt.foundset.getSize(); i++) {
			vRecord = forms.study_words_edit_nt.foundset.getRecord(i)
			vRecord.word_transliteration = globals.sb_edit_HtmlToTextChangeToSpecialChars(vRecord.word_transliteration);
			databaseManager.saveData()
		}
		
		//application.showFormInDialog(forms.study_words_edit_nt, -1, -1, -1, 500, 'i18n:cvb.title.word_translation', false, false, forms.study_words_edit_nt, true)
		vDialog = application.createWindow("study_words_edit_nt",JSWindow.MODAL_DIALOG,null);
		vDialog.title = "i18n:cvb.title.word_translation";
		vDialog.setInitialBounds(-1,-1,-1,500);
		vDialog.show("study_words_edit_nt");
	}
	
}

/**
 * @properties={typeid:24,uuid:"b7c63f82-9aba-4b13-b885-0b768ae5488f"}
 */
function BTN_manuscriptEdit() {
	if (globals.sb_gTestament == "Old") {
		plugins.dialogs.showInfoDialog('Manuscript', 'i18n:cvb.lbl.Manuscript_only_NT', 'i18n:CVB.lbl.ok');
		return
	}
	
	// New
	databaseManager.setAutoSave(false)

	var iVerseID = globals.selected_verse_id;

	var vSQL = "SELECT pk FROM manuscript_info WHERE verse_id = " + iVerseID + " ORDER BY code_no";

	forms.study_words_manuscript_nt.foundset.loadRecords(vSQL);
	//application.showFormInDialog(forms.study_words_manuscript_nt, -1, -1, -1, 500, 'i18n:cvb.title.word_translation', false, false, forms.study_words_manuscript_nt, true)
	//SMM 20-05-2011
	var vForm = application.createWindow('StudyWordsManuscriptNTForm', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.title.word_translation';
	vForm.show(forms.study_words_manuscript_nt);
	
}

/**
 * @properties={typeid:24,uuid:"027d9c23-37ee-43f7-9bda-d5bafa887bcb"}
 * @param {JSEvent} event
 */
function BTN_SelectVersions(event) {
	//SMM -19-05-2011 plugins.window
	
	var menu
	var popupMenu = plugins.window.createPopupMenu();
	if (globals.sb_gTestament == "New") {
		menu = popupMenu.addCheckBox('i18n:onlyGreek', globals.cvb_setGreek)
		menu = popupMenu.addSeparator()
		
		menu = popupMenu.addRadioButton('TR', globals.cvb_setVersion)
		menu.methodArguments=[new Array('TR')]
		
		menu = popupMenu.addRadioButton('H-F', globals.cvb_setVersion)
		menu.methodArguments=[new Array('H-F')]
		
		menu = popupMenu.addRadioButton('N25', globals.cvb_setVersion)
		menu.methodArguments=[new Array('N25')]
		
		menu = popupMenu.addRadioButton('N27', globals.cvb_setVersion)
		menu.methodArguments=[new Array('N27')]
		
		if (globals.griek_version) {
			popupMenu.getCheckBox(0).selected = true
		}		
		
		switch (globals.text_version) {
		case "TR":
			popupMenu.getRadioButton(2).selected = true
			break;
		case "H-F":
			popupMenu.getRadioButton(3).selected = true
			break;
		case "N25":
			popupMenu.getRadioButton(4).selected = true
			break;
		case "N27":
			popupMenu.getRadioButton(5).selected = true
			break;
		}

	} else if (globals.sb_gTestament == "Old") {
		menu = popupMenu.addCheckBox('i18n:msg_onlyHebrew', globals.cvb_setHebrew)
		if (globals.heb_version) {
			menu.selected = true
		}
	}	
	if (event instanceof JSEvent) {
		popupMenu.show(elements[event.getElementName()]);
	}


    /* SMM OLD	
	var elem,menu
	if (globals.sb_gTestament == "New") {
		menu = new Array(//if you assign this array to a global its reusable
				plugins.popupmenu.createCheckboxMenuItem('i18n:onlyGreek', globals.cvb_setGreek),
				plugins.popupmenu.createMenuItem('-'),
				plugins.popupmenu.createRadioButtonMenuItem('TR', globals.cvb_setVersion),
				plugins.popupmenu.createRadioButtonMenuItem('H-F', globals.cvb_setVersion),
				plugins.popupmenu.createRadioButtonMenuItem('N25', globals.cvb_setVersion),
				plugins.popupmenu.createRadioButtonMenuItem('N27', globals.cvb_setVersion)

			)

		if (globals.griek_version) {
			menu[0].setSelected(true);
		}

		switch (globals.text_version) {
		case "TR":
			menu[2].setSelected(true);
			break;

		case "H-F":
			menu[3].setSelected(true);
			break;

		case "N25":
			menu[4].setSelected(true);
			break;

		case "N27":
			menu[5].setSelected(true);
			break;
		}

		// To transfer the right element and formname triggers you have to set them as arguments
		menu[2].setMethodArguments(new Array('TR'));
		menu[3].setMethodArguments(new Array('H-F'));
		menu[4].setMethodArguments(new Array('N25'));
		menu[5].setMethodArguments(new Array('N27'));

		elem = elements[application.getMethodTriggerElementName()]
		if (elem != null) {
			plugins.popupmenu.showPopupMenu(elem, menu);
			//or you can set the coordinates : plugins.popupmenu.showPopupMenu(10, 10, menu);
		}
	} else if (globals.sb_gTestament == "Old") {
		menu = new Array(//if you assign this array to a global its reusable
			plugins.popupmenu.createCheckboxMenuItem('i18n:msg_onlyHebrew', globals.cvb_setHebrew)
			);

		if (globals.heb_version) {
			menu[0].setSelected(true);
		}

		elem = elements[application.getMethodTriggerElementName()]
		if (elem != null) {
			plugins.popupmenu.showPopupMenu(elem, menu);
			//or you can set the coordinates : plugins.popupmenu.showPopupMenu(10, 10, menu);
		}

	}
    */
}

/**
 * @properties={typeid:24,uuid:"407ea02c-10c4-42e1-89b6-41f7c8672b7e"}
 */
function init() {
	//foundset.clearFoundSet()

}

/**
 * @properties={typeid:24,uuid:"27f483da-8169-4484-be06-75b5eef82097"}
 */
function newWindow() {
	/*
	 globals.setVersePath(globals.selected_verse_id)
	 var index = globals.words.indexOf('<html><body>')
	 globals.d_words = '<html><body><br>'
	 globals.d_words = globals.d_words.concat(globals.verse_path)
	 globals.d_words = globals.d_words.concat('<br>')
	 globals.d_words = globals.d_words.concat(globals.words.substring(index+12))
	 globals.d_words = globals.d_words.replace('<PP>','')
	 globals.d_words = globals.d_words.replace('</PP>','')

	 globals.flag = false

	 */
    //SMM - 10-06-2010
	if (!globals.formCountStudyWords) {
		globals.formCountStudyWords = 1;		
		globals.form_study_width = globals.getUserSetting('form_study_words_width');
		globals.form_study_height = globals.getUserSetting('form_study_words_height');		
	} else {
		globals.formCountStudyWords++;
	}

	var newFormName = "d_study_words_new_" + globals.formCountStudyWords; 

	application.createNewFormInstance('d_study_words_new', newFormName)

	//forms[newFormName].elements.bean_485.setText(globals.d_words)

	//application.showFormInDialog(forms[newFormName], -1, -1, 500, 300, 'i18n:cvb.lbl.spacing', true, false, newFormName, false)
	//SMM 20-05-2011
	var vForm = application.createWindow(newFormName, JSWindow.DIALOG, null);
	vForm.title = i18n.getI18NMessage('cvb.lbl.spacing') + " " + ((globals.sb_gTestamentReal == "New")?globals.text_version:"") ;	
	if (globals.form_study_width && globals.form_study_height){		
		vForm.setInitialBounds(-1,-1, globals.form_study_width, globals.form_study_height)		
	}	
	else vForm.setInitialBounds(-1, -1, 500, 300) 
	vForm.show(forms[newFormName]);
	forms[newFormName].controller.recreateUI()
}

/**
 * @properties={typeid:24,uuid:"fe8adc05-6f91-4c9c-80e4-4bc717e70931"}
 */
function onLoad() {
	//elements.heb.visible = false
}

/**
 * @properties={typeid:24,uuid:"ae24834f-51e4-4ba0-9869-9c21edac3a93"}
 */
function onShow() {

	//globals.changeReadyStatus()
}

/**
 * @properties={typeid:24,uuid:"31b15d05-67d3-48de-b7c8-eeba5041a573"}
 */
function printForm() {
	/*globals.print1 = 'Originele tekst'
	 globals.print2 = ''
	 globals.print3 = ''
	 globals.print4 = ''
	 globals.print5 = ''
	 globals.print6 = ''
	 globals.print7 = ''
	 globals.print8 = ''
	 globals.print_abrev = ''
	 globals.print_AlleenGrieks = globals.griek_version
	 globals.print_versions = globals.text_version
	 globals.print_WordStudy = ''
	 globals.printForm()*/

	globals.sb_print_bibleTranslations = 0
	//application.showFormInDialog(forms.print_words_dlg, -1, -1, -1, -1, 'i18n:cvb.lbl.print', false, false, 'printDLG', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('printDLG', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.lbl.print';
	vForm.setInitialBounds(-1, -1, -1, -1);
	vForm.show(forms.print_words_dlg);

}

/**
 * @properties={typeid:24,uuid:"57cb4685-abb6-41b4-8f02-c21c370e8d3e"}
 * @param {String} inp
 */
function searchWord(inp) {
	/*
	 globals.selectedWordStudy = ''+arguments[0]
	 //scopes.tools.output("###"+arguments[0])
	 //globals.selectedWordStudy = '2639'
	 forms.word_study.viewWordStudy()
	 */

//	if (globals.sb_APP_getServerLang() != "NL") {
//		globals.DIALOGS.showInfoDialog('',i18n.getI18NMessage('cvb.wordstudies_not_yet_available'),'OK');
//		return false
//	} else {
		//Set the wordstudy id to load
		globals.myWordStudyID = inp
		globals.wlink(inp, null, null, null);
//	}

}

/**
 * @properties={typeid:24,uuid:"32af84b0-22d6-480f-87a6-b4c6c01354ab"}
 * @AllowToRunInFind
 */
function viewWordsForSelectedVerse() {
	// Maurice: uitgeschakeld voegt niets toe, wordt nu door calc afgehandeld.
	return
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7C290FBE-B7B7-4A60-8F3F-84581600FBC1"}
 */
function BTN_read(event) {
	forms.web_sb_read.fv_title = i18n.getI18NMessage('cvb.lbl.spacing');
	forms.web_sb_read.fv_html = foundset.calc_study_words;
	forms.web_sb_read.fv_print = printForm;
	
	forms.web_sb_read.elements.html.caretPosition = 0;
	forms.web_sb_read.elements.html.setScroll(0,0);
	
	forms.web_sb_form.elements.tab_notes.tabIndex = 4;
	forms.web_sb_form.elements.tab_notes.visible = true;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"71545D38-7374-461A-A1D9-6769556E6E03"}
 */
function FORM_onShow(firstShow, event) {
	var a = 0;
	if(globals.is_mobile_device) {
		elements.btn_print.visible = false;
	}
}
