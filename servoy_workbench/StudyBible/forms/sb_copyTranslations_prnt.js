/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"680FEF41-B175-4466-A7E6-27541B82BE42"}
 */
var print = null;

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"66461423-A844-41E3-ABBD-2645A47A0FA4"}
 */
function onDataChange(oldValue, newValue, event) {
//	
//	if(event.getElementName() == "text_translation")
//	{
//		var partial = "";
//	} else {
//		var integral = "";
//	}
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"77D99BA0-ACD3-414D-AA76-DF565D762DB4"}
 */
function BTN_getVerses(event) {
//	var vSQL = "SELECT\
//				    vt.*\
//				FROM\
//				    verse_translations AS vt\
//				INNER JOIN verses AS v ON vt.verse_id = v.pk\
//				WHERE\
//				    vt.translation_book_id = ? \
//				AND\
//				        vt.verse_id IN (SELECT pk FROM verses AS v WHERE (v.calc_book_name = ? AND v.chapter_number = ? AND (v.verse_number >= ? AND  v.verse_number <= ?)) ORDER BY v.verse_number ASC)\
//				ORDER BY v.verse_number ASC";

//	var vDS = databaseManager.getDataSetByQuery('sb',vSQL, [parseInt(integral), globals.book, globals.chapter, parseInt(verse_from), parseInt(verse_to)], -1);
	
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"615FA197-63B8-46AB-8659-88F39C223D43"}
 */
function BTN_showHelp(event) {
	var vWin = application.createWindow("cvb_tips", JSWindow.MODAL_DIALOG);
	vWin.title = "Tips";
	vWin.resizable = false;
	vWin.setInitialBounds(-1, -1, -1, -1);
	vWin.show(forms.cvb_tips);
}
