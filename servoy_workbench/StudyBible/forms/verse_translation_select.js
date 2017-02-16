/**
 * @properties={typeid:24,uuid:"078b6c6d-b9a9-4141-918e-475066b2b6e4"}
 */
function BTN_ok() {

	globals.translation = globals.translation2
	globals.sb_gTranslationPartial = globals.sb_gTranslationPartial2
	globals.setUserSetting("translations", globals.translation);	 //SMM 16-06-2011
	globals.setUserSetting("translation_partial", globals.sb_gTranslationPartial);	 //SMM 16-06-2011
	// Close de dialog.
	controller.getWindow().hide();
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3A736402-D679-4EC7-9CDD-42CD1C12588E"}
 */
function onLoad(event) {
	if(globals.sb_APP_getServerLang() == "ESP") {
		elements.part_trans.visible = false;
		elements.text_translationc.visible = false;
		elements.text_translation.setSize(404,434);
	}
}
