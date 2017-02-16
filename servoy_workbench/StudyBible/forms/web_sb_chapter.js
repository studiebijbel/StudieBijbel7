/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1EF0569A-DABD-4B4E-84E3-02C73414876C"}
 */
var fv_html = null;


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E54370CD-53BC-40B1-A8B5-8334F1F8B951"}
 */
function BTN_read(event) {
	forms.web_sb_read.fv_title = i18n.getI18NMessage('cvb.lbl.chapter');
	forms.web_sb_read.fv_html = fv_html;
	forms.web_sb_read.fv_print = null;

	forms.web_sb_read.elements.html.caretPosition = 0;
	forms.web_sb_read.elements.html.setScroll(0,0);
	
	forms.web_sb_form.elements.tab_notes.tabIndex = 4;
	forms.web_sb_form.elements.tab_notes.visible = true;
}
