/**
 * @properties={typeid:24,uuid:"C53053E5-6454-4AD8-8F43-9DC7A70B379F"}
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
 * @properties={typeid:24,uuid:"A64FF094-EC03-4B39-9994-D49A009ADF4F"}
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
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"23B0E465-AB6E-4FD6-9267-B5CC29F6ED07"}
 */
function KEY_onDataChange(oldValue, newValue, event) {
	
	if(newValue != oldValue)
	{
		var vQuestion = plugins.dialogs.showQuestionDialog("Bevestig uw besluit","Weet u zeker dat u de SLEUTEL wilt veranderen? Alle woordstudies aan deze sleutel zullen NIET MEER zichtbaar zijn.","Ja", "Nee");
		if(vQuestion == "Ja")
		{
			return true;
		} else {
			version_key = oldValue;
			return true;
		}
	}
	
	return true
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"31480BCA-36D4-4BCA-A8E9-437CCE4E9482"}
 * @AllowToRunInFind
 */
function EVENT_onDataChangeStandard(oldValue, newValue, event) {
	
	var vCurRecord = foundset.getSelectedRecord();
	var vTestament = vCurRecord.version_testament;
	
	var vFS = foundset.duplicateFoundSet();
	
	if(vFS.find())
	{
		vFS.version_testament = vTestament;
		vFS.search();
	}
	
	var vRec;
	for(var i = 1; i <= vFS.getSize(); i++)
	{
		vRec = vFS.getRecord(i);
		
		vRec.version_default = 0;
		
		if(vRec.word_study_version_id == vCurRecord.word_study_version_id)
		{
			vRec.version_default = 1;
		}
	}
	
	return true
}
