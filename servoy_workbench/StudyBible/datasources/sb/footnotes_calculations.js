/**
 * @properties={type:12,typeid:36,uuid:"cf6697b2-63bb-4eca-9095-2eb55a4fcbe1"}
 */
function searchHTML() {

	if (globals.sb_search_search_commentary == 1 && globals.sb_search_search_footnotes && globals.sb_search_criteria) {
		var vNewHtmlText = globals.cvb_doHighlight(htmltext, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
		return '<html><body>' + vNewHtmlText + '</body></html>'
	}

	return '<html><body>' + htmltext + '</body></html>'

}

/**
 * @properties={type:12,typeid:36,uuid:"14d2ad6a-1c2f-4c84-a4c4-95d4308deccd"}
 */
function searchResult() {
	var vPlaintext = htmltext.replace(/(<.*?>)/g, ""); // plaintext

	var vTitle = scopes.calcs.calc_get_commentary_title(commentary_block_id, footnote_number);
	
	vPlaintext = vPlaintext.substr(0, 100) + '...'
	var vCorrectData = '<html><body><strong>' + vTitle + '</strong>' + vPlaintext + '</body></html>'

	if (globals.sb_search_search_commentary == 1 && globals.sb_search_search_footnotes && globals.sb_search_criteria) {
		vCorrectData = globals.cvb_doHighlight(vCorrectData, globals.sb_search_criteria, null, null) //SMM - 18-08-2011
	}

	return vCorrectData;
}
