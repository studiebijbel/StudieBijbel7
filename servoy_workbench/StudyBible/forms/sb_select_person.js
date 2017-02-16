/**
 * @type *
 *
 * @properties={typeid:35,uuid:"29064C34-81AA-47AF-8E3C-AF67B5A3EA32",variableType:-4}
 */
var callback = null;


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0D1771D2-C7B2-4591-889C-7D9E4F2FD1D8"}
 */
function BTN_close(event) {
	controller.getWindow().hide();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"586CB998-6321-4D08-ACBF-DF27AEAF2883"}
 */
function BTN_select(event) {
	var vRec = foundset.getSelectedRecord();
	callback(vRec.sb_contact_id);
	BTN_close(event);
}
