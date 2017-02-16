/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D44ABC83-2A89-4E42-B19C-19F8E4451111"}
 */
var v_organisation = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B66B9DDB-9643-4E75-BFFD-8AA995AFAD4E"}
 */
var v_username = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"24F22041-0EA4-4473-9522-E06E94A65D91"}
 */
var v_password = null;

/**
 * @properties={typeid:24,uuid:"6ED59CFC-A8B0-4704-8C19-8B30F842065B"}
 */
function FORM_onShow(firstShow,event)
{
	if(!firstShow){
		return true;
	}
	
	if(globals.sb_gVersion.match(/test/gi)) {
		elements.lbl_warning.visible = true;
	} else if(globals.sb_gVersion.match(/accept/gi)) {
		elements.lbl_accept.visible = true;
	}
	
	
	// Do some nice detecting
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT)
	{
	/*	var vUserAgent = Packages.org.apache.wicket.RequestCycle.get().getClientInfo().getUserAgent()+"";
		if(vUserAgent.match(/(MSIE 5.0|MSIE 5.5|MSIE 6.0|MSIE 7.0|MSIE 8.0)/gi) && !vUserAgent.match(/chromeframe/))
		{
			elements.IE6_8_warning.visible = true;
			elements.btn_Continue.visible = true;
		}*/
		forms.web_sb_login_frm.controller.show();
		return false;
	}
	
//	if(globals.sb_gCurrentServerUrl != globals.sb_gESServerURLs)
	if(globals.sb_APP_getServerLang() == "NL")
	{
		elements.comentario_logo.visible = false
		elements.header_nl.visible = true;
	} else {
		elements.header_nl.visible = false;
		elements.comentario_logo.visible = true;
	}
	
	v_username = application.getUserProperty('cvb_username')
	v_organisation = application.getUserProperty('cvb_organisation')
	
	if(v_username){
		elements.sb_gPassword.requestFocus()
	}
	else {
		elements.sb_gLoginName.requestFocus()
	}
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"232FF24D-CB9C-4FB0-B48B-B458385A25F7"}
 */
function IEContinue(event) {
	elements.IE6_8_warning.visible = false;
	elements.btn_Continue.visible = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8C39FBFB-9E71-4AF3-9717-AE9D817E41B7"}
 */
function runLoginMethod(event) {
	
//	scopes.tools.output(event);
	
	globals.sb_SEC_login();
	
	return true;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"03AAD969-A509-4EEF-9322-C7EBF982CE12"}
 */
function onDataChange(oldValue, newValue, event) {
	if(v_organisation && v_username){
		globals.sb_SEC_login();
	}
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8E567060-A24F-4257-9004-336137608573"}
 */
function onAction(event) {
	// TODO Auto-generated method stub
	elements.btn_login.requestFocus();
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"303F0DF7-D788-4883-B937-F31565E71524"}
 */
function BTN_migrations(event) {
	var vPassword = "ICt#76$641144";
	
	if(plugins.dialogs.showInputDialog("Password required!","Please enter the magic word:") === vPassword) {
		var vWindow = application.createWindow("dev_migration_tools", JSWindow.MODAL_DIALOG);
		vWindow.resizable = false;
		vWindow.setInitialBounds(-1,-1,-1,-1);
		vWindow.title = "StudieBijbel Migration Tools";
		vWindow.show(forms.dev_migration_tools);
	}
}
