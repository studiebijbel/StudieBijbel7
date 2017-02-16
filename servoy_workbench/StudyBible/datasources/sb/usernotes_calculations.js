/**
 * @properties={type:12,typeid:36,uuid:"1CB50C1F-E255-4390-9F8E-253E768CEE8F"}
 */
function search_usernote_title()
{
	var vUserNote = usernote_description
	var vBoek = usernotes_to_commentary_blocks.commentary_blocks_to_books.book_name + " " + usernotes_to_commentary_blocks.chapter_from +":"+ usernotes_to_commentary_blocks.verses_from;
	vUserNote =  "<strong>"+ vBoek + "</strong> " + vUserNote 
	if (globals.sb_search_search_commentary == 1 && globals.sb_search_commentaryNotes && globals.sb_search_criteria){
		vUserNote = globals.cvb_doHighlight(vUserNote, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
	}
	return vUserNote
	
	
}

/**
 * @properties={type:12,typeid:36,uuid:"B51E348A-FD1B-4FEF-B98F-197C93653674"}
 */
function search_usernote_note()
{
	//SMM 20-06-2011
	var vHtmlText
	if (globals.sb_search_search_commentary == 1 && globals.sb_search_commentaryNotes && globals.sb_search_criteria){
		vHtmlText = globals.cvb_doHighlight(usernote_note, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
	}
	return '<html><body>' + vHtmlText + '</body></html>'
	
}

/**
 * @properties={type:12,typeid:36,uuid:"92ed69cb-d77e-4f73-ac18-4fd141cef2a4"}
 */
function bookname()
{
	if(!utils.hasRecords(usernotes_to_commentary_blocks.commentary_blocks_to_books)) return false;
	return usernotes_to_commentary_blocks.commentary_blocks_to_books.book_name + " " + usernotes_to_commentary_blocks.chapter_from +":"+ usernotes_to_commentary_blocks.verses_from+(((usernotes_to_commentary_blocks.chapter_to!=usernotes_to_commentary_blocks.chapter_from)&&(usernotes_to_commentary_blocks.verses_to!=usernotes_to_commentary_blocks.verses_from))?"-"+usernotes_to_commentary_blocks.chapter_to+ ":"+usernotes_to_commentary_blocks.verses_to:"");
}

/**
 * @properties={typeid:36,uuid:"D75AE841-5C07-45F9-8F00-CA26BE73D1C0"}
 */
function showname()
{
//scopes.tools.output(usernotes_to_commentary_blocks.commentary_blocks_to_books.book_name + " " + usernotes_to_commentary_blocks.chapter_from +":"+ usernotes_to_commentary_blocks.verses_from)
return usernotes_to_commentary_blocks.commentary_blocks_to_books.abbreviation + " " + usernotes_to_commentary_blocks.chapter_from +":"+ usernotes_to_commentary_blocks.verses_from+(((usernotes_to_commentary_blocks.chapter_to!=usernotes_to_commentary_blocks.chapter_from)&&(usernotes_to_commentary_blocks.verses_to!=usernotes_to_commentary_blocks.verses_from))?"-"+usernotes_to_commentary_blocks.chapter_to+ ":"+usernotes_to_commentary_blocks.verses_to:"");;
}
