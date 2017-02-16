/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EB8733AE-8EDA-418A-931E-7CF48F929CA5"}
 */
var fv_html = null;


/**
 * @properties={typeid:24,uuid:"769C6026-5D66-4414-9C8A-6EC75E9AB647"}
 */
function EVENT_details(verse_id) {    
	globals.selected_verse_id = verse_id;
	globals.viewVerse(verse_id)
}

/**
 * @properties={typeid:24,uuid:"B05A2742-7D69-4E3A-9350-7993958E836B"}
 * @AllowToRunInFind
 */
function EVENT_commentaryNotes(usernote_id) {
	 if (!globals.pinkenelis) {
			globals.pinkenelis = 1;
		} else {
			globals.pinkenelis++;
		}

		application.createNewFormInstance('usernotes_dtl', 'usernotes_dtl_' + globals.pinkenelis)
		if (forms['usernotes_dtl_' + globals.pinkenelis].foundset.find()) {
			forms['usernotes_dtl_' + globals.pinkenelis].foundset.usernote_id = usernote_id
			forms['usernotes_dtl_' + globals.pinkenelis].foundset.search();
		}
		
		var vSQL = "SELECT usernote_id FROM usernotes WHERE user_id = ?";
		forms.web_sb_usernotes_tab.foundset.loadRecords(vSQL, [globals.sb_gCurrentUserID]);
		
		var vRec;
		// We should use the new 'NOTE' viewer
		for(var i = 1; i <= forms.web_sb_usernotes_list.foundset.getSize(); i++) {
			vRec = forms.web_sb_usernotes_list.foundset.getRecord(i);
			if(vRec.usernote_id == usernote_id) {
				forms.web_sb_usernotes_list.foundset.setSelectedIndex(i);
				
				forms.web_sb_form.elements.tab_notes.tabIndex = 1;
				forms.web_sb_form.elements.tab_notes.visible = true;
				return true;
			}
		}
		return false;
//		var vForm = application.createWindow('note_detail_'+globals.pinkenelis, JSWindow.DIALOG, null);
//		vForm.title = 'i18n:cvb.lbl.usernotes_dtl';
//		//vForm.setInitialBounds(20,10,300,200)
//		vForm.show(forms['usernotes_dtl_' + globals.pinkenelis]);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param word_strong
 * @param study_version
 *
 * @properties={typeid:24,uuid:"6952E717-9E4C-498D-8198-32EDA711AF4F"}
 */
function EVENT_showWordStudy(word_strong, study_version)
{
	globals.myWordStudyID = word_strong
	
	// addition, we also need
	var vArgs = [];
	if(word_strong.match(/OT/))
	{
		vArgs.push('Old');
	} else {
		vArgs.push('New');
	}
	
	
	// we shouldn't use the default key!
	// var vSQL = "SELECT version_key, version_abbr FROM word_study_version WHERE version_testament = ? AND version_default = 1";
	
	// we need the word study version in-order to open the correct wordstudy
	vArgs.push(study_version);
	
	var vSQL = "SELECT version_key, version_abbr FROM word_study_version WHERE version_testament = ? AND version_key = ?";
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, vArgs, 1);
	
	globals.wlink( word_strong , null, vDS[0]['version_key'], vDS[0]['version_abbr']);
	
	
	forms.word_study.BTN_read(null);
	
}
