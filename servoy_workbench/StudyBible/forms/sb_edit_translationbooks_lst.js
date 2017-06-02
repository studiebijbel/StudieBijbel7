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

/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"5759758A-5660-4EF5-9F78-D4D7808C6EC5"}
 */
function EVENT_setDefault(oldValue, newValue, event) {
	
	var vSelectedRecord = foundset.getSelectedRecord();
	
	for(var i = 1; i <= foundset.getSize(); i++) {
		var vRecord = foundset.getRecord(i);
		vRecord.default_book = 0;
	}
	
	vSelectedRecord.default_book = 1;
	
	databaseManager.saveData(foundset);
	
	return true
}
