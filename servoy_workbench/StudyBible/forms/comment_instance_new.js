/**
 * @properties={typeid:24,uuid:"AA67C3A9-7E77-4EA2-8AC5-AF4D026A63F3"}
 */
function BTN_print()
{
globals.sb_print_bibleTranslations = 1
globals.commentary_id = pk;
//application.showFormInDialog( forms.print_commentary_dlg,  -1, -1, -1, -1, 'i18n:cvb.lbl.print', false, false, 'printDLG', true)
//SMM 20-05-2011
var vForm = application.createWindow('printDLG', JSWindow.MODAL_DIALOG, null);
vForm.title = 'i18n:cvb.lbl.print';
vForm.show(forms.print_commentary_dlg);
}

/**
 * @properties={typeid:24,uuid:"45B62D10-C108-4390-B0BC-C885286B1594"}
 */
function EVENT_setInfo()
{
}

/**
 * @properties={typeid:24,uuid:"25B8DCC6-0122-48A3-9E82-E12FAC6A8023"}
 */
function FORM_onShow()
{
//var a= elements.showCommentary;
//var b= a;

/*var vPane = elements.bean_232.viewport
//elements.bean_232.verticalScrollBar = false;
vPane.add(elements.c)
*/

//plugins.keyListeners.addKeyListener(elements.showCommentary , TEST, 'a');

//elements.showCommentary.

//plugins.keyListeners.addKeyListener(element, funktion, 'keyPressed');
}

/**
 * @properties={typeid:24,uuid:"2A8C5F5A-8A51-4D93-A3B7-6855FD4E6E76"}
 */
function onHide()
{
globals.sb_blockFootnoteLinkSearchForm = 0
//scopes.tools.output(globals.sb_blockFootnoteLinkSearchForm)
//SMM - 14-06-2011
if (globals.form_comment_width && globals.form_comment_height){	
	globals.setUserSetting('form_comment_instance_width',globals.form_comment_width)
	globals.setUserSetting('form_comment_instance_height',globals.form_comment_height)
}
return true

}

/**
 * @properties={typeid:24,uuid:"639FE370-0D55-4523-B1C7-2C87B4C3F80B"}
 */
function TEST()
{
//nope
}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"582D347A-2191-40CA-A0E4-2FF40E1B1EC0"}
 */
function onResize_FORM(event) {
	//SMM 10-06-2011
	var vWin = application.getWindow(event.getFormName())
	if (vWin != null) {		
		globals.form_comment_width = vWin.getWidth()
		globals.form_comment_height = vWin.getHeight()
	}
}
