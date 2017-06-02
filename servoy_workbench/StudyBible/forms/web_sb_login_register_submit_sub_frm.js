/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ABD39171-E736-48AF-9656-9F2BAEA7F18C"}
 */
var v_knowus;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AD2C4864-F7D3-4C83-947A-6696BCB3AD1D"}
 */
var v_remarks;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3D78A215-94B5-4335-9972-6C53F0ABD80D"}
 */
var v_voucher;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E0045529-C609-4D33-B0E5-D909680E0134",variableType:4}
 */
var v_accept_terms = 0;
/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"52FF1B00-FF2B-4F1A-B060-EAFE0CCC80F3",variableType:4}
 */
var v_subscribe_newsletter = 0;


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"2FEBAFAB-4723-4331-9259-0BCA8697CFCF"}
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
 * @properties={typeid:24,uuid:"75190DA5-18BA-4C12-B976-A8004F7C6840"}
 */
function EVENT_onShow(firstShow, event) {

	
	elements.knowus.requestFocus();
		
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"7500BEB6-85F5-4005-AB69-FD2F3882BB46"}
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
	
	plugins.WebClientUtils.setExtraCssClass(elements.voucher_info,"cvb-voucher-info");
	plugins.WebClientUtils.setExtraCssClass(elements.terms_info, "cvb-voucher-info");
	plugins.WebClientUtils.setExtraCssClass(elements.terms_container, "cvb-terms-container");
	
	plugins.WebClientUtils.setExtraCssClass(elements.i_agree,"cvb-agreement-label");
	plugins.WebClientUtils.setExtraCssClass(elements.subscribe,"cvb-agreement-label");
	
//	plugins.WebClientUtils.setExtraCssClass(elements.btn_lostpassword, "cvb-login-lostpassword");
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1D61C933-E637-433F-BFFB-72BA65449335"}
 */
function BTN_register(event) {
	if(!EVENT_validateForm()) {
		// Show error :-)
		scopes.tools.output("Validation failed");
	} else {
		// Validated
		scopes.tools.output("Validation passed");

		// All registration stuff validated...
		// Lets do the registration
		var SB = new scopes.StudyBible.StudieBijbel();
		
		var vRegisterObject = {
			User: {
				Email: forms.web_sb_login_register_sub_frm.v_email,
				FirstName: forms.web_sb_login_register_sub_frm.v_firstname,
				SurName: forms.web_sb_login_register_sub_frm.v_lastname,
				Notes: v_remarks,
				Marketing: v_knowus,
				Salutation: forms.web_sb_login_register_sub_frm.v_salution,
				Birthdate: forms.web_sb_login_register_sub_frm.v_birthdate
			},
			Address: {
				Street: forms.web_sb_login_register_sub_frm.v_street,
				HouseNR: '',
				HouseNRAdd: '',
				City: forms.web_sb_login_register_sub_frm.v_city,
				Zipcode: forms.web_sb_login_register_sub_frm.v_zipcode,
				Country: forms.web_sb_login_register_sub_frm.v_country,
				Phone: forms.web_sb_login_register_sub_frm.v_phone
			},
			Subscription: true
		};
		
		if(v_voucher) {
			vRegisterObject.Voucher = {Code: v_voucher};
		}
		
		if(forms.web_sb_login_select_register_type_sub_frm.v_reg_type == scopes.StudyBible.REGISTRATION_TYPES.STUDENT) {
			vRegisterObject.Education = {
				StudentNR: forms.web_sb_login_register_student_sub_frm.v_studentnr,
				Institude: forms.web_sb_login_register_student_sub_frm.v_institute,
				EducationName: forms.web_sb_login_register_student_sub_frm.v_education,
				StartsOn: utils.dateFormat(forms.web_sb_login_register_student_sub_frm.v_startdate, "DD-MM-YYYY"),
				StopsOn: utils.dateFormat(forms.web_sb_login_register_student_sub_frm.v_stopdate, "DD-MM-YYYY")
			}
		}
		
		/** @type {*} */
		var vResponse = SB.Register(vRegisterObject);
		
		// Handle the responses!
		if(vResponse.status == 200)
		{
			forms.web_sb_login_message_frm.v_title = "Dank voor het registreren!";
			forms.web_sb_login_message_frm.v_message = "<html><body>Je accountgegevens worden<br />spoedig per email toegestuurd.</html></body>";
			
			forms.web_sb_login_message_frm.v_callback = function () {
				forms.web_sb_login_sub_frm.v_username = globals.sb_gLoginName;
				forms.web_sb_login_sub_frm.v_password = globals.sb_gPassword;
				globals.sb_SEC_login();
			}
			forms.web_sb_login_frm.elements.tabless.tabIndex = 9;
			// Registration completed
		} else {
			// Error handling!
			plugins.dialogs.showErrorDialog(vResponse.status, "Error occured during registration, please try again!");
			forms.web_sb_login_frm.elements.tabless.tabIndex = 2;
		}
		
		return;
	}
}

/**
 * @properties={typeid:24,uuid:"501DEBE8-8C9C-49A3-AC92-3459CC6C36D1"}
 */
function EVENT_validateForm() {
	var vErrors = 0;
	
	var vElements = ['knowus', 'v_accept_terms'];
	var vFields = ['v_knowus', 'v_accept_terms'];
	
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
 * @properties={typeid:24,uuid:"8A68AD6B-D43D-42F3-9606-2BBB8447AB0D"}
 */
function BTN_back(event) {
	forms.web_sb_login_frm.elements.tabless.tabIndex = 2;
}

/**
 * Handle changed data.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"FB971455-EA66-412A-B6AC-B0B6C4CAA4EF"}
 */
function onDataChange(oldValue, newValue, event) {
	if(newValue === -1) {
		elements[event.getElementName()].fgcolor = "#777777";
	} else {
		elements[event.getElementName()].fgcolor = "#000000";
	}
	
	return true
}
