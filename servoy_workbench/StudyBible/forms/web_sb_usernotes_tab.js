
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E4720311-30E4-4357-8270-79808A33DE62"}
 */
function BTN_home(event) {
	forms.book_comment.EVENT_onRecordSelection();
	forms.web_sb_form.elements.tab_notes.visible = false;
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3726F9E8-9238-477C-94B2-12F12833F210"}
 */
function EVENT_onLoad(event) {

}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A81DFD29-274F-42F9-A0FF-3DD8F270A944"}
 */
function EVENT_onHide(event) {
	return true
}
