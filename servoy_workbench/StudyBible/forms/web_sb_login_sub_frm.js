/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D5357929-557C-44AE-A503-9ABD87C8D182",variableType:4}
 */
var fv_savePassword = 0;

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"9127A8BF-F30B-4CED-AAB3-C06551DABFE4"}
 */
var v_organisation = null;

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"2CA7C9FB-E1D2-410C-B6C9-80C12D058BAA"}
 */
var v_username = null;

/**
 * @type {String}
 *
 *
 * @properties={typeid:35,uuid:"9E2940E1-97D8-4D70-A1F4-2714FC6C170D"}
 */
var v_password = null;



/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"497C6666-C6CC-4197-85FD-DE5B568AA73E"}
 */
function EVENT_onShow(firstShow, event) {
	v_username = application.getUserProperty('cvb_username')
	v_password = application.getUserProperty('cvb_password');
	fv_savePassword = (application.getUserProperty('cvb_password')?1:0);
	
	if(fv_savePassword) {
		plugins.WebClientUtils.removeExtraCssClass(elements.btn_remindme);
		plugins.WebClientUtils.setExtraCssClass(elements.btn_remindme, "cvb-remindme cvb-password-saved");
	} else {
		plugins.WebClientUtils.removeExtraCssClass(elements.btn_remindme);
		plugins.WebClientUtils.setExtraCssClass(elements.btn_remindme, "cvb-remindme cvb-password-unknown");
	}
	
	elements.password.requestFocus();
	elements.username.requestFocus();
	
	if(v_username) {
		elements.password.requestFocus();
	} 
	
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"CA6BC072-5977-4E3A-B9A1-A99BF05540E9"}
 */
function SetStyles() {
//	plugins.WebClientUtils.setExtraCssClass(elements.el_container, "cvb-login-form");
	
	plugins.WebClientUtils.setExtraCssClass(elements.infoblock,"cvb-new-login-block cvb-new-login-info");
	plugins.WebClientUtils.setExtraCssClass(elements.el_container,"cvb-new-login-block cvb-new-login-content");
	
	plugins.WebClientUtils.setExtraCssClass(elements.btn_login, "cvb-login-button cvb-login-button-blue");
	
	plugins.WebClientUtils.setExtraCssClass(elements.txt_head, "cvb-login-txt-head");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_container,"cvb-login-txt-container");
	plugins.WebClientUtils.setExtraCssClass(elements.username,"cvb-login-input cvb-login-input-first");
	plugins.WebClientUtils.setExtraCssClass(elements.password,"cvb-login-input cvb-login-input-last");
//	plugins.WebClientUtils.setExtraCssClass(elements.organisation,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_copyright,"cvb-login-footer");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_version,"cvb-login-footer");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_lostpassword, "cvb-login-lostpassword");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_register, "cvb-login-button cvb-login-button-green");
	plugins.WebClientUtils.setExtraCssClass(elements.noaccount,"cvb-no-account");

}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BE3E990B-507C-4EA8-A043-A9CC1767BED3"}
 */
function BTN_login(event) {
	if(fv_savePassword) {
		application.setUserProperty('cvb_password', v_password);
	} else {
		application.setUserProperty('cvb_password', null);
	}
	
	scopes.tools.output("Login method fired...");
	globals.sb_SEC_login();
	scopes.tools.output("Login method done?!");
}

/**
 * @properties={typeid:24,uuid:"C2F2943C-A025-4A2E-9886-DD311FB7671E"}
 */
function OpenRegister() {
	forms.web_sb_login_frm.elements.tabless.tabIndex = 5;
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C83AC62A-D533-4141-A1BC-ED8C7FEFF41E"}
 */
function BTN_forgotPassword(event) {
	//application.showURL("https://www.studiebijbel.nl/wachtwoord-vergeten/", "_blank");
	forms.web_sb_login_frm.EVENT_changeTab('forgot');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3B012339-C64B-450B-AE53-996D06F04C14"}
 */
function BTN_savePassword(event) {
	if(fv_savePassword) {
		fv_savePassword = 0;
		plugins.WebClientUtils.removeExtraCssClass(elements.btn_remindme);
		plugins.WebClientUtils.setExtraCssClass(elements.btn_remindme, "cvb-remindme cvb-password-unknown");
	} else {
		fv_savePassword = 1;
		plugins.WebClientUtils.removeExtraCssClass(elements.btn_remindme);
		plugins.WebClientUtils.setExtraCssClass(elements.btn_remindme, "cvb-remindme cvb-password-saved");
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DB54424B-9640-4F7B-8392-7DAEFA74D26A"}
 */
function EVENT_onLoad(event) {
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.cvb_logo_nl.visible = false;
		elements.cvb_logo_es.visible = true;
	}
}
