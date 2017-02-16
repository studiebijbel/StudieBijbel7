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
}/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1101DAA6-19FA-41BC-AC89-181189A9CF7F"}
 */
var v_iban = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"E12072A2-3468-4F22-B465-6AF3C57002A2"}
 */
var v_cardholder = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"41C60A93-15A8-40B6-B00E-9E5697A66057"}
 */
function EVENT_onShow(firstShow, event) {

	
	elements.firstname.requestFocus();
		
	SetStyles();
}

/**
 * @properties={typeid:24,uuid:"C1472ECA-BD87-4EA0-A5A5-5AD70FE9636D"}
 */
function SetStyles() {
	plugins.WebClientUtils.setExtraCssClass(elements.el_container, "cvb-login-form");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_login, "cvb-login-button");
//	plugins.WebClientUtils.setExtraCssClass(elements.txt_head, "cvb-login-txt-head");
	plugins.WebClientUtils.setExtraCssClass(elements.txt_container,"cvb-login-txt-container");
	plugins.WebClientUtils.setExtraCssClass(elements.firstname,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.lastname,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.address,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.zipcode,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.city,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.phone,"cvb-login-input");
	plugins.WebClientUtils.setExtraCssClass(elements.email,"cvb-login-input");
	
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
 * @properties={typeid:24,uuid:"494528B3-1437-42B0-B1E5-B3DECE06E330"}
 */
function BTN_register(event) {
	if(!EVENT_validateForm()) {
		// Show error :-)
		scopes.tools.output("Validation failed");
	} else {
		// Validated
		scopes.tools.output("Validation passed");
		
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
	
	var vElements = ['firstname', 'lastname', 'address', 'zipcode', 'city', 'phone', 'email'];
	var vFields = ['v_firstname', 'v_lastname', 'v_address', 'v_zipcode', 'v_city', 'v_phone', 'v_email'];
	
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
