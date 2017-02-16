/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E31ABBC1-99C7-4992-BED2-39D0F82DB53F"}
 */
var html = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"51A535CD-ADC2-4BF4-98CC-FBB2DEA8F0C5"}
 */
function btnCloseWindow(event) {
	var vWindow = application.getWindow('sb_edit_EditCommentaryBlocks_preview');
	vWindow.hide();
}
