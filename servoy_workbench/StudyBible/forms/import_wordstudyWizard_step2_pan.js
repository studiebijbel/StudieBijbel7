/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"83DA4A97-BDA2-44C9-A923-5A7BAE38932F"}
 */
var f_firstline = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0CDB7F80-2685-4B02-A561-9699368F7808"}
 */
var f_html = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"19AD37CF-6E15-4390-8F15-3611435806E8"}
 */
var f_wordstudy_version = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E0662DD6-FD2E-42F2-BA1B-94899D055C53"}
 */
var f_testament = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"99173958-054D-4070-8159-8F2086A23500"}
 */
var f_transliteration = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E1279883-6AFA-4804-9326-CD72435A4B9C"}
 */
var f_original = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0D44FF15-5304-4E5C-86FF-54ADF2263305"}
 */
var f_wordstrong = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FF76D189-8C38-4578-9498-B0BD6E1C3CF9"}
 */
var f_plaintext = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BDB728D5-B1C6-4862-B2B4-3192CBA66476"}
 */
function BTN_openExample(event) {
	// TODO Auto-generated method stub
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2FEFB5FB-34FF-48CC-AF38-5CB78A3A634E"}
 */
function BTN_back(event) {
	forms.import_wordstudyWizard_dlg.elements.steps.tabIndex = 1;
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1B403A61-2F89-4F4C-B1F7-3570C1268D7E"}
 */
function BTN_next(event) {
	
	if(f_testament == "" || f_wordstudy_version == "")
	{
		plugins.dialogs.showErrorDialog("", "Testament and/or version is empty!");
		return false;
	}
	
	// we need to check if the wordstudy version is an valid one!
	var vSQL = "SELECT * FROM word_study_version WHERE version_key = ?";
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, [f_wordstudy_version], -1);
	
	if(vDS.getMaxRowIndex() == 0)
	{
		plugins.dialogs.showErrorDialog("","The version is incorrect! Please select a correct one!");
		return false;
	}
	
	// now also check if this wordstudy already exists withing the version!
	vSQL = "SELECT * FROM word_study WHERE word_strong = ? AND study_version = ?";
	vDS = databaseManager.getDataSetByQuery('sb', vSQL, [f_wordstrong, f_wordstudy_version], -1)

	if(vDS.getMaxRowIndex() >= 1) {
		if(plugins.dialogs.showQuestionDialog("", "Overlap gevonden. Wilt u deze overschrijven?","Ja", "Nee") == "Nee")
		{
			return false;
		}
	}

	
	forms.import_wordstudyWizard_dlg.elements.steps.tabIndex = 3;
	return true;
}
