/**
 * @properties={typeid:35,uuid:"4880178B-E612-4086-99B6-039BC11543C5",variableType:-4}
 */
var v_reg_type = scopes.StudyBible.REGISTRATION_TYPES.DEFAULT;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FBF7BE4C-BE02-4047-9388-FA19688F3D13"}
 */
var v_html= "";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0D6B012E-FAF2-4757-8035-69CFBEA2349F"}
 */
var v_salution = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C67A4058-E4D5-4EBC-B023-08500657F6D7"}
 */
var v_firstname = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"88F66998-AC49-4FE1-A334-AE81CBD7F86B"}
 */
var v_lastname = '';

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"0EA30E7D-FFC4-4F97-A935-7E6CF20792B5",variableType:93}
 */
var v_birthdate;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C7A3E230-15FB-49F3-B347-E5D9AD80CF25"}
 */
var v_street = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3B8691C2-E2DB-4317-A166-E54A60D21FC6"}
 */
var v_zipcode = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B07DCBAA-536F-424B-9E7D-C7D0EFA29069"}
 */
var v_city = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"27C36915-9F5B-4835-9E28-1992CED389FE"}
 */
var v_country = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8E971103-5BAD-4374-8E4F-3E434A5414A3"}
 */
var v_email = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F3DCE0F9-2834-40CA-AFB3-564ED4BBEF3D"}
 */
var v_phone = '';

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"3B1EF2CA-FCF0-44B6-92BD-61BEAA40B712"}
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
 * @properties={typeid:24,uuid:"0D45F06C-BBD1-43D9-8192-918D414EF390"}
 */
function EVENT_onShow(firstShow, event) {

	
	//elements.salutation.requestFocus();
	
	// Default stuff first
	v_html = "<html><body>\
	<table>\
	<tr>\
		<td>" + i18n.getI18NMessage("cvb.lbl.salutation") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_salution + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.firstname") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_firstname + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.lastname") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_lastname + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.birthdate") + ":</td>\
		<td>" + utils.dateFormat(forms.web_sb_login_register_sub_frm.v_birthdate, "dd-MM-yyyy") + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.address") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_street + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.zipcode") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_zipcode + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.city") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_city + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.country") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_country + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.email") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_email + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.phone") + ":</td>\
		<td>" + forms.web_sb_login_register_sub_frm.v_phone + "</td>\
	</tr>";
	
	if(forms.web_sb_login_register_sub_frm.v_reg_type == scopes.StudyBible.REGISTRATION_TYPES.STUDENT) {
		// Student, extra information needed!
		v_html += "<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.studentnr") + ":</td>\
		<td>" + forms.web_sb_login_register_student_sub_frm.v_studentnr + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.institute") + ":</td>\
		<td>" + forms.web_sb_login_register_student_sub_frm.v_institute + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.education") + ":</td>\
		<td>" + forms.web_sb_login_register_student_sub_frm.v_education + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.start_date") + ":</td>\
		<td>" + utils.dateFormat(forms.web_sb_login_register_student_sub_frm.v_startdate, 'dd-MM-yyyy') + "</td>\
	</tr>\
	<tr>\
		<td>" + i18n.getI18NMessage("i18n:CVB.lbl.expected_enddate") + ":</td>\
		<td>" + utils.dateFormat(forms.web_sb_login_register_student_sub_frm.v_stopdate, 'dd-MM-yyyy') + "</td>\
	</tr>";
	}
	
	v_html += "</table>\
	\</body></html>";
	
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"9053D955-0072-4DD4-95DC-7316A3588286"}
 */
function SetStyles() {
	plugins.WebClientUtils.setExtraCssClass(elements.el_container, "cvb-login-form");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_login, "cvb-login-button cvb-login-button-green");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_back, "cvb-login-button cvb-login-button-transparent");

//	plugins.WebClientUtils.setExtraCssClass(elements.txt_head, "cvb-login-txt-head");

	plugins.WebClientUtils.setExtraCssClass(elements.portal, "cvb-register-portal");
	
	plugins.WebClientUtils.setExtraCssClass(elements.txt_container,"cvb-login-txt-container");
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
 * @properties={typeid:24,uuid:"032050D3-A456-46A3-83D2-E57070F8C1FF"}
 */
function BTN_register(event) {
	forms.web_sb_login_frm.elements.tabless.tabIndex = 8;
}

/**
 * @properties={typeid:24,uuid:"F14C30A9-24C3-4B5F-8ADE-6A8A131F8C48"}
 */
function EVENT_validateForm() {
	var vErrors = 0;
	
	var vElements = ['firstname', 'lastname', 'address', 'zipcode', 'city', 'phone', 'email', 'country'];
	var vFields = ['v_firstname', 'v_lastname', 'v_street', 'v_zipcode', 'v_city', 'v_phone', 'v_email', 'v_country'];
	
	for(var i in vElements) {
		if(forms.web_sb_login_register_sub_frm[vFields[i]] == "" || forms.web_sb_login_register_sub_frm[vFields[i]] == null) {
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
 * @properties={typeid:24,uuid:"EC36B0DF-3E7D-40D4-89D5-975B3CDF1671"}
 */
function BTN_back(event) {
	forms.web_sb_login_frm.elements.tabless.tabIndex = 7;
}
