/**
 * @properties={typeid:24,uuid:"B9E0BE8D-3F0C-4A4C-9C96-29575181F170"}
 */
function BTN_executeMethod()
{
var vMethod = plugins.dialogs.showInputDialog( 'Execute method',  '')
if(vMethod){
	eval(vMethod)
}
}

/**
 * @properties={typeid:24,uuid:"B3DE24EC-2ECF-4EA2-A3C6-A6DAB7A6092E"}
 * @AllowToRunInFind
 */
function FIELD_showIPAdresSecurity()
{

}

/**
 * @properties={typeid:24,uuid:"9F76BCA4-1ED6-4B53-B399-79D6A80171A8"}
 */
function FORM_onShow()
{
//elements.btn_executeMethod.visible = false
//if(sb_g_current_user.contact_email == 'karel@freecolours.com'){
//	elements.btn_executeMethod.visible = true
//}
}

/**
 * @properties={typeid:24,uuid:"E5E4ADBC-7CD8-45F1-8B77-A71EB1A12EC0"}
 * @AllowToRunInFind
 */
function REC_onRecordSelection()
{

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"41B28DA1-AC30-4F6E-96EE-2EBD257840EB"}
 */
function BTN_addNewVoucher(event) {
	databaseManager.setAutoSave(false);
	
	foundset.newRecord();

	var vWindow = application.createWindow("sb_subscription_subscription_dlg", JSWindow.MODAL_DIALOG);
	vWindow.resizable = false;
	vWindow.title = "Nieuwe voucher";
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.sb_subscription_vouchers_dlg);
}
