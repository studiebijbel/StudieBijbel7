
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"93F735BF-FA50-4293-892E-5779EF5161DF"}
 */
function BTN_new(event) {
	foundset.newRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"49A34866-A214-4FD2-8C2D-1F97CC5D68CC"}
 */
function BTN_delete(event) {
	foundset.deleteRecord(foundset.getSelectedIndex());
}
