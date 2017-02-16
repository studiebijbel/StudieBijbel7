/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"DD71420F-A6B3-44B6-AEE5-93CFC36AC528"}
 */
var suggestion = null;


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"610174AA-DBE4-4D03-A954-19F4C900DDA6"}
 */
function BTN_send(event) {
	elements.imgProccessing.visible = true;
	elements.btn_cancel.enabled = false;
	elements.btn_send.enabled = false;
	elements.tb_suggestion.enabled = false;
	
	application.sleep(100);
	application.updateUI(1000);
	
	// first get the email address of the current user
	var vEmail = globals.sb_gLoginName;
	
//	var authorization = new Array("mail.smtp.host=smtp.gmail.com", "mail.smtp.auth=true", "mail.smtp.starttls.enable=true", "mail.smtp.port=587", "mail.smtp.username=stbrend@gmail.com", "mail.smtp.password=simplythebest");
//	var authorization = new Array("mail.smtp.host=mail.virtu.nl", "mail.smtp.auth=false");
	var emailSend = "rick@stb.nl"; //vEmailSend 
	
	if(globals.sb_APP_getServerLang() == 'ESP')
	{
		emailSend = 'info@studiebijbel.nl';
	} else {
		emailSend = 'info@studiebijbel.nl';
	}
	
	var emailFrom = vEmail;
	var emailSubject = "Verbeter suggestie ";
	var emailMsg = ''
		

	emailMsg = suggestion;
//	plugins.mail.sendMail(to[,to2,toN],from[,reply],subject,msgText,[cc,cc2,ccN],[bcc,bcc2,bccN],[attachment/attachments array],[overridePreferenceSMTPHost/properties array])
	
	var vMailOK = plugins.mail.sendMail(emailSend, emailFrom+","+emailFrom, emailSubject, emailMsg, null, null, null, null );
	
	
	elements.imgProccessing.visible = false;
	elements.btn_cancel.enabled = true;
	elements.btn_send.enabled = true;
	elements.tb_suggestion.enabled = true;
		
	
	if (!vMailOK){
		globals.DIALOGS.showInfoDialog('i18n:servoy.userClient.message.fromServer','Failed to send mail ' + plugins.mail.getLastSendMailExceptionMsg(),'Ok')
	} 
	else {
		suggestion = '';
		globals.DIALOGS.showInfoDialog('i18n:servoy.userClient.message.fromServer',i18n.getI18NMessage('cvb.message.help_suggestion'),'Ok')
		controller.getWindow().hide();
	}
	
}
/**
 * @properties={typeid:24,uuid:"0FA0B05F-B89E-48F9-9CAA-F9A6A5CE63D8"}
 */
function BTN_cancel() {
	
	//SMM 02-11-2011 
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}
	
}
