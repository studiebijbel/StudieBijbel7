/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9D10AA90-612D-4A01-BB3D-B4201E226CA0"}
 */
var fv_method = "cancel";


/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"71B47B45-DB82-493D-9F69-27CD022C7D37"}
 */
function EVENT_onHide(event) {
	if(fv_method === "cancel") {
		databaseManager.revertEditedRecords(foundset);
	} else {
		databaseManager.saveData(foundset);
	}
	
	// Always reset to cancel!
	fv_method = "cancel";
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} method
 *
 * @private
 *
 * @properties={typeid:24,uuid:"ECBCCA8A-589C-4E7B-8B32-05C77E6A1D81"}
 */
function BTN_hideScreen(event, method) {
	fv_method = method;
	controller.getWindow().hide();
}
