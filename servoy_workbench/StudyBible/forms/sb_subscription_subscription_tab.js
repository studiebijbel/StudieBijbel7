/**
 * @properties={typeid:24,uuid:"6879BC15-6156-4FC6-A646-71A01E1525B9"}
 */
function BTN_executeMethod()
{
var vMethod = plugins.dialogs.showInputDialog( 'Execute method',  '')
if(vMethod){
	eval(vMethod)
}
}

/**
 * @properties={typeid:24,uuid:"5B1C1DBE-7D2E-43EB-A659-8582343CBEAD"}
 * @AllowToRunInFind
 */
function FIELD_showIPAdresSecurity()
{

}

/**
 * @properties={typeid:24,uuid:"A7BA0F75-7C2F-4F70-A9A9-49BD59457979"}
 */
function FORM_onShow()
{
//elements.btn_executeMethod.visible = false
//if(sb_g_current_user.contact_email == 'karel@freecolours.com'){
//	elements.btn_executeMethod.visible = true
//}
}

/**
 * @properties={typeid:24,uuid:"088605BF-2A6A-4567-8D1D-966F557DDE5E"}
 * @AllowToRunInFind
 */
function REC_onRecordSelection()
{

}
