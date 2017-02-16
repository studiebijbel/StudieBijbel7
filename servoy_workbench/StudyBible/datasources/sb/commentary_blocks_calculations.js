/**
 * @properties={type:12,typeid:36,uuid:"62157806-b5d4-45e1-941d-71258c33989d"}
 */
function showCommentary() {
	var vReturn = "<html><head></head><body>" + title + htmltext + "</body></html>";

	if (globals.sb_search_search_commentary == 1 && globals.sb_search_criteria) {
		vReturn = globals.cvb_doHighlight(vReturn, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
	}

	return vReturn;
}

/**
 * @properties={type:12,typeid:36,uuid:"3086b73c-deb3-43a4-916c-5e2ef23e633e"}
 */
function showCommentaryShorty() {
	var vReturn = "<html><head></head><body>" + title + htmltext_short + "</body></html>";

	vReturn = utils.stringReplace(vReturn, 'html_readMore', i18n.getI18NMessage('html_readMore'));

	return vReturn;
}

/**
 * @properties={type:-4,typeid:36,uuid:"2CF219D1-3339-4EEA-9877-BA1A842974DF"}
 */
function titleOrfirstrow() {
	var vReturn = ""

	if (title) {
		vReturn = title
	} else {
		vReturn = plaintext;
		vReturn = vReturn.replace(/(\[.*?\])/g, "")
		//if(vReturn.length > 150)
		//{
		vReturn = vReturn.substring(0, 110)
		vReturn += "...";
		//}
	}

	//var vSQL = "SELECT books.abbreviation, commentary_blocks.chapter_from, commentary_blocks.verses_from  FROM DBA.commentary_blocks INNER JOIN DBA.books ON commentary_blocks.book_id = books.pk WHERE commentary_blocks.pk = ?"

	var vTitle = scopes.calcs.calc_get_first_line(pk);
	
	//var vGreatReturn =  chapter_to + ":" + verses_to

	// Some new shit

	vReturn = vReturn.replace(/(<.*?>)/g, "")
	//var regexp = /<(.*)[^>]+>([^<]+)<\/(.*)>/gi;

	//vReturn = vReturn.replace(regexp, '$2')
	//vReturn = "<html><body><STYLE=\"font-size: 11px;\">" + vReturn + "</style></body></html>"

	vReturn = '<html><body><strong>' + vTitle + '</strong>' + vReturn + '</body></html>';

	if (globals.sb_search_search_commentary == 1 && globals.sb_search_criteria) {
		vReturn = globals.cvb_doHighlight(vReturn, globals.sb_search_criteria, null, null) //SMM - 18-08-2011
	}

	return vReturn

}
