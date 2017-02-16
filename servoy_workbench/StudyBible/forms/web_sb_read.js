/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"917BF770-0F32-4C05-BAA3-AF2C1805DA93"}
 */
var fv_html = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0D242C11-4694-4EFC-9B1C-582D3443A0E0"}
 */
var fv_title = null;

/**
 * @type {*}
 *
 * @properties={typeid:35,uuid:"393BFB7F-0CFB-49C8-B239-FA4D6301897A",variableType:-4}
 */
var fv_print = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"29EF5F26-6F2B-4D52-879A-5C0BE409E952"}
 */
function BTN_home(event) {
	forms.web_sb_form.elements.tab_notes.visible = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6A5ADF26-5705-403D-9C74-A45D219BC270"}
 */
function BTN_print(event) {
	fv_print();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EBD5C3AA-DC1F-4C4D-A0B1-B48F6423B9CE"}
 */
function EVENT_onShow(firstShow, event) {
	if(fv_print != null) {
		elements.btn_print.visible = true;
	} else {
		elements.btn_print.visible = false;
	}
	
	elements.html.caretPosition = 0;
	elements.html.setScroll(0,0);
}
