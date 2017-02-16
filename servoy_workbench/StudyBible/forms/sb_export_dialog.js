/**
 * @properties={typeid:24,uuid:"53B8754B-BAE6-4D17-8AE9-B2C06B0E84FB"}
 */
function BTN_exportCommentaries()
{
//   Word for Word translation export thing
var vSQL
// Verplicht :@
if(!CHK_versesFilled())
{
	return false;
}

// Verses
var vDir = plugins.file.showDirectorySelectDialog();

if(!vDir) { return false }
//
//if(globals.sb_export_gFromVerse.length == 1)
//{	
//	iStartVerse = (globals.chapter *1000)+globals.sb_export_gFromVerse
//} else if (globals.sb_export_gFromVerse.length == 2)
//{
//	iStartVerse = (globals.chapter *100)+globals.sb_export_gFromVerse
//} else if (globals.sb_export_gFromVerse.length == 3)
//{
//	iStartVerse = (globals.chapter *10)+globals.sb_export_gFromVerse
//}
//
//if(globals.sb_export_gVerse.length == 1)
//{	
//	iStopVerse = (globals.sb_export_toChapter *1000)+globals.sb_export_gVerse
//} else if (globals.sb_export_gVerse.length == 2)
//{
//	iStopVerse = (globals.sb_export_toChapter *100)+globals.sb_export_gVerse
//} else if (globals.sb_export_gVerse.length == 3)
//{
//	iStopVerse = (globals.sb_export_toChapter *10)+globals.sb_export_gVerse
//}

plugins.dialogs.showInfoDialog('Voortgang', 'i18n:cvb.lbl.busyExporteren', 'i18n:CVB.lbl.ok');
/////////////// EXPORT :D //////////////
//TODO MAkE A EXPORT FOR OT!!!!!!!!!!!!!

//var vSQL = "SELECT chapter_number , verse_number, calc_book_name FROM verses WHERE pk IN (  SELECT pk FROM verses WHERE chapter_id IN ( SELECT pk FROM chapters WHERE chapter_no >= ? AND chapter_no <= ? AND book_id = ?    ) )  ORDER BY chapter_number, verse_number"
//var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [globals.chapter, globals.sb_export_toChapter, globals.book_id], -1);
//if(globals.sb_gTestament == "New")
//{
//	vSQL = "SELECT v.chapter_number , v.verse_number , v.calc_book_name, cb.pk AS com_pk, cb.title, cb.plaintext "
//			 + "FROM verses AS v "
//	+ "inner JOIN commentary_blocks AS cb "
//	   + " ON cb.book_id = ? "
//	      + "  AND ( "
//	         + "       (cb.chapter_from < v.chapter_number or (cb.chapter_from = v.chapter_number  and cb.verses_from <= v.verse_number)) " 
//	         + "       AND (cb.chapter_to > v.chapter_number or (cb.chapter_to = v.chapter_number and cb.verses_to >= v.verse_number)) "
//	      + "  )"
//		  + " AND cb.active_now = 1 "
//	+ "WHERE v.pk "
//	+ "IN (  "
//	   + " SELECT pk "
//	   + " FROM verses "
//	   + " WHERE chapter_id "
//	   + " IN ( "
//	     + "   SELECT pk "
//	     + "   FROM chapters "
//	     + "   WHERE chapter_no >= ? "
//	     + "   AND chapter_no <= ? "
//	     + "   AND book_id = ?    "
//	    + ") " 
//	+ ") "
//	+ "AND cb.plaintext IS NOT NULL "
//	+ "AND cb.active_now = 1 "
//	+ "ORDER BY v.chapter_number, v.verse_number "
//} else {
	//TODO: List() Change list() function for PostGre SQL.
	vSQL = "SELECT v.chapter_number , v.verse_number , v.calc_book_name, cb.pk AS com_pk, cb.title, cb.plaintext, " //, list('\tenter\t' || f.footnote_number || '\t' || f.plaintext, ''  ORDER BY f.footnote_number) as footnote "
		+ " (SELECT string_agg('\tenter\t' || f.footnote_number || '\t' || f.plaintext, '' ORDER BY f.footnote_number ) FROM footnotes AS f WHERE f.commentary_block_id = cb.pk) as footnote "	
		+ "FROM verses AS v "
	+ "inner JOIN commentary_blocks AS cb "
	   + " ON cb.book_id = ? "
	      + "  AND ( "
	         + "       (cb.chapter_from < v.chapter_number or (cb.chapter_from = v.chapter_number  and cb.verses_from <= v.verse_number)) " 
	         + "       AND (cb.chapter_to > v.chapter_number or (cb.chapter_to = v.chapter_number and cb.verses_to >= v.verse_number)) "
	      + "  )"
		+ " AND cb.active_now = 1 "
	//+ "LEFT OUTER JOIN footnotes AS f ON cb.pk = f.commentary_block_id "
	+ "WHERE v.pk "
	+ "IN (  "
	   + " SELECT pk "
	   + " FROM verses "
	   + " WHERE chapter_id "
	   + " IN ( "
	     + "   SELECT pk "
	     + "   FROM chapters "
	     + "   WHERE chapter_no >= ? "
	     + "   AND chapter_no <= ? "
	     + "   AND book_id = ?    "
	    + ") " 
	+ ") "
	+ "AND cb.plaintext IS NOT NULL "
	+ "AND cb.active_now = 1 "
	+ "GROUP BY v.chapter_number, v.verse_number, v.calc_book_name, cb.pk, cb.title, cb.plaintext "
	+ "ORDER BY v.chapter_number, v.verse_number "
//}
var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [globals.book_id, globals.chapter, globals.sb_export_toChapter, globals.book_id], -1);
//var vMax = vQuery.getMaxRowIndex();
//elements.bean_progress.maximum = vMax;
//scopes.tools.output(vSQL); 
	
	
	
	
var iChapter = 0;
//var iVers = 0;
//var vTB = "";
var vString = ""
var vString2 = "";

for (var i = 1; i <= vQuery.getMaxRowIndex(); i++)
{
	
	if(!iChapter) { iChapter = vQuery.getValue(i,1); vString += vQuery.getValue(i,3) +"\tenter\t"+ iChapter; vString2 += vQuery.getValue(i,3) +"\tenter\t"+ iChapter; }
	// So we get a chapter when going to second chapter.
	else if(iChapter != vQuery.getValue(i,1)) { iChapter = vQuery.getValue (i,1); vString += "\tenter\t"+iChapter; vString2 += "\tenter\t"+iChapter; }
	
	vString += "\tenter\t"+vQuery.getValue(i,2);
	if(vQuery.getValue(i,7)) {
		vString2 += "\tenter\t"+vQuery.getValue(i,2);
	}
//	var vSQL2 = "SELECT title, plaintext FROM commentary_blocks WHERE plaintext IS NOT NULL AND book_id = ? AND ((chapter_from >= ? AND chapter_to <= ?) AND (verses_from >= ? AND verses_to <= ?))";
//	var vQuery2 = databaseManager.getDataSetByQuery('sb', vSQL2, [globals.book_id, vQuery.getValue(i,1), vQuery.getValue(i,1), vQuery.getValue(i,2), vQuery.getValue(i,2)], 1)
	vString += "\t"+vQuery.getValue(i,5)+"\t"+vQuery.getValue(i,6);
	
	if(vQuery.getValue(i,7)) {
		vString2 += vQuery.getValue(i,7);
	}
}

var vCharSet = globals.sb_export_charset
var vOs = plugins.it2be_tools.client().osName;

if(vOs.match("Windows"))
{
	//var fo = new Packages.java.io.FileWriter(vDir + "\\export_manuscript.txt");
	//var writer = new Packages.java.io.BufferedWriter(fo);
	//fo.write(globals.sb_edit_HtmlToTextChangeToSpecialChars(vString));
	plugins.file.writeTXTFile(vDir + "\\export_kolom_4_commentaren.txt", vString, vCharSet)
	if(vString2)
	{
		plugins.file.writeTXTFile(vDir + "\\export_kolom_4_voetnoten.txt", vString2, vCharSet)	
	}
} else if(vOs.match("Mac"))
{
	plugins.file.writeTXTFile(vDir + "/export_kolom_4_commentaren.txt", vString, vCharSet)
	if(vString2)
	{
		plugins.file.writeTXTFile(vDir + "/export_kolom_4_voetnoten.txt", vString2, vCharSet)	
	}
}
plugins.dialogs.showInfoDialog('', i18n.getI18NMessage("servoy.message.exportComplete")+'  '+ vDir, 'i18n:CVB.lbl.ok');

//plugins.dialogs.showInfoDialog('', 'i18n:servoy.message.exportComplete  ' + vDir, 'i18n:CVB.lbl.ok');
/////////////
return true
}

/**
 * @properties={typeid:24,uuid:"041EE4E3-8124-47C3-B527-C456A2E72439"}
 */
function BTN_exportCommentaries_OLDIE()
{
//   Word for Word translation export thing

// Verses
var vDir = plugins.file.showDirectorySelectDialog();
//var iStartVerse,iStopVerse
if(!vDir) { return false }
//
//if(globals.sb_export_gFromVerse.length == 1)
//{	
//	iStartVerse = (globals.chapter *1000)+globals.sb_export_gFromVerse
//} else if (globals.sb_export_gFromVerse.length == 2)
//{
//	iStartVerse = (globals.chapter *100)+globals.sb_export_gFromVerse
//} else if (globals.sb_export_gFromVerse.length == 3)
//{
//	iStartVerse = (globals.chapter *10)+globals.sb_export_gFromVerse
//}
//
//if(globals.sb_export_gVerse.length == 1)
//{	
//	iStopVerse = (globals.sb_export_toChapter *1000)+globals.sb_export_gVerse
//} else if (globals.sb_export_gVerse.length == 2)
//{
//	iStopVerse = (globals.sb_export_toChapter *100)+globals.sb_export_gVerse
//} else if (globals.sb_export_gVerse.length == 3)
//{
//	iStopVerse = (globals.sb_export_toChapter *10)+globals.sb_export_gVerse
//}


/////////////// EXPORT :D //////////////
//TODO MAkE A EXPORT FOR OT!!!!!!!!!!!!!

var vSQL = "SELECT chapter_number , verse_number, calc_book_name FROM verses WHERE pk IN (  SELECT pk FROM verses WHERE chapter_id IN ( SELECT pk FROM chapters WHERE chapter_no >= ? AND chapter_no <= ? AND book_id = ?    ) )  ORDER BY chapter_number, verse_number"
var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [globals.chapter, globals.sb_export_toChapter, globals.book_id], -1);
/*
var vSQL = "SELECT v.calc_book_name, v.chapter_number , v.verse_number , cb.pk AS com_pk, cb.title, cb.plaintext"
		 + "FROM verses AS v"
+ "inner JOIN commentary_blocks AS cb"
   + " ON cb.book_id = ?"
      + "  AND ("
         + "       ("
            + "        cb.chapter_from >= v.chapter_number "
            + "        AND cb.chapter_to <= v.chapter_number"
            + "    ) AND ("
            + "        cb.verses_from >= v.verse_number "
            + "        AND cb.verses_to <= v.verse_number"
            + "    )"
      + "  )"
+ "WHERE v.pk "
+ "IN (  "
   + " SELECT pk "
   + " FROM verses "
   + " WHERE chapter_id "
   + " IN ( "
     + "   SELECT pk "
     + "   FROM chapters "
     + "   WHERE chapter_no >= ? "
     + "   AND chapter_no <= ? "
     + "   AND book_id = ?    "
    + ")" 
+ ")"
+ "AND cb.plaintext IS NOT NULL"
+ "ORDER BY v.chapter_number, v.verse_number"
*/
//scopes.tools.output(vSQL); 
	
var iChapter = 0;
//var iVers = 0;
//var vTB = "";
var vString = ""

for (var i = 1; i <= vQuery.getMaxRowIndex(); i++)
{

	if(!iChapter) { iChapter = vQuery.getValue(i,1); vString += vQuery.getValue(i,3) +"\tenter\t"+ iChapter; }
	// So we get a chapter when going to second chapter.
	else if(iChapter != vQuery.getValue(i,1)) { iChapter = vQuery.getValue (i,1); vString += "\tenter\t"+iChapter; }
	
	vString += "\t"+vQuery.getValue(i,2);
	
	var vSQL2 = "SELECT title, plaintext FROM commentary_blocks WHERE plaintext IS NOT NULL AND book_id = ? AND ((chapter_from >= ? AND chapter_to <= ?) AND (verses_from >= ? AND verses_to <= ?))";
	var vQuery2 = databaseManager.getDataSetByQuery('sb', vSQL2, [globals.book_id, vQuery.getValue(i,1), vQuery.getValue(i,1), vQuery.getValue(i,2), vQuery.getValue(i,2)], 1)
	vString += "\t"+vQuery2.getValue(1,1)+"\t"+vQuery2.getValue(1,2);
}

var vCharSet = globals.sb_export_charset
var vOs = plugins.it2be_tools.client().osName;

if(vOs.match("Windows"))
{
	//var fo = new Packages.java.io.FileWriter(vDir + "\\export_manuscript.txt");
	//var writer = new Packages.java.io.BufferedWriter(fo);
	//fo.write(globals.sb_edit_HtmlToTextChangeToSpecialChars(vString));
	plugins.file.writeTXTFile(vDir + "\\export_kolom_4_commentaren.txt", vString, vCharSet)
} else if(vOs.match("Mac"))
{
	plugins.file.writeTXTFile(vDir + "/export_kolom_4_commentaren.txt", vString, vCharSet)
}
return true
}

/**
 * @properties={typeid:24,uuid:"D0CCE719-0190-41F5-85C0-A66D7F0D1CDC"}
 */
function BTN_exportVerses()
{
// Verplicht :@
if(!CHK_versesFilled())
{
	return false;
}

// Verses
var vDir = plugins.file.showDirectorySelectDialog();
if(!vDir) { return false }


plugins.dialogs.showInfoDialog('', 'i18n:cvb.lbl.busyExporteren', 'i18n:CVB.lbl.ok');

// Little loop
var aChoises = globals.sb_export_gSelectedBookTrans.split('\n');
var vChoises = "";

for(i in aChoises)
{
	aChoises[i] = "'" + aChoises[i] + "'"
}

vChoises = aChoises.join(', ');
	
var iStartVerse,iStopVerse
if(globals.sb_export_gFromVerse.length == 1)
{	
	iStartVerse = (globals.chapter *1000)+globals.sb_export_gFromVerse
} else if (globals.sb_export_gFromVerse.length == 2)
{
	iStartVerse = (globals.chapter *100)+globals.sb_export_gFromVerse
} else if (globals.sb_export_gFromVerse.length == 3)
{
	iStartVerse = (globals.chapter *10)+globals.sb_export_gFromVerse
}

if(globals.sb_export_gVerse.length == 1)
{	
	iStopVerse = (globals.sb_export_toChapter *1000)+globals.sb_export_gVerse
} else if (globals.sb_export_gVerse.length == 2)
{
	iStopVerse = (globals.sb_export_toChapter *100)+globals.sb_export_gVerse
} else if (globals.sb_export_gVerse.length == 3)
{
	iStopVerse = (globals.sb_export_toChapter *10)+globals.sb_export_gVerse
}

//dataProvider	globals.sb_expot_gFromVerse
var vSQL = "SELECT v.verse_number, c.chapter_no, tb.code, vt.transl_text, ((c.chapter_no * 10000)+v.verse_number) AS chapverscount, b.book_name "
		 + "FROM verse_translations AS vt "
		 + "INNER JOIN verses AS v ON v.pk = vt.verse_id "
		 + "INNER JOIN chapters AS c ON c.pk = v.chapter_id "
		 + "INNER JOIN translation_books AS tb ON vt.translation_book_id = tb.pk "
		 + "INNER JOIN books AS b ON b.pk = " + globals.book_id + " "
		 + "WHERE verse_id IN ( "
		 + "SELECT pk "
		 + "FROM verses "
		 + "WHERE chapter_id IN ( "
         + "SELECT pk "
         + "FROM chapters "
         + "WHERE chapter_no >= " + globals.chapter
         + " AND chapter_no <= " + globals.sb_export_toChapter
         + " AND book_id = " + globals.book_id + "    ) "
		 + ") "
		 + "AND ((c.chapter_no * 10000)+v.verse_number) BETWEEN "+iStartVerse+" AND "+iStopVerse
		 + " AND translation_book_id IN (   SELECT pk FROM translation_books WHERE code IN (" + vChoises + "))"
		 + " GROUP BY tb.nt_order, v.verse_number, c.chapter_no, tb.code , vt.transl_text, b.book_name "
		 + "ORDER BY c.chapter_no, v.verse_number, tb.nt_order";
	
//scopes.tools.output(vSQL)

/**
 * Column order
 *
 * 1 = verse number
 * 2 = chapter number
 * 3 = translation book code
 * 4 = translation text
 * 5 = chap-vers-count
 * 6 = book name
 **/
	
var vQuery = databaseManager.getDataSetByQuery('sb',vSQL,null, -1);

var iChapter = 0;
var iVers = 0;
var vTB = "";
var vString = ""

for (var i = 1; i <= vQuery.getMaxRowIndex(); i++)
{
	if(!iChapter) { iChapter = vQuery.getValue(i,2); vString += vQuery.getValue(i,6)+"\tenter\t"+vQuery.getValue(i,2); }
	else if(iChapter != vQuery.getValue(i,2)) { iChapter = vQuery.getValue (i,2); vString += "\tenter\t"+iChapter; }
	
	if(!iVers) { iVers = vQuery.getValue(i, 1);  vString += "\tenter\t"+iVers + "\t"  }
	if(iVers != vQuery.getValue(i, 1)) { iVers = vQuery.getValue(i, 1); vString += "\tenter\t" + iVers + "\t"; vTB = ""  }
	
	if(!vTB) { vTB = vQuery.getValue(i, 3);  vString += vTB  }
	if(vTB != vQuery.getValue(i, 3)) { vTB = vQuery.getValue(i, 3); vString += " || " + vTB }
	
	if(vTB == vQuery.getValue(i, 3) && iVers == vQuery.getValue(i, 1))
	{
		vString += " " + globals.sb_edit_HtmlToTextChangeToSpecialChars(vQuery.getValue(i, 4))
	}
}

var vCharSet = globals.sb_export_charset
var vOs = plugins.it2be_tools.client().osName;
if(vOs.match("Windows"))
{
	plugins.file.writeTXTFile(vDir + "\\export_kolom_3_vt.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
} else if(vOs.match("Mac"))
{
	plugins.file.writeTXTFile(vDir + "/export_kolom_3_vt.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
}

plugins.dialogs.showInfoDialog('', i18n.getI18NMessage("servoy.message.exportComplete")+'  '+ vDir, 'i18n:CVB.lbl.ok');

	
return true
}

/**
* The order of columns
* 1 = verse number
* 2 = chapter number
* 3 = book name
* 4 = original word
* 5 = transliteration word
* 6 = translation word
* 7 = strong number
* 8 = word order
* 9 = chapterno * 10000 + versenumber (a high #)
* 10 = verse pk
* 11 = word pk
* 12 = Word code 
* 13 = tr
* 14 = hf
* 15 = n25
* 16 = n27
 * @properties={typeid:24,uuid:"3EDB2C31-0551-44DD-B46B-489E5ADC104D"}
 */
function BTN_exportWord4Word()
{
//   Word for Word translation export thing
// Verplicht :@
if(!CHK_versesFilled())
{
	return false;
}
var iStartVerse,iStopVerse,vSQL,vQuery,vWordD,vTekst
// Verses
var vDir = plugins.file.showDirectorySelectDialog();
if(!vDir) { return false }
plugins.dialogs.showInfoDialog('', 'i18n:cvb.lbl.busyExporteren', 'i18n:CVB.lbl.ok');
if(globals.sb_export_gFromVerse.length == 1)
{	
	iStartVerse = (globals.chapter *1000)+globals.sb_export_gFromVerse
} else if (globals.sb_export_gFromVerse.length == 2)
{
	iStartVerse = (globals.chapter *100)+globals.sb_export_gFromVerse
} else if (globals.sb_export_gFromVerse.length == 3)
{
	iStartVerse = (globals.chapter *10)+globals.sb_export_gFromVerse
}

if(globals.sb_export_gVerse.length == 1)
{	
	iStopVerse = (globals.sb_export_toChapter *1000)+globals.sb_export_gVerse
} else if (globals.sb_export_gVerse.length == 2)
{
	iStopVerse = (globals.sb_export_toChapter *100)+globals.sb_export_gVerse
} else if (globals.sb_export_gVerse.length == 3)
{
	iStopVerse = (globals.sb_export_toChapter *10)+globals.sb_export_gVerse
}



// Exports for Old Testament w.word_original,
if(globals.sb_gTestament == 'Old')
{
	// Export zonder unicode
	// colom _unicode
	vSQL =  "SELECT v.verse_number, c.chapter_no, b.book_name, w.word_original, w.word_transliteration, w.word_translation, w.word_strong, w.word_order, ((c.chapter_no * 10000)+v.verse_number) AS chapverscount, v.pk, w.pk AS wordID, 0 AS temp,  w.tr, w.hf, w.n25, w.n27 "
			 +	"FROM words AS w "
			 +	"LEFT JOIN verses AS v ON v.pk = w.verse_id "
			 +	"LEFT JOIN chapters AS c ON c.pk = v.chapter_id "
			 +	"LEFT JOIN books AS b ON b.pk = c.book_id "
			 +	"WHERE verse_id IN ( "
			 +	" SELECT pk FROM verses WHERE chapter_id IN ( SELECT pk FROM chapters WHERE chapter_no >= " + globals.chapter + "AND chapter_no <= " + globals.sb_export_toChapter + " AND book_id = " + globals.book_id + "    ) ) "
			 +	"AND (word_original != '' AND word_original IS NOT NULL) "
			 +	"AND "
		     +	"((c.chapter_no * 10000)+v.verse_number) BETWEEN " + iStartVerse + " AND " + iStopVerse + " GROUP BY b.book_name, v.verse_number, c.chapter_no, w.word_original,  w.word_transliteration, w.word_translation, w.word_strong, w.word_order, v.pk, w.pk, w.tr, w.hf, w.n25, w.n27 ORDER BY c.chapter_no, v.verse_number, w.word_order"
} else {
	vSQL =  "SELECT v.verse_number, c.chapter_no, b.book_name, w.word_original, w.word_transliteration, w.word_translation, w.word_strong, w.word_order, ((c.chapter_no * 10000)+v.verse_number) AS chapverscount, v.pk, w.pk AS wordID, wv.code_no AS wordCode, w.tr, w.hf, w.n25, w.n27 "
			 +	"FROM words AS w "
			 +	"LEFT JOIN verses AS v ON v.pk = w.verse_id "
			 +	"LEFT JOIN chapters AS c ON c.pk = v.chapter_id "
			 +	"LEFT JOIN books AS b ON b.pk = c.book_id "
			 // Addition for Word Variant Code
			 +  "LEFT JOIN word_variants AS wv ON wv.word_id = w.pk "
			 // End of addition
			 +	"WHERE verse_id IN ( "
			 +	" SELECT pk FROM verses WHERE chapter_id IN ( SELECT pk FROM chapters WHERE chapter_no >= " + globals.chapter + "AND chapter_no <= " + globals.sb_export_toChapter + " AND book_id = " + globals.book_id + "    ) ) "
			 +	"AND (word_original != '' AND word_original IS NOT NULL) "
			 +	"AND "
			 +	"((c.chapter_no * 10000)+v.verse_number) BETWEEN " + iStartVerse + " AND " + iStopVerse + " GROUP BY b.book_name, v.verse_number, c.chapter_no, w.word_original, w.word_transliteration, w.word_translation, w.word_strong, w.word_order, v.pk, w.pk, wv.code_no, w.tr, w.hf, w.n25, w.n27 ORDER BY c.chapter_no, v.verse_number, w.word_order"
}
vQuery = databaseManager.getDataSetByQuery('sb', vSQL, null, -1)

/**
 * The order of columns
 * 1 = verse number
 * 2 = chapter number
 * 3 = book name
 * 4 = original word
 * 5 = transliteration word
 * 6 = translation word
 * 7 = strong number
 * 8 = word order
 * 9 = chapterno * 10000 + versenumber (a high #)
 * 10 = verse pk
 * 11 = word pk
 * 12 = Word code 
 * 13 = tr
 * 14 = hf
 * 15 = n25
 * 16 = n27
 **/

var iChapter = 0;
var vString = ""
var aPks = new Array();
var iVerseID = 0

for (var i = 1; i <= vQuery.getMaxRowIndex(); i++)
{
	if(iVerseID != vQuery.getValue(i,10))
	{
		aPks.push(vQuery.getValue(i,10))
		iVerseID = vQuery.getValue(i,10)
	}
	
	if(!iChapter) { iChapter = vQuery.getValue(i,2); vString += vQuery.getValue(i,3) +"\tenter\t"+ iChapter; }
	// So we get a chapter when going to second chapter.
	else if(iChapter != vQuery.getValue(i,2) && globals.sb_gTestament != 'Old') { iChapter = vQuery.getValue (i,2); vString += "\tenter\t"+iChapter; }
//	else if (iChapter != vQuery.getValue(i,2)) { iChapter = vQuery.getValue(i,2); vString += "\t"+vQuery.getValue(i,3) +"\tenter\t"+ iChapter; }
	/**
	 * Only execute when it is NT
	 **/
//	if(globals.sb_gTestament == "New")
//	{
//		var vWordID = vQuery.getValue(i,11);
//		// Lets search if word has a connection to word variants
//		var vSQL_wordVariants = "SELECT code FROM word_variants WHERE word_id = ?";
//	}
	
	if(vQuery.getValue(i,12) != "  ")
	{
		vWordD = '<sup>'+vQuery.getValue(i,12)+'</sup>'+vQuery.getValue(i,4);
	} else {
		vWordD = vQuery.getValue(i,4);
	}
	
//	//scopes.tools.output(vWordD);
	
	/**
	 * END OF EDIT
	 **/
	
	vString += "\tenter\t"+vQuery.getValue(i,1) + "\t" +vQuery.getValue(i,8) + "\t" + vQuery.getValue(i,7) + "\t" + vWordD + "\t" + vQuery.getValue(i,5) + "\t" + vQuery.getValue(i,6)
	var vTR,vHR,vN25,vN27
	if(globals.sb_gTestament == 'New')
	{
		// Addition for tr etc
		if(vQuery.getValue(i,13)) { vTR = 1; } else { vTR = 0; }
		if(vQuery.getValue(i,14)) { vHR = 1; } else { vHR = 0; }
		if(vQuery.getValue(i,15)) { vN25 = 1; } else { vN25 = 0; }
		if(vQuery.getValue(i,16)) { vN27 = 1; } else { vN27 = 0; }
	
		vString += "\t"+vTR+"\t"+vHR+"\t"+vN25+"\t"+vN27;
	}
}
vString += "\tenter"
/*
if(globals.sb_gTestament == "Old")
{
	var vCharSet = "ISO8859_1"
} else {
	var vCharSet = "Cp737"
}*/


var vCharSet = globals.sb_export_charset
var vOs = plugins.it2be_tools.client().osName;
if(vOs.match("Windows"))
{
	plugins.file.writeTXTFile(vDir + "\\export_kolom_1_interlinie.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
} else if(vOs.match("Mac"))
{
	plugins.file.writeTXTFile(vDir + "/export_kolom_1_interlinie.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
}

iChapter = 0;
iVerseID = 0;
vString = ""

/**
 * Most of the stuff stated below here is for the new testament!
 * So the manuscripts will be exported @ the same time as the words.
 **/

if(globals.sb_gTestament == "New")
{
	var vToSQL = aPks.join(', ');
	vSQL = 'SELECT manuscript_info.code_no, manuscript_text, verse_number, chapter_no, book_name, verses.pk, tr FROM manuscript_info '
			 + 'INNER JOIN verses ON manuscript_info.verse_id = verses.pk '
			 + 'INNER JOIN chapters ON verses.chapter_id = chapters.pk '
			 + 'INNER JOIN books ON chapters.book_id = books.pk '
			 + 'WHERE verses.pk IN ('+vToSQL+') '// AND tr = 1'
			 + 'ORDER BY chapter_no, verse_number, manuscript_info.code_no';
	vQuery = databaseManager.getDataSetByQuery('sb', vSQL, null, -1)
	
//	application.ouput(vQuery);
	
	/**
	 * More details about the sql
	 * 
	 * 1 = Manuscript code
	 * 2 = Manuscript text
	 * 3 = verse number
	 * 4 = chapter number
	 * 5 = book name
	 * 6 = verse pk
	 * 7 = TR
	 **/
	
	for(i = 1; i <= vQuery.getMaxRowIndex(); i++)
	{
		if(!iChapter) { iChapter = vQuery.getValue(i,4); vString += vQuery.getValue(i,5) +"\tenter\t"+ iChapter; }
		else if (iChapter != vQuery.getValue(i,4)) { iChapter = vQuery.getValue(i,4); vString += "\tenter\t"+ iChapter; }
		/*if(iVerseID != vQuery.getValue(i, 5)) {
			vString += "\tenter\t"+vQuery.getValue(i, 3);
		}*/
		
		if(vQuery.getValue(i,7) == 1)
		{
			vTekst = 'tekst';
		} else {
			vTekst = 'variant';		
		}
		
		vString += "\tenter\t"+vQuery.getValue(i,3)+"\t"+vQuery.getValue(i,1)+"\t"+vTekst+"\t"+vQuery.getValue(i,2);
		
		//vString += "\t"+vQuery.getValue(i,1)+" "+vQuery.getValue(i,2);
	}
	

	if(vOs.match("Windows"))
	{
		//var fo = new Packages.java.io.FileWriter(vDir + "\\export_manuscript.txt");
		//var writer = new Packages.java.io.BufferedWriter(fo);
		//fo.write(globals.sb_edit_HtmlToTextChangeToSpecialChars(vString));
		plugins.file.writeTXTFile(vDir + "\\export_kolom_2_manuscript.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
	} else if(vOs.match("Mac"))
	{
		plugins.file.writeTXTFile(vDir + "/export_kolom_2_manuscript.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
	}
}

plugins.dialogs.showInfoDialog('', i18n.getI18NMessage("servoy.message.exportComplete")+'  '+ vDir, 'i18n:CVB.lbl.ok');
return true
}

/**
 * The order of columns
 * 1 = verse number
 * 2 = chapter number
 * 3 = book name
 * 4 = original word
 * 5 = transliteration word
 * 6 = translation word
 * 7 = strong number
 * 8 = word order
 * 9 = chapterno * 10000 + versenumber (a high #)
 * 10 = verse pk
 * 11 = word pk
 * 12 = Word code 
 * 13 = tr
 * 14 = hf
 * 15 = n25
 * 16 = n27
 **
 * @properties={typeid:24,uuid:"9250F8A9-CB65-4401-A00A-9BFBCDE86021"}
 */
function BTN_exportWord4Word_PRES6()
{
//   Word for Word translation export thing
// Verplicht :@
if(!CHK_versesFilled())
{
	return false;
}
var iStartVerse,iStopVerse,vSQL,vQuery,vWordD,vTekst
// Verses
var vDir = plugins.file.showDirectorySelectDialog();
if(!vDir) { return false }
plugins.dialogs.showInfoDialog('', 'i18n:cvb.lbl.busyExporteren', 'i18n:CVB.lbl.ok');
if(globals.sb_export_gFromVerse.length == 1)
{	
	iStartVerse = (globals.chapter *1000)+globals.sb_export_gFromVerse
} else if (globals.sb_export_gFromVerse.length == 2)
{
	iStartVerse = (globals.chapter *100)+globals.sb_export_gFromVerse
} else if (globals.sb_export_gFromVerse.length == 3)
{
	iStartVerse = (globals.chapter *10)+globals.sb_export_gFromVerse
}

if(globals.sb_export_gVerse.length == 1)
{	
	iStopVerse = (globals.sb_export_toChapter *1000)+globals.sb_export_gVerse
} else if (globals.sb_export_gVerse.length == 2)
{
	iStopVerse = (globals.sb_export_toChapter *100)+globals.sb_export_gVerse
} else if (globals.sb_export_gVerse.length == 3)
{
	iStopVerse = (globals.sb_export_toChapter *10)+globals.sb_export_gVerse
}



// Exports for Old Testament w.word_original,
if(globals.sb_gTestament == 'Old')
{
	// Export zonder unicode
	// colom _unicode
	vSQL =  "SELECT v.verse_number, c.chapter_no, b.book_name, w.word_original, w.word_transliteration, w.word_translation, w.word_strong, w.word_order, ((c.chapter_no * 10000)+v.verse_number) AS chapverscount, v.pk, w.pk AS wordID, 0 AS temp,  w.tr, w.hf, w.n25, w.n27 "
			 +	"FROM words AS w "
			 +	"JOIN verses AS v ON v.pk = w.verse_id "
			 +	"JOIN chapters AS c ON c.pk = v.chapter_id "
			 +	"JOIN books AS b ON b.pk = c.book_id "
			 +	"WHERE verse_id IN ( "
			 +	" SELECT pk FROM verses WHERE chapter_id IN ( SELECT pk FROM chapters WHERE chapter_no >= " + globals.chapter + "AND chapter_no <= " + globals.sb_export_toChapter + " AND book_id = " + globals.book_id + "    ) ) "
			 +	"AND (word_original != '' AND word_original IS NOT NULL) "
			 +	"AND "
		     +	"chapverscount BETWEEN " + iStartVerse + " AND " + iStopVerse + " GROUP BY b.book_name, v.verse_number, c.chapter_no, w.word_original,  w.word_transliteration, w.word_translation, w.word_strong, w.word_order, v.pk, w.pk, w.tr, w.hf, w.n25, w.n27 ORDER BY c.chapter_no, v.verse_number, w.word_order"
} else {
	vSQL =  "SELECT v.verse_number, c.chapter_no, b.book_name, w.word_original, w.word_transliteration, w.word_translation, w.word_strong, w.word_order, ((c.chapter_no * 10000)+v.verse_number) AS chapverscount, v.pk, w.pk AS wordID, wv.code_no AS wordCode, w.tr, w.hf, w.n25, w.n27 "
			 +	"FROM words AS w "
			 +	"JOIN verses AS v ON v.pk = w.verse_id "
			 +	"JOIN chapters AS c ON c.pk = v.chapter_id "
			 +	"JOIN books AS b ON b.pk = c.book_id "
			 // Addition for Word Variant Code
			 +  "JOIN word_variants AS wv ON wv.word_id = w.pk "
			 // End of addition
			 +	"WHERE verse_id IN ( "
			 +	" SELECT pk FROM verses WHERE chapter_id IN ( SELECT pk FROM chapters WHERE chapter_no >= " + globals.chapter + "AND chapter_no <= " + globals.sb_export_toChapter + " AND book_id = " + globals.book_id + "    ) ) "
			 +	"AND (word_original != '' AND word_original IS NOT NULL) "
			 +	"AND "
			 +	"chapverscount BETWEEN " + iStartVerse + " AND " + iStopVerse + " GROUP BY b.book_name, v.verse_number, c.chapter_no, w.word_original, w.word_transliteration, w.word_translation, w.word_strong, w.word_order, v.pk, w.pk, wv.code_no, w.tr, w.hf, w.n25, w.n27 ORDER BY c.chapter_no, v.verse_number, w.word_order"
}
vQuery = databaseManager.getDataSetByQuery('sb', vSQL, null, -1)

/**
 * The order of columns
 * 1 = verse number
 * 2 = chapter number
 * 3 = book name
 * 4 = original word
 * 5 = transliteration word
 * 6 = translation word
 * 7 = strong number
 * 8 = word order
 * 9 = chapterno * 10000 + versenumber (a high #)
 * 10 = verse pk
 * 11 = word pk
 * 12 = Word code 
 * 13 = tr
 * 14 = hf
 * 15 = n25
 * 16 = n27
 **/

var iChapter = 0;
var vString = ""
var aPks = new Array();
var iVerseID = 0

for (var i = 1; i <= vQuery.getMaxRowIndex(); i++)
{
	if(iVerseID != vQuery.getValue(i,10))
	{
		aPks.push(vQuery.getValue(i,10))
		iVerseID = vQuery.getValue(i,10)
	}
	
	if(!iChapter) { iChapter = vQuery.getValue(i,2); vString += vQuery.getValue(i,3) +"\tenter\t"+ iChapter; }
	// So we get a chapter when going to second chapter.
	else if(iChapter != vQuery.getValue(i,2) && globals.sb_gTestament != 'Old') { iChapter = vQuery.getValue (i,2); vString += "\tenter\t"+iChapter; }
//	else if (iChapter != vQuery.getValue(i,2)) { iChapter = vQuery.getValue(i,2); vString += "\t"+vQuery.getValue(i,3) +"\tenter\t"+ iChapter; }
	/**
	 * Only execute when it is NT
	 **/
//	if(globals.sb_gTestament == "New")
//	{
//		var vWordID = vQuery.getValue(i,11);
//		// Lets search if word has a connection to word variants
//		var vSQL_wordVariants = "SELECT code FROM word_variants WHERE word_id = ?";
//	}
	
	if(vQuery.getValue(i,12) != "  ")
	{
		vWordD = '<sup>'+vQuery.getValue(i,12)+'</sup>'+vQuery.getValue(i,4);
	} else {
		vWordD = vQuery.getValue(i,4);
	}
	
//	//scopes.tools.output(vWordD);
	
	/**
	 * END OF EDIT
	 **/
	
	vString += "\tenter\t"+vQuery.getValue(i,1) + "\t" +vQuery.getValue(i,8) + "\t" + vQuery.getValue(i,7) + "\t" + vWordD + "\t" + vQuery.getValue(i,5) + "\t" + vQuery.getValue(i,6)
	var vTR,vHR,vN25,vN27
	if(globals.sb_gTestament == 'New')
	{
		// Addition for tr etc
		if(vQuery.getValue(i,13)) { vTR = 1; } else { vTR = 0; }
		if(vQuery.getValue(i,14)) { vHR = 1; } else { vHR = 0; }
		if(vQuery.getValue(i,15)) { vN25 = 1; } else { vN25 = 0; }
		if(vQuery.getValue(i,16)) { vN27 = 1; } else { vN27 = 0; }
	
		vString += "\t"+vTR+"\t"+vHR+"\t"+vN25+"\t"+vN27;
	}
}
vString += "\tenter"
/*
if(globals.sb_gTestament == "Old")
{
	var vCharSet = "ISO8859_1"
} else {
	var vCharSet = "Cp737"
}*/


var vCharSet = globals.sb_export_charset
var vOs = plugins.it2be_tools.client().osName;
if(vOs.match("Windows"))
{
	plugins.file.writeTXTFile(vDir + "\\export_kolom_1_interlinie.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
} else if(vOs.match("Mac"))
{
	plugins.file.writeTXTFile(vDir + "/export_kolom_1_interlinie.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
}

iChapter = 0;
iVerseID = 0;
vString = ""

/**
 * Most of the stuff stated below here is for the new testament!
 * So the manuscripts will be exported @ the same time as the words.
 **/

if(globals.sb_gTestament == "New")
{
	var vToSQL = aPks.join(', ');
	vSQL = 'SELECT manuscript_info.code_no, manuscript_text, verse_number, chapter_no, book_name, verses.pk, tr FROM manuscript_info '
			 + 'INNER JOIN verses ON manuscript_info.verse_id = verses.pk '
			 + 'INNER JOIN chapters ON verses.chapter_id = chapters.pk '
			 + 'INNER JOIN books ON chapters.book_id = books.pk '
			 + 'WHERE verses.pk IN ('+vToSQL+') '// AND tr = 1'
			 + 'ORDER BY chapter_no, verse_number, manuscript_info.code_no';
	vQuery = databaseManager.getDataSetByQuery('sb', vSQL, null, -1)
	
//	application.ouput(vQuery);
	
	/**
	 * More details about the sql
	 * 
	 * 1 = Manuscript code
	 * 2 = Manuscript text
	 * 3 = verse number
	 * 4 = chapter number
	 * 5 = book name
	 * 6 = verse pk
	 * 7 = TR
	 **/
	
	for(i = 1; i <= vQuery.getMaxRowIndex(); i++)
	{
		if(!iChapter) { iChapter = vQuery.getValue(i,4); vString += vQuery.getValue(i,5) +"\tenter\t"+ iChapter; }
		else if (iChapter != vQuery.getValue(i,4)) { iChapter = vQuery.getValue(i,4); vString += "\tenter\t"+ iChapter; }
		/*if(iVerseID != vQuery.getValue(i, 5)) {
			vString += "\tenter\t"+vQuery.getValue(i, 3);
		}*/
		
		if(vQuery.getValue(i,7) == 1)
		{
			vTekst = 'tekst';
		} else {
			vTekst = 'variant';		
		}
		
		vString += "\tenter\t"+vQuery.getValue(i,3)+"\t"+vQuery.getValue(i,1)+"\t"+vTekst+"\t"+vQuery.getValue(i,2);
		
		//vString += "\t"+vQuery.getValue(i,1)+" "+vQuery.getValue(i,2);
	}
	

	if(vOs.match("Windows"))
	{
		//var fo = new Packages.java.io.FileWriter(vDir + "\\export_manuscript.txt");
		//var writer = new Packages.java.io.BufferedWriter(fo);
		//fo.write(globals.sb_edit_HtmlToTextChangeToSpecialChars(vString));
		plugins.file.writeTXTFile(vDir + "\\export_kolom_2_manuscript.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
	} else if(vOs.match("Mac"))
	{
		plugins.file.writeTXTFile(vDir + "/export_kolom_2_manuscript.txt", globals.sb_edit_HtmlToTextChangeToSpecialChars(vString), vCharSet)
	}
}

plugins.dialogs.showInfoDialog('', i18n.getI18NMessage("servoy.message.exportComplete")+'  '+ vDir, 'i18n:CVB.lbl.ok');
return true
}

/**
 * @properties={typeid:24,uuid:"B4F46416-A0D2-4F7B-926C-B63234098739"}
 */
function CHK_exportEntireBook()
{
var vSQL
if(globals.sb_export_exportAllBooks == 1)
{
	elements.versecc.enabled = false;
	elements.verseccc.enabled = false;
	elements.chapterc.enabled = false;
	elements.chaptercc.enabled = false;
	
	globals.sb_export_gFromVerse = '1';
	globals.chapter = 1;
	
	// Now get the latest chapter and the lates verse, please :-)
	
	// Build my nice SQL
	vSQL = "SELECT MAX(c.chapter_no) "
	vSQL += "FROM chapters AS c "
	vSQL += "WHERE book_id = ?"
	var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [globals.book_id], 1)
	///////////////////////
	vSQL = "SELECT MAX(verse_number) "
	vSQL += "FROM verses "
	vSQL += "WHERE chapter_id IN ( "
	vSQL += "	SELECT pk FROM chapters WHERE book_id = ? AND chapter_no = ? "
	vSQL += ")";
	var vQuery2 = databaseManager.getDataSetByQuery('sb', vSQL, [globals.book_id, vQuery.getValue(1,1)], 1)
	//scopes.tools.output(globals.book_id)
	
	globals.sb_export_gVerse = vQuery2.getValue(1,1);
	globals.sb_export_toChapter = vQuery.getValue(1,1);
	
	elements.exportCommentaries.enabled = true;
	
} else {
	elements.versecc.enabled = true;
	elements.verseccc.enabled = true;
	elements.chapterc.enabled = true;
	elements.chaptercc.enabled = true;
	elements.exportCommentaries.enabled = false;
}
}

/**
 * @properties={typeid:24,uuid:"606F04DF-D549-46C6-9C44-CFF649E67074"}
 */
function CHK_testament()
{
if(globals.sb_gTestament == 'New')
{
	elements.exportCommentaries.text = "i18n:cvb.btn.export_kolom_4";
} else {
	elements.exportCommentaries.text = "i18n:cvb.btn.export_kolom_4_ft";
}
}

/**
 * @properties={typeid:24,uuid:"8B2CAED8-3632-4AA5-A37D-04D9CB0187FD"}
 */
function CHK_versesFilled()
{
if((globals.sb_export_gFromVerse >= 1 && globals.sb_export_gVerse >= 1) && (globals.chapter >= 1 && globals.sb_export_toChapter >= 1))
{
	return true;
} else {
	plugins.dialogs.showInfoDialog('i18n:CVB.dialog.info' , 'i18n:cvb.info.requiredFieldExport')
	return false;
}
}

/**
 * @properties={typeid:24,uuid:"A9B4E111-5AEC-4BB6-A277-F57FE43F9A5D"}
 */
function FORM_onShow()
{
//Method call
CHK_exportEntireBook()
CHK_testament();
}
