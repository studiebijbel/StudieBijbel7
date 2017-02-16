/**
 * @properties={typeid:24,uuid:"F192338F-7781-419E-BB29-F3D9CBA41DCE"}
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
 * @properties={typeid:24,uuid:"50C5C641-E6EC-4EBE-831B-86A5DB33AD57"}
 */
function BTN_new()
{
/** @type JSRecord<db:/sb/translation_books> */	
var vRecord = foundset.getRecord(foundset.newRecord());
databaseManager.saveData(vRecord);
}
