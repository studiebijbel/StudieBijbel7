/**
 * @properties={typeid:24,uuid:"6f9dd046-e641-4064-9a80-7634cfac3a48"}
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
 * @properties={typeid:24,uuid:"29cc3cf9-0355-4fae-9fe0-b31dddbb9b61"}
 */
function EVENT_setInfo()
{
}

/**
 * @properties={typeid:24,uuid:"729c6a0d-c5ee-41ff-aeac-6584881629c8"}
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
 * @properties={typeid:24,uuid:"7dbf289a-1e83-4d94-b130-7e94afb40a87"}
 */
function onHide()
{
globals.sb_blockFootnoteLinkSearchForm = 0
//scopes.tools.output(globals.sb_blockFootnoteLinkSearchForm)
}

/**
 * @properties={typeid:24,uuid:"b39d6da3-4952-47bd-b343-e2b6c7f7d9c2"}
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
 * @properties={typeid:24,uuid:"BCB5487A-54AE-4D68-9934-0799ED6D207C"}
 */
function onResize_FORM(event) {
	//SMM 10-06-2011
	var vWin = application.getWindow(event.getFormName())
	if (vWin != null) {		
		globals.form_comment_width = vWin.getWidth()
		globals.form_comment_height = vWin.getHeight()
	}
}
