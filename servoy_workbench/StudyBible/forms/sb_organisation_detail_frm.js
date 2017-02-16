/**
 * @properties={typeid:24,uuid:"099C6959-4DF3-4CAA-B4F2-BF81948C659B"}
 * @param organisation_id {Number}
 * @param event {JSEvent}
 */
function btn_new(event, organisation_id) {
	
	//var vOrganisationID = forms.sb_organisation_detail_frm.sb_organisation_id
	var vOrganisationID = sb_organisation_to_sb_organisation.sb_organisation_id
	if (organisation_id) {
		vOrganisationID = organisation_id; //arguments[0]
	}

	databaseManager.setAutoSave(false)
	var vIndex = forms.sb_contact_dlg.foundset.newRecord()
	var vContactRecord = forms.sb_contact_dlg.foundset.getRecord(vIndex)
	vContactRecord.sb_organisation_id = vOrganisationID

	//databaseManager.saveData()

	databaseManager.recalculate(forms.sb_organisation_detail_frm.foundset)

	//application.showFormInDialog(forms.sb_contact_dlg, -1, -1, -1, -1, 'i18n:CVB.dialog.new_contact', false, false)
	//SMM 20-05-2011
	var vForm = application.createWindow('ContactForm', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:CVB.dialog.new_contact';
	vForm.show(forms.sb_contact_dlg);

}

/**
 * @properties={typeid:24,uuid:"3FF5D550-3E50-4340-9384-8679837D00F1"}
 * @AllowToRunInFind
 */
function btn_search() {
	var vSQL;
	// Load related record when no search value provided.
	if (!globals.sb_UserSearchValue) {
		vSQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_organisation_id = ?";
		forms.sb_contact_tbl.controller.loadRecords(vSQL, [sb_organisation_id]);
		return true;
	}
	
	if (globals.sb_UserSearchValue.length >= 2) {
		var vSearchValue = "%" + globals.sb_UserSearchValue.toLowerCase() + "%";
		vSQL = "select sb_contact_id from sb_contact where (lower(login_name) like ? or lower(name_last) like ? or lower(name_first) like ?) and sb_organisation_id = ?";
//		vSQL = "select sb_contact_id from sb_contact where ((login_name) like ? or (name_last) like ? or (name_first) like ?) and sb_organisation_id = ?";
		
		
		forms.sb_contact_tbl.controller.loadRecords(vSQL, [vSearchValue, vSearchValue, vSearchValue, sb_organisation_id]);
	} else {
		vSQL = "select sb_contact_id from sb_contact where sb_organisation_id = ?";
		forms.sb_contact_tbl.controller.loadRecords(vSQL, [sb_organisation_id]);
	}
	return true;
}

/**
 * @properties={typeid:24,uuid:"94B741F5-92CF-4FF4-9307-A18080EF795B"}
 */
function FORM_onShow() {
	if (globals.sb_gCurrentGroupCode > 2) {
		elements.btn_new_contact.visible = false
	}
}

/**
 * @properties={typeid:24,uuid:"2C1F1F69-22E7-44E5-BB72-32809DEB7DEA"}
 */	
function onRecSelection() {
	globals.sb_UserSearchValue = null
/*	try{
		if(utils.hasRecords(sb_organisation_to_sb_organisation))
		{
			globals.sb_UserSearchValue = null
			var vSQL = "select sb_contact_id from sb_contact where sb_organisation_id = ?";
			forms.sb_contact_tbl.controller.loadRecords(vSQL, [sb_organisation_to_sb_organisation.sb_organisation_id]);
		}
	}catch (e) {
		//
	}*/
}
