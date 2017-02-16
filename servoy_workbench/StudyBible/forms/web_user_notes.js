/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"36B19D05-9A3C-4A08-AAC8-21DB59E45478"}
 */
var fv_html = null;


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1BC1FE25-14C2-4912-9E88-9A975AFA7E82"}
 */
function BTN_newNote(event) {
	var vRec = foundset.getRecord(foundset.newRecord());
	vRec.commentary_block_id = forms.book_comment.commentaries_to_verses_to_commentary_blocks.pk
	vRec.user_id = globals.sb_gCurrentUserID;
	
	databaseManager.saveData(vRec);
	
	forms.web_sb_usernotes_list.foundset.loadRecords(vRec.usernote_id);
	forms.web_sb_form.elements.tab_notes.visible = true;
	forms.web_sb_form.elements.tab_notes.tabIndex = 1;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C8A541AD-9B8D-4B44-909B-BAF8AB4EAA48"}
 */
function BTN_openNotes(event) {
	var vSQL = "SELECT usernote_id FROM usernotes WHERE commentary_block_id = ? AND user_id = ?";
	forms.web_sb_usernotes_list.foundset.loadRecords(vSQL, [forms.book_comment.commentaries_to_verses_to_commentary_blocks.pk, globals.sb_gCurrentUserID]);
	forms.web_sb_form.elements.tab_notes.visible = true;
	forms.web_sb_form.elements.tab_notes.tabIndex = 1;
}
