/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9D7DFB1C-BACE-4DA8-B777-7644F9DD0977"}
 */
var searchField = null;

/**
 * @properties={typeid:24,uuid:"92718a5d-45dc-4276-9e28-3551cae002bc"}
 */
function BTN_close()
{
databaseManager.saveData();
//application.closeFormDialog()
//SMM - 23-05-2010
var win = controller.getWindow()
if (win) {
	win.hide()
}
}

/**
 * @properties={typeid:24,uuid:"e44034da-ea40-43b1-96d7-dc7dc45023ca"}
 */
function onShow()
{
foundset.loadAllRecords()
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C18CCFFE-26FA-4D32-8791-67C7D44D4E19"}
 * @AllowToRunInFind
 */
function doSearch(oldValue, newValue, event) {
	if(foundset.find())
	{
		book_name = newValue+"%"
		foundset.newRecord();
		abbreviation = newValue+"%";
		foundset.search(true , false);
	}
	return true
}
