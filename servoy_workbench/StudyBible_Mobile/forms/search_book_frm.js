/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"16EEC71A-10E3-443C-9BC7-92BCDC562FF4"}
 */
var fv_markup = "";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A7B7D0BC-65E5-42ED-9046-F01FF9B3E066"}
 */
var fv_search = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DEE30A42-BEC4-47F3-9513-FF6CC1030FCD",variableType:4}
 */
var fv_selected = 0;

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"FA9D1D6F-A945-4E07-849C-D388E2EA36F0"}
 * @AllowToRunInFind
 */
function EVENT_doSearch(oldValue, newValue, event) {
	// perform the search
	if(forms.search_tbl.foundset.find())
	{
		forms.search_tbl.book_name = '#%' + newValue + '%';
		forms.search_tbl.foundset.search();
	}
	return true
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"86643DBE-8A7E-4205-BA05-795993ABC2AF"}
 * @AllowToRunInFind
 */
function EVENT_onShow(firstShow, event) {
}

/**
 * Handle focus gained event of the element.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A22EA29F-840E-405B-8D88-B94641831D8E"}
 * @AllowToRunInFind
 */
function onFocusGained(event) {
}

/**
 * Handle focus lost event of the element.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"946699E1-ACF7-4E81-990C-C2E75EABA307"}
 * @AllowToRunInFind
 */
function onFocusLost(event) {

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E072FFD3-7D57-4FB5-B819-8DEB491DE37C"}
 */
function BTN_info(event) {
	// Goto the "info" form
	forms.info_frm.controller.show();
}
