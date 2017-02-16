/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"8439B541-EA49-4327-A036-7BDEDA32D73C"}
 */
function EVENT_onLoad(event) {
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.cvb_logo_nl.visible = false;
		elements.cvb_logo_es.visible = true;
	}
}/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"18CDA798-C11E-49DF-95C8-994FA86C2021"}
 */
var v_price = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1231CD5C-E8BC-4D76-A857-3AA63110EE90",variableType:4}
 */
var v_confirm = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D7D0FF49-0AF2-4BF8-917E-158C8573B6EF"}
 */
var v_iban = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"87B9D932-71E3-438A-81B9-45B60FA92D7F"}
 */
var v_cardholder = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EE9142CC-0A39-4627-A6B5-85356F133580"}
 */
function EVENT_onShow(firstShow, event) {

	
	elements.iban.requestFocus();

	/** @type {JSFoundSet<db:/sb_data/sb_subscriptions>} */
	var vFS = databaseManager.getFoundSet('sb_data', 'sb_subscriptions');
	vFS.loadRecords("SELECT sb_subscription_id FROM sb_subscriptions WHERE token = ?", ['sb_abonnement']);
	
	/** @type {JSFoundSet<db:/sb_data/sb_subscriptions>} */
	var vRecord = vFS.getRecord(1);
	
	v_price = utils.numberFormat(vRecord.price,"#.00");
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"9A36B498-E3B5-4D68-9D42-69F5C5C70762"}
 */
function SetStyles() {
	plugins.WebClientUtils.setExtraCssClass(elements.el_container, "cvb-login-form");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_login, "cvb-login-button");
//	plugins.WebClientUtils.setExtraCssClass(elements.txt_head, "cvb-login-txt-head");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_container,"cvb-login-txt-container");
	plugins.WebClientUtils.setExtraCssClass(elements.iban,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.cardholder,"cvb-login-input");

//	plugins.WebClientUtils.setExtraCssClass(elements.password,"cvb-login-input");
//	plugins.WebClientUtils.setExtraCssClass(elements.organisation,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_copyright,"cvb-login-footer");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_version,"cvb-login-footer");
//	plugins.WebClientUtils.setExtraCssClass(elements.btn_lostpassword, "cvb-login-lostpassword");
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"37981226-A952-4A17-8F17-18BED99A92B8"}
 */
function BTN_register(event) {
	if(!EVENT_validateForm()) {
		// Show error :-)
		scopes.tools.output("Validation failed");
	} else {
		/** @type {JSFoundSet<db:/sb_data/sb_contact>} */
		var vFS = databaseManager.getFoundSet("sb_data", "sb_contact");
		vFS.loadRecords("SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?", [globals.sb_gCurrentUserID]);
		var vRecord;
		if(vFS.getSize() == 1){
			// Yeey we have the record!
			if(!utils.hasRecords(vFS.sb_contact_to_sb_contact_payment)) {
				vRecord = vFS.sb_contact_to_sb_contact_payment.getRecord(vFS.sb_contact_to_sb_contact_payment.newRecord());
			} else {
				vRecord = vFS.sb_contact_to_sb_contact_payment.getRecord(1);
			}
			
			vRecord.iban = v_iban;
			vRecord.cardholder = v_cardholder;
			vRecord.is_active = 1;
			
			forms.web_sb_form.controller.show();
		}
	}
}

/**
 * @properties={typeid:24,uuid:"838C33D7-51D0-440D-81DD-D6C7C8E26C43"}
 */
function EVENT_validateForm() {
	var vErrors = 0;
	
	var vElements = ['iban', 'cardholder', 'confirm'];
	var vFields = ['v_iban', 'v_cardholder', 'v_confirm'];
	
	for(var i in vElements) {
		if(forms.web_sb_login_iban_form[vFields[i]] == "" || forms.web_sb_login_iban_form[vFields[i]] == null) {
			vErrors++;
			plugins.WebClientUtils.setExtraCssClass(elements[vElements[i]], 'cvb-login-input field-error');
		} else {
			plugins.WebClientUtils.removeCssReference(elements[vElements[i]]);
			plugins.WebClientUtils.setExtraCssClass(elements[vElements[i]], 'cvb-login-input');
		}
	}
	
	return (vErrors==0)?true:false;
}
