/**
 * @properties={typeid:24,uuid:"F96578C0-00DF-46A8-A770-6B5A9C930759"}
 * @param {String} vDate
 */
function BEAN_selectDate(vDate) {

	//var vHeaderDetail = new Array('Gebruiker', 'Organisatie', 'Groep', 'OS', 'Java', 'InternIP', 'ExternIP','Inlogtijdstip','UitlogTijdstip',' IPCheck')
	//vDate = utils.dateFormat(vDate, 'MM-dd-yyyy')
	var vSQL = "SELECT c.name_first || ' ' || c.name_last AS Gebruiker, \
			o.organisation_name AS Organisatie, \
			g.group_name AS Groep, \
			l.os_name || ' ' || l.os_version AS OS, \
			l.java_version AS Java, \
			l.ip_address AS InternIP, \
			ext_ip_address AS ExternIP, \
			to_char(l.creationdate,'HH24:MI:SS') AS Inlogtijdstip, \
			to_char(l.logoff_stamp,'HH24:MI:SS') AS UitlogTijdstip, \
			l.used_ip_chk AS IPCheck\
			FROM sb_login l \
			LEFT JOIN sb_contact c ON l.sb_contact_id = c.sb_contact_id \
			LEFT JOIN sb_organisation o ON l.sb_organisation_id = o.sb_organisation_id \
			LEFT JOIN sb_group g ON g.group_code = c.sb_group_code \
			WHERE to_char(l.creationdate,'dd-MM-yyyy') = ?"
	//AND l.sb_contact_id = c.sb_contact_id"

	/*
	 var vDS = databaseManager.getDataSetByQuery('sb_data', vSQL, [vDate], -1)

	 if(vDS && vDS.getMaxRowIndex() > 0){
	 return vDS
	 }
	 return null
	 */
	var vDataSource = databaseManager.createDataSourceByQuery('my_detail_data', 'sb_data', vSQL, [vDate], -1)
	//var fs = databaseManager.getFoundSet(vDataSource)
	//fs.loadAllRecords();
	return vDataSource

}

/**
 * @properties={typeid:24,uuid:"FE838DC0-EE7E-4A8D-8F86-1FF342A2AE7D"}
 * @AllowToRunInFind
 */
function BTN_search() {

	//SMM 31-05-2011
	forms.sb_login_report_new_dlg.elements.tabs_data.removeAllTabs()
	forms.sb_login_report_new_dlg.elements.tabs_detail.removeAllTabs()
	elements.tabs_totals.removeAllTabs();

	var vSuccess
	if (solutionModel.getForm('HeadForm')) {
		vSuccess = history.removeForm('HeadForm')
		if (vSuccess) {
			solutionModel.removeForm('HeadForm')
			//solutionModel.revertForm('HeadForm')
		}
	}
	if (solutionModel.getForm('DetailForm')) {
		vSuccess = history.removeForm('DetailForm')
		if (vSuccess) {
			solutionModel.removeForm('DetailForm')
			//solutionModel.revertForm('DetailForm')
		}
	}
	
	// RB
	if(solutionModel.getForm('TotalsForm')) {
		vSuccess = history.removeForm('TotalsForm');
		if(vSuccess) {
			solutionModel.removeForm('TotalsForm');
		}
	}
	
	//application.updateUI()
	var vSet, i, y, x
	if (globals.sb_gTempDate01 && globals.sb_gTempDate02) {
		globals.sb_gTempText01 = null
		//var vServer = controller.getServerName()
		var vCount = 0

		var vSearchString = utils.dateFormat(globals.sb_gTempDate01, "dd-MM-yyyy") + "..." + utils.dateFormat(globals.sb_gTempDate02, "dd-MM-yyyy")
		if (forms.sb_login.controller.find()) { 
			forms.sb_login.creationdate = "#" + vSearchString + '|dd-MM-yyyy'; //postgresql
			vCount = forms.sb_login.controller.search()
		}
	}

	if (vCount > 0) {
		//show progress bar
		elements.bean_progress.visible = true
		elements.bean_progress.indeterminate = true
		elements.bean_progress.stringPainted = true
		elements.bean_progress.string = 'Zoekt gegevens...'
		application.updateUI(200)

		var vDate
		var vDateString
		var vDateString2
		var vTotal = null
		var vDateDS, vTotalDS
		/** @type JSFoundset<db:/sb/sb_login> */
		vSet = forms.sb_login.foundset
		var vRecord
		var vTypeArray = new Array()
//		var vBeanArray = new Array()
//		var vCurrentUsers = new Array()
		var vHeader = new Array('Datum', 'Gebruiker totaal', 'Max concurrent')
		var vSQL
//		var vBreak
		var vCurrentAmount = 0
		var vOSArray = new Array()
		var vBEANItems = new Array()
		var vTotalItems = new Object();
		var vField
		elements.bean_progress.string = 'Zoekt besturingsystemen...'
		application.updateUI(200)

		//find all different OS'es
		//vSQL = "SELECT DISTINCT os_name FROM sb_login WHERE creationdate BETWEEN ? AND ? AND (os_name IS NOT NULL OR os_name != '')"
		vSQL = "SELECT DISTINCT os_name FROM sb_login WHERE os_name IS NOT NULL OR os_name != ''"
		//var vDS = databaseManager.getDataSetByQuery('sb_data', vSQL, [globals.sb_gTempDate01, globals.sb_gTempDate02], -1)
		var vDS = databaseManager.getDataSetByQuery('sb_data', vSQL, [], -1)
		if (vDS && vDS.getMaxRowIndex() > 0) {
			vOSArray = vDS.getColumnAsArray(1)
			vHeader = vHeader.concat(vOSArray)
		}
		elements.bean_progress.string = 'Verzamel gebruikerinfo...'
		application.updateUI(200)

		var vMyDataset = databaseManager.createEmptyDataSet(0, [])

		for (y = 0; y < vHeader.length; y++) {
			if(vHeader[y].match(/\./)) {
				vHeader[y] = vHeader[y].replace(/\./, '');
			}
			
			vHeader[y] = vHeader[y].toString().toLowerCase().replace(/\s/gi, '_').replace(' (unknown)', '');
			vMyDataset.addColumn(vHeader[y])
		}

		vTotalItems[vHeader[0]] = 'Totaal'
		vTotalItems[vHeader[1]] = 0
		vTotalItems[vHeader[2]] = 0

		//loop through foundset
		for (i = 1; i <= vSet.getSize(); i++) {
			vRecord = vSet.getRecord(i)
			vDate = vRecord.creationdate
			vDateString = utils.dateFormat(vDate, 'MM-dd-yyyy')

			if (vDateString != vDateString2) {
				vCurrentAmount = 0
				//get total and concurrent users
				vSQL = "SELECT COUNT(to_char(creationdate,'MM-DD-YYYY')), MAX(current_user_amount) \
					FROM sb_login  \
					WHERE to_char(creationdate,'MM-DD-YYYY') = ?"
				vDateDS = databaseManager.getDataSetByQuery('sb_data', vSQL, [vDateString], -1)
				vTotal = vDateDS.getValue(1, 1)
				vCurrentAmount = vDateDS.getValue(1, 2)
				vBEANItems = [utils.dateFormat(vDate, 'dd-MM-yyyy'), vTotal, vCurrentAmount]

				vTotalItems[vHeader[1]] += vTotal
				vTotalItems[vHeader[2]] += vCurrentAmount

				if (vOSArray.length > 0) {
					for (x in vOSArray) {

						vTotal = 0
						vSQL = "SELECT COUNT(to_char(creationdate,'MM-DD-YYYY')) AS amount FROM sb_login WHERE to_char(creationdate,'MM-DD-YYYY') = ? AND os_name LIKE ?"
						vTotalDS = databaseManager.getDataSetByQuery('sb_data', vSQL, [vDateString, vOSArray[x]], 1)
						if (vTotalDS && vTotalDS.getValue(1, 1)) vTotal = vTotalDS.getValue(1, 1)
						vBEANItems.push(vTotal)

						if (vTotalItems[vOSArray[x]] && vTotalItems[vOSArray[x]] >= 0) vTotalItems[vOSArray[x]] += vTotal
						else vTotalItems[vOSArray[x]] = vTotal
					}
				}
				vMyDataset.addRow(vBEANItems); // add the value 18889
			}
			vDateString2 = utils.dateFormat(vDate, 'MM-dd-yyyy')
		}

		var vMyArray = new Array()
		vMyArray.push(vTotalItems[vHeader[0]])
		vMyArray.push(vTotalItems[vHeader[1]])
		vMyArray.push(vTotalItems[vHeader[2]])
		if (vOSArray.length > 0) {
			for (x in vOSArray) {
				vMyArray.push(vTotalItems[vOSArray[x]])
			}
		}
		
		//vMyDataset.addRow(vMyArray);
		EVENT_showTotals(vHeader, vMyArray);
		
		
		for (x = 1; x <= vHeader.length; x++) {
			vTypeArray.push(JSColumn.TEXT)
		}
		//var MyDataSource = vMyDataset.createDataSource('mydata', [DM_COLUMNTYPE.INTEGER, DM_COLUMNTYPE.TEXT. etc]);
		var MyDataSource = vMyDataset.createDataSource('MyData', vTypeArray);
		//forms.sb_login_report_new_dlg.elements.tabs_data.removeAllTabs()
		//Create the form
		var vFormName = 'HeadForm'
		var vNewForm = solutionModel.newForm(vFormName, MyDataSource, null, false, 700, 150)
		vNewForm.styleName = 'CvB';
		vNewForm.view = JSForm.LOCKED_TABLE_VIEW; 
		vNewForm.styleClass = 'table'
		vNewForm.scrollbars = SM_SCROLLBAR.HORIZONTAL_SCROLLBAR_NEVER | SM_SCROLLBAR.VERTICAL_SCROLLBAR_AS_NEEDED
		vNewForm.borderType = solutionModel.createEmptyBorder(0, 0, 0, 0);
		
		//var MyGlobalVariable = solutionModel.newGlobalVariable("mynewglobal",SM_VARIABLETYPE.TEXT)
		//MyGlobalVariable.defaultValue =
		var vNewMethod = "function GetDetail() {";
		vNewMethod += "var vMyRecord = forms['HeadForm'].foundset.getRecord(forms['HeadForm'].foundset.getSelectedIndex());"
		//vNewMethod += "globals.mynewglobal = vMyRecord.datum; "
		//vNewMethod += "var vAnsw = plugins.dialogs.showQuestionDialog('warning', 'TEST ' + globals.mynewglobal, 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');"
		vNewMethod += "var vNewDataSourceDetail = forms.sb_login_report_new_dlg.BEAN_selectDate( vMyRecord.datum );"
		vNewMethod += "forms['DetailForm'].foundset.clear();"
		vNewMethod += "var fs = databaseManager.getFoundSet(vNewDataSourceDetail);"
		vNewMethod += "fs.loadAllRecords();"
		vNewMethod += "forms['DetailForm'].foundset.loadRecords(fs);"
		vNewMethod += "};";
		vNewForm.newMethod(vNewMethod)

		vNewForm.onRecordSelection = vNewForm.getMethod('GetDetail')
		/*
		 vLabel = vNewForm.newLabel('Select',100,100,20,20);
		 vLabel.text         = '';
		 vLabel.imageMedia   = solutionModel.getMedia('ga.gif');
		 vLabel.mediaOptions   = SM_MEDIAOPTION.CROP;
		 vLabel.showClick    = false;
		 vLabel.showFocus          = false;
		 vLabel.onAction = vNewForm.getFormMethod('GetDetail')
		 */
		for (y = 0; y < vHeader.length; y++){
			vField = vNewForm.newField(vHeader[y], JSField.TEXT_FIELD, 100, 100, 100, 20)
			vField.name = vHeader[y]
			vField.editable = false
			vField.titleText = vHeader[y]
			vField.anchors = SM_ANCHOR.EAST | SM_ANCHOR.WEST;
			vField.borderType = solutionModel.createEmptyBorder(0, 0, 0, 0);
			//vLabel = vNewForm.newLabel(vHeader[y],100,100,100,20)
			//vLabel.labelFor = vHeader[y]
		}

		//var vHeaderDetail = new Array('Gebruiker', 'Organisatie', 'Groep', 'OS', 'Java', 'Intern IP', 'Extern IP','Inlog tijdstip','Uitlog tijdstip',' IP Check')
		var vHeaderDetail = new Array('Gebruiker', 'Organisatie', 'Groep', 'OS', 'Java', 'InternIP', 'ExternIP', 'Inlogtijdstip', 'Uitlogtijdstip', 'IPCheck')

		databaseManager.createEmptyDataSet(0, vHeaderDetail)
		for (x = 1; x <= vHeaderDetail.length; x++) {
			vTypeArray.push(JSColumn.TEXT)
		}
		//forms['HeadForm'].foundset.setSelectedIndex(0)
		/** @type {*} */
		var vRec = forms['HeadForm'].foundset.getRecord(forms['HeadForm'].foundset.getSelectedIndex())
		var MyDataSourceDetail = forms.sb_login_report_new_dlg.BEAN_selectDate(vRec.datum);
		var vFormDetailName = 'DetailForm'
		var vNewDetailForm = solutionModel.newForm(vFormDetailName, MyDataSourceDetail, null, false, 700, 150)
		vNewDetailForm.styleName = 'CvB';
		vNewDetailForm.view = JSForm.LOCKED_TABLE_VIEW;
		vNewDetailForm.styleClass = 'table'
		vNewDetailForm.scrollbars = SM_SCROLLBAR.HORIZONTAL_SCROLLBAR_NEVER | SM_SCROLLBAR.VERTICAL_SCROLLBAR_AS_NEEDED
		//anchors = SM_ANCHOR.WEST | SM_ANCHOR.SOUTH | SM_ANCHOR.EAST;

		for (y = 0; y < vHeaderDetail.length; y++) {
			if (y == (vHeaderDetail.length - 1)) {
				vField = vNewDetailForm.newField(vHeaderDetail[y], JSField.CHECKS, 100, 100, 85, 20)
			} else {
				vField = vNewDetailForm.newField(vHeaderDetail[y], JSField.TEXT_FIELD, 100, 100, 85, 20);
			}
			vField.editable = false
			vField.name = "fld_" + vHeaderDetail[y]
			vField.titleText = vHeaderDetail[y]

			//vLabel = vNewDetailForm.newLabel(vHeaderDetail[y],100,100,100,20)
			//vLabel.labelFor = vHeader[y]
		}
		//controller.recreateUI()
		//vNewDetailForm.dataSource = MyDataSourceDetail

		forms.sb_login_report_new_dlg.elements.tabs_data.addTab(forms[vFormName]);
		forms.sb_login_report_new_dlg.elements.tabs_detail.addTab(forms[vFormDetailName]);
		forms.sb_login_report_new_dlg.elements.tabs_totals.addTab(forms['TotalsForm']);

		//elements.bean_dataset.setData(vBeanArray,  vHeader)

		//elements.bean_progress.string = 'Zet veldinfo...'
		//application.updateUI(200)

		elements.bean_progress.visible = false

	} else plugins.dialogs.showQuestionDialog('warning', 'i18n:servoy.formPanel.search.noResults', 'i18n:cvb.btn.yes', 'i18n:cvb.btn.no');
}

/**
 * @properties={typeid:24,uuid:"BDDA0C16-2236-498C-9321-B3D7730147D5"}
 */
function FORM_onLoad() {
	//set default start and enddate
	globals.sb_gTempDate02 = new Date()
	var vDate = globals.sb_gTempDate02
	var vDate2 = vDate.getDate()
	vDate.setDate(vDate2 - 1)
	globals.sb_gTempDate01 = vDate

}

/**
 * @properties={typeid:24,uuid:"D4D2406E-0A7C-4C57-98ED-3AFD432A9312"}
 */
function FORM_onShow() {
	elements.bean_progress.visible = false
}

/**
 * @param headers {Array}
 * @param row {Array}
 * @properties={typeid:24,uuid:"C727BBF2-CD22-4C96-9873-8A2B9068F7B6"}
 */
function EVENT_showTotals(headers, row){
	if(solutionModel.getForm('TotalsForm')) {
		var vSuccess = history.removeForm('TotalsForm');
		if(vSuccess) {
			solutionModel.removeForm('TotalsForm');
		}
	}
	
	var vMyDataset = databaseManager.createEmptyDataSet(0, []); // (0, [])
	
	for (var y = 0; y < headers.length; y++) {
		if(headers[y].match(/\./)) {
			headers[y] = headers[y].replace(/\./, '');
		}
		
		headers[y] = headers[y].toString().toLowerCase().replace(/\s/gi, '_').replace(' (unknown)', '');
		
		vMyDataset.addColumn(headers[y])
	}
	
	vMyDataset.addRow(row);
	
	var vTypeArray = [];
	
	for (var x = 1; x <= headers.length; x++) {
		vTypeArray.push(JSColumn.TEXT)
	}

	//var MyDataSource = vMyDataset.createDataSource('mydata', [DM_COLUMNTYPE.INTEGER, DM_COLUMNTYPE.TEXT. etc]);
	var MyDataSource = vMyDataset.createDataSource('MyTotals', vTypeArray);
	//forms.sb_login_report_new_dlg.elements.tabs_data.removeAllTabs()
	//Create the form
	var vFormName = 'TotalsForm'
	var vNewForm = solutionModel.newForm(vFormName, MyDataSource, null, false, 700, 150)
	vNewForm.styleName = 'CvB';
	vNewForm.borderType = solutionModel.createEmptyBorder(0, 0, 0, 0);
	vNewForm.view = JSForm.LOCKED_TABLE_VIEW;
	vNewForm.styleClass = 'table';
	vNewForm.removePart(JSPart.HEADER);
	vNewForm.removePart(JSPart.TITLE_HEADER);
	vNewForm.newPart(JSPart.HEADER, 0);
	//vNewForm.
	vNewForm.scrollbars = SM_SCROLLBAR.HORIZONTAL_SCROLLBAR_NEVER | SM_SCROLLBAR.VERTICAL_SCROLLBAR_AS_NEEDED
	
	
	for (y = 0; y < headers.length; y++) {
		var vField = vNewForm.newField(headers[y], JSField.TEXT_FIELD, 100, 100, 100, 20)
		
		vField.name = headers[y];
		vField.editable = false;
		vField.anchors = SM_ANCHOR.EAST | SM_ANCHOR.WEST;
		vField.borderType = solutionModel.createEmptyBorder(0, 0, 0, 0);
		//vField.titleText = headers[y]
		//vLabel = vNewForm.newLabel(vHeader[y],100,100,100,20)
		//vLabel.labelFor = vHeader[y]
	}
}
