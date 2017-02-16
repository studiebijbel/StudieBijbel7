/**
 * @properties={typeid:24,uuid:"2E4111EC-0ABA-41E4-A826-B70F2FDF3507"}
 */
function BTN_print()
{
//application.closeFormDialog()
//SMM - 23-05-2010
var win = controller.getWindow()
if (win) {
	win.hide()
}

//plugins.jasperPluginRMI.reportDirectory = plugins.it2be_tools.server().getApplicationServerDir() + '/server/webapps/ROOT/reports/'
//plugins.jasperPluginRMI.extraDirectories = plugins.it2be_tools.server().getApplicationServerDir() + '/server/webapps/ROOT/reports/fonts/'
//plugins.jasperPluginRMI.reportDirectory = globals.SETTINGS.jasper.report_directory;

//var vNow = application.getServerTimeStamp()
//var vRnd = vNow.getFullYear() + '' + vNow.getMonth() + '' + vNow.getDate() + '' + vNow.getHours() + '' + vNow.getMinutes() + '' + vNow.getSeconds()
//var vTempPdf = '/temp_pdf/report_' + vRnd + '.pdf'
//var vPdfFolder = plugins.it2be_tools.server().getApplicationServerDir() + '/server/webapps/ROOT' + vTempPdf
//var vInstalldir = plugins.it2be_tools.server().userDir //java.lang.System.getProperty("user.dir");
//vInstalldir = utils.stringReplace(vInstalldir,'\\','\/');
//vInstalldir = 'D:/servoy6/application_server' 
//var vJasperPath = vInstalldir+'/server/webapps/ROOT/reports/'
//vJasperPath = utils.stringReplace(vJasperPath,"developer","application_server");
//var vTemp = globals.selectedPrint

var $ParametersMap = new java.util.HashMap()
//var vUUID = application.getNewUUID()
  
	//var vParameters = new Object();
	//vParameters.VIRTUALIZER_TYPE = "gZip"
	//vParameters.commentary_id = parseInt( globals.commentary_id )
	//vParameters.notesChk = parseInt( globals.sb_print_bibleTranslations )
	//vParameters.myNotesChk = parseInt( globals.sb_print_notes )
	//vParameters.userID = parseInt( globals.sb_gCurrentUserID )
	$ParametersMap.put('commentary_id', ( globals.commentary_id ))// globals.verse_id)
	$ParametersMap.put('notesChk', ( globals.sb_print_bibleTranslations ));
	$ParametersMap.put('myNotesChk', ( globals.sb_print_notes ));
	$ParametersMap.put('userID', ( globals.sb_gCurrentUserID ));
	if(!globals.amb_checkEsp())
	{
		$ParametersMap.put('languageParam', 0);
		//vParameters.languageParam = 0
	} else {
		$ParametersMap.put('languageParam', 1);
		//vParameters.languageParam = 1
	}
  
  //plugins.jasperPluginRMI.reportDirectory = vJasperPath
 // 	plugins.jasperPluginRMI.jasperCompile('CVB_commentary.jrxml', true)
//	plugins.jasperPluginRMI.jasperCompile('CVB_commentary_subreport_myNotes.jrxml',true)
//	plugins.jasperPluginRMI.jasperCompile('CVB_commentary_subreport_userNote.jrxml',true)
//	plugins.jasperPluginRMI.jasperCompile('CVB_commentary_subreportNotes.jrxml',true)

 // plugins.jasperPluginRMI.runReport('sb','CVB_commentary.jasper',vPdfFolder,OUTPUT_FORMAT.PDF, $ParametersMap,true);
 plugins.jasperPluginRMI.runReport('sb', 'CVB_commentary.jrxml', null, plugins.jasperPluginRMI.OUTPUT_FORMAT.VIEW, $ParametersMap);

  $ParametersMap.clear()
 /* var vPath = plugins.file.convertToJSFile(vPdfFolder)
  var vFileName = vPath.getName()
  var vBin = plugins.file.readFile(vPath)
  plugins.file.writeFile(vFileName, vBin)
  vPath = null
  vFileName = null
  vBin = null*/
  //application.showURL(vTempPdf,'_blank')
  
}

/**
 * @properties={typeid:24,uuid:"4E0A7A2A-BD5C-4398-9DBA-9FB1B94A085F"}
 */
function FORM_onShow()
{
foundset.loadRecords()
}
