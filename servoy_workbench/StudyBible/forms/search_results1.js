/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2C0415BF-473B-4F96-9BB6-791EA793F6D9",variableType:4}
 */
var v_hideOrNot = 0;

/**
 * @properties={typeid:24,uuid:"46b02fe4-ee6b-440b-9dcd-b2154ec88991"}
 * @AllowToRunInFind
 * @param {Number} inx
 */
function display(inx)
{

application.setStatusText('Even geduld...')
application.updateUI()
var j = globals.index
var end = globals.index + 10
var res = databaseManager.getDataSetByQuery('sb',globals.select, null, 10000)

globals.search_results = '<html><body><table><tr><td colspan="2">'
globals.search_results = globals.search_results.concat('Zoekresultaten  ')
globals.search_results = globals.search_results.concat(res.getMaxRowIndex().toString())
globals.search_results = globals.search_results.concat('</td></tr>')

var temp = ''

while (j < end && j<= res.getMaxRowIndex()){
		res.rowIndex = j
		temp += '<tr><td nowrap valign="top"><a href=javascript:globals.viewVerse('
		temp += res.getValue(j,2)
		temp += ')\"><font color="#000000">'
		globals.setVersePath(res.getValue(j,2))
		temp += globals.verse_path
		temp += '</font></a></td><td>'
		var result = databaseManager.getDataSetByQuery('sb','select code from translation_books where pk =' + res.getValue(j,4), null, 100)
		result.rowIndex = 1
		temp += '<B>'
		temp += result.getValue(1,1)
		temp += '</B>  '
		var index = res.getValue(j,3).toLowerCase().indexOf(globals.search_term1.toLowerCase()) 
		var aux = res.getValue(j,3).substring(0,index)
		aux = aux.concat('<B>')
		aux = aux.concat(res.getValue(j,3).substring(index,index+globals.search_term1.length))
		aux = aux.concat('</B>')
		aux = aux.concat(res.getValue(j,3).substring(index + globals.search_term1.length))
		
		temp += aux
		temp += '</td></tr>'
		j++
}
temp += '<tr><td>'
if(globals.index > 10) {
	temp += '<a href=\"javascript:forms.search_results1.previous()\">Vorige</a>'
}
temp += '</td><td>'
if(globals.index <= (res.getMaxRowIndex()-10)){
	temp += '<a href=\"javascript:forms.search_results1.next()\">Volgende</a>'
}
temp += '</td></tr>'
temp += '</table></body></html>'

globals.search_results += temp

//var divider = forms.sb_form.elements.bean_321.dividerLocation
forms.search_results1.controller.show()
forms.sb_form.controller.show()
if(arguments[0] != 1){
//	forms.sb_form.elements.bean_321.dividerLocation = divider
//	forms.sb_form.elements.bean_321.bottomComponent = forms.search_results1
//	forms.sb_form.elements.bean_321.bottomComponent =forms.sb_form.elements.tabs_search_results1
}
application.setStatusText('gereed')
application.updateUI()
}

/**
 * @properties={typeid:24,uuid:"dfff1be9-6324-4569-b35f-f8e949d28764"}
 * @AllowToRunInFind
 */
function newWindow()
{

globals.d_search_results = globals.search_results
globals.d_search_results = globals.d_search_results.replace('<PP>','')
globals.d_search_results = globals.d_search_results.replace('</PP>','')
//application.showFormInDialog(forms.d_search_results,10,10,1000,700)
//SMM 20-05-2011
var vForm = application.createWindow('SearchResultsForm', JSWindow.MODAL_DIALOG, null);
//vForm.title = '';
vForm.setInitialBounds(10,10,1000,700)
vForm.show(forms.d_search_results);

}

/**
 * @properties={typeid:24,uuid:"677f1051-b746-418d-bbe0-f7c79c0bb7db"}
 * @AllowToRunInFind
 */
function next()
{
globals.index = globals.index + 10
forms.search_results1.display(1)




}

/**
 * @properties={typeid:24,uuid:"15725599-5e6b-4b3a-be16-4509c72940e3"}
 * @AllowToRunInFind
 */
function previous()
{
globals.index = globals.index - 10
forms.search_results1.display(1)
}

/**
 * @properties={typeid:24,uuid:"c257c172-21ce-40d2-9df8-8a0cc4d64ef8"}
 * @AllowToRunInFind
 */
function printForm()
{
/*application.setStatusText('Even geduld...')
application.updateUI()
var res = databaseManager.getDataSetByQuery('sb',globals.select, null, 10000)
globals.tot_search_results = '<html><body><table><tr><td colspan="2">'
globals.tot_search_results = globals.tot_search_results.concat('Zoekresultaten  ')
globals.tot_search_results = globals.tot_search_results.concat(res.getMaxRowIndex())
globals.tot_search_results = globals.tot_search_results.concat('</td></tr>')
for (var j=1;j<= res.getMaxRowIndex();j++){
		res.rowIndex = j
		globals.tot_search_results = globals.tot_search_results.concat('<tr><td nowrap valign="top"><a href=javascript:globals.viewVerse(')
		globals.tot_search_results = globals.tot_search_results.concat(res.getValue(j,2))
		globals.tot_search_results = globals.tot_search_results.concat(')\"><font color="#000000">')
		globals.setVersePath(res.getValue(j,2))
		globals.tot_search_results = globals.tot_search_results.concat(globals.verse_path)
		globals.tot_search_results = globals.tot_search_results.concat('</font></a></td><td>')
		var result = databaseManager.getDataSetByQuery('sb','select code from translation_books where pk =' + res.getValue(j,4), null, 100)
		result.rowIndex = 1
		globals.tot_search_results = globals.tot_search_results.concat('<B>')
		globals.tot_search_results = globals.tot_search_results.concat(result.getValue(j,1))
		globals.tot_search_results = globals.tot_search_results.concat('</B>  ')
		var index = res.getValue(j,3).toLowerCase().indexOf(globals.search_term1.toLowerCase()) 
		var aux = res.getValue(j,3).substring(0,index)
		aux = aux.concat('<B>')
		aux = aux.concat(res.getValue(j,3).substring(index,index+globals.search_term1.length))
		aux = aux.concat('</B>')
		aux = aux.concat(res.getValue(j,3).substring(index + globals.search_term1.length))
		
		globals.tot_search_results = globals.tot_search_results.concat(aux)
		globals.tot_search_results = globals.tot_search_results.concat('</td></tr>')
		
}

globals.tot_search_results = globals.tot_search_results.concat('</table></body></html>')
application.setStatusText('gereed')
application.updateUI()
forms.search_results.printForm();*/




//NOTE: BE SURE TO USE A TRY/FINALLY BLOCK! (or else an exception will cause the client to need a restart)
try{
	//plugins.busy.busy(i18n.getI18NMessage('cvb.lbl.collectingPrint')); // show the message on a glass pane and in the status area. Also, show a busy cursor
	
application.updateUI();

// Get the PK of the wordstudy
//var vSQL = "SELECT pk FROM word_study WHERE word_strong = ?"
//var vQuery = databaseManager.getDataSetByQuery('sb', vSQL, [globals.myWordStudyID], -1);

//var vStudyID = vQuery.getValue(1,1)

//application.closeFormDialog()
//SMM - 23-05-2010
var win = controller.getWindow()
if (win) {
	win.hide()
}

var vInstalldir = plugins.it2be_tools.server().userDir //java.lang.System.getProperty("user.dir");
   vInstalldir = utils.stringReplace(vInstalldir,'\\','\/');

//  var vJasperPath = vInstalldir+'/server/webapps/ROOT/reports/'
//   vJasperPath = utils.stringReplace(vJasperPath,"developer","application_server");
//  var vTemp = globals.selectedPrint

  //var $ParametersMap = new java.util.HashMap()
	var vParameters = new Object();
	vParameters.VIRTUALIZER_TYPE = "gZip"
//  	var vUUID = application.getNewUUID()
  

// SQLS
vParameters.translationsSQL = globals.search_PRINT_sql.translationSQL + ""
vParameters.spacingWordsSQL = globals.search_PRINT_sql.spacingSQL + ""
vParameters.commentarySQL = globals.search_PRINT_sql.commentarySQL + ""
vParameters.footnotesSQL = globals.search_PRINT_sql.commentaryNotesSQL + ""
vParameters.articlesSQL = globals.search_PRINT_sql.articlesSQL + ""
vParameters.wordStudySQL = globals.search_PRINT_sql.wordStudySQL + ""
vParameters.myNotesSQL = globals.search_PRINT_sql.comNotesSQL + ""
//$ParametersMap.put('translationsSQL', globals.search_PRINT_sql.translationSQL)
//$ParametersMap.put('spacingWordsSQL', globals.search_PRINT_sql.spacingSQL)
//$ParametersMap.put('commentarySQL', globals.search_PRINT_sql.commentarySQL)
//$ParametersMap.put('footnotesSQL', globals.search_PRINT_sql.commentaryNotesSQL)
//$ParametersMap.put('articlesSQL', globals.search_PRINT_sql.articlesSQL)
//$ParametersMap.put('wordStudySQL', globals.search_PRINT_sql.wordStudySQL)
//$ParametersMap.put('myNotesSQL', globals.search_PRINT_sql.comNotesSQL)
	
vParameters.CountTranslation = parseInt(globals.search_PRINT_sql.translationCOUNT)
vParameters.CountSpacingWords = parseInt(globals.search_PRINT_sql.spacingCOUNT)
vParameters.CountCommentary = parseInt(globals.search_PRINT_sql.commentaryCOUNT)
vParameters.CountFootnotes = parseInt(globals.search_PRINT_sql.commentaryNotesCOUNT)
vParameters.CountArticles = parseInt(globals.search_PRINT_sql.articlesCOUNT)
vParameters.CountWordStudy = parseInt(globals.search_PRINT_sql.wordStudyCOUNT)
vParameters.CountMyNotes = parseInt(globals.search_PRINT_sql.comNotesCOUNT)

//$ParametersMap.put('CountTranslation', parseInt(globals.search_PRINT_sql.translationCOUNT))
//$ParametersMap.put('CountSpacingWords', parseInt(globals.search_PRINT_sql.spacingCOUNT))
//$ParametersMap.put('CountCommentary', parseInt(globals.search_PRINT_sql.commentaryCOUNT))
//$ParametersMap.put('CountFootnotes', parseInt(globals.search_PRINT_sql.commentaryNotesCOUNT))
//$ParametersMap.put('CountArticles', parseInt(globals.search_PRINT_sql.articlesCOUNT))
//$ParametersMap.put('CountWordStudy', parseInt(globals.search_PRINT_sql.wordStudyCOUNT))
//$ParametersMap.put('CountMyNotes', parseInt(globals.search_PRINT_sql.comNotesCOUNT))

if(!globals.amb_checkEsp())
{
	//$ParametersMap.put('languageParam', 0);
	vParameters.languageParam = 0
} else {
	//$ParametersMap.put('languageParam', 1);
	vParameters.languageParam = 1
}
  
 //	plugins.jasperPluginRMI.reportDirectory = globals.SETTINGS.jasper.report_directory;

 	plugins.jasperPluginRMI.runReport('sb', 'CVB_searchResults.jrxml',null, plugins.jasperPluginRMI.OUTPUT_FORMAT.VIEW, vParameters);
//  plugins.jasperPluginRMI.jasperReport('sb','CVB_searchResults.jasper',null,'view', vParameters);

}finally{
// 	plugins.busy.ready();
 	plugins.busy.unblock()
}

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"0D60BC1A-44CF-4B50-83B3-5E73D9D9CA23"}
 * @AllowToRunInFind
 */
function FORM_Search(event) {
	v_hideOrNot = 1;
	//SMM - 03-06-2011
	if (globals.sb_demo_chk == 0) {
		
		//SMM - 03-06-2011
		var win = controller.getWindow()
		//var win = application.getWindow("search_results1")
		if (win) {
			win.hide()			
            //win.destroy();
		}
		
		var vSearchWindow = application.createWindow('sb_search_dlg', JSWindow.DIALOG);
		vSearchWindow.title = "i18n:cvb.title.search";
		vSearchWindow.show('sb_search_dlg');

	} else {
		plugins.dialogs.showErrorDialog('', i18n.getI18NMessage('cvb.msg.noSearchFordemo'));
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"83B689C7-9E47-498C-A391-D6886353117D"}
 */
function FORM_onShow(firstShow, event) {
//SMM 04-07-2911
globals.sb_mode_search = 1
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"FCC91ADB-DEB1-449C-997B-23CF6FC82E93"}
 */
function FORM_onHide(event) {
	

		globals.sb_mode_search = 0
//		v_hideOrNot = 0;
		return true

//SMM 04-07-2911

}
