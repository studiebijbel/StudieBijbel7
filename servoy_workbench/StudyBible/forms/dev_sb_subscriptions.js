
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EE7B523E-874D-46FA-B8D3-64A20176E90C"}
 */
function BTN_new(event) {
	foundset.newRecord();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E40A7936-A8ED-4D11-9E01-31E7F8ABB809"}
 */
function BTN_save(event) {
	databaseManager.saveData(foundset);
}
