/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"19A0B507-0791-4818-8B86-30CC979FCFC0"}
 * @AllowToRunInFind
 */
function BTN_toSearchFrm(event) {
	forms.search_book_frm.controller.show();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D4B12A2C-932D-4851-82CE-0486AC5EAA06"}
 * @AllowToRunInFind
 */
function BTN_back(event) {
	forms.study_words_frm.controller.show();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"F8547F8F-D3D4-41D5-8E6D-AE3081E5FAE6"}
 * @AllowToRunInFind
 */
function EVENT_onShow(firstShow, event) {
	var vTempObj = {};
		vTempObj.do_search = true;
		vTempObj.search_column = 'pk';
		vTempObj.search_value = pk;
		vTempObj.form = event.getFormName();
	globals.gHistory.push(vTempObj);
	vTempObj = null;
	
	plugins.WebClientUtils.setExtraCssClass(elements.text, 'ws')
	
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"63EB3B9D-A94B-45AB-9760-5D5E7FB06E78"}
 */
function EVENT_onRecordSelection(event) {
	EVENT_onShow(null, event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A9FC75F4-233A-4B75-B69C-73D74B50BD94"}
 * @AllowToRunInFind
 */
function BTN_toSearchForm(event) {
	forms.search_book_frm.EVENT_doSearch(null, '', event);
	forms.search_book_frm.controller.show();
}
