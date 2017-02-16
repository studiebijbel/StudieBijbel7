
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CF38064D-E1D1-43C9-B856-A606C1917377"}
 */
function onShow(firstShow, event) {
	elements.tabs_101.dividerSize = 5;
}

/**
 * Callback method when the user changes tab in a tab panel or divider position in split pane.
 *
 * @param {Number} previousIndex index of tab shown before the change
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"85713403-9BC8-467E-8BAB-E7C1B742A013"}
 */
function onTab101_Change(previousIndex, event) {
	//SMM 11-11-2011
	globals.setUserSetting("tabs_101_dividerLocation",elements.tabs_101.dividerLocation);	
	databaseManager.saveData();
	return true;
}
