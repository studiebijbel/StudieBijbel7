/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"091F03DE-CAD9-4370-96BC-0B9E561972DB",variableType:-4}
 */
var gHistory = [];

/**
 * Callback method for when solution is opened.
 *
 * @properties={typeid:24,uuid:"BC6AB7A7-E6D3-4892-9D0D-574F5781F77C"}
 */
function MOBILE_onSolutionOpen() {
	application.setUIProperty(APP_WEB_PROPERTY.WEBCLIENT_TEMPLATES_DIR, 'mobile');
	plugins.WebClientUtils.addJsReference("/servoy-webclient/templates/mobile/spinningwheel.js");
	
	if (globals.sb_APP_getServerLang() == "ESP") {
		i18n.setLocale('es', 'Spain');
		application.updateUI(1)
	} else if (globals.sb_APP_getServerLang() == "NL") {
		i18n.setLocale('nl', 'Nederland');
		application.updateUI(1)
	}
	
	// add a table param
	databaseManager.addTableFilterParam('sb','books','testament', '=','New');
	
}

/**
 * @properties={typeid:24,uuid:"E63B276A-B650-40A5-B2F9-2F0B70FE9BC1"}
 */
function sb_APP_getServerLang() {
	var vSQL = "SELECT * FROM sb_servers WHERE lower(server_host) = ?";
	var vDS = databaseManager.getDataSetByQuery('sb_data', vSQL, [application.getServerURL().toLowerCase()], 1);
	
	if(vDS.getMaxRowIndex() > 0) {
		return vDS[0]["server_lang"];
	} else {
		return "NL";
	}
}

/**
 * @param {String} arg
 * @properties={typeid:24,uuid:"AD8CFFB9-F4DC-4E51-BC5C-F24D98D25299"}
 * @AllowToRunInFind
 */
function tlink(arg) {
	if (utils.stringLeft(currentcontroller.getName(), 8) == "sb_edit_") {
		return
	}
	scopes.tools.output(arg);

	var vVerseID = globals.getVerseIdFromTlink(arg);
	forms.search_tbl.EVENT_selected(vVerseID, null);
	
}

/**
 * @param {String} link
 * @properties={typeid:24,uuid:"C43F70BA-82B7-44B2-9ACE-EB65FF29C2EB"}
 */
function getVerseIdFromTlink(link) {
	var match = link.match(/(\d?\s?[A-Z][^\d]+)(?:(\d+)(?::(\d+))?(v+)?(?:[\-–](\d+)(?::(\d+))?)?)?/);

	if (match != null) {
		var abbr = match[1]
		var chap = match[2]
		var chapTo = chap
		if (match[5])
			chapTo = match[5]
		var vers = ""
		if (match[3])
			vers = match[3]
		var versend = vers
		if (match[6])
			versend = match[6]

		//Treat the case of v and vv
		if (match[4])
			versend = '' + (utils.stringToNumber(versend) + match[4].length)

	} else {
		// Match attempt failed
		return new Array()
	}

	switch (abbr) {
	case '1 Cor.':
	case '1Cor.':
		abbr = '1Kor.'
		break;
	case '2 Cor.':
	case '2Cor.':
		abbr = '2Kor.'
		break;
	case 'Col.':
		abbr = 'Kol.'
		break;
	case '1 Thess.':
	case '1Thess.':
		abbr = '1Tes.'
		break;
	case '2 Thess.':
	case '2Thess.':
		abbr = '2Tes.'
		break;
	case 'Jac.':
		abbr = 'Jak.'
		break;
	case '1 Petr.':
	case '1Petr.':
		abbr = '1Pet.'
		break;
	case '2 Petr.':
	case '2Petr.':
		abbr = '2Pet.'
		break;
	case '1 Sam.':
		abbr = '1Sam.'
		break;
	case '2 Sam.':
		abbr = '2Sam.'
		break;
	case '1 Kon.':
		abbr = '1Kon.'
		break;
	case '2 Kon.':
		abbr = '2Kon.'
		break;
	case '1 Kron.':
	case '1Kron.':
		abbr = '1Kr.'
		break;
	case '2 Kron.':
	case '2Kron.':
		abbr = '2Kr.'
		break;
	case 'Esther':
		abbr = 'Est.'
		break;
	case 'Pred.':
		abbr = 'Pr.'
		break;
	case 'Ezech.':
	case 'Ez.':
		abbr = 'Eze.'
		break;
	case 'Obadja':
		abbr = 'Ob.'
		break;
	case 'Micha':
		abbr = 'Mi.'
		break;
	case 'Zef.':
		abbr = 'Sef.'
		break;
	case 'Matt.':
		abbr = 'Mat.'
		break;
	}

	var query = 'select v.pk from verses v, books b, chapters c where b.testament = \'New\' AND v.chapter_id=c.pk and c.book_id=b.pk and b.abbreviation='
	query += '\'' + abbr + '\'' + ' and c.chapter_no>=' + chap + ' and c.chapter_no<=' + chapTo
	if (vers) {
		query += ' and ((v.verse_number>=' + vers + ' and c.chapter_no=' + chap + ') or c.chapter_no>' + chap + ')'

		query += ' and ((v.verse_number<=' + versend + ' and c.chapter_no=' + chapTo + ') or c.chapter_no<' + chapTo + ')'
	}

	if (globals.sb_demo_chk == 1) {
		query += " AND v.demo_chk = 1";
	}

	query += ' order by v.pk'

	var res = databaseManager.getDataSetByQuery('sb', query, null, 50)

	if (res.getMaxRowIndex() > 0) {
		return res.getColumnAsArray(1)
	} else {
		plugins.WebClientUtils.executeClientSideJS("alert('" + i18n.getI18NMessage('CvB.Mobile.notAvailable') + "')");
	}

	return new Array()
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {Object} word_study_id
 *
 * @properties={typeid:24,uuid:"1088D50E-14B1-4744-9D08-CC3932A78991"}
 * @AllowToRunInFind
 */
function wlink(word_study_id)
{
	forms.study_words.searchWord(word_study_id);
}

/**
 * @properties={typeid:24,uuid:"2310319B-1BA3-463E-83FE-E210E646DB38"}
 * @AllowToRunInFind
 */
function HistoryBack() {
	// first delete the last entry
	globals.gHistory.pop();
	
	// now select the last history entry
	var vEntry = globals.gHistory.pop();
	
	//scopes.tools.output('vEntry => ' + vEntry);
	
	if(!vEntry.do_search)
	{
		forms[vEntry.form].controller.show();
	} else {
		if(forms[vEntry.form].foundset.find())
		{
			forms[vEntry.form].foundset[vEntry.search_column] = vEntry.search_value	
			forms[vEntry.form].foundset.search();
		}
		forms[vEntry.form].controller.show();
	}
	
}
