/**
 * @properties={typeid:24,uuid:"19F0AF03-6D23-4555-9AC8-BD352DA33274"}
 * @AllowToRunInFind
 */
function BTN_showDetails()
{

	 if (!globals.pinkenelis) {
		globals.pinkenelis = 1;
	} else {
		globals.pinkenelis++;
	}

	application.createNewFormInstance('usernotes_dtl', 'usernotes_dtl_' + globals.pinkenelis)
	if (forms['usernotes_dtl_' + globals.pinkenelis].foundset.find()) {
		forms['usernotes_dtl_' + globals.pinkenelis].foundset.usernote_id = foundset.usernote_id
		forms['usernotes_dtl_' + globals.pinkenelis].foundset.search();
	}
	
	var vForm = application.createWindow('note_detail_'+globals.pinkenelis, JSWindow.DIALOG, null);
	vForm.title = 'i18n:cvb.lbl.usernotes_dtl';
	//vForm.setInitialBounds(20,10,300,200)
	vForm.show(forms['usernotes_dtl_' + globals.pinkenelis]);
	
//SMM 20-06-2011
//forms.usernotes_dtl.foundset.loadRecords("SELECT usernote_id FROM usernotes WHERE usernote_id = ?", [usernote_id]);
/*forms.usernotes_read_mode_dtl.foundset.loadRecords("SELECT usernote_id FROM usernotes WHERE usernote_id = ?", [usernote_id]);
	
//application.showFormInDialog( forms.usernotes_dtl, -1, -1, -1, -1, 'i18n:cvb.lbl.usernotes_dtl', false, false, 'datail', true)
//SMM 20-05-2011
var vForm = application.createWindow('usernotes_read_form', JSWindow.MODAL_DIALOG, null);
vForm.title = 'i18n:cvb.lbl.usernotes_dtl';
vForm.show(forms.usernotes_read_mode_dtl);
*/

}
