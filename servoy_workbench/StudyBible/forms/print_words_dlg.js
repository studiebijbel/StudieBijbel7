/**
 * @properties={typeid:24,uuid:"E90553BA-02D5-4F72-9856-446E7EE8B9BA"}
 */
function BTN_print() {
	///// Split the spacing tranclations

	var vVerseID = globals.verse_id;
	// nothing selected in dialog.
	if(!globals.sb_print_bibleTranslations && !one_one){
		var v_win = application.getWindow();
		v_win.hide();
		return false;
	}
	
	/** @type {JSFoundset<db:/sb/verses>} */
	var vFoundset = databaseManager.getFoundSet('sb', 'verses');
	vFoundset.loadRecords('SELECT pk FROM verses WHERE pk = ?', [vVerseID]);

	var vWords
	
	var vTextEdition = (globals.text_version)?globals.text_version:"TR";
	
	switch (vTextEdition) {
	case "TR":
		if (globals.griek_version == i18n.getI18NMessage('onlyGreek') || globals.heb_version == i18n.getI18NMessage('msg_onlyHebrew')) {
			vWords = vFoundset.words_html_tr_gr
		} else {
			vWords = vFoundset.words_html_tr
		}
		break;

	case "H-F":
		if (globals.griek_version == i18n.getI18NMessage('onlyGreek')) {
			vWords = vFoundset.words_html_hf_gr
		} else {
			vWords = vFoundset.words_html_hf
		}
		break;

	case "N25":
		if (globals.griek_version == i18n.getI18NMessage('onlyGreek')) {
			vWords = vFoundset.words_html_n25_gr
		} else {
			vWords = vFoundset.words_html_n25
		}
		break;

	case "N27":
		if (globals.griek_version == i18n.getI18NMessage('onlyGreek')) {
			vWords = vFoundset.words_html_n27_gr
		} else {
			vWords = vFoundset.words_html_n27
		}
		break;
	}
	vWords = utils.stringReplace(vWords, '<html><body><table><tr><td><table cellpadding="4" cellspacing="4"><tr>', '');
	vWords = utils.stringReplace(vWords, '</tr></table></td></tr></table></body></html>', '');
	vWords = utils.stringReplace(vWords, '<tr>', '');
	// Now the nice stuff :-)
	var vSplittedTRS = vWords.split('</tr>')
	var vSplittedTDS = new Array();
	for (var i = 0; i < vSplittedTRS.length; i++) {
		vSplittedTRS[i] = utils.stringReplace(vSplittedTRS[i], '<td>', '');
		vSplittedTRS[i] = utils.stringReplace(vSplittedTRS[i], '<td valign="top">', '');

		vSplittedTDS.push(vSplittedTRS[i].split('</td>'));
	}

	var vCorrectArray = new Array();
//	var vTotalRows = (vSplittedTDS.length) - 1;
	for (var k = 0; k < vSplittedTDS[0].length; k++) {
		var myString = "";
		// Build a "little" string :-(
		for (var l = 0; l < vSplittedTDS.length; l++) {
			if (l != 0) {
				myString += "<br><br>";
			}
			myString += vSplittedTDS[l][k];
		}
		vCorrectArray.push(myString)
	}

	//scopes.tools.output(vSplittedTRS);
	// Loop trough the vCorrectArray to change undefined to ''

	for (i = 0; i < vCorrectArray.length; i++) {
		vCorrectArray[i] = utils.stringReplace(vCorrectArray[i], 'undefined', '');
	}

	//application.closeFormDialog()
	//SMM - 23-05-2010
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}

//	plugins.jasperPluginRMI.reportDirectory = plugins.it2be_tools.server().getApplicationServerDir() + '/server/webapps/ROOT/reports/'
//	plugins.jasperPluginRMI.reportDirectory = globals.SETTINGS.jasper.report_directory;

	//var vInstalldir = plugins.it2be_tools.server().userDir //java.lang.System.getProperty("user.dir");
	//vInstalldir = utils.stringReplace(vInstalldir, 'developer', 'application_server')
	//vInstalldir = utils.stringReplace(vInstalldir,'\\','\/');
	//vInstalldir = 'D:/servoy6/application_server'
	//var vJasperPath = vInstalldir+'/server/webapps/ROOT/reports/'
	//plugins.dialogs.showInfoDialog('', vJasperPath)

	//vJasperPath = utils.stringReplace(vJasperPath,"developer","application_server");
//	var vTemp = globals.selectedPrint

	 
	var $ParametersMap = new java.util.HashMap()
	 
//	var vUUID = application.getNewUUID()
	 
	//$ParametersMap.put('SUBREPORT_DIR',vJasperPath)
	$ParametersMap.put('verse_id', vVerseID)// globals.verse_id)
	
	$ParametersMap.put('textEdition', ((globals.sb_gTestament=="New")?globals.text_version:""));
	
	//$ParametersMap.put(SORT_FIELDS = false)
	$ParametersMap.put('wordTranslate1', vCorrectArray[0]);
	$ParametersMap.put('wordTranslate2', vCorrectArray[1]);
	$ParametersMap.put('wordTranslate3', vCorrectArray[2]);
	$ParametersMap.put('wordTranslate4', vCorrectArray[3]);
	$ParametersMap.put('wordTranslate5', vCorrectArray[4]);
	$ParametersMap.put('translationChk', parseInt(globals.sb_print_bibleTranslations.toString()));
	$ParametersMap.put('oorsprText', one_one);//parseInt(one_one)
	
	var vTranslations = [];
	var vTrans1 = globals.translation.split('\n');
	for(i = 0; i < vTrans1.length; i++)
	{
		vTranslations.push("'" + vTrans1[i] + "'");
	}
	
	if(globals.sb_gTranslationPartial)
	{
		var vTrans2 = globals.sb_gTranslationPartial.split('\n');
		for(i = 0; i < vTrans2.length; i++)
		{
			vTranslations.push("'" + vTrans2[i] + "'");
		}
	}
	
	//vTranslations = vTranslations.join(", ");
	//$ParametersMap.put('selectedTranslations', vTranslations);
	
//	scopes.tools.output($ParametersMap);
	
	//scopes.tools.output(vVerseID)
	//scopes.tools.output(vCorrectArray[0])
	//scopes.tools.output(vCorrectArray[1])
	//scopes.tools.output(vCorrectArray[2])
	//scopes.tools.output(vCorrectArray[3])
	//scopes.tools.output(vCorrectArray[4])
	//scopes.tools.output(parseInt( globals.sb_print_bibleTranslations ))

	//	var vParameters = new Object();
	//vParameters.VIRTUALIZER_TYPE = "gZip"
	//vParameters.wordTranslate1 = vCorrectArray[0]
	//vParameters.wordTranslate2 = vCorrectArray[1]
	//vParameters.wordTranslate3 = vCorrectArray[2]
	//vParameters.wordTranslate4 = vCorrectArray[3]
	//vParameters.wordTranslate5 = vCorrectArray[4]
	//vParameters.translationsChk = globals.sb_print_bibleTranslations
	//scopes.tools.output(vVerseID)
	if (!globals.amb_checkEsp()) {
		$ParametersMap.put('languageParam', 0);
		//vParameters.languageParam = 0
	} else {
		$ParametersMap.put('languageParam', 1);
		//vParameters.languageParam = 1
	}
	 
	application.updateUI(); //to make sure the Servoy window doesn't grab focus after showing the Jasper Viewer
	try {
		var x =plugins.jasperPluginRMI.runReport('sb', 'CVB_verse_translations.jrxml', null, plugins.jasperPluginRMI.OUTPUT_FORMAT.VIEW, $ParametersMap);
	} finally {
		scopes.tools.output(x);
	}
	
	
	$ParametersMap.clear()
	return true
}

/**
 * @properties={typeid:24,uuid:"84892BC2-C32C-4B15-B8E8-ACDD6F3589CA"}
 */
function FORM_onShow() {
	foundset.loadAllRecords();
}
