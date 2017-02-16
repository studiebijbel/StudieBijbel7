/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"75270D80-6E0D-438D-A149-120C19EBD147"}
 */
var f_results = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F2E6C88B-BAE5-40B7-AD24-3F9892A921A5"}
 */
var f_plaintext = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5051BA42-7C40-4412-BB1B-E124FABFA5D4"}
 */
var f_article = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BE2096F8-E469-4D45-A6F1-99E2B82905BE"}
 */
var f_author = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"01F06E27-F902-4134-B86F-615A06018325"}
 */
var f_articleshortname = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7BD5DED0-EC3F-4859-A7C5-668F81F208CE"}
 */
var f_articlename = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"72CEBA80-C633-40E7-B66E-6E8A80AAC648"}
 */
function BTN_browse(event) {
	var vFileName = plugins.file.showFileOpenDialog(1);
	elements.btn_next.enabled = false;
//	f_filename = vFile;

	f_results = "";
	
	if(!vFileName)
	{
		f_results = "No file selected";
		return false
	}
	
	var vFile = plugins.file.readTXTFile(vFileName);
	var vError = 0
	
	
	// check if the headers are there!
	// Header Part
	if(!vFile.match(/==== HEADER ====/i))
	{
		f_results += "Header is missing\n";
		vError++;
	}
	
	if(!vFile.match(/title=/i))
	{
		f_results += "Title is missing\n";
		vError++;
	}
	
	if(!vFile.match(/shorttitle=/i))
	{
		f_results += "Shorttitle is missing\n";
		vError++;
	}
	
	if(!vFile.match(/author=/i))
	{
		f_results += "Author is missing\n";
		vError++;
	}
	
	if(!vFile.match(/books=/i))
	{
		f_results += "Books is missing\n";
		vError++;
	}
	
	if(!vFile.match(/booksintro=/i))
	{
		f_results += "Booksintro is missing\n";
		vError++;
	}
	// Article part
	if(!vFile.match(/==== ARTICLE ====/i))
	{
		f_results += "Header is missing\n";
		vError++;
	}
	
	// Footnotes part
	if(!vFile.match(/==== FOOTNOTES ====/i))
	{
		f_results += "Footnotes is missing\n";
		vError++;
	}

	if(vError == 0)
	{
		elements.btn_next.enabled = true;
		return true;
	} else {
		f_results = i18n.getI18NMessage("i18n:cvb.lbl.importfileincorrect") + "\n\n" + f_results;
		return false
	}
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7E7D1FA5-5CC2-4B78-BCAE-C5C550BA629D"}
 */
function BTN_openExample(event) {
	// TODO Auto-generated method stub
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E92B4CEF-503B-45B1-9C6F-AF4B88A19B32"}
 */
function BTN_back(event) {
	forms.import_articleWizard_dlg.elements.steps.tabIndex = 1;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FCF3D123-D4A4-4385-9B61-A6965B32A4FB"}
 */
function BTN_next(event) {
	forms.import_articleWizard_dlg.elements.steps.tabIndex = 3;
}
