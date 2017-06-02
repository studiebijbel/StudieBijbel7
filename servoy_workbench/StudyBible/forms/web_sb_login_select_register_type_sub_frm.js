/**
 * @properties={typeid:35,uuid:"F4ED4529-5F96-4E07-9587-6921DB7DA5A9",variableType:-4}
 */
var v_reg_type = scopes.StudyBible.REGISTRATION_TYPES.DEFAULT;

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"EACCF76D-BFCD-4C1C-95D7-AA3CD3E843ED"}
 */
function EVENT_onLoad(event) {
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.cvb_logo_nl.visible = false;
		elements.cvb_logo_es.visible = true;
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2C985EBF-203C-4EBB-BE96-74E08E774022"}
 */
function EVENT_onShow(firstShow, event) {

	
//	elements.firstname.requestFocus();
	
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.group_student.visible = false;
	}
	
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"621B81CD-6DCD-4CBC-A28D-9F7E4D603B14"}
 */
function SetStyles() {
	plugins.WebClientUtils.setExtraCssClass(elements.el_container, "cvb-login-form");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_login, "cvb-login-button cvb-login-button-green");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_particulier,"cvb-login-button cvb-login-button-blue")
	plugins.WebClientUtils.setExtraCssClass(elements.btn_back, "cvb-login-button cvb-login-button-transparent");

//	plugins.WebClientUtils.setExtraCssClass(elements.txt_head, "cvb-login-txt-head");
	/*plugins.WebClientUtils.setExtraCssClass(elements.txt_container,"cvb-login-txt-container");
	plugins.WebClientUtils.setExtraCssClass(elements.salutation,"cvb-login-input cvb-login-input-first");
	plugins.WebClientUtils.setExtraCssClass(elements.firstname,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.lastname,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.address,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.zipcode,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.city,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.birthdate,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.country,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.phone,"cvb-login-input cvb-login-input-last");
	plugins.WebClientUtils.setExtraCssClass(elements.email,"cvb-login-input");
*/	
//	plugins.WebClientUtils.setExtraCssClass(elements.password,"cvb-login-input");
//	plugins.WebClientUtils.setExtraCssClass(elements.organisation,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_copyright,"cvb-login-footer");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_version,"cvb-login-footer");
	
	plugins.WebClientUtils.setExtraCssClass(elements.infoblock,"cvb-new-login-block cvb-new-login-info");
	plugins.WebClientUtils.setExtraCssClass(elements.contentblock,"cvb-new-login-block cvb-new-login-content");
	
	
	plugins.WebClientUtils.setExtraCssClass(elements.register_customer,"cvb-no-account");
	plugins.WebClientUtils.setExtraCssClass(elements.register_student,"cvb-no-account");

	
//	plugins.WebClientUtils.setExtraCssClass(elements.btn_lostpassword, "cvb-login-lostpassword");
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C41D6644-3146-4E4D-B310-4984BF7A41F4"}
 */
function BTN_back(event) {
	forms.web_sb_login_frm.elements.tabless.tabIndex = 1;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Integer} registration_type
 *
 *
 * @properties={typeid:24,uuid:"800B88D2-DC06-4CBB-A60A-BB960DA3C38F"}
 */
function BTN_registerType(event, registration_type) {
	forms.web_sb_login_register_sub_frm.v_reg_type = registration_type;
	forms.web_sb_login_frm.elements.tabless.tabIndex = 2;
}
