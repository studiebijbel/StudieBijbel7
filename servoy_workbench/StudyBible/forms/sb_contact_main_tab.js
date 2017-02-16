/**
 * @properties={typeid:24,uuid:"0B0D01B9-00C7-4E05-A9DE-5C5D5C940751"}
 */
function BTN_accountEmail() {
	//application.closeFormDialog()
//	globals.sb_EMAIL_sendLoginSpecs(login_name, login_pw, contact_email, name_first, name_last, organisation_name);
}

/**
 * @properties={typeid:24,uuid:"7454207B-8803-4882-AE10-E8AE7BBE536A"}
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
 * @properties={typeid:24,uuid:"0B7C7846-B796-4394-9643-B0BD526BD709"}
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
 * @properties={typeid:24,uuid:"44CB3BC6-F3DD-4EED-B913-532981F5AB60"}
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
 * @properties={typeid:24,uuid:"B03B0BF2-F4D1-4DDE-AE6E-E8102E1D341C"}
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
 * @properties={typeid:24,uuid:"B958DE0F-B8E1-46FD-A67B-C58AFD2CB31D"}
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
 * @properties={typeid:24,uuid:"123050C8-E3B1-448B-83D9-2D39FE91241A"}
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
 * @properties={typeid:24,uuid:"9C1B5098-465B-4867-ADC0-467EBEC7EF20"}
 */
function FORM_onHide() {
	BTN_cancel();
}

/**
 * @properties={typeid:24,uuid:"B369C3B5-E678-4CE0-8774-B0457803D540"}
 */
function FORM_onShow() {
	globals.sb_gDialogStatus = null
	elements.name_first.requestFocus()

	//set password if empty
	if (!login_pw) {
		login_pw = /*sb_contact_id + '-' + */utils.stringLeft(application.getUUID().toString(), 8)
	}

	if (globals.sb_gCurrentGroupCode > 2) {
		elements.sb_group_code.visible = false
	}

	VALUE_setGroupValuelist();
}

/**
 * @properties={typeid:24,uuid:"643F6C77-B6A2-43CD-B84E-F65BD3131875"}
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

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"30E290FD-169F-4F4C-9BDE-F7BD3429A40B"}
 */
function onRecordSelection(event) {
	if(reset_token != null && reset_token != '') {
		elements.forgot_password.visible = true;
	} else {
		elements.forgot_password.visible = false;
	}
}
