
/**
 * @properties={typeid:35,uuid:"87105460-D360-480F-8DC3-8D5CF2024DF5",variableType:-4}
 * @type {*}
 */
var v_callback;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"427976BE-816B-4856-9A64-E25DFBCF3D00"}
 */
var v_title;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F36C8406-1232-4B7E-960B-AA6153092115"}
 */
var v_message;

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"7E042890-1DF3-4E42-A03B-4F132F2B4DAE"}
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
 * @properties={typeid:24,uuid:"D2F1EAFC-A584-44F7-B010-EA68E04DD651"}
 */
function EVENT_onShow(firstShow, event) {

	
	//elements.knowus.requestFocus();
		
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"9BDFEF09-0374-48C3-A98C-7190E5BAD687"}
 */
function SetStyles() {
	plugins.WebClientUtils.setExtraCssClass(elements.btn_login, "cvb-login-button cvb-login-button-green");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_back, "cvb-login-button cvb-login-button-transparent");

//	plugins.WebClientUtils.setExtraCssClass(elements.txt_head, "cvb-login-txt-head");
	plugins.WebClientUtils.setExtraCssClass(elements.knowus,"cvb-login-input cvb-login-input-first");
	plugins.WebClientUtils.setExtraCssClass(elements.remarks,"cvb-login-input cvb-login-input-last");
	plugins.WebClientUtils.setExtraCssClass(elements.voucher,"cvb-login-input cvb-login-input-first cvb-login-input-last");
	
//	plugins.WebClientUtils.setExtraCssClass(elements.password,"cvb-login-input");
//	plugins.WebClientUtils.setExtraCssClass(elements.organisation,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_copyright,"cvb-login-footer");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_version,"cvb-login-footer");
	
	plugins.WebClientUtils.setExtraCssClass(elements.infoblock,"cvb-new-login-block cvb-new-login-info");
	plugins.WebClientUtils.setExtraCssClass(elements.contentblock,"cvb-new-login-block cvb-new-login-content");
	
	
	
//	plugins.WebClientUtils.setExtraCssClass(elements.btn_lostpassword, "cvb-login-lostpassword");
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A18BFBD7-6291-4542-8191-5EB27427C681"}
 */
function BTN_action(event) {
	if(!v_callback) {
		application.output('Not implemetned!');
		return false;
	}
	v_callback();
	return true;
}

/**
 * @properties={typeid:24,uuid:"7440DC14-BB04-4E04-AF37-6DF300011B2A"}
 */
function EVENT_validateForm() {
	var vErrors = 0;
	
	var vElements = ['knowus'];
	var vFields = ['v_knowus'];
	
	for(var i in vElements) {
		if(forms.web_sb_login_register_submit_sub_frm[vFields[i]] == "" || forms.web_sb_login_register_submit_sub_frm[vFields[i]] == null) {
			vErrors++;
			plugins.WebClientUtils.setExtraCssClass(elements[vElements[i]], 'cvb-login-input field-error');
		} else {
			plugins.WebClientUtils.removeCssReference(elements[vElements[i]]);
			plugins.WebClientUtils.setExtraCssClass(elements[vElements[i]], 'cvb-login-input');
		}
	}
	
	return (vErrors==0)?true:false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DC0E1DCF-0DBB-4549-A1E6-E6791916DF2A"}
 */
function BTN_back(event) {
	forms.web_sb_login_frm.elements.tabless.tabIndex = 2;
}
