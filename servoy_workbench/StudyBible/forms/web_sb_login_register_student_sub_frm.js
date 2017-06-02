/**
 * @properties={typeid:35,uuid:"6FF7D08B-627D-4732-8C47-68975B1A2865",variableType:-4}
 */
var v_reg_type = scopes.StudyBible.REGISTRATION_TYPES.DEFAULT;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A6C4C0DC-8653-4870-B214-7931193BE1E3"}
 */
var v_studentnr;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"553D728C-A0C4-4C93-BFDC-32AE6DED4D99"}
 */
var v_institute;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E40312A5-97C4-42ED-B5D8-616BAFB000E0"}
 */
var v_education;
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"C40B5CE9-7C13-4004-8FE6-E6B444C2E270",variableType:93}
 */
var v_startdate;
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"F15CC4F5-E33F-4C31-A788-ACD85B534B6C",variableType:93}
 */
var v_stopdate;

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"39C5BAB8-DBB8-43D8-A6A6-AF521F667A29"}
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
 * @properties={typeid:24,uuid:"3D5701B2-38EC-4F0D-973C-8144F2FB6C07"}
 */
function EVENT_onShow(firstShow, event) {

	
	elements.studentnr.requestFocus();
		
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"F18F2CF4-28C2-4A9F-A893-DD8B85DAC82E"}
 */
function SetStyles() {
	plugins.WebClientUtils.setExtraCssClass(elements.btn_login, "cvb-login-button cvb-login-button-green");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_back, "cvb-login-button cvb-login-button-transparent");

//	plugins.WebClientUtils.setExtraCssClass(elements.txt_head, "cvb-login-txt-head");
	plugins.WebClientUtils.setExtraCssClass(elements.studentnr,"cvb-login-input cvb-login-input-first");
	plugins.WebClientUtils.setExtraCssClass(elements.school,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.opleiding,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.startdate,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.enddate,"cvb-login-input cvb-login-input-last");
	
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
 * @properties={typeid:24,uuid:"168B469C-1437-4EC0-974B-C80D62054F31"}
 */
function BTN_register(event) {
	if(!EVENT_validateForm()) {
		// Show error :-)
		scopes.tools.output("Validation failed");
	} else {
		// Validated
		scopes.tools.output("Validation passed");
		
		// Pass all the data to an new screen... Or... We just might link the info
		forms.web_sb_login_frm.elements.tabless.tabIndex = 7;
		
		return;
		// CANCEL ALL CODE BELOW
		
		var vEmail = 'info@studiebijbel.nl';
		var emailSend;
	
		if(globals.sb_APP_getServerLang() == 'ESP')
		{
			emailSend = 'info@studiebijbel.nl';
		} else {
			emailSend = 'info@studiebijbel.nl';
		}
		
	//	emailSend = "internetdiensten@directict.nl";
		
		var emailFrom = vEmail;


		emailSubject = "Uw aanmelding bij StudieBijbel.nl";
		var emailMsg = 'Geachte ' + v_firstname + ' ' + v_lastname + ',\n\n\
We hebben uw aanmelding voor uw proefperiode van StudieBijbel.nl in goede orde ontvangen.\n\n\
Hieronder de gegevens die u aan ons heeft doorgegeven:\n\n\
Voornaam:    ' + v_firstname + '\n\
Achternaam:    ' + v_lastname + '\n\
Adres:    ' + v_address + '\n\
Postcode + plaats:    ' + v_zipcode + ' ' + v_city + '\n\
Telefoonnummer:    ' + v_phone + '\n\
Email adres:    ' + v_email + '\n\n\
Mocht deze gegevens incorrect zijn wilt u dan zo vriendelijk zijn om dit per mail door te geven aan ons?\n\n\
Wij zullen uw aanvraag binnen 24 uur in behandeling nemen.\n\
\n\n\
Met vriendelijke groet,\n\
StudieBijbel.nl\n\n\
Dit is een geautomatiseerd email bericht en is afkomstig van de StudieBijbel.nl applicatie.';
		
		var vMailOK = plugins.mail.sendMail(v_email, emailFrom+","+emailFrom, emailSubject, emailMsg, null, emailSend, null, null );
	
		if(globals.DIALOGS.showInfoDialog("Registratie gelukt", "Uw registratie is in goede orde ontvangen, u ontvangt zo snel mogelijk een reactie van ons.", "OK")) {
			forms.web_sb_login_frm.EVENT_changeTab('login');
		}
		
	}
}

/**
 * @properties={typeid:24,uuid:"1FDF39BD-B534-42AE-92CD-DAFAFB3CC9CD"}
 */
function EVENT_validateForm() {
	var vErrors = 0;
	
	var vElements = ['studentnr', 'school', 'opleiding', 'startdate', 'enddate'];
	var vFields = ['v_studentnr', 'v_institute', 'v_education', 'v_startdate', 'v_stopdate'];
	
	for(var i in vElements) {
		if(forms.web_sb_login_register_student_sub_frm[vFields[i]] == "" || forms.web_sb_login_register_student_sub_frm[vFields[i]] == null) {
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
 * @properties={typeid:24,uuid:"6AAEDAC1-F55A-4A82-99AB-0DA6E9A127B8"}
 */
function BTN_back(event) {
	forms.web_sb_login_frm.elements.tabless.tabIndex = 2;
}
