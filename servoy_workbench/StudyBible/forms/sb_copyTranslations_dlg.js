/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BCF856C3-E050-4686-BD37-83599FD3A943",variableType:12}
 */
var partial = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"575CD516-2C4D-4E85-853F-E038EBFD013C",variableType:12}
 */
var integral = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4DE6DC47-776E-4B75-99ED-4CAEFEB7016A",variableType:12}
 */
var verse_to = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"80C7FAD0-3476-41D3-BE79-D1226F84689B",variableType:12}
 */
var verse_from = null;


/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"B929B889-D48F-44C7-A08D-AEF37BC57987"}
 */
function onDataChange(oldValue, newValue, event) {
	
	if(event.getElementName() == "text_translation")
	{
		partial = "";
	} else {
		integral = "";
	}
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EC98890C-98D3-4F57-AC1D-B6B2E20DE5B5"}
 */
function BTN_getVerses(event) {
	var vSQL = "SELECT\
				    bt.book, v.verse_number, vt.*\
				FROM\
				    verse_translations AS vt\
				RIGHT JOIN verses AS v ON vt.verse_id = v.pk\
				RIGHT JOIN translation_books AS bt ON vt.translation_book_id = bt.pk\
				WHERE\
				    vt.translation_book_id = ? \
				AND\
				        vt.verse_id IN (SELECT pk FROM verses AS v WHERE (v.calc_book_name = ? AND v.chapter_number = ? AND (v.verse_number BETWEEN ? AND ?)) ORDER BY v.verse_number ASC)\
				ORDER BY v.verse_number ASC";
	
	var vDS = databaseManager.getDataSetByQuery('sb',vSQL, [parseInt(integral), globals.book, globals.chapter, parseInt(verse_from), parseInt(verse_to)], -1);
	
	var vPrintArray = [], vRecord;
	var vBook = "";
	for(var i = 0; i < vDS.getMaxRowIndex(); i++)
	{
		vRecord = vDS[i];
		if(i == 0) { vBook = vRecord["book"]; }
		vPrintArray.push("<strong>Vers " + vRecord["verse_number"] + "</strong>&nbsp;&nbsp;" + vRecord["transl_text"]);
	}
	
	var vPrintText = "<html><body>" + globals.sb_gTestamentReal + " " + globals.book + " hoofdstuk " + globals.chapter + "<br /><br />Bijbelvertaling <em>"+vBook+"</em><br /><br />" +vPrintArray.join('<br />')+"</body></html>";
	vPrintArray = null;
	
	forms.sb_copyTranslations_prnt.print = vPrintText;
	
	controller.getWindow().hide();
	
	var vWindow = application.createWindow("sb_copyTranslations_prnt", JSWindow.MODAL_DIALOG);
	vWindow.setInitialBounds(-1,-1,-1,-1);
	vWindow.show(forms.sb_copyTranslations_prnt);

	
}
