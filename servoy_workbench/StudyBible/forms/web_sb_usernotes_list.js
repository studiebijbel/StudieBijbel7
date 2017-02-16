/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"413A5458-0B95-4468-9317-C4793B4561FE"}
 */
var fv_search_text = "";
/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"E098BD01-FC02-48C5-B122-910193EE8520"}
 * @AllowToRunInFind
 */
function EVENT_onDataChange(oldValue, newValue, event) {
	
	if(fv_search_text != null && fv_search_text.length > 0) {
		elements.clear.visible=true;
	} else {
		elements.clear.visible=false;
	}
	
	if(foundset.find()) {
		showname = "#%"+fv_search_text+"%";
		user_id = globals.sb_gCurrentUserID;
		foundset.newRecord();
		usernote_description = "#%"+fv_search_text+"%";
		user_id = globals.sb_gCurrentUserID;
//		foundset.newRecord();
//		usernote_note = "#%"+fv_search_text+"%";
//		user_id = globals.sb_gCurrentUserID;
		var vCount = foundset.search();
	}
	
	if(vCount == 0) {
		var vSQL = "SELECT usernote_id FROM usernotes WHERE user_id = ?";
		forms.web_sb_usernotes_tab.foundset.loadRecords(vSQL, [globals.sb_gCurrentUserID]);
	}
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"41DF5028-6D10-4C17-B660-F1A0D647EF5B"}
 */
function EVENT_clearInput(event) {
	fv_search_text = null;
	EVENT_onDataChange(null, null, event);
}
