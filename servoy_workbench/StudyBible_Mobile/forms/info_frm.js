/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"43325196-7C98-4DE8-B5B2-F3ADB2CA36A1"}
 * @AllowToRunInFind
 */
function BTN_toSearchFrm(event) {
	// back to the book selection screen.
	forms.search_book_frm.controller.show();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"510356ED-14CA-42BD-9E5D-51D776012DE4"}
 */
function BTN_gotoSite(event) {
	// An webclient clientside js execution for window.location.href.
	plugins.WebClientUtils.executeClientSideJS("window.location.href='http://www.studiebijbel.nl'");
}
