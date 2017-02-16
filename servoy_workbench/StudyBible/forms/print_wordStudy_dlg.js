/**
 * @properties={typeid:24,uuid:"F4ABBEC5-B164-49AC-96E5-FF6321B14D36"}
 */
function BTN_print() {
	// Get the PK of the wordstudy
	var vSQL = "SELECT pk FROM word_study WHERE word_strong = ?"
	var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [globals.myWordStudyID], -1);

	var vStudyID = vQuery.getValue(1, 1)

	//application.closeFormDialog()
	//SMM - 23-05-2010
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}

	//plugins.jasperPluginRMI.reportDirectory = globals.SETTINGS.jasper.report_directory;
	
	var $ParametersMap = new java.util .HashMap()
		//var vParameters = new Object();
	//vParameters.VIRTUALIZER_TYPE = "gZip"
	 
//	var vUUID = application.getNewUUID()
	//  plugins.dialogs.showInfoDialog( 'test',  plugins.jasperPluginRMI.pluginVersion,  'OK')

	$ParametersMap.put('word_study_id', vStudyID)// globals.verse_id)
	$ParametersMap.put('word_strong', globals.myWordStudyID)
	$ParametersMap.put('wordStudyChk', 1);
	$ParametersMap.put('wordFormsChk', globals.sb_print_bibleTranslations);
	$ParametersMap.put('wordConcordanceChk', globals.sb_print_wordStudy_concordance);
	//	globals.myWordStudyAnalyzePK = word_study_to_word_study_analyze.pk
	$ParametersMap.put('word_study_analyze_pk', globals.myWordStudyAnalyzePK);

	$ParametersMap.put('word_study_version_key', forms.word_study.f_version);
	$ParametersMap.put('word_study_version_abbr', forms.word_study.f_abbr);
	
	$ParametersMap.put('word_study_font', ((globals.myWordStudyID.match(/OT/))?'SIL Ezra':'Arial Unicode MS'));
	
	/*vParameters.word_study_id = parseInt( vStudyID )
	 vParameters.word_strong = globals.myWordStudyID
	 vParameters.wordStudyChk = 1
	 vParameters.wordFormsChk = parseInt( globals.sb_print_bibleTranslations )
	 vParameters.wordConcordanceChk = parseInt( globals.sb_print_wordStudy_concordance )
	 vParameters.word_study_analyze_pk = parseInt( globals.myWordStudyAnalyzePK )*/
	if (!globals.amb_checkEsp()) {
		$ParametersMap.put('languageParam', 0);
	} else {
		$ParametersMap.put('languageParam', 1);
	}
	 
	//plugins.jasperPluginRMI.reportDirectory = vJasperPath
	//	plugins.jasperPluginRMI.jasperCompile('CVB_words.jrxml',true)
	//	plugins.jasperPluginRMI.jasperCompile('CVB_words_subreport_word_study_analyze_original.jrxml',true)
	//	plugins.jasperPluginRMI.jasperCompile('CVB_words_WordFormsSubReport.jrxml',true)
	//	plugins.jasperPluginRMI.jasperCompile('CVB_words_WordFormsSubReportAangepast.jrxml',true)
	//	plugins.jasperPluginRMI.jasperCompile('CVB_words_WordStudySubReport.jrxml',true)
	 
	plugins.jasperPluginRMI.runReport('sb', 'CVB_words.jrxml', null, plugins.jasperPluginRMI.OUTPUT_FORMAT.VIEW, $ParametersMap);
		
	$ParametersMap.clear()
}

/**
 * @properties={typeid:24,uuid:"32F9E55F-1256-4B6E-8051-6D93C2A18CBD"}
 */
function FORM_onShow() {
	foundset.loadAllRecords()
	
	if (globals.words_study.match('Woordvormen')) {
		globals.sb_print_bibleTranslations = true;
	} else {
		globals.sb_print_bibleTranslations = false;
	}
	
	if (globals.words_study.match('Concordantie')) {
		globals.sb_print_wordStudy_concordance = true
	} else {
		globals.sb_print_wordStudy_concordance = false
	}
	
	
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.options_block.visible = false;
		globals.sb_print_bibleTranslations = 0;
		globals.sb_print_wordStudy_concordance = 0;
	}
	
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8CD78CA0-B56B-4612-995C-76B7BF1773AD"}
 */
function onLoad(event) {
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.options_block.visible = false;
		globals.sb_print_bibleTranslations = 0;
		globals.sb_print_wordStudy_concordance = 0;
	}
}
