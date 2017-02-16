/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1A0A3F84-9515-44D7-AD51-81A503105FD5",variableType:4}
 */
var translation_C = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7181C41B-2B4D-49AF-A9BB-2C56FCD44BC8"}
 */
function BTN_cancel(event) {
	translation_C = null;
	controller.getWindow().hide();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"34518A26-6085-409E-8283-819B4B6602B2"}
 */
function BTN_save(event) {
	
	if(translation_C != '')
	{
		var vVerseID = globals.verse_id;
		var vTranslID = translation_C;
		
		var vRecord = forms.verse_translation_Edit_dlg.foundset.getRecord(forms.verse_translation_Edit_dlg.foundset.newRecord());
		vRecord.verse_id = vVerseID;
		vRecord.verse_order = 1;
		vRecord.translation_book_id = vTranslID;
	}
	
	BTN_cancel(event);
}
