
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B9CD46FB-911F-4F21-AC01-DDD0FF3670EA"}
 */
function btnSave(event) {
	databaseManager.saveData(foundset);
	controller.getWindow().hide();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"63821F07-9A40-4344-8715-B99C94DAA9C3"}
 */
function btnCancel(event) {
	databaseManager.revertEditedRecords(foundset);
	controller.getWindow().hide();
}
