/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DC69ADB3-81DA-4029-9EF2-912B0F8FFCCA"}
 */
var f_filename = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"06A18616-4406-42FA-984E-16886978F821"}
 */
var f_results = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AD928338-BB65-4A40-BE6A-35C1346E20C3"}
 */
function BTN_browse(event) {
	var vFileName = plugins.file.showFileOpenDialog(1);
	//elements.btn_next.enabled = false;
	//	f_filename = vFile;
	
	forms.import_articleWizard_dlg.fv_importkey = application.getUUID();
	
	forms.import_articleWizard_step2_pan.f_articlename = "";
	forms.import_articleWizard_step2_pan.f_article = "";
	forms.import_articleWizard_step2_pan.f_articleshortname = "";
	forms.import_articleWizard_step2_pan.f_author = "";

	f_results = "";

	if (!vFileName) {
		f_results = "No file selected";
		return false
	}

	var vFile = plugins.file.readTXTFile(vFileName);
	var vError = 0

		// check if the headers are there!
	// Header Part
	if (!vFile.match(/==== HEADER ====/i)) {
		f_results += "Header is missing\n";
		vError++;
	}

	if (!vFile.match(/title=/i)) {
		f_results += "Title is missing\n";
		vError++;
	}

	if (!vFile.match(/shorttitle=/i)) {
		f_results += "Shorttitle is missing\n";
		vError++;
	}

	if (!vFile.match(/author=/i)) {
		f_results += "Author is missing\n";
		vError++;
	}

	if (!vFile.match(/books=/i)) {
		f_results += "Books is missing\n";
		vError++;
	}

	if (!vFile.match(/booksintro=/i)) {
		f_results += "Booksintro is missing\n";
		vError++;
	}
	// Article part
	if (!vFile.match(/==== ARTICLE ====/i)) {
		f_results += "Header is missing\n";
		vError++;
	}

	// Footnotes part
	if (!vFile.match(/==== FOOTNOTES ====/i)) {
		f_results += "Footnotes is missing\n";
		vError++;
	}

	if (vError == 0) {
		// get the title
		var vTitle = vFile.split("title=")[1].split('\n', 1)[0];
		forms.import_articleWizard_step2_pan.f_articlename = vTitle;

		// get the shorttitle
		var vShortTitle = vFile.split("shorttitle=")[1].split('\n', 1)[0];
		forms.import_articleWizard_step2_pan.f_articleshortname = vShortTitle;

		// get the author
		var vAuthor = vFile.split("author=")[1].split('\n', 1)[0];
		forms.import_articleWizard_step2_pan.f_author = vAuthor;
	}
	// get the article
	var vArticle = vFile.split("==== ARTICLE ====")[1].split('==== FOOTNOTES ====', 1)[0];

	// get the footnotes
	var vFootNotes = vFile.split("==== FOOTNOTES ====")[1];

	if (utils.stringPatternCount(vArticle, "[cvb_f]") != utils.stringPatternCount(vFootNotes, "[cvb_f]")) {
		f_results += "There are footnotes missing in the article or footnotes part!\n";
		vError++;
	}

	// alter articles and footnotes

	var regexp = /\[cvb_f\]([\d]+)\[\/cvb_f\]/gi;
	vArticle = vArticle.replace(regexp, '<sup><strong><a href="#$1">$1</a><\/strong><\/sup>');
	vFootNotes = vFootNotes.replace(regexp, '<strong><a map="$1">$1</a><\/strong>&nbsp;&nbsp;');
	vFootNotes = utils.stringReplace(vFootNotes, "\n", "<br />");
	
	var vFull = "<html><body>" + vArticle + "<br /><h2>Footnotes</h2> " + vFootNotes + "</body></html>";

	//Need to change the special characters
	vFull = globals.sb_edit_TextToHtmlChangeSpecialCharsToHtml(vFull);
	//Add wlink, with greek words
	vFull = globals.sb_edit_TextToHtmlFillWlink(vFull);
	//Add tlink
	vFull = globals.sb_edit_TextToHtmlFillTlink(vFull);
	//Change <su> to <sup>
	vFull = globals.sb_edit_TextToHtmlChangeSuToSuper(vFull);
	//Fill hebrew font
	vFull = globals.sb_edit_TextToHtmlChangeHebrewWords(vFull);
	
	// DO NOT DELETE IN THIS FOUNDSET!!!!
	var vBookSQL = "SELECT pk FROM books WHERE book_name = ?";
	var vBookDS = null;
	
	// Strip the books
	var vBooks = vFile.split("books=")[1].split('\n', 1)[0].split(',');
	var vImportFS = databaseManager.getFoundSet('sb', 'article_import');
	var vRecord;
	for(var i in vBooks)
	{
		vRecord = vImportFS.getRecord(vImportFS.newRecord());
		vRecord.bookname = vBooks[i];
		
		vBookDS = databaseManager.getDataSetByQuery('sb', vBookSQL, [vBooks[i]], 1);
		if(vBookDS.getMaxRowIndex() == 1)
		{
			vRecord.book_id = vBookDS[0]["pk"];
		}
		
		vRecord.import_type = "books";
		vRecord.import_key = forms.import_articleWizard_dlg.fv_importkey;
	}
	
	var vIntroBooks = vFile.split("booksintro=")[1].split('\n', 1)[0].split(',');
	for(i in vIntroBooks)
	{
		vRecord = vImportFS.getRecord(vImportFS.newRecord());
		vRecord.bookname = vIntroBooks[i];
		
		vBookDS = databaseManager.getDataSetByQuery('sb', vBookSQL, [vIntroBooks[i]], 1);
		if(vBookDS.getMaxRowIndex() == 1)
		{
			vRecord.book_id = vBookDS[0]["pk"];
		}
		
		vRecord.import_type = "intro";
		vRecord.import_key = forms.import_articleWizard_dlg.fv_importkey;
	}
	databaseManager.saveData();
	
	
	forms.import_articleWizard_step2_books.foundset.loadRecords('SELECT article_import_id FROM article_import WHERE import_type = ? AND import_key = ?',['books', forms.import_articleWizard_dlg.fv_importkey]);
	forms.import_articleWizard_step2_introbooks.foundset.loadRecords('SELECT article_import_id FROM article_import WHERE import_type = ? AND import_key = ?',['intro', forms.import_articleWizard_dlg.fv_importkey]);
	
/*	
	var vBDS = databaseManager.createEmptyDataSet(null, null);
	var i =0;
	var o = 1;
	vBDS.addColumn('book_name', 1, JSColumn.TEXT);
	
	for(i in vBooks)
	{
		vBDS.addRow(o, [vBooks[i]]);
		o++;
	}	
	
	history.removeForm('import_articleWizard_step2_books');
	solutionModel.removeForm('import_articleWizard_step2_books');
	var vBooksForm = solutionModel.getForm('import_articleWizard_step2_books');
	forms.import_articleWizard_step2_books.fv_dataset = vBDS;
	
	var vDS = vBDS.createDataSource('booksDS', [JSColumn.TEXT]);
	vBooksForm.dataSource = vDS;
	
	var fld_1 = vBooksForm.getField('book_name');
		fld_1.dataProviderID = "book_name";
	*/
	forms.import_articleWizard_step2_pan.f_article = vFull;
	if (vError == 0) {
		f_filename = vFileName;
//		elements.btn_next.enabled = true;
		forms.import_articleWizard_dlg.elements.steps.tabIndex = 2;
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
 * @properties={typeid:24,uuid:"3613D097-87A8-4CF5-84D8-9468D98D04F2"}
 */
function BTN_openExample(event) {
	// TODO Auto-generated method stub
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"88BA2324-94A1-4209-B70A-B6295CDC4ADF"}
 */
function BTN_next(event) {
	forms.import_articleWizard_dlg.elements.steps.tabIndex = 2;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A4B89645-0C3A-4B75-996D-BC4305C2DED3"}
 */
function onShow(firstShow, event) {
	var vSource = forms.import_articleWizard_step2_pan;
	
	/** @type {JSFoundSet<db:/sb/articles>} */
	var vArticleFS = databaseManager.getFoundSet('sb','articles');
	var vRecord = vArticleFS.getRecord(vArticleFS.newRecord());
	vRecord.filename = vSource.f_articlename;
	vRecord.article_small_title = vSource.f_articleshortname;
	vRecord.author = vSource.f_author;
	vRecord.article_html = vSource.f_article;
	vRecord.article_text = vSource.f_plaintext;
	databaseManager.saveData();
	
	var vArticleID = vRecord.pk;
	
	var vArtBookFS = databaseManager.getFoundSet('sb','book_article');
	var vArtBookDS = databaseManager.getDataSetByQuery('sb', 'SELECT * FROM article_import WHERE book_id IS NOT NULL AND import_type = ? AND import_key = ?',['books', forms.import_articleWizard_dlg.fv_importkey.toString()], -1);
	var vBookRecDS = null;
	var vBookRecFS = null;
	
	for(var i = 0; i < vArtBookDS.getMaxRowIndex(); i++)
	{	
		vBookRecFS = vArtBookFS.getRecord(vArtBookFS.newRecord());
		vBookRecDS = vArtBookDS[i]
		vBookRecFS.article_id = vArticleID;
		vBookRecFS.book_id = vBookRecDS["book_id"];
	}
	
	var vArtIntroBookFS = databaseManager.getFoundSet('sb','book_inleiding');
	var vArtIntroBookDS = databaseManager.getDataSetByQuery('sb', 'SELECT * FROM article_import WHERE book_id IS NOT NULL AND import_type = ? AND import_key = ?',['intro', forms.import_articleWizard_dlg.fv_importkey.toString()], -1);
	var vIntroBookRecDS = null;
	var vIntroBookRecFS = null;
	
	for(i = 0; i < vArtIntroBookDS.getMaxRowIndex(); i++)
	{	
		vIntroBookRecFS = vArtIntroBookFS.getRecord(vArtIntroBookFS.newRecord());
		vIntroBookRecDS = vArtIntroBookDS[i]
		vIntroBookRecFS.article_id = vArticleID;
		vIntroBookRecFS.book_id = vIntroBookRecDS["book_id"];
	}
	
	forms.import_articleWizard_step2_books.foundset.loadRecords('SELECT article_import_id FROM article_import WHERE import_key = ?', [forms.import_articleWizard_dlg.fv_importkey.toString()]);
	forms.import_articleWizard_step2_books.foundset.deleteAllRecords();
	
	databaseManager.saveData();
	
	application.sleep(15000);
	
	forms.import_articleWizard_dlg.elements.steps.tabIndex = 4;
	
	/*
	 * forms.import_articleWizard_step2_books.foundset.loadRecords('SELECT article_import_id FROM article_import WHERE import_type = ? AND import_key = ?',['books', forms.import_articleWizard_dlg.fv_importkey]);
	 * forms.import_articleWizard_step2_introbooks.foundset.loadRecords('SELECT article_import_id FROM article_import WHERE import_type = ? AND import_key = ?',['intro', forms.import_articleWizard_dlg.fv_importkey]);
	 */
	 
	
	
}
