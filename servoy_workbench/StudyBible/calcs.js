
/**
 * @properties={typeid:24,uuid:"C799D66B-92FB-46F9-9B9D-279BBCD349F3"}
 * @param {String} word_strong
 * @return {Boolean|String}
 */
function calc_search_word_study(word_strong) {
	var vStrong = word_strong.split('.')

	var vSQL = "SELECT word_strong FROM word_study WHERE word_strong = ?";
	var vQUERY = databaseManager.getDataSetByQuery('sb', vSQL, [vStrong[0]], 1)

	if (vQUERY.getMaxRowIndex() > 0) {
		return "media:///edit.png";
	} else {
		return "media:///add2.png";
	}
}

/**
 * @properties={typeid:24,uuid:"AC9583C0-B713-4467-A6F1-402FFC2D45DA"}
 * @param {String} word_strong
 */
function calc_search_word_study_chk(word_strong) {
	var vStrong = word_strong.split('.')

	var vSQL = "SELECT word_strong FROM word_study WHERE word_strong = ?";
	var vQUERY = databaseManager.getDataSetByQuery('sb', vSQL, [vStrong[0]], -1)

	if (vQUERY.getMaxRowIndex() > 0) {
		return 1;
	} else {
		return 0;
	}

}

/**
 * @properties={typeid:24,uuid:"41608C7E-87E4-4DE4-AF8C-68E93755F080"}
 * @param {Number} commentary_id
 */
function calc_show_footnotes(commentary_id) {
	//Migratie: SQL aanpassen list werkt niet op PostgreSQL
	/*var query = "SELECT list('<f><b>' || f.footnote_number || '</b></f>&nbsp;' || f.htmltext, '<br>'  ORDER BY f.footnote_number) as footnote FROM footnotes AS f" +
	 	 " WHERE f.commentary_block_id = ?"*/
	var query = "SELECT array['<f><b>' || f.footnote_number || '</b></f>&nbsp;' || f.htmltext || '<br>'] as footnote FROM footnotes AS f" +
	 	 " WHERE f.commentary_block_id = ? ORDER BY f.footnote_number"
	//var res = databaseManager.getDataSetByQuery(forms.articles.controller.getServerName(),query,[commentary_id], -1)
	//Migratie: aanpassen; je mag geen databaseManager meer gebruiken in een calculatie!
	var res = databaseManager.getDataSetByQuery('sb',query,[commentary_id], -1)
	
	//Migratie: loop maken ter vervanging van de list functie
	var vFootnoteValue = ""
	for(var i = 1; i <= res.getMaxRowIndex(); i++)
	{
		vFootnoteValue += res.getValue(i, 1).substring(2 , res.getValue(i, 1).length - 2)
	}
	var vExtraHTML = ""
	if(globals.sb_gSelectedFootNoteNo > 0)
	{
		var vSQL = "SELECT footnote_number, htmltext FROM footnotes WHERE commentary_block_id = ? AND footnote_number = ?"
		var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [commentary_id, globals.sb_gSelectedFootNoteNo], 1);
		vExtraHTML = "<strong>" + vResult.getValue(1,1) + "</strong> " + vResult.getValue(1,2)  + "<br /><br />";
	//	globals.sb_gSelectedFootNoteNo = null;
	}
	
	var vHTML = "<html><body>" + vExtraHTML + vFootnoteValue + "</body></html>";
	return vHTML;
}

/**
 * @properties={typeid:24,uuid:"C8276D1C-03B7-4604-A718-ECBF8926EC55"}
 * @param {Number} pk
 */
function calc_get_first_line(pk) {
	var vSQL = "SELECT books.abbreviation, commentary_blocks.chapter_from, commentary_blocks.verses_from  FROM commentary_blocks INNER JOIN books ON commentary_blocks.book_id = books.pk WHERE commentary_blocks.pk = ?"
	var vQuery = databaseManager.getDataSetByQuery("sb", vSQL, [pk], 1)
	var vTitle = vQuery.getValue(1, 1) + " " + vQuery.getValue(1, 2) + ":" + vQuery.getValue(1, 3) + " "
	return vTitle;
}

/**
 * @param {Number} commentary_block_id
 * @param {Number} footnote_number
 *
 * @properties={typeid:24,uuid:"B099E02B-4141-4DDE-AE0B-C89D5A3DFD40"}
 */
function calc_get_commentary_title(commentary_block_id, footnote_number) {
	var vSQL = "SELECT books.abbreviation, commentary_blocks.chapter_from, commentary_blocks.verses_from  FROM commentary_blocks INNER JOIN books ON commentary_blocks.book_id = books.pk WHERE commentary_blocks.pk = ?"
	var vQuery = databaseManager.getDataSetByQuery("sb", vSQL, [commentary_block_id], 1)
	var vTitle = vQuery.getValue(1, 1) + " " + vQuery.getValue(1, 2) + ":" + vQuery.getValue(1, 3) + " " + i18n.getI18NMessage('cvb.lbl.footnotenumber') + " " + footnote_number + " "
	return vTitle;
}

/**
 * @properties={typeid:24,uuid:"BF6DEF28-5819-4084-A3D2-3B0A1028A24A"}
 * @param {Number} pk
 */
function calc_book_chap_verse(pk) {
	var vSQL = "SELECT books.abbreviation, chapters.chapter_no, verses.verse_number FROM verses INNER JOIN chapters ON (verses.chapter_id = chapters.pk) INNER JOIN books ON (chapters.book_id = books.pk) INNER JOIN verse_translations ON (verses.pk = verse_translations.verse_id) WHERE verse_translations.pk = ?"	
	var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [pk], -1);
	var vGoodReturn = vQuery.getValue(1,1) + vQuery.getValue(1,2) + ":" + vQuery.getValue(1,3);	
	return vGoodReturn;
}

/**
 * @properties={typeid:24,uuid:"6E85937F-6A33-4172-B5AF-A3C858BCC340"}
 * @param {String} vSelString
 * @param {String} vHTML
 */
function calc_verse_transl(vSelString, vHTML) {
	var vSQL = "SELECT transl_text, translation_book_id FROM verse_translations"
	 + " INNER JOIN translation_books ON verse_translations.translation_book_id = translation_books.pk WHERE "
	 + "translation_book_id IN ( SELECT pk FROM translation_books WHERE code IN ("+vSelString+") ORDER BY nt_order ASC) "
	 + "AND transl_text IS NOT NULL AND transl_text!='' AND (delete_chk is null OR delete_chk = 0) AND verse_id = "+globals.selected_verse_id
	 + " GROUP BY translation_books.nt_order, translation_book_id, transl_text"
	 + " ORDER BY translation_books.nt_order, translation_book_id"
	
var res = databaseManager.getDataSetByQuery('sb',vSQL, null, -1)


	if(res != null) {
		for(var i=1;i<= res.getMaxRowIndex();i++) {
			res.rowIndex = i
			var resTR = databaseManager.getDataSetByQuery('sb','select code from translation_books where pk='+res.getValue(i,2), null, -1)
			resTR.rowIndex = 1
			if(res.getValue(i,1)!='<br>')
			{
				vHTML += '<TR><TD><B>'
				vHTML += resTR.getValue(1,1)
				vHTML += '</B> '
				vHTML += res.getValue(i,1)+ "<br>"
				vHTML += '</TD></TR>'				
			}
		}
	}
	else {
		vHTML +=''
	}

	return vHTML;
}

/**
 * @properties={typeid:24,uuid:"6CA3661E-8DCF-48ED-B362-AD0134A2E117"}
 */
function calc_total_users() {
	var vSQL2 = "SELECT COUNT(sb_organisation_id) FROM sb_contact WHERE sb_organisation_id = ?"
	var vQuery = databaseManager.getDataSetByQuery("sb_data", vSQL2, [forms.sb_organisation_detail_frm.sb_organisation_to_sb_organisation.sb_organisation_id], 1)
	
	return vQuery.getValue(1,1);
}