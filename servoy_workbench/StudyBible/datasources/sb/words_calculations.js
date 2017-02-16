/**
 * @properties={type:12,typeid:36,uuid:"C2EAE2B1-5621-4E5B-A8E2-6E522414ABEF"}
 */
function calc_hebrew()
{
	return '<html><body><font face="SIL Ezra" color="#000000">' + word_orginal_unicode + '</font></body></html>';
}

/**
 * @properties={type:12,typeid:36,uuid:"961AE81D-1A71-43BF-9B0E-CCA443FA6023"}
 */
function calc_search_word_translation() {
	var vWordTranslation = word_translation
		//var vBoek = usernotes_to_commentary_blocks.commentary_blocks_to_books.book_name + " " + usernotes_to_commentary_blocks.chapter_from +":"+ usernotes_to_commentary_blocks.verses_from;
	//vUserNote =  "<b>"+ vBoek + "</b> " + vUserNote
	if (globals.sb_search_search_spacing && globals.sb_search_criteria) {
		vWordTranslation = globals.cvb_doHighlight(vWordTranslation, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
	}
	return vWordTranslation

}

/**
 * @properties={type:12,typeid:36,uuid:"2e29e392-19a4-4c97-953e-20510f0e95e2"}
 */
function calc_book_name() {
	if (verse_id != null) {
		return words_to_verses.calc_book_name;
	}
	return null;
}

/**
 * @properties={type:-4,typeid:36,uuid:"be6b836b-c971-4908-b785-9c93dcf80577"}
 */
function calc_search_word_study() {
	if (word_strong) {
		return scopes.calcs.calc_search_word_study(word_strong);
	}
	return 1;
}

/**
 * @properties={type:4,typeid:36,uuid:"b7793e32-cd87-40f8-943c-1d31a8524a5f"}
 */
function calc_search_word_study_chk() {
	return scopes.calcs.calc_search_word_study_chk(word_strong);
}

/**
 * @properties={type:12,typeid:36,uuid:"dcca156e-c3f0-4c93-9ddd-7ec2bd1afce3"}
 */
function calc_testament() {
	var vReturn
	if (verse_id != null) {
		var vTest = words_to_verses.verses_to_chapters.chapters_to_books.testament;

		if (vTest == "Old") {
			// SIL Ezra

			vReturn = '<font face="SIL Ezra">' + globals.stringToCharNo(word_original) + '</font> <font face="SIL Heb Trans">' + globals.stringToCharNo(word_transliteration) + '</font>'
		} else {

			vReturn = '<font face="GreekSB">' + word_original + '</font> ' + word_transliteration
		}

	}
	return vReturn;
}

/**
 * @properties={typeid:36,uuid:"37E40ED9-3F92-4846-BCD5-1E5628C57F03"}
 */
function calc_book_chap_verse() {
	//TODO: MAKE FUNCTIONALITIES

	var vBook = words_to_verses.calc_book_name;
	var vChapter = words_to_verses.chapter_number;
	var vVerse = words_to_verses.verse_number

	return vBook + " " + vChapter + ":" + vVerse;

	/*var vSQL = "SELECT books.abbreviation, chapters.chapter_no, verses.verse_number FROM verses INNER JOIN chapters ON (verses.chapter_id = chapters.pk) INNER JOIN books ON (chapters.book_id = books.pk) INNER JOIN words ON (verses.pk = words.verse_id) WHERE words.pk = " + pk

	 var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, null, -1);

	 var vGoodReturn = vQuery.getValue(1, 1) + vQuery.getValue(1, 2) + ":" + vQuery.getValue(1, 3);

	 return vGoodReturn*/

}
