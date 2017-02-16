
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6887AA56-52BB-42FA-A7A2-D644E4894D12"}
 */
function BTN_mgratePasswords(event) {
	
	
	var vFS = databaseManager.getFoundSet("sb_data", "sb_contact");
	vFS.loadAllRecords();
	
	/** @type {JSRecord<db:/sb_data/sb_contact>} */
	var vRec;
	
	for(var i = 1; i <= vFS.getSize(); i++) {
		// Get the record object
		vRec = vFS.getRecord(i);
		
		// Copy the unhashed password into the login_pw_old field
		if(!vRec.login_pw_old) {
			vRec.login_pw_old = vRec.login_pw;
		}
		
		if(vRec.login_pw_old == ""){
			vRec.login_pw = "";
		} else {
			vRec.login_pw = scopes.php.sha1(vRec.login_pw_old);
		}
		
		databaseManager.saveData(vRec);
		
	}
	
	plugins.dialogs.showInfoDialog("Done", "Done!");
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"284B36F9-0D32-422D-8760-46959718F439"}
 */
function BTN_migrateSubscription(event) {
	var vFS = databaseManager.getFoundSet("sb_data", "sb_contact");
	vFS.loadAllRecords();
	
	/** @type {JSRecord<db:/sb_data/sb_contact>} */
	var vRec;
	
	var SB = new scopes.StudyBible.StudieBijbel();
	
	for(var i = 1; i <= vFS.getSize(); i++) {
		// Get the record object
		vRec = vFS.getRecord(i);
		// Give everyone in group 30 a FREE license
		if(vRec.sb_organisation_id == 30) {
			if(vRec.sb_end_date >= new Date()) {
				SB.AddSubscriptionToUser(vRec.sb_contact_id, "sb_trail", 1, true);
			}
		} else {
			SB.AddSubscriptionToUser(vRec.sb_contact_id, "sb_abonnement", 1, true);
		}
	}
	
	plugins.dialogs.showInfoDialog("Done", "Done!");
}
