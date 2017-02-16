/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"993D8C54-E6B5-45E4-BCC0-9EF249BBBD1E",variableType:12}
 */
var fv_searchCrit = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ED7CDF51-DDBC-4D76-8259-E465E3CCD6AE",variableType:12}
 */
var fv_dataset = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CDAF2F44-E94A-405A-906E-AE88DD64DD4C",variableType:4}
 */
var fv_form_index;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EEFFB20D-7172-46C9-937A-E4BB0ED65A72",variableType:12}
 */
var fv_form_to = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"4E673EF4-7D49-480B-B212-5049F193FD9E"}
 */
function BTN_select(event) {
	var vRec = forms[fv_form_to].foundset.getRecord(fv_form_index);
	vRec.book_id = pk;
	vRec.bookname = book_name;
	vRec.calc_good = null;
	databaseManager.saveData();
	databaseManager.recalculate(forms[fv_form_to].foundset);
	controller.getWindow().hide();
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
 * @properties={typeid:24,uuid:"F1C8F5C2-EFAC-4C65-A57A-AE258279CA8F"}
 * @AllowToRunInFind
 */
function BTN_search(oldValue, newValue, event) {
	if(foundset.find())
	{
		book_name = '%' + newValue + '%';
		foundset.search();
	}
	return true
}
