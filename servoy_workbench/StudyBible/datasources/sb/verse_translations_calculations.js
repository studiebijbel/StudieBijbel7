/**
 * @properties={type:12,typeid:36,uuid:"3601E58C-97E5-4E72-A6C6-A6CDF195306E"}
 */
function search_result()
{
	var vTranslText =  transl_text
	if (globals.sb_search_search_translations == 1 && globals.sb_search_criteria){
		vTranslText = globals.cvb_doHighlight(vTranslText, globals.sb_search_criteria, null, null) //SMM - 18-08-2011
	}
	 
	/*
	var vReturn = "<html>\
		  <head>\
		\
		  </head>\
		  <body>\
		    <b>%%calc_book_chap_verse%%</b>&#160;&#160; <b>%%verse_translations_to_translation_books.code%%</b> \
		    %%transl_text%%\
		  </body>\
		</html>";
	*/
	var vReturn = "<html><head></head><body>"
	//vReturn += "<b>%%calc_book_chap_verse%%</b>&#160;&#160; <b>%%verse_translations_to_translation_books.code%%</b> " + vTranslText 
	//SMM 01-11-2011
//	vReturn += "<b>"+calc_book_chap_verse+"</b>&#160;&#160; <b>%%verse_translations_to_translation_books.code%%</b> " + vTranslText
	
	vReturn += "<b>%%verse_translations_to_verses.verses_to_chapters.chapters_to_books.abbreviation%%</b>&#160;&#160;<b>%%verse_translations_to_verses.verses_to_chapters.chapter_no%%</b>:<b>%%verse_translations_to_verses.verse_number%%</b>&#160;&#160;<b>%%verse_translations_to_translation_books.code%%</b> " + vTranslText
	
	vReturn += "</body></html>";
		
	//vReturn.replace(globals.sb_search_criteria,'<strong>'+globals.sb_search_criteria+'</strong>');
		
	//vReturn = utils.stringReplace(vReturn, globals.sb_search_criteria, '<strong>'+globals.sb_search_criteria+'</strong>')
		
		
	return vReturn;
}

/**
 * @properties={type:4,typeid:36,uuid:"401b1d85-0013-4df4-bf87-d7738fa95290"}
 */
function book_order()
{
if(subscr_id)
{
	var b_index = subscr_id.indexOf("n",0)
	var c_index = subscr_id.indexOf("c",0)
	return subscr_id.substring(b_index+1, c_index);
}

return 1;
}

/**
 * @properties={type:12,typeid:36,uuid:"2ac631a4-a22a-447c-80a1-9caafbf44ce8"}
 */
function calc_book_name()
{
if(verse_id != null){
	return verse_translations_to_verses.calc_book_name;
}
return null;
}

/**
 * @properties={type:12,typeid:36,uuid:"3fbfc919-5392-46ba-8fc1-a3c3a61a503d"}
 */
function calc_tab_name()
{
return i18n.getI18NMessage('cvb.lbl.bible_translation') + ' \(' + globals.sb_searchTransl_tabText + '\)';
}

/**
 * @properties={type:12,typeid:36,uuid:"d09e5c6c-7fb8-4b1f-91f2-af53b9769a35"}
 */
function calc_verse_transl()
{
var vHTML = "<html><body><table>";
//globals.verse_id_calc_last ervoor te zorgen dat die maar 1 keer wordt gedaan... dit omdat die VEEL te zwaar is
if( globals.verse_id > 0 && globals.verse_id == globals.selected_verse_id && globals.verse_id_calc_last != 1) {
   var aSelection;
	aSelection = globals.translation.split('\n');
	// Add some semolicons!
	for(var i in aSelection)
	{
		aSelection[i] = "'" + aSelection[i] + "'";
	}
	
	if(globals.sb_gTranslationPartial)
	{
		var bSelection = globals.sb_gTranslationPartial.split('\n')
		// Add some semolicons!
		for(i in bSelection)
		{
			bSelection[i] = "'" + bSelection[i] + "'";
		}
	}
	var vSelString = aSelection.join(', ');
	if(globals.sb_gTranslationPartial && bSelection.length > 0)
	{
		vSelString += ", " + bSelection.join(', ');
	}
	//Migratie: SQL aanpassen List vervangen voor Array
	vHTML += scopes.calcs.calc_verse_transl(vSelString, vHTML)
	
}

vHTML += '</table></body></html>'
//forms.verse_translation.controller.show()
//forms.sb_form.controller.show()
if (globals.sb_search_search_translations && globals.sb_search_criteria){
	vHTML = globals.cvb_doHighlight(vHTML, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
}
return vHTML;
}

/**
 * @properties={typeid:36,uuid:"F725E429-7201-4492-842C-C844405C6799"}
 */
function calc_book_chap_verse()
{
	return scopes.calcs.calc_book_chap_verse(pk);
}
