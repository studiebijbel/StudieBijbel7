/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"C4378B3A-BEA2-42F5-B51D-1AF33F0548B0"}
 */
function EVENT_onLoad(event) {
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.cvb_logo_nl.visible = false;
		elements.cvb_logo_es.visible = true;
	}
}/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E7EE0CB0-65F6-402E-BCC7-3C8BC58F5FB9"}
 */
var v_email = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DFB0B2E7-4475-4BA9-B6F0-0F8A56F6866E"}
 */
var v_price = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"4E641088-2E64-432A-BF63-3B5D172EF001",variableType:4}
 */
var v_confirm = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"95B6D7C2-206C-4481-B91C-0D3E8B4B6A2B"}
 */
var v_iban = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"18E1F7BA-07C2-4A1E-8A6A-E06FCC042FA6"}
 */
var v_cardholder = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2BE83B96-1BC2-413A-A2CA-815493D11F51"}
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
 * @properties={typeid:24,uuid:"D38D371F-5CA9-49E1-B977-A4317695ADC3"}
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
 * @properties={typeid:24,uuid:"E3A3CE26-178D-42C5-A1B9-4C444275905B"}
 */
function BTN_register(event) {
	// First check if the mailadress does exist!
	var vSQL = "SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?";
	var vFS = databaseManager.getFoundSet("sb_data", "sb_contact");
	vFS.loadRecords(vSQL, [v_email]);
	
	if(vFS.getSize() == 1) {
		var SB = new scopes.StudyBible.StudieBijbel();
		SB.LostPassword(v_email);
		globals.DIALOGS.showInfoDialog("Info", "i18n:cvb.message.passwordForgetInstructions", "Ok");
		forms.web_sb_login_frm.EVENT_changeTab('login');
	} else {
		globals.DIALOGS.showErrorDialog("i18n:cvb.message.error","i18n:cvb.message.noSuchEmailaddress", "Ok");
	}
}

/**
 * @properties={typeid:24,uuid:"8FB946A7-A45E-4F6E-B513-1A54DADE90C2"}
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
