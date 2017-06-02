/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"20BF1E66-43A4-4E37-8C1B-B40FE6ECC82E"}
 */
var fv_scripts = null;


/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"00CA0C6F-AF0A-46C0-BBA7-3B1C0162E1D3"}
 */
function EVENT_onShow(firstShow, event) {
	plugins.WebClientUtils.setExtraCssClass(elements.tabless, "cvb-login-container");
	
	if(globals.sb_gVersion.match(/test/gi)) {
		elements.lbl_warning.visible = true;
		elements.lbl_warningc.visible = true;
	} else if(globals.sb_gVersion.match(/accept/gi)) {
		elements.lbl_accept.visible = true;
		elements.lbl_acceptc.visible = true;
	}
	
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"20A7563C-9F32-4E78-9775-D6E0B47699E6"}
 */
function EVENT_onLoad(event) {
	plugins.WebClientUtils.addJsReference('https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');
	//plugins.WebClientUtils.addJsReference(application.getServerURL()+"bootstrap/StudyBible.js");
	plugins.WebClientUtils.addJsReference("/bootstrap/StudyBible.js");
	
	plugins.WebClientUtils.executeClientSideJS("var ret = DetectViewPort()", EVENT_jsCallback, ['ret']);
	plugins.WebClientUtils.executeClientSideJS("var MobDev = DetectMobileDevice()", EVENT_mobileCallback, ['MobDev']);
	plugins.WebClientUtils.executeClientSideJS("var isSmartphone = DetectSmartphone()", EVENT_isSmartphoneCallback, ['isSmartphone']);
	
	var callback = plugins.WebClientUtils.generateCallbackScript(EVENT_changeTab, ['method'], true);
	var script = 'function ChangeTab(method){'+callback+'}';
//	fv_scripts = '<html><head><meta id="Viewport" name="viewport" content="width=' + inp.width + ', initial-scale=' + inp.scale + ', user-scalable=yes"><link rel="icon" type="image/png" href="/favicon.png"></head></html>'
	fv_scripts = '<html><head><script>'+script+'</script></head></html>';

//	var markup = '<html><head><script type="text/javascript">'+script+'</script></head></html>'
}

/**
 * TODO generated, please specify type and doc for the params
 * @param inp
 *
 * @properties={typeid:24,uuid:"4D1393D0-FA82-4911-BEF6-D98F429AA064"}
 */
function EVENT_isSmartphoneCallback(inp) {
	application.output(inp);
	if(inp == "true") {
		forms.sb_web_smartphone_message.controller.show();
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param inp
 *
 * @properties={typeid:24,uuid:"9A97EFE5-5170-4CBE-93BD-B9D3C44D34B2"}
 */
function EVENT_mobileCallback(inp) {
	globals.is_mobile_device = (inp=="true")?true:false;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param {String} inp
 *
 * @properties={typeid:24,uuid:"37D29308-0962-41A1-8EC3-B3A2498E3F90"}
 */
function EVENT_jsCallback(inp) {
	/** @type {*} */
	inp = JSON.parse(inp);
	var callback = plugins.WebClientUtils.generateCallbackScript(EVENT_changeTab, ['method'], true);
	var script = 'function ChangeTab(method){'+callback+'}';
//	fv_scripts = '<html><head><meta id="Viewport" name="viewport" content="width=' + inp.width + ', initial-scale=' + inp.scale + ', user-scalable=yes"><link rel="icon" type="image/png" href="/favicon.png"></head></html>'
	fv_scripts = '<html><head><script>'+script+'</script><meta id="Viewport" name="viewport" content="width=' + inp.width + ', initial-scale=' + inp.scale + ', user-scalable=yes"></head></html>'
}

/**
 * @properties={typeid:24,uuid:"8ABA8AC4-2E56-431C-B039-4241A054893F"}
 * @param {String} method
 */
function EVENT_changeTab(method) {
	scopes.tools.output(method);
	if(method == "register") {
		//elements.tabless.tabIndex = 2;
		//plugins.WebClientUtils.removeExtraCssClass(elements.tabless);
		//plugins.WebClientUtils.setExtraCssClass(elements.tabless, "cvb-register-container");
		application.showURL("http://studiebijbel.directdev.nl/registreren/", "_blank");
	} else if(method == "iban") {
		elements.tabless.tabIndex = 3;
	} else if(method == "forgot") {
		elements.tabless.tabIndex = 4;		
	} else {
		elements.tabless.tabIndex = 1;
		plugins.WebClientUtils.removeExtraCssClass(elements.tabless);
		plugins.WebClientUtils.setExtraCssClass(elements.tabless, "cvb-login-container");
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5C14A768-C83E-463B-A4FF-8FF48FE57639"}
 */
function onAction(event) {
	plugins.dialogs.showInfoDialog("Info", application.getServerURL());
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"17A3580B-97F0-49E8-AA4B-CB214AA5E5CB"}
 */
function BTN_reg(event) {

	elements.tabless.tabIndex = 5;
}
