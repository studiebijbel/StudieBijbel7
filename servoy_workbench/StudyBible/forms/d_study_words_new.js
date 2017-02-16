/**
 * @properties={typeid:24,uuid:"50A39B52-333B-44B2-985F-94EAF83D789C"}
 */
function FORM_onShow()
{
//var  vp = elements.bean_452.viewport
//vp.add(elements.bean_485)

var vSQL = "SELECT pk FROM verses WHERE pk =?"

foundset.loadRecords( vSQL,  [globals.selected_verse_id])
}

/**
 * @properties={typeid:24,uuid:"C854F868-E371-49E8-87FD-3AA52BAEBC96"}
 */
function printen()
{
forms.d_study_words.controller.print() 
}

/**
 * @properties={typeid:24,uuid:"870443E1-25C0-46C7-849F-5AB8703059AB"}
 */
function printForm()
{
/*
application.closeFormDialog();

forms.study_words.printForm();*/

forms.study_words.printForm();
}

/**
 * @properties={typeid:24,uuid:"2E370DC8-A4D4-4B18-9B1C-915AE48AA623"}
 */
function viewWords()
{
	//application.closeFormDialog(true)
	//SMM - 23-05-2010
//	var win = controller.getWindow(u)
//	if (win) {
//		win.close()
//	}
//	
//	forms.study_words.viewWordsForSelectedVerse();
//
//	forms.study_words.newWindow();

}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DF52C8A3-4E23-4D05-B204-8E36FAD81351"}
 */
function onResize_FORM(event) {
	//SMM 10-06-2011	
	var vWin = application.getWindow(event.getFormName())	
	if (vWin != null) {
		globals.form_study_width = vWin.getWidth()
		globals.form_study_height = vWin.getHeight()		
	}
	
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"DC1944E6-8678-47F1-9979-C2A82E03303A"}
 */
function onHide_FORM(event) {
	//SMM - 14-06-2011	
	if (globals.form_study_width && globals.form_study_height){
		globals.setUserSetting('form_study_words_width',globals.form_study_width)
		globals.setUserSetting('form_study_words_height',globals.form_study_height)
	}
	return true
}
