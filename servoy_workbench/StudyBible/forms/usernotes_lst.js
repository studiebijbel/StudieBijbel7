/**
 * @properties={typeid:24,uuid:"CAAB53BA-595E-413B-B8F6-539EF90F3C22"}
 */
function BTN_delete()
{
var vQuestion = globals.DIALOGS.showQuestionDialog( i18n.getI18NMessage('cvb.lbl.deleteMessage'),  i18n.getI18NMessage('cvb.lbl.deleteMessage'),  'i18n:cvb.btn.yes',  'i18n:cvb.btn.no')

if(vQuestion == i18n.getI18NMessage('cvb.btn.yes'))
{
	foundset.deleteRecord();
}


}

/**
 * @properties={typeid:24,uuid:"659C80A6-67BD-4C40-89DF-13F9222AAE9C"}
 * @AllowToRunInFind
 */
function BTN_detail()
{
	/* new
	 * 
	 * 
	 */
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
return true;	
	
	//application.showFormInDialog( forms.usernotes_dtl,  -1, -1, -1, -1,  'i18n:cvb.lbl.usernotes_dtl',  false,  false, 'datail', false)
	//SMM 20-05-2011
//	var vForm = application.createWindow('detail', JSWindow.DIALOG, null);
//	vForm.title = 'i18n:cvb.lbl.usernotes_dtl';
//	//vForm.setInitialBounds(20,10,300,200)
//	vForm.show(forms.usernotes_dtl);


}

/**
 * @properties={typeid:24,uuid:"D9BE284D-5147-44EB-93A1-A5EDA0E9F0B3"}
 * @AllowToRunInFind
 */
function BTN_new()
{
/** @type JSRecord<db:/sb/usernotes> */
var vRecord = foundset.getRecord(foundset.newRecord());

vRecord.commentary_block_id = globals.commentary_id;
vRecord.user_id = globals.sb_gCurrentUserID;
vRecord.usernote_date = application.getTimeStamp()

databaseManager.saveData();
//application.showFormInDialog( forms.usernotes_dtl,  -1, -1, -1, -1,  '',  false,  false, 'datail', false)
//SMM 20-05-2011
var vForm = application.createWindow('detail', JSWindow.MODAL_DIALOG, null);
vForm.title = '';
if(forms.usernotes_dtl.foundset.find())
{
	forms.usernotes_dtl.foundset.usernote_id = foundset.usernote_id;
	forms.usernotes_dtl.foundset.search();
}
vForm.show(forms.usernotes_dtl);

}

/**
 * @properties={typeid:24,uuid:"89B65C56-1FB0-4827-ABAE-1B2F64A54CF7"}
 */
function BTN_print()
{
globals.sb_print_bibleTranslations = 0
//application.showFormInDialog( forms.print_commentary_dlg,  -1, -1, -1, -1, 'i18n:cvb.lbl.print', false, false, 'printDLG', true)
//SMM 20-05-2011
var vForm = application.createWindow('printDLG', JSWindow.MODAL_DIALOG, null);
vForm.title = 'i18n:cvb.lbl.print';
vForm.show(forms.print_commentary_dlg);


}
