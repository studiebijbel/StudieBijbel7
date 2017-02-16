/**
 * @properties={typeid:24,uuid:"D138A26C-8997-4F19-BF5C-E53C6DF57989"}
 */
function BTN_executeMethod()
{
var vMethod = plugins.dialogs.showInputDialog( 'Execute method',  '')
if(vMethod){
	eval(vMethod)
}
}

/**
 * @properties={typeid:24,uuid:"FA8B2150-A847-4B52-ACDC-D45F51868214"}
 * @AllowToRunInFind
 */
function FIELD_showIPAdresSecurity()
{
	if(ipaddress_security_chk == 1){
		elements.fld_ipaddress.visible = true
		forms.sb_organisation_detail_frm.elements.bdr_contacts.visible = false
		forms.sb_organisation_detail_frm.elements.btn_new_contact.visible = false
		forms.sb_organisation_detail_frm.elements.tabs_contacts.visible = false	
		forms.sb_organisation_detail_frm.elements.totalUsers.visible = false
		forms.sb_organisation_detail_frm.elements.search_btn.visible = false
		forms.sb_organisation_detail_frm.elements.search_field.visible = false
	}
	else {
		elements.fld_ipaddress.visible = false
		forms.sb_organisation_detail_frm.elements.bdr_contacts.visible = true
		forms.sb_organisation_detail_frm.elements.btn_new_contact.visible = true
		forms.sb_organisation_detail_frm.elements.tabs_contacts.visible = true
		forms.sb_organisation_detail_frm.elements.totalUsers.visible = true
		forms.sb_organisation_detail_frm.elements.search_btn.visible = true
		forms.sb_organisation_detail_frm.elements.search_field.visible = true
	}
}

/**
 * @properties={typeid:24,uuid:"50120D0F-E8F1-4309-A396-3CC4EFDC4914"}
 */
function FORM_onShow()
{
//elements.btn_executeMethod.visible = false
//if(sb_g_current_user.contact_email == 'karel@freecolours.com'){
//	elements.btn_executeMethod.visible = true
//}
}

/**
 * @properties={typeid:24,uuid:"4ECCD46A-B397-4AAC-9EC7-A4317CD5D5A9"}
 */
function REC_onRecordSelection()
{
FIELD_showIPAdresSecurity();
}
