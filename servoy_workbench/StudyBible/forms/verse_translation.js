/**
 * @properties={typeid:24,uuid:"1ddb1c26-8832-40f4-9aed-ff7c891874b8"}
 */
function BTN_edit() {

	if (globals.selected_verse_id > 0) {
		var aSelection;
		aSelection = globals.translation.split('\n');
		// Add some semolicons!
		for (var i in aSelection) {
			aSelection[i] = "'" + aSelection[i] + "'";
		}

		if (globals.sb_gTranslationPartial) {
			var bSelection = globals.sb_gTranslationPartial.split('\n')
			// Add some semolicons!
			for (i in bSelection) {
				bSelection[i] = "'" + bSelection[i] + "'";
			}
		}
//		var vSelString = aSelection.join(', ');
//		if (globals.sb_gTranslationPartial && bSelection.length > 0) {
//			vSelString += ", " + bSelection.join(', ');
//		}

		var vSQL = "SELECT pk FROM verse_translations WHERE \
			  		transl_text IS NOT NULL AND transl_text!='' \
			  		AND (delete_chk is null OR delete_chk = 0) \
			  		AND verse_id = " + globals.selected_verse_id + " GROUP BY pk, translation_book_id ORDER BY pk, translation_book_id";

		forms.verse_translation_Edit_dlg.foundset.loadRecords(vSQL)
		databaseManager.setAutoSave(false);
		forms.verse_translation_Edit_dlg.foundset.sort("translation_book_id, transl_order ASC")

		// Show the dialog
		var vDialog = application.createWindow("verse_translation_Edit_dlg", JSWindow.MODAL_DIALOG, null);
		vDialog.title = "i18n:cvb.title.editverse";
		vDialog.setInitialBounds(-1, -1, -1, 500);
		vDialog.show("verse_translation_Edit_dlg");

	}
}

/**
 * @properties={typeid:24,uuid:"34f91d62-ddc4-41dd-9914-d10ed877c9cc"}
 */
function BTN_translation() {
	globals.translation2 = globals.translation	
	globals.sb_gTranslationPartial2 = globals.sb_gTranslationPartial

	// Show the dialog
	var vDialog = application.createWindow("verse_translation_select", JSWindow.MODAL_DIALOG, null);
	vDialog.title = "i18n:btn_choosetranslation";
	vDialog.setInitialBounds(-1, -1, -1, -1);
	vDialog.show("verse_translation_select");

}

/**
 * @properties={typeid:24,uuid:"4b0bd44a-7a5b-49de-b7c9-d3ce282d4b31"}
 */
function init() {
	//Fix so the ctrl-L funct in dev doesn't give a error
	globals.sb_gDEVFix();
	if (globals.sb_APP_getServerLang() == "NL") {
		
		var vUserTranslations = globals.getUserSetting("translations"); //SMM - 16-06-2011
		if (vUserTranslations) globals.translation = vUserTranslations 
		else globals.translation = 'SV\nNBG\nNBV'
		
		var vUserTranslationsPartial = globals.getUserSetting("translation_partial"); //SMM - 16-06-2011
		if (vUserTranslationsPartial) globals.sb_gTranslationPartial = vUserTranslationsPartial  
		
	} else {
		var vUserTranslations = globals.getUserSetting("translations"); //SMM - 16-06-2011
		if (vUserTranslations) globals.translation = vUserTranslations 
		else globals.translation = 'RVR09'
	}
}

/**
 * @properties={typeid:24,uuid:"cd7276c3-0135-4ae0-a8d5-05addc8c7190"}
 */
function newWindow() {
	//SMM - 10-06-2011
	if (!globals.formCountVerseTranslation) {
		globals.form_width = globals.getUserSetting('form_verse_translation_width');
		globals.form_height = globals.getUserSetting('form_verse_translation_height');		
		globals.formCountVerseTranslation = 1;
	} 
	else {	
		globals.formCountVerseTranslation++;		
	}
	
		
	/*
	if (globals.formCount) {
	var success = history.removeForm("d_verse_translation_new" + globals.formCount)
	//removes the named form from this session, please make sure you called history.remove() first
	if(success) {
		solutionModel.removeForm("d_verse_translation_new" + globals.formCount)
		scopes.tools.output("Window child removed "+ "d_verse_translation_new" + globals.formCount);
	}
	else scopes.tools.output("Window child could not removed "+ "d_verse_translation_new" + globals.formCount);
	}
	*/
/*
	var vPrevious_width = null
	var vPrevious_height = null

	if (!globals.formCount) {
		globals.formCount = 1;
	} 
	else {		
		var vPreviousName = 'd_verse_translation_new'  + globals.formCount
		if (solutionModel.getForm(vPreviousName)) {			
			var vPreviousWindow = application.getWindow(vPreviousName) //, JSWindow.DIALOG, null);
			if (vPreviousWindow != null) {
				vPrevious_width = vPreviousWindow.getWidth()
				vPrevious_height = vPreviousWindow.getHeight()
				scopes.tools.output("Window size:" + vPrevious_width + " " + vPrevious_height);
			}			
	        
		 	var success = history.removeForm(vPreviousName)
			if(success) {				
				solutionModel.removeForm(vPreviousName)
				scopes.tools.output("Window child was removed " + vPreviousName);
			 	var _js_baseForm = solutionModel.getForm('d_verse_translation_new')
				if ( _js_baseForm) {
				    //change here the properties		
					//forms['d_verse_translation_new'].controller.recreateUI()					
				}				
			}
			else scopes.tools.output("Window child could not removed " + vPreviousName);
			
		}	 	
		globals.formCount++;		
	}

*/	
	
	
	var newFormName = "d_verse_translation_new_" + globals.formCountVerseTranslation;
	/*
	var _js_baseForm = solutionModel.getForm('d_verse_translation_new')
	_js_baseForm.titleText = newFormName
	_js_baseForm.navigator = SM_DEFAULTS.DEFAULT
*/
	
	application.createNewFormInstance('d_verse_translation_new', newFormName) //SMM - 06-06-2011
	//var _js_baseForm = solutionModel.getForm('d_verse_translation_new')
	//var _js_targetForm = solutionModel.newForm(newFormName, _js_baseForm.serverName, _js_baseForm.tableName, _js_baseForm.styleName, false, _js_baseForm.getBodyPart().height, _js_baseForm.width)
	//_js_targetForm.extendsForm = _js_baseForm

//	application.showFormInDialog(forms.d_verse_translation, -1, -1, 500, 300, 'i18n:cvb.lbl.bibletranslations', true, false, newFormName, false)
	
	var vDialog = application.createWindow(newFormName, JSWindow.DIALOG, null);
	//vDialog.setResizable(true)
	
	if (globals.form_width && globals.form_height){		
		vDialog.setInitialBounds(-1,-1, globals.form_width, globals.form_height)		
	}
	
//	var vBibleBook = application.getValueListDisplayValue('', )
	
	vDialog.title = i18n.getI18NMessage('cvb.lbl.bible_translations') + " - " + globals.book + " " + globals.chapter + ":" + globals.verse;
	vDialog.show(forms[newFormName]);	
	forms[newFormName].controller.recreateUI()
	
}

/**
 * @properties={typeid:24,uuid:"ee19a805-0647-472d-b189-19789576f019"}
 */
function printForm() {
	globals.sb_print_bibleTranslations = 1

	var vDialog = application.createWindow('printDLG', JSWindow.MODAL_DIALOG);
	vDialog.setInitialBounds(-1, -1, -1, -1);
	vDialog.title = "i18n:cvb.lbl.print";
	vDialog.show(forms.print_words_dlg);
}

/**
 * @properties={typeid:24,uuid:"3e3e16c9-c00a-4b57-8926-b5e37def1d05"}
 */
function viewTranslationsForSelectedVerse() {
	//TODO: Check if this method is used, for now, return true and code is commented.
	return true;

	/*
	 forms.fill_verse_translation.foundset.clearFoundSet()
	 globals.verse_translation = ''
	 globals.verse_translation = globals.verse_translation.concat('<html><body><table>')
	 if (globals.selected_verse_id > 0) {
	 var aSelection;
	 aSelection = globals.translation.split('\n');
	 // Add some semolicons!
	 for (i in aSelection) {
	 aSelection[i] = "'" + aSelection[i] + "'";
	 }

	 if (globals.sb_gTranslationPartial) {
	 var bSelection = globals.sb_gTranslationPartial.split('\n')
	 // Add some semolicons!
	 for (i in bSelection) {
	 bSelection[i] = "'" + bSelection[i] + "'";
	 }
	 }
	 var vSelString = aSelection.join(', ');
	 if (globals.sb_gTranslationPartial && bSelection.length > 0) {
	 vSelString += ", " + bSelection.join(', ');
	 }

	 var vSQL = "SELECT list(transl_text,'<br>' ORDER BY translation_book_id), translation_book_id FROM verse_translations"
	 + " INNER JOIN translation_books ON verse_translations.translation_book_id = translation_books.pk WHERE "
	 + "translation_book_id IN ( SELECT pk FROM translation_books WHERE code IN ("+vSelString+") ORDER BY nt_order ASC) "
	 + "AND transl_text IS NOT NULL AND transl_text!='' AND verse_id = "+globals.selected_verse_id
	 + " GROUP BY translation_books.nt_order, translation_book_id"
	 + " ORDER BY translation_books.nt_order, translation_book_id"

	 var res = databaseManager.getDataSetByQuery('sb', vSQL, null, -1)

	 if (res != null) {
	 for (var i = 1; i <= res.getMaxRowIndex(); i++) {
	 res.rowIndex = i
	 var resTR = databaseManager.getDataSetByQuery('sb', 'select code from translation_books where pk=' + res.getValue(i, 2), null, 10000)
	 resTR.rowIndex = 1
	 if (res.getValue(i, 1) != '<br>') {
	 globals.verse_translation = globals.verse_translation.concat('<TR><TD><B>')
	 globals.verse_translation = globals.verse_translation.concat(resTR.getValue(1, 1))
	 globals.verse_translation = globals.verse_translation.concat('</B>  ')
	 globals.verse_translation = globals.verse_translation.concat(res.getValue(i, 1));
	 globals.verse_translation = globals.verse_translation.concat('</TD></TR>')
	 }
	 }
	 } else {
	 globals.verse_translation = ''
	 }

	 }

	 globals.verse_translation = globals.verse_translation.concat('</table></body></html>')
	 //forms.verse_translation.controller.show()
	 //forms.sb_form.controller.show()
	 */
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B331B444-E8E6-4944-ADA9-EE455A5D4EA0"}
 */
function BTN_copyTranslations(event) {
	forms.sb_copyTranslations_dlg.verse_from = globals.verse;
	forms.sb_copyTranslations_dlg.verse_to = globals.verse;
	
	var vWin = application.createWindow('sb_copyTranslations_dlg',JSWindow.MODAL_DIALOG);
	vWin.setInitialBounds(-1, -1, -1, -1);
	vWin.show(forms.sb_copyTranslations_dlg);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F566C06F-FD87-49B6-8FAA-72A495F88C25"}
 */
function BTN_read(event) {
	forms.web_sb_read.fv_title = i18n.getI18NMessage('cvb.lbl.bible_translations');
	forms.web_sb_read.fv_html = calc_verse_transl;
	forms.web_sb_read.fv_print = null;
	
	forms.web_sb_form.elements.tab_notes.tabIndex = 4;
	forms.web_sb_form.elements.tab_notes.visible = true;
}
