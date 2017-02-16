/**
 * @properties={typeid:24,uuid:"BB033FE0-643E-4DFA-87DE-86A745D7F637"}
 */
function BTN_executeMethod()
{
var vMethod = plugins.dialogs.showInputDialog( 'Execute method',  '')
if(vMethod){
	eval(vMethod)
}
}

/**
 * @properties={typeid:24,uuid:"1AB70DAC-B0EC-4AAC-BCE9-032DA2EDDBB8"}
 * @AllowToRunInFind
 */
function FIELD_showIPAdresSecurity()
{

}

/**
 * @properties={typeid:24,uuid:"F49E5D2A-65D5-46A7-9F82-C788C5EEAD49"}
 */
function FORM_onShow()
{
//elements.btn_executeMethod.visible = false
//if(sb_g_current_user.contact_email == 'karel@freecolours.com'){
//	elements.btn_executeMethod.visible = true
//}
}

/**
 * @properties={typeid:24,uuid:"26E8D12B-B6EF-43BB-843D-3EE7996F51A7"}
 * @AllowToRunInFind
 */
function REC_onRecordSelection()
{

}
