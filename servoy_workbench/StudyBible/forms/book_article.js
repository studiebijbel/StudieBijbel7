/**
 * @properties={typeid:24,uuid:"1855F142-2067-4B01-B560-8C55A9D2A080"}
 */
function BTN_add()
{
/** @type JSRecord<db:/sb/book_article> */
var vRecord = foundset.getRecord(foundset.newRecord());
//databaseManager.saveData()
vRecord.book_id = globals.sb_edit_book_1;

}

/**
 * @properties={typeid:24,uuid:"E3CB2256-51DF-4D83-92CD-7F2AA3E6CAD0"}
 */
function BTN_delete()
{
var vQuestion = plugins.dialogs.showQuestionDialog('i18n:cvb.btn.delete', 'i18n:cvb.lbl.deleteMessage', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');

if(vQuestion == i18n.getI18NMessage('i18n:cvb.btn.yes'))
{
	controller.deleteRecord();
}
}
