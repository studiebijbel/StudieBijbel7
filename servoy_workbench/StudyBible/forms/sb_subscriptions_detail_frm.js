/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"EE0B6423-A066-4946-AF39-FF1CB03A616F",variableType:4}
 */
var totalUsers = 2;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C833A013-3D83-4633-AC88-A2E8AAA3D0B2"}
 */
var fv_search = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"80D6AE28-D207-4312-B32A-219462D9AB6E"}
 */
var fv_showDeactive = '0';

/**
 * @properties={typeid:24,uuid:"E2E2C31A-9CB1-405C-96DF-BE81746F7444"}
 * @param organisation_id {Number}
 * @param event {JSEvent}
 */
function btn_new(event, organisation_id) {
	// nieuwe gebruiker toevoegen aan abo!
	databaseManager.setAutoSave(false)

	forms.sb_contact_subscription_dtl.elements.name_first.enabled = true;
	
	var vRec = forms.sb_contact_subscription_dtl.foundset.getRecord(forms.sb_contact_subscription_dtl.foundset.newRecord());
	vRec.sb_subscription_id = sb_subscription_id
	vRec.renew = foundset.is_recurring;
	vRec.amount = 1
	vRec.activated = 1
	var _ExpireDate = new Date();
	_ExpireDate.setDate(_ExpireDate.getDate() +  valid_for);
	vRec.valid_till  = _ExpireDate;
	
	//application.showFormInDialog( forms[vDialogForm],  -1, -1, -1, -1, 'i18n:CVB.dialog.contact_details', false, false, 'details')
	//SMM 20-05-2011
	var vForm = application.createWindow('details', JSWindow.MODAL_DIALOG);
	vForm.title = 'i18n:CVB.dialog.contact_details';
	vForm.setInitialBounds(-1, -1, -1, -1);
	vForm.show(forms.sb_contact_subscription_dtl);
	
}

/**
 * @properties={typeid:24,uuid:"827A8C61-6D41-4EC1-9BCF-BCBC621BF177"}
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
 * @properties={typeid:24,uuid:"F84E8604-266B-4879-8448-92C377F8DD94"}
 */
function FORM_onShow() {
	if (globals.sb_gCurrentGroupCode > 2) {
		elements.btn_new_contact.visible = false
	}
}

/**
 * @properties={typeid:24,uuid:"9450B6AD-18BA-420E-BB92-1002EE368D36"}
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

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DB590236-87FB-484E-B27A-5D3F3F6153D9"}
 * @AllowToRunInFind
 */
function onRecordSelection(event) {
	if(sb_subscriptions_to_sb_subscription_to_contact.find())
	{
		if(fv_search != null) {
			var vSearch = fv_search.split(' ');
			for(var i in vSearch) {
				sb_subscriptions_to_sb_subscription_to_contact.newRecord();
				if(fv_showDeactive == 0) sb_subscriptions_to_sb_subscription_to_contact.activated = 1;
				sb_subscriptions_to_sb_subscription_to_contact.sb_subscription_to_contact_to_sb_contact.name_first = "#%" + vSearch[i] + "%"
				sb_subscriptions_to_sb_subscription_to_contact.newRecord();
				if(fv_showDeactive == 0) sb_subscriptions_to_sb_subscription_to_contact.activated = 1;
				sb_subscriptions_to_sb_subscription_to_contact.sb_subscription_to_contact_to_sb_contact.name_last = "#%" + vSearch[i] + "%"
				sb_subscriptions_to_sb_subscription_to_contact.newRecord();
				if(fv_showDeactive == 0) sb_subscriptions_to_sb_subscription_to_contact.activated = 1;
				sb_subscriptions_to_sb_subscription_to_contact.sb_subscription_to_contact_to_sb_contact.contact_email = "#%" + vSearch[i] + "%"				
				
				// Voucher
				sb_subscriptions_to_sb_subscription_to_contact.newRecord();
				if(fv_showDeactive == 0) sb_subscriptions_to_sb_subscription_to_contact.activated = 1;
				sb_subscriptions_to_sb_subscription_to_contact.voucher_code = "#%" + vSearch[i] + "%";
			}
		} else if(fv_showDeactive == 0)
		{
			sb_subscriptions_to_sb_subscription_to_contact.activated = 1;
		}
		
		
		var vCount = sb_subscriptions_to_sb_subscription_to_contact.search()
	}
	totalUsers = databaseManager.getFoundSetCount(foundset.sb_subscriptions_to_sb_subscription_to_contact);
	
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
 * @properties={typeid:24,uuid:"4435EB42-0CED-4F72-AB18-B39CC8BC844D"}
 */
function onDataChange(oldValue, newValue, event) {
	onRecordSelection(event)
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"ACF0DAE3-610D-4EEC-B625-0B439A24D0C7"}
 */
function BTN_exportSubscribers(event) {
	// Booyah!
	if(vSaveLocation = plugins.file.showFileSaveDialog()) {
		var vExport = foundset.name;
		// Voornaam, Achternaam, 
		vExport += "Voornaam;Achternaam;Straat en huisnr;Postcode;Woonplaats;Land;Email adres;Telefoon;Geldig tot;Licenties;Hernieuwen;Actief;Aanmeld Datum;Aanmeld Tijd;Voucher Code\n";
		var vRec, vExportArray;
		for(var i = 1; i <= foundset.sb_subscriptions_to_sb_subscription_to_contact.getSize(); i++) {
			vRec = foundset.sb_subscriptions_to_sb_subscription_to_contact.getRecord(i);
			vExportArray = [
				vRec.sb_subscription_to_contact_to_sb_contact.name_first,
				vRec.sb_subscription_to_contact_to_sb_contact.name_last,
				((utils.hasRecords(vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address))?vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address.street + " " + vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address.house_nr + vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address.house_nr_addition:"Onbekend"),
				((utils.hasRecords(vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address))?vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address.zipcode:"Onbekend"),
				((utils.hasRecords(vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address))?vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address.city:"Onbekend"),
				((utils.hasRecords(vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address))?vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address.country:"Onbekend"),
				vRec.sb_subscription_to_contact_to_sb_contact.contact_email,
				((utils.hasRecords(vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address))?vRec.sb_subscription_to_contact_to_sb_contact.sb_contact_to_sb_contact_address.phone:"Onbekend"),				
				utils.dateFormat(vRec.valid_till, 'dd-MM-yyyy'),
				vRec.amount,
				(vRec.renew==1)?"Ja":"Nee",
				(vRec.activated==1)?"Ja":"Nee",
				utils.dateFormat(vRec.sb_subscription_to_contact_to_sb_contact.creationdate, 'dd-MM-yyyy'),
				utils.dateFormat(vRec.sb_subscription_to_contact_to_sb_contact.creationdate, 'HH:mm:ss'),
				(vRec.voucher_code)?vRec.voucher_code:""
			];
			vExport += vExportArray.join(";")+"\n";	
			delete vExportArray;
		}
		plugins.file.writeTXTFile(vSaveLocation,vExport);
		plugins.dialogs.showInfoDialog("Melding","Export klaar, locatie : " + vSaveLocation, "Ok");
		delete vExport;
	}
}
