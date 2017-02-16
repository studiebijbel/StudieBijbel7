/**
 * @properties={typeid:35,uuid:"5DE1FA2A-03BC-4246-A623-978D72A01BDE",variableType:-4}
 */
var SB = new scopes.StudyBible.StudieBijbel();

/**
 * @properties={typeid:35,uuid:"968357DD-7A82-4C7C-A737-D3CE14F53E79",variableType:-4}
 */
var LOG = new scopes.log.INSTANCE();

/**
 * @properties={typeid:24,uuid:"E2FA0954-CC16-4D9D-9597-9730FE1DC2F6"}
 */
function batch_start() {
	plugins.scheduler.addCronJob('Daily 00:30','0 30 0 ? * *', cron_DAILY);
}

/**
 * @properties={typeid:24,uuid:"04030919-A476-40BF-85DB-64F7C81A846C"}
 * @AllowToRunInFind
 */
function cron_DAILY() {
	
	LOG.Write("Daily cronjob started on " );
	
	/** @type {JSFoundSet<db:/sb_data/sb_subscription_to_contact>} */
	var vFS;
	/** @type {String} */
	var vSQL, vSub;
	/** @type {JSRecord<db:/sb_data/sb_subscription_to_contact>} */
	var vRec;
	
	// Warn ppl with less then 5 days of trail left!
	vFS = databaseManager.getFoundSet("sb_data", "sb_subscription_to_contact");
	vSQL = "SELECT sb_subscription_to_contact_id FROM sb_subscription_to_contact WHERE (reminder_send != 1 OR reminder_send IS NULL) AND sb_subscription_id IN (SELECT sb_subscription_id FROM sb_subscriptions WHERE token = ?) AND valid_till < ? AND renew = ?";
	var dateNow = new Date();
	var date5Days = new Date(dateNow.getTime()+5*24*60*60*1000);
	vFS.loadRecords(vSQL, ['sb_trail', date5Days,  1]);
	
	if(vFS.getSize() >= 1) {
		for(var i = 1; i <= vFS.getSize(); i++) {
			vRec = vFS.getRecord(i);
			vRec.reminder_send = 1;
			SB.SendMail("trail_ends_soon", vRec.sb_contact_id,{})
		}
	}
	databaseManager.saveData();
	
	// Upgrade ppl automaticly! (sb_trail only!)
	/** @type {JSFoundSet<db:/sb_data/sb_subscription_to_contact>} */
	vFS = databaseManager.getFoundSet("sb_data", "sb_subscription_to_contact");
	vSQL = "SELECT sb_subscription_to_contact_id FROM sb_subscription_to_contact WHERE sb_subscription_id IN (SELECT sb_subscription_id FROM sb_subscriptions WHERE token = ?) AND valid_till < NOW() AND renew = ?";
	vFS.loadRecords(vSQL, ['sb_trail', 1]);
	
	if(vFS.getSize() >= 1) {
		for(i = 1; i <= vFS.getSize(); i++) {
			vRec = vFS.getRecord(i);
			vRec.activated = 0;
			
			if(vRec.renew == 1) {
				SB.AddSubscriptionToUser(vRec.sb_contact_id, "sb_abonnement", 1);
			}
		}
	}
	databaseManager.saveData();
	
	// Renew products which should be renewed!
	/** @type {JSFoundSet<db:/sb_data/sb_subscription_to_contact>} */
	vFS = databaseManager.getFoundSet("sb_data", "sb_subscription_to_contact");
	vSQL = "SELECT sb_subscription_to_contact_id FROM sb_subscription_to_contact WHERE valid_till < NOW() AND renew = ?";
	vFS.loadRecords(vSQL, [1]);
	
	if(vFS.getSize() >= 1) {
		for(i = 1; i <= vFS.getSize(); i++) {
			vRec = vFS.getRecord(i);
			vSub = vRec.sb_subscription_to_contact_to_sb_subscriptions;
			
			var _ExpireDate = new Date();
			_ExpireDate.setDate(_ExpireDate.getDate() +  vSub.valid_for);
			vRec.valid_till = _ExpireDate;
			vRec.iteration = vRec.iteration+1;
		}
	}
	databaseManager.saveData();
	
	// Deactivate the products which should be deactivated
	vFS.loadRecords(vSQL, [0]);
	if(vFS.getSize() >= 1) {
		for(i = 1; i <= vFS.getSize(); i++) {
			vRec = vFS.getRecord(i);
			vRec.activated = 0;
		}
	}
	databaseManager.saveData();
	delete vFS;
	delete vSQL;
	delete vRec;
	
	
	// Now the monthly stuff... If not done it will not work correctly!
	var vToday = new Date();
	if(vToday.getDate() == 1) {
		cron_MONTHLY();
	}
	
}

/**
 * @properties={typeid:24,uuid:"612953C9-861C-4173-8F38-8D3D8DC09D02"}
 */
function cron_MONTHLY() {
	// Define variables
	var vSQL, vDS, i, vExport;
	
	/** @type {Array<plugins.mail.Attachment>} */
	var vFiles = [];
	
	/** @type {JSFoundSet<db:/sb_data/sb_subscription_to_contact>} */
	var vFS = databaseManager.getFoundSet("sb_data", "sb_subscription_to_contact");
	
	/** @type {JSRecord<db:/sb_data/sb_subscriptions>} */
	var vRec;
	
	/** @type {String} */
	var vExportHeaders = ['#', 'Voornaam', 'Achternaam', 'Email', 'Licenties #', 'Organisatie', 'Datum Aanmelden'].join('\t');
	
	// Get ALL the subscription types
	vSQL = "SELECT * FROM sb_subscriptions";
	vDS = databaseManager.getDataSetByQuery("sb_data", vSQL, null, -1);
	
	// Set the sb_subscription_to_contact SQL
	vSQL = "SELECT sb_subscription_to_contact_id FROM sb_subscription_to_contact WHERE sb_subscription_id = ? AND activated = 1";// OR (valid_till < NOW() AND renew = 0 AND activated = 1)";
	// Loop trough the subscriptions
	for(i = 0; i < vDS.getMaxRowIndex(); i++) {
		vExport = [];
		vExport.push(vExportHeaders);
		vRec = vDS[i];
		vFS.loadRecords(vSQL, [vRec['sb_subscription_id']]);
		 for(var j = 1; j <= vFS.getSize(); j++) {
			 /** @type {JSRecord<db:/sb_data/sb_subscription_to_contact>} */
			 var vRec2 = vFS.getRecord(j);
			 vExport.push([
			 	vRec2.sb_contact_id,
				vRec2.sb_subscription_to_contact_to_sb_contact.name_first,
				vRec2.sb_subscription_to_contact_to_sb_contact.name_last,
				vRec2.sb_subscription_to_contact_to_sb_contact.contact_email,
				vRec2.amount,
				vRec2.sb_subscription_to_contact_to_sb_contact.organisation_name,
				utils.dateFormat(vRec2.sb_subscription_to_contact_to_sb_contact.creationdate, 'dd-MM-yyyy')
			 ].join('\t'));
		 }
		 
		 var vTmpFile = plugins.file.createTempFile(vRec.token,".tab");
		 plugins.file.writeTXTFile(vTmpFile, vExport.join('\n'));
		 
		 vFiles.push(plugins.mail.createBinaryAttachment(vRec.token+'.tab',plugins.file.readFile(vTmpFile.getAbsolutePath())));
		 		 
		delete vExport;
	}
	
	var vTo = "info@studiebijbel.nl";
	var vFrom = "info@studiebijbel.nl";
		
	plugins.mail.sendMail(vTo, vFrom+","+vFrom, "Actieve abonnementen", "Hierbij alle abonnementen die op dit moment nog actief zijn.", null, null, vFiles, null );
	plugins.mail.sendMail("rick@directict.nl", vFrom+","+vFrom, "Actieve abonnementen", "Hierbij alle abonnementen die op dit moment nog actief zijn.", null, null, vFiles, null );

	
	// Delete the variables to save memory
	delete vSQL;
	delete vFS;
	delete vDS;
	delete vRec;
}