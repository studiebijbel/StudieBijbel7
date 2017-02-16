/**
 * @properties={typeid:24,uuid:"392120B5-2A86-4C27-8848-88A1936B7509"}
 */
function BTN_accountEmail() {
	//application.closeFormDialog()
//	globals.sb_EMAIL_sendLoginSpecs(login_name, login_pw, contact_email, name_first, name_last, organisation_name);
}

/**
 * @properties={typeid:24,uuid:"593FC604-C514-4768-B021-AB1726A1431A"}
 */
function BTN_cancel() {
	//if(databaseManager.hasTransaction()) {
	databaseManager.revertEditedRecords()
	//}
	//Set a global so the FORM_onHide Function is skipt
	globals.sb_frmOnHideCHK = 1
	//application.closeFormDialog()
	//SMM - 23-05-2010
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}
}


/**
 * @properties={typeid:24,uuid:"D9C9BBC7-926C-4ECB-B8A4-F2B52D1D696B"}
 */
function BTN_save() {
	var vRecord = foundset.getRecord(foundset.getSelectedIndex())

	//if(databaseManager.hasTransaction()) {
	databaseManager.saveData()
	databaseManager.setAutoSave(true)

	//create user in application server	//}
	//Set a global so the FORM_onHide Function is skipt
	globals.sb_frmOnHideCHK = 1
	//application.closeFormDialog()
	//SMM - 23-05-2010
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}
}

/**
 * @properties={typeid:24,uuid:"3950F140-8AFE-4457-A794-07283A8D45C7"}
 */
function FORM_onHide() {
	BTN_cancel();
}

/**
 * @properties={typeid:24,uuid:"8329C955-B340-401D-A037-26438A56BD02"}
 */
function FORM_onShow() {
	globals.sb_gDialogStatus = null
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2D25E72B-247B-4E8A-99D0-A874F385A4F8"}
 */
function DIALOG_showContactDialog() {
	var vDialogForm = 'sb_contact_dlg'
	var vID = sb_contact_id
	//forms[vDialogForm].foundset.loadRecords(databaseManager.convertToDataSet([vID]))
	var vSQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?"
	forms.sb_contact_dlg.foundset.loadRecords(vSQL, [vID])

	//application.showFormInDialog( forms[vDialogForm],  -1, -1, -1, -1, 'i18n:CVB.dialog.contact_details', false, false, 'details')
	//SMM 20-05-2011
	var vForm = application.createWindow('details', JSWindow.MODAL_DIALOG);
	vForm.title = 'i18n:CVB.dialog.contact_details';
	vForm.setInitialBounds(-1, -1, -1, -1);
	vForm.show(forms[vDialogForm]);
}
/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"92CD501A-EB06-4AC6-AD96-12FE4A0B34C3"}
 */
function onDataChange(oldValue, newValue, event) {
	if(plugins.dialogs.showQuestionDialog("Let op", "Weet u heel zeker dat u het abonnement voor deze persoon wilt veranderen?\n\nAlle instellingen zal worden overschreven!", "Ja", "Nee") == "Ja") {
	
		return true;
	}
	return false;
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"E85F2E9C-F20F-4E88-8B8D-023797C733F7"}
 */
function onHide(event) {
	elements.name_first.enabled = false
	BTN_cancel();
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E0222497-7F50-4988-BF33-C2D168E9BB7B"}
 */
function BTN_refresh(event) {
	var vSQL = "SELECT sb_contact_id FROM sb_contact";
	var vFS = databaseManager.getFoundSet("sb_data", "sb_contact");
	vFS.loadRecords(vSQL);
	
	var vRec;
	for(var i = 1; i <= vFS.getSize(); i++){
		/** @type {JSRecord<db:/sb_data/sb_contact>} */
		vRec = vFS.getRecord(i);
		databaseManager.recalculate(vRec);
		databaseManager.saveData(vRec);
	}
	
}

/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"6799280E-6AB2-4A1F-8DD6-923C6BA3E391"}
 * @AllowToRunInFind
 */
function ODC_searchUser(oldValue, newValue, event) {
	
	var vSQL = "SELECT sb_contact_id FROM sb_contact";
	/** @type {JSFoundSet<db:/sb_data/sb_contact>} */
	var vFS = databaseManager.getFoundSet("sb_data", "sb_contact");
	vFS.loadRecords(vSQL);
	
	if(vFS.find()) {
		vFS.contact_email = "#%" + newValue + "%";
		
		var vName = newValue.split(' ');
		for(var i in vName) {
			vFS.newRecord();		
			vFS.name_first = "#%" + vName[i] + "%";
			vFS.newRecord();		
			vFS.name_last = "#%" + vName[i] + "%";
		}
		var vSearch = vFS.search();
	}
	
	if(vSearch == 1)
	{
		sb_contact_id = vFS.sb_contact_id;
	} else if(vSearch > 1) {
		forms.sb_select_person.callback = function(contact_id) {
			sb_contact_id = contact_id;
		}
		forms.sb_select_person.foundset.loadRecords(vFS);
		var vWindow = application.createWindow("sb_select_person", JSWindow.MODAL_DIALOG);
		vWindow.setInitialBounds(-1, -1, -1, -1);
		vWindow.title = "Selecteer persoon";
		vWindow.show(forms.sb_select_person);	
	} else {
		plugins.dialogs.showInfoDialog("Fout", "Er zijn geen gebruikers gevonden die aan uw creterium voldoen!");
	}
	
	return true
}
