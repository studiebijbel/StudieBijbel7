/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"958A0CFD-7DC5-44DD-9F18-0B7BFE97B947"}
 */
var f_results = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7EFBF24D-4B77-4B27-9816-AAF082C65E52"}
 */
var f_filename = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E2D0EA2F-B478-480F-A411-28A32FA4E936"}
 */
function BTN_browse(event) {
	var vFileName = plugins.file.showFileOpenDialog(1);
	elements.btn_next.enabled = false;
	//	f_filename = vFile;

	forms.import_articleWizard_dlg.fv_importkey = application.getUUID().toString();

	forms.import_articleWizard_step2_pan.f_articlename = "";
	forms.import_articleWizard_step2_pan.f_article = "";
	forms.import_articleWizard_step2_pan.f_articleshortname = "";
	forms.import_articleWizard_step2_pan.f_author = "";
	forms.import_articleWizard_step2_pan.f_plaintext = "";

	f_results = "";

	if (!vFileName) {
		f_results = "No file selected";
		return false
	}

	var vFile = plugins.file.readTXTFile(vFileName, 'UTF-8');
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

	// Literature part
	if (!vFile.match(/==== LITERATURE ====/i)) {
		f_results += "Literature is missing\n";
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

		// get the article
		var vArticle = vFile.split("==== ARTICLE ====\n")[1].split('==== FOOTNOTES ====', 1)[0];

		// get the footnotes
		var vFootNotes = vFile.split("==== FOOTNOTES ====\n")[1].split('==== LITERATURE ====', 1)[0];
		
		// get the literature
		var vLiterature = vFile.split("==== LITERATURE ====\n")[1];

		if (utils.stringPatternCount(vArticle, "[cvb_f]") != utils.stringPatternCount(vFootNotes, "[cvb_f]")) {
			f_results += "There are footnotes missing in the article or footnotes part!\n";
			vError++;
		}

		// alter articles and footnotes

		vArticle = utils.stringReplace(vArticle, "\n", "<br />");

		var regexp = /\[cvb_f\]([\d]+)\[\/cvb_f\]/gi;
		vArticle = vArticle.replace(regexp, '<sup><strong><a href="#$1">$1</a><\/strong><\/sup>');
		vFootNotes = vFootNotes.replace(regexp, '<strong><a name="$1">$1</a><\/strong>&nbsp;&nbsp;');
		vFootNotes = utils.stringReplace(vFootNotes, "\n", "<br />");

		if(globals.sb_APP_getServerLang() == "ESP") {
			i18n.setLocale('es','Spain');
		}
		
		var vFull = "<html><body>" + vArticle + "<br /><h2>" + i18n.getI18NMessage('cvb.lbl.footnotes') + "</h2> " + vFootNotes + "<br /><h2>" + i18n.getI18NMessage('cvb.lbl.literature') + "</h2> "+vLiterature + "</body></html>";

		if(globals.sb_APP_getServerLang() == "ESP") {
			i18n.setLocale('nl','Nederland');
		}
		
		forms.import_articleWizard_step2_pan.f_plaintext = vFull;

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
		for (var i in vBooks) {
			vRecord = vImportFS.getRecord(vImportFS.newRecord());
			vRecord.bookname = vBooks[i];

			vBookDS = databaseManager.getDataSetByQuery('sb', vBookSQL, [vBooks[i]], 1);
			if (vBookDS.getMaxRowIndex() == 1) {
				vRecord.book_id = vBookDS[0]["pk"];
			}

			vRecord.import_type = "books";
			vRecord.import_key = forms.import_articleWizard_dlg.fv_importkey;
		}

		var vIntroBooks = vFile.split("booksintro=")[1].split('\n', 1)[0].split(',');
		for (i in vIntroBooks) {
			vRecord = vImportFS.getRecord(vImportFS.newRecord());
			vRecord.bookname = vIntroBooks[i];

			vBookDS = databaseManager.getDataSetByQuery('sb', vBookSQL, [vIntroBooks[i]], 1);
			if (vBookDS.getMaxRowIndex() == 1) {
				vRecord.book_id = vBookDS[0]["pk"];
			}

			vRecord.import_type = "intro";
			vRecord.import_key = forms.import_articleWizard_dlg.fv_importkey;
		}
		databaseManager.saveData();

		forms.import_articleWizard_step2_books.foundset.loadRecords('SELECT article_import_id FROM article_import WHERE import_type = ? AND import_key = ?', ['books', forms.import_articleWizard_dlg.fv_importkey]);
		forms.import_articleWizard_step2_introbooks.foundset.loadRecords('SELECT article_import_id FROM article_import WHERE import_type = ? AND import_key = ?', ['intro', forms.import_articleWizard_dlg.fv_importkey]);
		forms.import_articleWizard_step2_pan.f_article = vFull;

		f_filename = vFileName;
		elements.btn_next.enabled = true;
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
 * @properties={typeid:24,uuid:"CA9470BE-6601-4EAF-AEB5-B754478FB60E"}
 */
function BTN_openExample(event) {
	/*var vWin = application.createWindow('', JSWindow.MODAL_DIALOG);
	 vWin.setInitialBounds(-1, -1, -1, -1);
	 vWin.show(forms.import_articleWizard_example_dlg)*/

	var vExample = "==== HEADER ====\r\n\
title=Test Article\r\n\
shorttitle=test\r\n\
author=Direct ICT B.V.\r\n\
books=Genesis, Genesis1\r\n\
booksintro=Exodus\r\n\
==== ARTICLE ====\r\n\
Here comes the article, you even can use footnotes[cvb_f]1[/cvb_f] if you want to!\r\n\
==== FOOTNOTES ====\r\n\
[cvb_f]1[/cvb_f] As you can see the footnote is placed in a other section";

	var vFile = plugins.file.createTempFile("article_import", "csv");
	plugins.file.writeTXTFile(vFile, vExample);

	application.executeProgram("notepad.exe", [vFile.getAbsolutePath()]);

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D175B7C4-06C6-47AB-8FCA-0ABB19817143"}
 */
function BTN_next(event) {
	forms.import_articleWizard_dlg.elements.steps.tabIndex = 2;
}
