/**
 * @properties={typeid:24,uuid:"EDA1AB91-DC34-4D43-B01E-7EF69AA85FE7"}
 */
function BTN_executeMethod()
{
var vMethod = plugins.dialogs.showInputDialog( 'Execute method',  '')
if(vMethod){
	eval(vMethod)
}
}

/**
 * @properties={typeid:24,uuid:"70603795-0C90-44F0-9069-1AE9F8EB3007"}
 * @AllowToRunInFind
 */
function FIELD_showIPAdresSecurity()
{

}

/**
 * @properties={typeid:24,uuid:"96246627-D7F6-4ED8-82ED-7D697006C0EF"}
 */
function FORM_onShow()
{
//elements.btn_executeMethod.visible = false
//if(sb_g_current_user.contact_email == 'karel@freecolours.com'){
//	elements.btn_executeMethod.visible = true
//}
}

/**
 * @properties={typeid:24,uuid:"DEDF3789-D0D9-4323-8D86-75363C5A682C"}
 * @AllowToRunInFind
 */
function REC_onRecordSelection()
{

}
