/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1A2C574B-BF72-44E8-B47F-2B72391D6709"}
 */
var fv_html = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"66EB7FAA-0A3D-4EBB-98CF-C5C46FF3CF43"}
 */
var fv_title = null;

/**
 * @type {*}
 *
 * @properties={typeid:35,uuid:"D3CB0406-927A-4B1F-8EC1-534E35FA2E56",variableType:-4}
 */
var fv_print = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"74F15A94-483F-477F-A46B-0A6BB30025EB"}
 */
var fv_url = "";

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DBB624B2-DB29-4EDB-B205-0766D6082C9A"}
 */
function BTN_home(event) {
	forms.web_sb_form.elements.tab_notes.visible = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E9F355B7-59B5-47A3-847B-E5BDA80F097F"}
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
 * @properties={typeid:24,uuid:"ED4E9E95-F78B-4543-923D-4FEB45817A9F"}
 */
function EVENT_onShow(firstShow, event) {
	elements.html.caretPosition = 0;
	elements.html.setScroll(0,0);
}

/**
 * @properties={typeid:24,uuid:"22700987-C5B0-4729-8D40-562F0E94EFF9"}
 * @param {String} url
 */
function browse(url) {
	if(url != fv_url) {
		application.output(url);
		fv_url = url;
		
		fv_html = "<html><body><div style=\"overflow:scroll !important; -webkit-overflow-scrolling:touch !important;\"><iframe src=\""+url+"\" width=\"100%\" height=\"100%\"  style=\"border:none;\"></iframe></div></body></htm>";
	}
}
