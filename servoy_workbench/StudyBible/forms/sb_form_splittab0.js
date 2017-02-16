
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0806ACF0-154C-4FE1-8E8D-D38AFE8BDABB"}
 */
function onShow(firstShow, event) {
	elements.tabs_135.dividerSize = 5;
}

/**
 * Callback method when the user changes tab in a tab panel or divider position in split pane.
 *
 * @param {Number} previousIndex index of tab shown before the change
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9B0C2E8B-9AB0-411F-954B-C106F9C4550F"}
 */
function onTab135_Change(previousIndex, event) {
	//SMM 11-11-2011
	globals.setUserSetting("tabs_135_dividerLocation",elements.tabs_135.dividerLocation);	
	databaseManager.saveData();
}
