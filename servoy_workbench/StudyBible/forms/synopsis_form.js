/**
 * @properties={typeid:24,uuid:"0fc650cc-5998-45ce-ac7b-e39caef150f1"}
 * @AllowToRunInFind
 */
function getSynopsis() {
	/** @type JSRecord<db:/sb/synopsis_ref> */
	var record
	var string1 = '<= '
	string1 = string1.concat(globals.selected_verse_id.toString())
	var string2 = '>= '
	string2 = string2.concat(globals.selected_verse_id.toString())
	forms.synopsis_form.foundset.clear()
	
	if(forms.synopsis_form.controller.find()) {
		forms.synopsis_form.verse_from = string1
		forms.synopsis_form.verse_top = string2
		forms.synopsis_form.controller.search()
	}

	globals.synopsis = '<html><body><table class=\"synopsis-table\" cellpadding=\"0\" cellspacing=\"0\">'
	if (forms.synopsis_form.foundset.getSize() > 0) {
		for (var i = 1; i <= forms.synopsis_form.foundset.getSize(); i++) {
			record = forms.synopsis_form.foundset.getRecord(i)
			var res = databaseManager.getDataSetByQuery('sb', 'select pk,syn_number,text_mt,text_mk,text_lk,text_jh from synopsis_text where pk=' + record.text_id, null, 10000)
			for (var j = 1; j <= res.getMaxRowIndex(); j++) {
				res.rowIndex = j
//				globals.synopsis = globals.synopsis.concat('<td><a href=\"javascript:forms.synopsis_form.openPdf(\'' + res.getValue(j, 2) + '\')\"><font color="#000000">Synopsis ')
//				globals.synopsis = globals.synopsis.concat(res.getValue(j, 2)) 
//				globals.synopsis = globals.synopsis.concat('</font></a></td><td>')
//				globals.synopsis = globals.synopsis.concat(res.getValue(j, 3))
//				globals.synopsis = globals.synopsis.concat('</td><td>')
//				globals.synopsis = globals.synopsis.concat(res.getValue(j, 4))
//				globals.synopsis = globals.synopsis.concat('</td><td>')
//				globals.synopsis = globals.synopsis.concat(res.getValue(j, 5))
//				globals.synopsis = globals.synopsis.concat('</td><td>')
//				globals.synopsis = globals.synopsis.concat(res.getValue(j, 6))
//				globals.synopsis = globals.synopsis.concat('</td></tr>')

				globals.synopsis += "<tr><td>";
				
				globals.synopsis += '<a href=\"javascript:forms.synopsis_form.openPdf(\'' + res.getValue(j, 2) + '\')\"><font color="#000000">' + i18n.getI18NMessage('cvb.lbl.Synopsis') + ' ' + res.getValue(j, 2) + "</font></a> &nbsp; ";
				globals.synopsis += res.getValue(j, 3) + "&nbsp;&nbsp;&nbsp;" + res.getValue(j, 4) + "&nbsp;&nbsp;&nbsp;" + res.getValue(j, 5) + "&nbsp;&nbsp;&nbsp;" + res.getValue(j, 6);
				
				globals.synopsis += "</td></tr>";
				
			}
		}
	} else {
		globals.synopsis = globals.synopsis.concat('<tr><td>' + i18n.getI18NMessage('cvb.lbl.noparallelverses') + '</td></tr>')
	}
	globals.synopsis = globals.synopsis.concat('<tr><td><br><a href=\"javascript:forms.synopsis_form.openIn()\"><font color="#000000">' + i18n.getI18NMessage('cvb.lbl.introductionSynopsis') + '</font></a></td></tr>')
	globals.synopsis = globals.synopsis.concat('<tr><td><a href=\"javascript:forms.synopsis_form.openPdf()\"><font color="#000000">' + i18n.getI18NMessage('cvb.lbl.Synopsis') + '</font></a></td></tr>')
	//globals.synopsis = globals.synopsis.concat('<tr><td><a href=\"javascript:globals.openPdf()\"><font color="#000000">Grammatica</font></a></td></tr>')
	globals.synopsis = globals.synopsis.concat('</table></body></html>')
	
		if(application.getApplicationType() != APPLICATION_TYPES.WEB_CLIENT) {
		//forms.sb_form.loadFormsInBean(forms.synopsis_form)
		forms.synopsis_form.controller.show()
		forms.sb_form.controller.show()
	
		globals.notes = globals.synopsis;
		
		forms.book_notes.fv_html = globals.synopsis;
	
		forms.sb_form.resizeSplitTab(null,'book_notes');
	}
	
	//forms.sb_form.elements.bean_321.dividerLocation = 450
	//forms.sb_form.elements.bean_321.bottomComponent = forms.synopsis_form
	//sforms.sb_form.elements.bean_321.bottomComponent = forms.sb_form.elements.tabs_synopsis_form

}

/**
 * @properties={typeid:24,uuid:"1ca6340f-19f8-47f3-a418-d3667f1137b6"}
 */
function init() {
	//foundset.clearFoundSet()
}

/**
 * @properties={typeid:24,uuid:"db44fcb7-aa73-41ea-8499-0c0fe7cad842"}
 * @AllowToRunInFind
 */
function openIn() {

	forms.temp_articles.foundset.clear()
	forms.temp_articles.controller.find()
	if(globals.sb_APP_getServerLang() == "ESP") {
		forms.temp_articles.filename = 'Introducción a la sinopsis'
	} else {
		forms.temp_articles.filename = 'Inleiding op de synopsis'
	}
	forms.temp_articles.controller.search()
	if (forms.temp_articles.foundset.getSize() > 0) {
		/** @type JSRecord<db:/sb/articles> */
		var record = forms.temp_articles.foundset.getRecord(1)
		if(globals.sb_APP_getServerLang() == "ESP") {
			forms.articles.openArticle(record.pk, 'Introducción a la sinopsis', '');
		} else {
			forms.articles.openArticle(record.pk, 'Inleiding op de synopsis', '');
		}
	}

}

/**
 * @properties={typeid:24,uuid:"dafe8289-396b-43b8-8a10-aaf0b24c9aab"}
 * @param {String} pdf
 */
function openPdf(pdf) {
	/**************************************************************************************
	 Method:         forms.synopsis_form.openPdf();

	 Creator         : Adrian Doroiman
	 Modifier        : Karel Broer,  13-10-2008 //set path dynamicly using .servoy/CVB folder

	 Purpose         : Open synopsis-bookmarks_totaal.pdf

	 Arguments:      -

	 **************************************************************************************/
	
	 globals.openSynopsis(pdf);
	
	return false;
//	
//	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT)
//	{
//		var vPdfFolder = plugins.it2be_tools.server().getApplicationServerDir() + '/server/webapps/ROOT/'
//		var vFile = vPdfFolder + 'synopsis-bookmarks_totaal.pdf'
//		
//		var vBin = plugins.file.readFile(vFile)
//		plugins.file.writeFile('synopsis-bookmarks_totaal.pdf', vBin)
//	} else {	
//		var vServoyFolder = '.servoy'
//		var vSeparator = plugins.it2be_tools.client().fileSeparator
//		var vLocalClientPath = plugins.it2be_tools.client().userHome
//		var vServoyFolderPath = vLocalClientPath + vSeparator + vServoyFolder
//		var vCVBFolder = vServoyFolderPath + vSeparator + 'CVB'
//		var vFile = 'synopsis-bookmarks_totaal.pdf'
//		var vFilePath = vCVBFolder + vSeparator + vFile
//	
//		if (utils.stringMiddle(application.getOSName(), 1, 7) == "Windows") {
//			application.executeProgram('rundll32', 'url.dll,FileProtocolHandler', vFilePath)
//		} else {
//			application.executeProgram('open', '-a', 'preview', vFilePath)
//		}
//	}
}
