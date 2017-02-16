
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"87B910BD-6917-4340-B0B3-A5E3673C070C"}
 */
function onShow(firstShow, event) {
	elements.tabs_70.dividerSize = 5;
}

/**
 * Callback method when the user changes tab in a tab panel or divider position in split pane.
 *
 * @param {Number} previousIndex index of tab shown before the change
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"597BDD48-08A3-40F4-ACC8-537B6E15F978"}
 */
function onTab70_Change(previousIndex, event) {
	//SMM 11-11-2011
	globals.setUserSetting("tabs_70_dividerLocation",elements.tabs_70.dividerLocation);	
	databaseManager.saveData();
	return true;
}
