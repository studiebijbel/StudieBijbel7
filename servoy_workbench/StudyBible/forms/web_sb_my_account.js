
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"81B811E8-B470-4849-867A-8D4FC533D6ED"}
 */
function BTN_closeWindow(event) {
	forms.web_sb_form.elements.html_usermenu.visible = false;
	forms.web_sb_form.elements.tab_notes.visible = false;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"623AFC44-8AF0-4A85-82C6-BCE75E664B14"}
 */
function EVENT_onShow(firstShow, event) {
	// Set autosave to false!
	databaseManager.setAutoSave(false);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EBD74E08-F4D8-4951-A4F6-E21DA3C1979D"}
 */
function BTN_saveData(event) {
	// Manually save the data
	databaseManager.saveData();
	
	BTN_closeWindow(event);
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"952861D0-FE85-472B-9C08-589846EDF9C2"}
 */
function onLoad(event) {
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.student_group.visible = false;
		elements.iban_group.visible = false;
	}
}
