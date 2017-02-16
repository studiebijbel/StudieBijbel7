/**
 * @properties={typeid:24,uuid:"571B6599-D677-41B4-8C86-D0CA57AEEAF6"}
 */
function BTN_executeMethod()
{
var vMethod = plugins.dialogs.showInputDialog( 'Execute method',  '')
if(vMethod){
	eval(vMethod)
}
}

/**
 * @properties={typeid:24,uuid:"491258B0-3AA7-4D69-9165-D91D1362AD5A"}
 * @AllowToRunInFind
 */
function FIELD_showIPAdresSecurity()
{

}

/**
 * @properties={typeid:24,uuid:"CCD750A2-39AB-4BE5-A137-4255CC319036"}
 */
function FORM_onShow()
{
//elements.btn_executeMethod.visible = false
//if(sb_g_current_user.contact_email == 'karel@freecolours.com'){
//	elements.btn_executeMethod.visible = true
//}
}

/**
 * @properties={typeid:24,uuid:"CFB29BA7-9C4A-4AE3-9583-E3BF50991DAF"}
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
 * @properties={typeid:24,uuid:"36922D76-BEAF-4BF4-8280-A508756D75E4"}
 */
function BTN_delete(event) {
	if(plugins.dialogs.showQuestionDialog("Verwijderen?", "i18n:cvb.lbl.deleteMessage", "Ja", "Nee") === "Ja") {
		foundset.deleteRecord(foundset.getSelectedRecord());
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A6812CEC-114A-45F2-88D3-EEC429674FC7"}
 */
function BTN_edit(event) {
	databaseManager.setAutoSave(false);
	
	var vWindow = application.createWindow("sb_subscription_subscription_dlg", JSWindow.MODAL_DIALOG);
	vWindow.resizable = false;
	vWindow.title = "Voucher bewerken";
	vWindow.setInitialBounds(-1, -1, -1, -1);
	vWindow.show(forms.sb_subscription_vouchers_dlg);
}
