/**
 * @properties={typeid:24,uuid:"74554E8D-DF2D-47B9-9930-972A75C4432C"}
 */
function BTN_cancel()
{
//databaseManager.rollbackEditedRecords()
databaseManager.revertEditedRecords();
//application.closeFormDialog()
//SMM - 23-05-2010
var win = controller.getWindow()
if (win) {
	win.hide()
}

}

/**
 * @properties={typeid:24,uuid:"B6171776-3243-4225-99B0-727C0E910A34"}
 */
function BTN_save()
{
//databaseManager.saveData()
// Edit by rickbonkestoter
// On 12th januari 2010. 
globals.sb_edit_WordsTranslationToHTML_nt( forms.study_words_edit_nt.verse_id )
databaseManager.saveData();
//application.closeFormDialog()
//SMM - 23-05-2010
var win = controller.getWindow()
if (win) {
	win.hide()
}

}
