/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"32439F2B-1D6A-4A46-8334-F2966C052919"}
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
 * @properties={typeid:24,uuid:"06C6DA9C-7A1B-4C6E-96BB-FA33E59199A8"}
 */
function BTN_delete(event) {
	foundset.deleteRecord(foundset.getSelectedIndex());
}
