/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"730C4867-6673-4F61-A61D-71854FCA20B4"}
 */
var f_abbr = 'SB';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A0FF4C1F-62C6-4292-942C-A64BE526DEFC"}
 */
var f_version = 'sb';

/**
 * @properties={typeid:24,uuid:"85cf942e-7b2e-44b3-896e-bce5a030f9de"}
 */
function allConcordantie() {
	/** @type JSRecord<db:/sb/word_study_concordance> */
	var record
	globals.allConcordantie = ''
	globals.allConcordantie = globals.allConcordantie.concat('<table><tr><td colspan=3><B>Concordantie</B></td></tr>')
	for (var i = 1; i <= forms.word_concordance.foundset.getSize(); i++) {
		record = forms.word_concordance.foundset.getRecord(i)
		globals.allConcordantie = globals.allConcordantie.concat('<tr><td valign="top" nowrap><a href="javascript:globals.viewVerse(')
		globals.allConcordantie = globals.allConcordantie.concat(record.verse_id.toString())
		globals.allConcordantie = globals.allConcordantie.concat(')\"><font color="#000000">')
		globals.setVersePath(record.verse_id);
		globals.allConcordantie = globals.allConcordantie.concat(globals.verse_path)
		globals.allConcordantie = globals.allConcordantie.concat('</font></a></td><td valign="top">')
		globals.allConcordantie = globals.allConcordantie.concat(record.word_text)
		globals.allConcordantie = globals.allConcordantie.concat('</td><td valign="top"><a href=\"javascript:forms.word_study.openWS(')
		globals.allConcordantie = globals.allConcordantie.concat(record.calc_word_number.toString())
		globals.allConcordantie = globals.allConcordantie.concat(')\"><font color="#000000">')
		globals.allConcordantie = globals.allConcordantie.concat(record.calc_word_number.toString())
		globals.allConcordantie = globals.allConcordantie.concat('</font></a></td></tr>')
	}
	globals.allConcordantie = globals.allConcordantie.concat('</table>')
}

/**
 * @properties={typeid:24,uuid:"8863069e-b759-44a2-8f4b-79c9f1bc59e8"}
 */
function BTN_edit() {
	if (globals.myWordStudyID || globals.myWordStudyID != null || globals.myWordStudyID != undefined) {
		databaseManager.setAutoSave(false);
		var vSQL = "SELECT pk FROM word_study WHERE word_strong = ? AND study_version = ?"
		forms.sb_edit_word_study_dlg.foundset.loadRecords(vSQL, [globals.myWordStudyID, study_version]);
		//SMM 20-05-2011
		var vForm = application.createWindow('EditWordStudyDLGForm', JSWindow.MODAL_DIALOG, null);
		vForm.setInitialBounds(-1,-1,780,690);
		
		vForm.title = 'i18n:cvb.wordstudy.WordStudy';
		vForm.show(forms.sb_edit_word_study_dlg);

	}
}

/**
 * @properties={typeid:24,uuid:"868b2820-436f-4213-adcf-ba2b6db42a5a"}
 * @param {JSEvent} event the event that triggered the action
 */
function BTN_showMenuy(event) {
	
	if(word_strong != undefined) {
		if(word_strong.match(/OT/)) {
			globals.DIALOGS.showInfoDialog("Secties zijn niet beschikbaar in het Oude Testament", "Secties zijn niet beschikbaar in het Oude Testament", "OK");
			return false;
		}
	}
	
	//SMM -19-05-2011 plugins.window
	var menu
	var popupMenu = plugins.window.createPopupMenu();
	menu = popupMenu.addCheckBox('i18n:cvb.wordstudy.WordStudy', changeView)
	menu.methodArguments = ['Woordstudie']
	
	if (globals.sb_APP_getServerLang() != "ESP"){ // && application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT) {
		if(!word_strong.match(/OT/))
		{
			menu = popupMenu.addCheckBox('i18n:cvb.wordstudy.WordForms', changeView)
			menu.methodArguments = ['Woordvormen']
			menu = popupMenu.addCheckBox('i18n:cvb.wordstudy.WordConcordance', changeView)
			menu.methodArguments = ['Concordantie']
		}
	}
	
	if (globals.words_study) {
		if (globals.words_study.match('Woordstudie')) {
			popupMenu.getCheckBox(0).selected = true
		}
		if (globals.sb_APP_getServerLang() != "ESP") { // && application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT) {
	
			if(!word_strong.match(/OT/))
			{
				if (globals.words_study.match('Woordvormen')) {
					popupMenu.getCheckBox(1).selected = true
				}
				if (globals.words_study.match('Concordantie')) {
					popupMenu.getCheckBox(2).selected = true
				}
			}
		}
	}
	if (event instanceof JSEvent) {
		popupMenu.show(elements[event.getElementName()]);
	}

	/*i18n:cvb.wordstudy.WordStudy|Woordstudie
	 i18n:cvb.wordstudy.WordForms|Woordvormen
	 i18n:cvb.wordstudy.WordConcordance|Concordantie*/
	//SMM OLD
	/*
	 var menu = new Array(//if you assign this array to a global its reusable
	 plugins.popupmenu.createCheckboxMenuItem('i18n:cvb.wordstudy.WordStudy', changeView),
	 plugins.popupmenu.createCheckboxMenuItem('i18n:cvb.wordstudy.WordForms', changeView),
	 plugins.popupmenu.createCheckboxMenuItem('i18n:cvb.wordstudy.WordConcordance', changeView)
	 )

	 if(globals.words_study)
	 {
	 if(globals.words_study.match('Woordstudie'))
	 {
	 menu[0].setSelected(true)
	 }

	 if(globals.words_study.match('Woordvormen'))
	 {
	 menu[1].setSelected(true)
	 }

	 if(globals.words_study.match('Concordantie'))
	 {
	 menu[2].setSelected(true)
	 }
	 }

	 menu[0].setMethodArguments(['Woordstudie']);
	 menu[1].setMethodArguments(['Woordvormen']);
	 menu[2].setMethodArguments(['Concordantie']);

	 var elem = elements[application.getMethodTriggerElementName()]
	 if (elem != null)
	 {
	 plugins.popupmenu.showPopupMenu(elem, menu);
	 //or you can set the coordinates : plugins.popupmenu.showPopupMenu(10, 10, menu);
	 }
	 */
}

/**
 * @properties={typeid:24,uuid:"3583b811-1e30-41d2-b590-71d0f52a4990"}
 */
function calcConcordantie() {

	var i = globals.iConcordance
	var end = globals.iConcordance + 10
	globals.concordantie = ''
	var concordantie = ''
	concordantie = concordantie.concat('<table><tr><td colspan=3><B>' + i18n.getI18NMessage('cvb.wordstudy.WordConcordance') + '</B></td></tr>')
	/** @type JSRecord<db:/sb/word_study_concordance> */
	var record
	while (i < end && i <= forms.word_concordance.foundset.getSize()) {
		record = forms.word_concordance.foundset.getRecord(i)
		concordantie = concordantie.concat('<tr><td valign="top" nowrap><a href="javascript:globals.viewVerse(')
		concordantie = concordantie.concat(record.verse_id+"") // TODO: changes happend here
		concordantie = concordantie.concat(')\"><font color="#000000">')
		globals.setVersePath(record.verse_id);
		concordantie = concordantie.concat(globals.verse_path)
		concordantie = concordantie.concat('</font></a></td><td valign="top">')
		var text = record.word_text
		var text = record.word_text
		// RB 2013-01-11 -> if the concordance was empty it would give a error. So we need to check if there is any..
		// Ticket AYB-256504
		if(text != undefined || text != null || text != '')
		{
			text = text.replace('<lett>', '')
			text = text.replace('</lett>', '')
		}
		
		concordantie = concordantie.concat(text)
		concordantie = concordantie.concat('</td><td valign="top"><a href=\"javascript:forms.word_study.openWS(')
		concordantie = concordantie.concat(record.calc_word_number.toString())
		concordantie = concordantie.concat(')\"><font color="#000000">')
		concordantie = concordantie.concat(record.calc_word_number.toString())
		concordantie = concordantie.concat('</font></a></td></tr>')
		i++
	}
	concordantie = concordantie.concat('<tr><td>')
	if (globals.iConcordance > 10) {
		concordantie = concordantie.concat('<a href=\"javascript:forms.word_study.previous()\">' + i18n.getI18NMessage('cvb.lbl.prev') + '</a>')
	}
	concordantie = concordantie.concat('</td><td>')
	if (globals.iConcordance <= (forms.word_concordance.foundset.getSize() - 10)) {
		concordantie = concordantie.concat('<a href=\"javascript:forms.word_study.next()\">' + i18n.getI18NMessage('cvb.lbl.next') + '</a>')
	}
	concordantie = concordantie.concat('</td></tr>')
	concordantie = concordantie.concat('</table>')
	globals.concordantie = concordantie
}

/**
 * @properties={typeid:24,uuid:"db5e7b06-3b99-473c-9b43-6bb4f4c6fbb3"}
 */
function changeView() {
	globals.words_study
	//SMM -19-05-2011 plugins.window
	var vArgument = arguments[5]
	//var vArgument = arguments[0]

	if (globals.words_study.match(vArgument)) {
		globals.words_study = utils.stringReplace(globals.words_study, vArgument.toString(), '');
	} else {
		globals.words_study += "\n" + vArgument
	}

	//Method call
	
	viewWordStudy(globals.words_study);
}

/**
 * @properties={typeid:24,uuid:"35316c75-af23-4a91-bc78-eec34ddb02b0"}
 */
function copyDisplay() {
	globals.d_study_analyze = ''
	globals.d_study_analyze = globals.d_study_analyze.concat('<html><body><table>')
	globals.d_study_analyze = globals.d_study_analyze.concat('<tr><td>')
	globals.d_study_analyze = globals.d_study_analyze.concat(globals.initWS)
	globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr>')
	
	if(word_strong.match(/OT/))
	{
		globals.choise = 1;
	}
	
	switch (globals.choise) {
	case 1:
		globals.d_study_analyze = globals.d_study_analyze.concat('<tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.woordstudie)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr>')
		break
	case 2:
		globals.d_study_analyze = globals.d_study_analyze.concat('<tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.woordvormen)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr>')
		break
	case 3:
		globals.d_study_analyze = globals.d_study_analyze.concat('<tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.allConcordantie)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr>')
		break
	case 4:
		globals.d_study_analyze = globals.d_study_analyze.concat('<tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.woordstudie)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr><tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.woordvormen)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr>')
		break
	case 5:
		globals.d_study_analyze = globals.d_study_analyze.concat('<tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.woordstudie)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr><tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.allConcordantie)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr>')
		break
	case 6:
		globals.d_study_analyze = globals.d_study_analyze.concat('<tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.woordvormen)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr><tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.allConcordantie)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr>')
		break
	case 7:
		globals.d_study_analyze = globals.d_study_analyze.concat('<tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.woordstudie)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr><tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.woordvormen)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr><tr><td>')
		globals.d_study_analyze = globals.d_study_analyze.concat(globals.allConcordantie)
		globals.d_study_analyze = globals.d_study_analyze.concat('</td></tr>')
		break
	}
	globals.d_study_analyze = globals.d_study_analyze.concat('</table></body></html>')
}

/**
 * @properties={typeid:24,uuid:"4bfc46e3-24a3-4dfd-9cc6-264b7f6b3314"}
 */
function display() {
	
	var gl_st_analyze

	gl_st_analyze = ''
	gl_st_analyze += '<html><body><table>'
	gl_st_analyze += '<tr><td>'
	gl_st_analyze += globals.initWS
	gl_st_analyze += '</td></tr>'

	globals.woordstudie = globals.woordstudie.replace('<PP>', '')
	globals.woordstudie = globals.woordstudie.replace('</PP>', '')

	globals.woordvormen = globals.woordvormen.replace('<PP>', '')
	globals.woordvormen = globals.woordvormen.replace('</PP>', '')

	globals.concordantie = globals.concordantie.replace('<PP>', '')
	globals.concordantie = globals.concordantie.replace('</PP>', '')

	if(word_strong.match(/OT/))
	{
		globals.choise = 1;
	}
	
	switch (globals.choise) {
	case 1:
		gl_st_analyze += '<tr><td>'
		gl_st_analyze += globals.woordstudie
		gl_st_analyze += '</td></tr>'
		break
	case 2:
		gl_st_analyze += '<tr><td>'
		gl_st_analyze += globals.woordvormen
		gl_st_analyze += '</td></tr>'
		break
	case 3:
		gl_st_analyze += '<tr><td>'
		gl_st_analyze += globals.concordantie
		gl_st_analyze += '</td></tr>'
		break
	case 4:
		gl_st_analyze += '<tr><td>'
		gl_st_analyze += globals.woordstudie
		gl_st_analyze += '</td></tr><tr><td>'
		gl_st_analyze += globals.woordvormen
		gl_st_analyze += '</td></tr>'
		break
	case 5:
		gl_st_analyze += '<tr><td>'
		gl_st_analyze += globals.woordstudie
		gl_st_analyze += '</td></tr><tr><td>'
		gl_st_analyze += globals.concordantie
		gl_st_analyze += '</td></tr>'
		break
	case 6:
		gl_st_analyze += '<tr><td>'
		gl_st_analyze += globals.woordvormen
		gl_st_analyze += '</td></tr><tr><td>'
		gl_st_analyze += globals.concordantie
		gl_st_analyze += '</td></tr>'
		break
	case 7:
		gl_st_analyze += '<tr><td>'
		gl_st_analyze += globals.woordstudie
		gl_st_analyze += '</td></tr><tr><td>'
		gl_st_analyze += globals.woordvormen
		gl_st_analyze += '</td></tr><tr><td>'
		gl_st_analyze += globals.concordantie
		gl_st_analyze += '</td></tr>'
		break
	}

	gl_st_analyze += '</table></body></html>'
	globals.study_analyze = gl_st_analyze

	if (globals.sb_search_in_studywords && globals.sb_search_criteria){
		globals.study_analyze = globals.cvb_doHighlight(globals.study_analyze, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
	}
}

/**
 * @properties={typeid:24,uuid:"e358ee69-d9b4-4879-86c7-7628d9d840c1"}
 */
function init() {
//	elements.progress.visible = false
	//foundset.clearFoundSet()
}

/**
 * @properties={typeid:24,uuid:"0a456681-3c41-4f8d-aab2-be31ff4cb136"}
 */
function newWindow() {

	//application.setStatusText('Even geduld...')
	//application.updateUI()
	//allConcordantie()
	//copyDisplay()
	if (globals.study_analyze < 1) {
		return false
	}
	globals.d_study_analyze = globals.study_analyze;
	globals.d_study_analyze = globals.d_study_analyze.replace('<PP>', '')
	globals.d_study_analyze = globals.d_study_analyze.replace('</PP>', '')

	//SMM 04-11-2011
    globals.d_study_analyze = globals.d_study_analyze.replace('javascript:forms.word_study.next','javascript:forms.d_word_study.next') 	
	globals.d_study_analyze = globals.d_study_analyze.replace('javascript:forms.word_study.previous','javascript:forms.d_word_study.previous')
	globals.d_study_analyze = globals.d_study_analyze.replace(/javascript:forms.word_study.openWS/g,'javascript:forms.d_word_study.openWS')

	
	globals.flag = "false"

	var vFormWidth = globals.getUserSetting('form_wordstudy_width');
	var vFormHeight = globals.getUserSetting('form_wordstudy_height');		

	
	//application.showFormInDialog(forms.d_word_study,10,10,1000,700)
	//application.showForm(forms.d_word_study)
	//SMM 20-05-2011
	var vForm = application.createWindow('WordStudyForm', JSWindow.DIALOG, null);
	//vForm.title = 'i18n:cvb.etc';
	if (vFormWidth && vFormHeight) vForm.setInitialBounds(10, 10, parseInt(vFormWidth), parseInt(vFormHeight))
	else vForm.setInitialBounds(10, 10, 1000, 700)
	vForm.show(forms.d_word_study);
	//application.setStatusText('gereed')
	//application.updateUI()
	//calcConcordantie()
	return true
}

/**
 * @properties={typeid:24,uuid:"947e9260-2fbb-4ced-a4d5-fa1bdb6806c8"}
 */
function next() {
	globals.iConcordance = globals.iConcordance + 10
	calcConcordantie()
	display()
	//scopes.tools.output('next')
}

/**
 * @properties={typeid:24,uuid:"cf2664ac-d1a0-46c0-a089-dea1f3b87109"}
 */
function openWS() {
	globals.word_number = arguments[0];
	globals.colored = 1;
	forms.word_study.viewWordStudy(arguments[0].toString());
}

/**
 * @properties={typeid:24,uuid:"924dc0c8-a9f5-49ec-9186-32e683cb93ee"}
 */
function previous() {
	globals.iConcordance = globals.iConcordance - 10;
	calcConcordantie();
	display();
	//scopes.tools.output('previous')
}

/**
 * @properties={typeid:24,uuid:"ea75867e-9148-4d93-b101-01dec3ce1cf3"}
 */
function printForm() {
	/*globals.print7 = 'Woordstudie'
	 globals.print2 = ''
	 globals.print3 = ''
	 globals.print4 = ''
	 globals.print5 = ''
	 globals.print6 = ''
	 globals.print1 = ''
	 globals.print8 = ''
	 globals.print_WordStudy = globals.words_study
	 globals.print_abrev = ''
	 globals.print_AlleenGrieks = ''
	 globals.print_versions = ''
	 globals.printForm()*/

	if(globals.sb_APP_getServerLang() != "ESP") {
		globals.sb_print_bibleTranslations = 1
		globals.sb_print_wordStudy_concordance = 1
	} else {
		globals.sb_print_bibleTranslations = 0;
		globals.sb_print_wordStudy_concordance = 0;
	}
	//application.showFormInDialog( forms.print_wordStudy_dlg,  -1, -1, -1, -1, 'i18n:cvb.lbl.print', false, false, 'printDLG', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('printDLG', JSWindow.MODAL_DIALOG, null);
	vForm.setInitialBounds(-1, -1, -1, -1);
	vForm.title = 'i18n:cvb.lbl.print';
	vForm.show(forms.print_wordStudy_dlg);

}

/**
 * @properties={typeid:24,uuid:"9f6e0aee-ffe4-49e8-a030-09d602e8aa28"}
 */
function tlink() {
	globals.tlink(arguments[0].toString());
}

/**
 * @properties={typeid:24,uuid:"8cc92a84-ee9a-4ac8-8d79-2276b2c5a87a"}
 * @param {String} [vStrong]
 * @param {Object} [vConcordance]
 * @param {String} [vVersion]
 * @param {String} [vAbbr]
 * @AllowToRunInFind
 */
function viewWordStudy(vStrong, vConcordance, vVersion, vAbbr) {
//	return false;
	var color, vector, i
	
	if(!vVersion)
	{
		vVersion = forms.word_study.f_version;
	}
	
	if (globals.selectedWordStudy != 0) {
		var string = globals.words_study
		if (string != null)
			vector = string.split('\n')
		else
			vector = ""
		globals.choise = 0
		for (i = 0; i < vector.length; i++) {

			if (vector[i] == 'Woordstudie' && globals.choise == 0)
				globals.choise = 1
			if (vector[i] == 'Woordvormen' && globals.choise == 0)
				globals.choise = 2
			if (vector[i] == 'Concordantie' && globals.choise == 0)
				globals.choise = 3
			if ( (vector[i] == 'Woordstudie' && globals.choise == 2) || (vector[i] == 'Woordvormen' && globals.choise == 1))
				globals.choise = 4
			if ( (vector[i] == 'Woordstudie' && globals.choise == 3) || (vector[i] == 'Concordantie' && globals.choise == 1))
				globals.choise = 5
			if ( (vector[i] == 'Woordvormen' && globals.choise == 3) || (vector[i] == 'Concordantie' && globals.choise == 2))
				globals.choise = 6
			if ( (globals.choise == 4 && vector[i] == 'Concordantie') || (globals.choise == 5 && vector[i] == 'Woordvormen') || (globals.choise == 6 && vector[i] == 'Woordstudie'))
				globals.choise = 7
		}
		
		// Addition for the spanish language
		// this is temporarly
		// TODO: this needs to be deleted in the future.
		if(globals.sb_APP_getServerLang() == "ESP" && application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {			
			if(globals.choise == 6) {
				globals.choise = 0;
			} else if(globals.choise == 7) {
				globals.choise = 1;
			}
		}
		
		var vCount = 0;
		var word_id = 0
		if (forms.word_study.controller.find()) {
			forms.word_study.word_strong = globals.selectedWordStudy
			if(vVersion)
			{
				forms.word_study.study_version = vVersion;
			} else {
				forms.word_study.study_version = globals.SET_wordStudyVerion(globals.sb_gTestament);
			}
			vCount = forms.word_study.controller.search()
			
			// if nothing found, check ONCE again... if then 0 just continue
			if(vCount == 0)
			{
				if (forms.word_study.controller.find()) {
					forms.word_study.word_strong = globals.selectedWordStudy
					
					if(vVersion)
					{
						forms.word_study.study_version = vVersion;
					} else {
						forms.word_study.study_version = globals.SET_wordStudyVerion(globals.sb_gTestament);
					}
					
					vCount = forms.word_study.controller.search()
				}
			}
		}
		
		// addition by RB
		if(vCount == 0)
		{
			// Ok count = 0 try addition things
//			var vSQL = "SELECT version_key, version_abbr FROM word_study_version WHERE version_testament = ? AND version_default = 1";
//			var vDS = databaseManager.getDataSetByQuery('sb', vSQL, vArgs, 1);
			
			application.output(vVersion);
			vSQL = "SELECT wsv.version_key AS version, wsv.version_abbr AS abbr FROM word_study ws JOIN word_study_version wsv ON wsv.version_key = ws.study_version  WHERE ws.word_strong = ? AND ws.study_version != ?";
			vDS = databaseManager.getDataSetByQuery('sb', vSQL, [vStrong, vVersion], 1);
			
			if(vDS.getMaxRowIndex() == 1) {
				viewWordStudy(vStrong, vConcordance, vDS[0]['version'], vDS[0]['abbr']);
				return;
			}
			application.output(vDS);
			
			globals.study_analyze =i18n.getI18NMessage('cvb.lbl.nowordstudyavailable');
			return false;
		}
		
		
		/** @type JSRecord<db:/sb/word_study> */
		var record
		if (forms.word_study.foundset.getSize() > 0) {
			record = forms.word_study.foundset.getRecord(1)
			
			forms.word_study.f_version = ((vVersion)?vVersion:record.study_version);
						
			globals.initWS = ''
			var initWS = ''
			initWS = initWS.concat('<table><tr><td>')
			initWS = initWS.concat(utils.stringReplace(record.word_strong, 'OT', ''));
			initWS = initWS.concat('</td><td><font face=\"GreekSB\">')
			//initWS = initWS.concat(record.original)
			if (record.original) {
				globals.myWordStudyAnalyzePK = null
				initWS = initWS.concat(record.original)
			} else {
				globals.myWordStudyAnalyzePK = word_study_to_word_study_analyze.pk
				initWS = initWS.concat(word_study_to_word_study_analyze.original)
			}
			initWS = initWS.concat('</font></td><td>')
			initWS = initWS.concat(record.transliteration)
			initWS = initWS.concat('</td></tr></table>')
			globals.initWS = initWS
			globals.woordstudie = ''
			var woordstudie = ''
			if (globals.choise == 1 || globals.choise == 4 || globals.choise == 5 || globals.choise == 7) {
				woordstudie = woordstudie.concat('<table><tr><td>')
				woordstudie = woordstudie.concat(record.first_line)
				woordstudie = woordstudie.concat('</td></tr><tr><td>')
				woordstudie = woordstudie.concat(record.word_text)
				woordstudie = woordstudie.concat('</td></tr></table>')
				globals.woordstudie = woordstudie
			}
			word_id = record.pk
		}
		globals.woordvormen = ''
		var woordvormen = ''
		if (globals.choise == 2 || globals.choise == 4 || globals.choise == 6 || globals.choise == 7) {
			//	woordvormen = woordvormen.concat('<table><tr><td colspan=4><B><a name=\"woordvormen\">Woordvormen</a></B></td></tr>')
			woordvormen = woordvormen.concat('<table><tr><td colspan=4><B><a name=\"woordvormen\">' + i18n.getI18NMessage('cvb.wordstudy.WordForms') + '</a></B></td></tr>')
			//forms.word_form.foundset.clearFoundSet()
			if (forms.word_form.controller.find()) {
				forms.word_form.word_study_id = word_id
				forms.word_form.controller.search()
			}
			for (i = 1; i <= forms.word_form.foundset.getSize(); i++) {

				record = forms.word_form.foundset.getRecord(i)
				if (globals.word_number == record.word_number && globals.colored == 1) {
					color = "#B3CBD8"
					globals.colored = 0
				} else
					color = "#FFFFFF"
				woordvormen = woordvormen.concat ('<tr><td valign="top" style="background-color:'+color+';">')// SMM 04-11-2011 ('<tr><td valign="top" bgcolor=')
				//woordvormen = woordvormen.concat (color)
				//woordvormen = woordvormen.concat('>')
				woordvormen = woordvormen.concat(record.word_number.toString())
				woordvormen = woordvormen.concat('</td><td valign="top"  style="background-color:'+color+';">')
				//woordvormen = woordvormen.concat (color)
				woordvormen = woordvormen.concat('<font face=\"GreekSB\">')
				woordvormen = woordvormen.concat(record.original)
				woordvormen = woordvormen.concat('</font></td><td valign="top"  style="background-color:'+color+';">')
				//woordvormen = woordvormen.concat(color)
				//woordvormen = woordvormen.concat('>')
				woordvormen = woordvormen.concat(record.transliteration)
				woordvormen = woordvormen.concat('</td><td valign="top"  style="background-color:'+color+';">')
				//woordvormen = woordvormen.concat(color)
				//woordvormen = woordvormen.concat('>')
				woordvormen = woordvormen.concat(record.word_translation)
				woordvormen = woordvormen.concat('</td></tr>')
			}
			woordvormen = woordvormen.concat('</table>')
			globals.woordvormen = woordvormen
		}
		
		if (globals.choise == 3 || globals.choise == 5 || globals.choise == 6 || globals.choise == 7) {

			//forms.word_concordance.foundset.clearFoundSet()
			if (forms.word_concordance.controller.find()) {
				forms.word_concordance.calc_word_study_id = word_id
				forms.word_concordance.controller.search()
			}
			globals.iConcordance = 1
			calcConcordantie()
		}
		display()
		
		if(vAbbr) {
			f_abbr = vAbbr;
		}
		f_version = vVersion;
		
	}
	
	elements.word_study1.caretPosition = 0;
	elements.word_study1.setScroll(0,0);
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"2470c63c-325c-4b77-bedb-a4d05a2ce7d7"}
 */
function wlink() {
	globals.wlink(arguments[0].toString());
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"43DA81CE-25FC-43BF-A459-0ACBF9AB571E"}
 */
function onShow(firstShow, event) {
	if (globals.sb_APP_getServerLang() == "ESP" && application.getApplicationType() != APPLICATION_TYPES.SMART_CLIENT) {
	//	elements.btn_section.visible = false;
	//	elements.arrow_section.visible = false;
		//elements.lblShowSection.visible = false;
		
		
		globals.sb_print_bibleTranslations = 0;
		globals.sb_print_wordStudy_concordance = 0;
		globals.choise = 1;
	}
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"4B737541-9192-46B1-A558-C9A329671DD0"}
 */
function BTN_SelectVersions(event) {
	
	// get the word version
	var vStrongNumber = word_strong;
	// get Current version
	
	var vSQL = "SELECT distinct(word_study.study_version) AS version, word_study_version.version_description AS name, word_study_version.version_abbr AS abbr FROM word_study JOIN word_study_version ON word_study.study_version = word_study_version.version_key WHERE word_study.word_strong = ?";
	if(testament != null ) vSQL += "AND word_study_version.version_testament = ?";
	
	var vArgs = (testament==null)?[vStrongNumber]:[vStrongNumber, testament];
	
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, vArgs, -1);
	
	var menu
	var popupMenu = plugins.window.createPopupMenu();
	
	var vRecord;
	for(var i = 0; i < vDS.getMaxRowIndex(); i++)
	{
		vRecord = vDS[i];
		menu = popupMenu.addCheckBox(vRecord['abbr'] + " | " + vRecord['name'], EVENT_selectVersion);
		menu.methodArguments = [vRecord['version'], vStrongNumber, vRecord['abbr']];
		if(vRecord['version'] == f_version)
		{
			menu.selected = true;
		} else {
			menu.selected = false;
		}
	}
	
	if(vDS.getMaxRowIndex() == 0)
	{
		globals.DIALOGS.showErrorDialog('',i18n.getI18NMessage('cvb.lbl.noAlternativeVersion'), 'Ok');
	} else {
		popupMenu.show(elements[event.getElementName()]);
	}
	/*
	
	var elem, menu
	var popupMenu = plugins.window.createPopupMenu();
	
	if (globals.sb_gTestament == "New") {
		menu = popupMenu.addCheckBox('i18n:onlyGreek', globals.cvb_setGreek)
		menu = popupMenu.addSeparator()
		
		menu = popupMenu.addRadioButton('TR', globals.cvb_setVersion)
		menu.methodArguments=[new Array('TR')]
		
		menu = popupMenu.addRadioButton('H-F', globals.cvb_setVersion)
		menu.methodArguments=[new Array('H-F')]
		
		menu = popupMenu.addRadioButton('N25', globals.cvb_setVersion)
		menu.methodArguments=[new Array('N25')]
		
		menu = popupMenu.addRadioButton('N27', globals.cvb_setVersion)
		menu.methodArguments=[new Array('N27')]
		
		if (globals.griek_version) {
			popupMenu.getCheckBox(0).selected = true
		}		
		
		switch (globals.text_version) {
		case "TR":
			popupMenu.getRadioButton(2).selected = true
			break;
		case "H-F":
			popupMenu.getRadioButton(3).selected = true
			break;
		case "N25":
			popupMenu.getRadioButton(4).selected = true
			break;
		case "N27":
			popupMenu.getRadioButton(5).selected = true
			break;
		}

	} else if (globals.sb_gTestament == "Old") {
		menu = popupMenu.addCheckBox('i18n:msg_onlyHebrew', globals.cvb_setHebrew)
		if (globals.heb_version) {
			menu.selected = true
		}
	}	
	if (event instanceof JSEvent) {
		popupMenu.show(elements[event.getElementName()]);
	}
	
	*/
}

/**
 * @properties={typeid:24,uuid:"D3E29604-E7D0-4093-BCE9-A9AB3539B338"}
 * @param {Object} arg1
 * @param {Object} arg2
 * @param {Object} arg3
 * @param {Object} arg4
 * @param {Object} arg5
 * @param {String} version
 * @param {String} strongnumber
 * @param {String} abbr
 */
function EVENT_selectVersion(arg1, arg2, arg3, arg4, arg5, version, strongnumber, abbr)
{
	f_abbr = abbr;
	scopes.tools.output(strongnumber + " > " + version);
	globals.wlink(strongnumber, null, version);
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5B46E205-75AE-44B9-A737-3655B1F54EC2"}
 */
function BTN_read(event) {
	forms.web_sb_read.fv_title = i18n.getI18NMessage('cvb.wordstudy.WordStudy');
	forms.web_sb_read.fv_html = globals.study_analyze;
	forms.web_sb_read.fv_print = printForm;
	
	forms.web_sb_read.elements.html.caretPosition = 0;
	forms.web_sb_read.elements.html.setScroll(0,0);
	
	forms.web_sb_form.elements.tab_notes.tabIndex = 4;
	forms.web_sb_form.elements.tab_notes.visible = true;
}
