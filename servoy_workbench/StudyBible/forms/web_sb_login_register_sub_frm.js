/**
 * @properties={typeid:35,uuid:"3ED2EC0C-0FBD-429F-A315-E4F8DFC093EC",variableType:-4}
 */
var v_reg_type = scopes.StudyBible.REGISTRATION_TYPES.DEFAULT;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"29FEFA68-5DEE-43E2-B3E3-07644FD18AE7",variableType:4}
 */
var v_salution = -1;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E7BE0F12-D78F-4E03-83E3-37B2B04BD5CD"}
 */
var v_firstname;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6A1D908B-563B-40F0-A2CA-D1A4F03B27E9"}
 */
var v_lastname;
/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"616BDB65-F0DA-4C65-ADA8-BB23B9826D0D",variableType:93}
 */
var v_birthdate;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4913C5DD-50F0-4692-A4EF-28BDA0318138"}
 */
var v_street;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DA6A885B-BA0C-4472-A9EC-51A43BCBD735"}
 */
var v_zipcode;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"07324716-0D9D-4D96-832B-61E50EEA9CA8"}
 */
var v_city;
/**
 * @type {Number|String}
 *
 * @properties={typeid:35,uuid:"27199318-3014-45DF-965B-C58C91AD4FE9",variableType:-4}
 */
var v_country;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"054EF4DC-097B-4592-92D6-D37990CEFAA1"}
 */
var v_email;
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FBC9F50F-28BF-45E5-970B-AEBD89E26351"}
 */
var v_phone;


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"CE283D86-E95A-4758-9CDD-684971CAFBE5"}
 */
function EVENT_onLoad(event) {
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.cvb_logo_nl.visible = false;
		elements.cvb_logo_es.visible = true;
	}
	v_country = -1;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"41C60A93-15A8-40B6-B00E-9E5697A66057"}
 */
function EVENT_onShow(firstShow, event) {

	
	elements.salutation.requestFocus();
		
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"C1472ECA-BD87-4EA0-A5A5-5AD70FE9636D"}
 */
function SetStyles() {
	plugins.WebClientUtils.setExtraCssClass(elements.el_container, "cvb-login-form");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_login, "cvb-login-button cvb-login-button-green");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_back, "cvb-login-button cvb-login-button-transparent");

//	plugins.WebClientUtils.setExtraCssClass(elements.txt_head, "cvb-login-txt-head");
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
 * @properties={typeid:24,uuid:"494528B3-1437-42B0-B1E5-B3DECE06E330"}
 */
function BTN_register(event) {
	if(!EVENT_validateForm()) {
		// Show error :-)
		scopes.tools.output("Validation failed");
	} else {
		// Validated
		scopes.tools.output("Validation passed");
		
		// Pass all the data to an new screen... Or... We just might link the info
		
		
		if(v_reg_type == scopes.StudyBible.REGISTRATION_TYPES.STUDENT) {
			forms.web_sb_login_frm.elements.tabless.tabIndex = 6;
		} else {
			forms.web_sb_login_frm.elements.tabless.tabIndex = 7;
		}
				
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
 * @properties={typeid:24,uuid:"AEA26689-9BC2-468F-A734-ED60196058BF"}
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
 * @properties={typeid:24,uuid:"8B6E639B-DA55-4F75-B8C3-5439596E2C09"}
 */
function BTN_back(event) {
	forms.web_sb_login_frm.elements.tabless.tabIndex = 5;
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
 * @properties={typeid:24,uuid:"4B97A24C-52B3-4E4C-8019-CD7BA520EF20"}
 */
function onDataChange(oldValue, newValue, event) {
	
	if(newValue === -1) {
		elements[event.getElementName()].fgcolor = "#777777";
	} else {
		elements[event.getElementName()].fgcolor = "#000000";
	}
	
	return true
}
