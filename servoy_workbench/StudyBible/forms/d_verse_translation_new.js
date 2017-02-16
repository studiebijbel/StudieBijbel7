/**
 * @properties={typeid:24,uuid:"C142B8AF-9404-4338-AEFA-BF62794E9F0E"}
 */
function printen() {
	forms.d_verse_translation.controller.print()
}

/**
 * @properties={typeid:24,uuid:"F1E7559E-F5B8-46D9-A07D-F7FDC7617AA7"}
 */
function printForm() {
	controller.getWindow().hide();
	forms.verse_translation.printForm();
}

/**
 * @properties={typeid:24,uuid:"445D517C-670E-49AC-94CD-D55FA8FAD65C"}
 */
function viewTranslations() {
	controller.getWindow().hide();
	//scopes.tools.output('SV')
	forms.verse_translation.viewTranslationsForSelectedVerse();

	forms.verse_translation.newWindow()
}

/**
 * Callback method when form is resized.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D0D3331B-63CE-4C14-8E9A-86771A3192BB"}
 */
function onResize_FORM(event) {	
	//SMM
	var vWin = application.getWindow(event.getFormName())
	globals.form_width = vWin.getWidth()
	globals.form_height = vWin.getHeight()	
	
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A8A3248D-6172-40E5-905D-A93E22E09663"}
 */
function onHide_FORM(event) {
	//SMM - 14-06-2011	
	if (globals.form_width && globals.form_height){	
		globals.setUserSetting('form_verse_translation_width',globals.form_width)
		globals.setUserSetting('form_verse_translation_height',globals.form_height)
	}
	return true
	
}
