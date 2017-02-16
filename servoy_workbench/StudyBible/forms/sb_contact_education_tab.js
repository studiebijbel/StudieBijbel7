/**
 * @properties={typeid:24,uuid:"1C338C24-1E21-4DCB-92D5-99F80C11C3A1"}
 */
function BTN_accountEmail() {
	//application.closeFormDialog()
//	globals.sb_EMAIL_sendLoginSpecs(login_name, login_pw, contact_email, name_first, name_last, organisation_name);
}

/**
 * @properties={typeid:24,uuid:"1FC6B4AC-04E1-4E36-B794-102661CFAF1A"}
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
 * @properties={typeid:24,uuid:"EA88C45D-738D-4459-8C44-B964590549B0"}
 */
function BTN_resetSecurity() {
	var vContactID = sb_contact_id
	var vOrganisationID = sb_organisation_id
	var vServer = 'sb_data'
	var vTable = 'sb_login'
	var vContactName = name_first + ' ' + name_last

	//check if this user is already logged in
	var vSQL = 'DELETE FROM sb_login WHERE sb_contact_id = ? \
			 AND sb_organisation_id = ? AND logoff_stamp IS NULL'

	var vResult = plugins.rawSQL.executeSQL(vServer, vTable, vSQL, [vContactID, vOrganisationID])
	if (vResult) {
		plugins.rawSQL.flushAllClientsCache(vServer, vTable)
		plugins.dialogs.showInfoDialog('i18n:CVB.dialog.info', i18n.getI18NMessage('CVB.dialog.message.security_is_reset', [vContactName]), 'i18n:CVB.lbl.ok')
	}

}

/**
 * @properties={typeid:24,uuid:"6FF1912F-413E-4B9D-9E70-478D3EBA722B"}
 */
function BTN_save() {
	var vRecord = foundset.getRecord(foundset.getSelectedIndex())

	var vRequiredFields = new Array('name_first', 'name_last', 'contact_email', 'sb_group_code', 'login_name', 'login_pw')
	//loop through required fields and check on empty data
	var vFieldName
	var vEmptyFields = new Array()
	for (var i in vRequiredFields) {
		vFieldName = vRequiredFields[i]
		if (!vRecord[vFieldName]) {
			var vI18nkey = 'CVB.field.sb_contact.' + vFieldName
			vEmptyFields.push('- ' + i18n.getI18NMessage(vI18nkey))
		}
	}

	if (vEmptyFields.length > 0) {
		vEmptyFields = vEmptyFields.join('\n')
		var vMessage = i18n.getI18NMessage('CVB.dialog.message.required_fields')
		plugins.dialogs.showInfoDialog('i18n:CVB.dialog.attention', vMessage + '\n' + vEmptyFields, 'i18n:CVB.lbl.ok')
		return
	}

	//if(databaseManager.hasTransaction()) {
	databaseManager.saveData()
	databaseManager.setAutoSave(true)

	//create user in application server
	security.createUser(sb_organisation_id + '_' + login_name, login_pw, sb_user_uuid)
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
 * @properties={typeid:24,uuid:"659A1183-C7D1-4CC4-A0CC-68D3E8C985B7"}
 */
function CHK_setDate() {
	if (sb_trail_account_chk == 1) {
		var vDate = application.getTimeStamp();
		vDate.setMonth(vDate.getMonth() + 2)
		vDate.setHours(0);
		vDate.setMinutes(0);
		vDate.setSeconds(0);
		vDate.setMilliseconds(0);

		sb_end_date = vDate;
	} else {
		sb_end_date = null
	}

}

/**
 * @properties={typeid:24,uuid:"90779627-FB36-487B-9097-74B1C2BD744B"}
 */
function FIELD_checkEmail() {
	var vResult = plugins.it2be_tools.isEmail(contact_email, true)
	if (utils.stringPatternCount(vResult, 'error')) {
		plugins.dialogs.showInfoDialog('i18n:CVB.dialog.attention', 'i18n:CVB.dialog.message.email_not_valid', 'i18n:CVB.lbl.ok')
		contact_email = null
		login_name = null
		elements.contact_email.requestFocus()

		return
	} else {
		if (login_name != contact_email && login_name) {
			if (plugins.dialogs.showQuestionDialog("Loginnaam waarschuwing", "U heeft het e-mail adres veranderd, Wilt u dit e-mail adres ook gebruiken als loginnaam?", "Ja", "Nee") == "Ja") {
				login_name = contact_email
			}
		} else {
			login_name = contact_email
		}
	}

}

/**
 * @properties={typeid:24,uuid:"E3A04216-B545-4F85-828C-E0EA44A38321"}
 */
function FIELD_checkPassword() {
	if (!login_pw) {
		login_pw = sb_contact_id + '-' + utils.stringLeft(application.getUUID().toString(), 10)
	} else if (login_pw.length < 8) {
		plugins.dialogs.showInfoDialog('i18n:CVB.dialog.attention', 'i18n:CVB.dialog.message.password_info', 'i18n:CVB.lbl.ok')
		login_pw = null
		elements.login_pw.requestFocus()
	}
}

/**
 * @properties={typeid:24,uuid:"C3D3F768-AA92-4272-8573-31A5C95F5C2F"}
 */
function FORM_onHide() {
	BTN_cancel();
}

/**
 * @properties={typeid:24,uuid:"84D568A7-D30E-4A6C-87ED-A62BBC3A0DAA"}
 */
function FORM_onShow() {

}

/**
 * @properties={typeid:24,uuid:"9A3630DB-DB4F-40FE-A770-4B11EB6B202A"}
 */
function VALUE_setGroupValuelist() {
	var vServer = 'sb_data'
	var vSQL = 'SELECT group_name, group_code FROM sb_group'
	var vValuelistName = 'sb_group_code'

	if (globals.sb_gCurrentGroupCode != 1) {
		vSQL += ' WHERE group_code != 1'
	}

	var vDS = databaseManager.getDataSetByQuery(vServer, vSQL, null, -1)
	application.setValueListItems(vValuelistName, vDS)
}
