/**
 * @properties={typeid:24,uuid:"9C4062E0-11FE-4DF5-A821-E69EC8EF35D6"}
 */
function BTN_delete()
{
var vQuestion = plugins.dialogs.showQuestionDialog('i18n:cvb.btn.delete', 'i18n:cvb.lbl.deleteMessage', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');

if(vQuestion == i18n.getI18NMessage('i18n:cvb.btn.yes'))
{
	controller.deleteRecord();
}
}

/**
 * @properties={typeid:24,uuid:"DC0C2ADA-37A7-4253-B9F9-C966D4264B4A"}
 */
function BTN_new()
{
/** @type JSRecord<db:/sb/book_inleiding> */
var vRecord = foundset.getRecord(foundset.newRecord());
//databaseManager.saveData()
vRecord.book_id = globals.sb_edit_book_2;

}
