/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EA2CAAE1-0E38-4EE2-B762-5BBEFC2352DD"}
 */
var f_filename = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7D06A47B-D3BD-426A-B21D-EB2CC4B02F33"}
 */
var f_results = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9FA41AED-558C-4F03-B6F4-59F5D5C2C26B"}
 */
function BTN_browse(event) {
	var vFileName = plugins.file.showFileOpenDialog(1);
	elements.btn_next.enabled = false;
	//	f_filename = vFile;

	forms.import_articleWizard_dlg.fv_importkey = application.getUUID().toString();

	forms.import_wordstudyWizard_step2_pan.f_html = "";
	forms.import_wordstudyWizard_step2_pan.f_original = "";
	forms.import_wordstudyWizard_step2_pan.f_plaintext = "";
	forms.import_wordstudyWizard_step2_pan.f_testament = "";
	forms.import_wordstudyWizard_step2_pan.f_transliteration = "";
	forms.import_wordstudyWizard_step2_pan.f_wordstrong = "";
	forms.import_wordstudyWizard_step2_pan.f_wordstudy_version = "";

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

	if (!vFile.match(/word_strong=/i)) {
		f_results += "Strong number is missing\n";
		vError++;
	}

	if (!vFile.match(/original=/i)) {
		f_results += "Original is missing\n";
		vError++;
	}

	if (!vFile.match(/transliteration=/i)) {
		f_results += "Transliteration is missing\n";
		vError++;
	}

	if (!vFile.match(/testament=/i)) {
		f_results += "Testament is missing\n";
		vError++;
	}

	if (!vFile.match(/wordstudy_version=/i)) {
		f_results += "Wordstudy version is missing\n";
		vError++;
	}
	// Article part
	if (!vFile.match(/==== WORDSTUDY FIRST LINE ====/i)) {
		f_results += "Header is missing\n";
		vError++;
	}

	// Literature part
	if (!vFile.match(/==== WORDSTUDY ====/i)) {
		f_results += "Wordstudy is missing\n";
		vError++;
	}
	

	if (vError == 0) {
		// get the title
		var vWordStrong = vFile.split("word_strong=")[1].split('\n', 1)[0];
		forms.import_wordstudyWizard_step2_pan.f_wordstrong = utils.stringTrim(vWordStrong);

		// get the shorttitle
		var vOriginal = vFile.split("original=")[1].split('\n', 1)[0];
		forms.import_wordstudyWizard_step2_pan.f_original = vOriginal;

		// get the author
		var vTransliteration = vFile.split("transliteration=")[1].split('\n', 1)[0];
		forms.import_wordstudyWizard_step2_pan.f_transliteration = vTransliteration;

		var vTestament = vFile.split('testament=')[1].split('\n', 1)[0];
		forms.import_wordstudyWizard_step2_pan.f_testament = vTestament;
		
		if(vTestament == "old")
		{
			vTestament = "Old";
		} else if(vTestament == "new") {
			vTestament = "New";
		}
		
		forms.import_wordstudyWizard_step2_pan.f_testament = vTestament;
		
		var vWordStudyVersion = vFile.split('wordstudy_version=')[1].split('\n', 1)[0];
		forms.import_wordstudyWizard_step2_pan.f_wordstudy_version = vWordStudyVersion;
		
		// get the article
		var vFirstLine = vFile.split("==== WORDSTUDY FIRST LINE ====\n")[1].split('==== WORDSTUDY ====', 1)[0];

		// get the literature
		var vWordStudy = vFile.split("==== WORDSTUDY ====")[1];

		// alter articles and footnotes

		vWordStudy = utils.stringReplace(vWordStudy, "\n", "<br />");

		var vFull = "<html><body>" + vWordStudy + "</body></html>";

		forms.import_wordstudyWizard_step2_pan.f_firstline = vFirstLine
		forms.import_wordstudyWizard_step2_pan.f_plaintext = vWordStudy;

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

		forms.import_wordstudyWizard_step2_pan.f_html = vFull;

		f_filename = vFileName;
		elements.btn_next.enabled = true;
		forms.import_wordstudyWizard_dlg.elements.steps.tabIndex = 2;
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
 * @properties={typeid:24,uuid:"8B31AF4F-F6A4-4860-8C18-D4E9A4F97A1B"}
 */
function BTN_openExample(event) {
	/*var vWin = application.createWindow('', JSWindow.MODAL_DIALOG);
	 vWin.setInitialBounds(-1, -1, -1, -1);
	 vWin.show(forms.import_articleWizard_example_dlg)*/

	/*var vExample = "==== HEADER ====\r\n\
word_strong=0244\r\n\
original=woord\r\n\
transliteration=l&#275;sous\r\n\
testament=old\r\n\
wordstudy_version=lexicografische\r\n\
==== WORDSTUDY FIRST LINE ====\r\n\
De eigennaam (mnl.) Iēsous wordt in het Nederlands weergegeven met ‘Jezus’ of ‘Jozu\r\n\
==== WORDSTUDY ====\r\n\
De naam Iesous (de vergriekste vorm van de naam Jozua) is afgeleid van de Hebreeuwse naam jehosjua of jesjua, die ‘de \r\n\
HERE is redding’ (vgl. Mat.1:21) betekent. Jezus/Jozua was ten tijde van het OT en NT een zeer gangbare Joodse naam (in \r\n\
het OT bv. in Joz.1:1; 1Sam.6:14; 2Kon.23:8; 2Kr.31:15). Flavius Josephus alleen al noemt in zijn geschriften zo’n twintig \r\n\
verschillende personen met de naam Jezus, van wie er tien tijdgenoten van de Here Jezus Christus zijn (TDNT III,285). In \r\n\
het Grieks is er geen verschil tussen de namen ‘Jezus’ en ‘Jozua’, in onze vertalingen wordt doorgaans een onderscheid \r\n\
gemaakt tussen ‘Jezus’ en ‘Jozua’. \r\n\
(a) De Here Jezus Christus. ";*/
	
	var vExample = "==== HEADER ====\r\n\
word_strong=872\r\n\
original=βίβλος\r\n\
transliteration=biblos\r\n\
testament=new\r\n\
wordstudy_version=wsnt\r\n\
==== WORDSTUDY FIRST LINE ====\r\n\
Het zelfstandig naamwoord (vrl.) biblos betekent ‘boek(rol)’.\r\n\
==== WORDSTUDY ====\r\n\
Oorspronkelijk is biblos de naam van de papyrusplant, die vooral in Egypte groeide en verhandeld werd. Uit het materiaal van deze plant werd een soort ‘papier’ vervaardigd, dat gebruikt werd om boekrollen of - meer in latere tijden - boeken van te maken.\r\n\
\r\n\
Ter onderscheiding van [cvb_i]871 871 biblion[/cvb_i] kunnen we zeggen dat biblos ‘boek(rol)’ vrijwel uitsluitend voor grotere boekrollen wordt gebruikt, waarvan het formaat, en wellicht ook de inhoud, ertoe aanzet het verkleinwoord biblion te vermijden."

	var vFile = plugins.file.createTempFile("wordstudy_import", "csv");
	plugins.file.writeTXTFile(vFile, vExample, 'UTF-8');

	application.executeProgram("notepad.exe", [vFile.getAbsolutePath()]);

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5AC53BF1-5340-46D0-A97D-E6A6F34319E8"}
 */
function BTN_next(event) {
	forms.import_wordstudyWizard_dlg.elements.steps.tabIndex = 2;
}
