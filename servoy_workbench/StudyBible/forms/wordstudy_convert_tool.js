/**
 * @properties={typeid:35,uuid:"700E1C37-125B-437C-A3CF-E5DB2032267C",variableType:-4}
 */
var fv_web = null;
/**
 * @properties={typeid:35,uuid:"83AB8D50-84E2-46AB-94EA-46AA9EE2CAB6",variableType:-4}
 */
var fv_html = null;
/**
 * @properties={typeid:35,uuid:"9218BBB2-4F24-40AA-B2A9-BA1DB3EC5856",variableType:-4}
 */
var fv_plaintext = null;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EE6DF631-B3E5-4C34-B6A0-03FEC3541E5C"}
 */
function EVENT_onLoad(event) {
	fv_web = new scopes.TinyMCE.Editor(elements.edit_pane);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7653CE13-A6F6-4CA8-9142-B0293EC33330"}
 */
function BTN_close(event) {
	controller.getWindow().hide();
}


/**
 * @properties={typeid:24,uuid:"4D88037F-F5C4-45E4-8DA7-C145BFF22116"}
 */
function ParseText() {
	fv_html = fv_web.getContent();
	
	// Do some regex tricks
	//var vWsRegex = /([0-9]{1,5})(\s|\S)<em>(.*?)<\/em>/gi;
	var vWsRegex = /(?![:]) ([0-9]{1,5})(\s|\S)<em>(.*?)<\/em>/gi;
	var vWs2Regex = /<em>([0-9]{1,5})(\s|\S)(.*?)<\/em>/gi;
	
	var vSpRegex = /<(span|p)(.*?)>|<\/(span|p)>/gi;
		
	/** @type {String} */
	var vHTML = fv_html;
	
	vHTML = vHTML.replace(vSpRegex, "");
	vHTML = vHTML.replace(vWsRegex, " [cvb_i]$1$2$3[/cvb_i] ");
	vHTML = vHTML.replace(vWs2Regex, " [cvb_i]$1$2$3[/cvb_i] ");
	
	fv_plaintext = vHTML;
}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"42ABB5C1-0E67-4361-9881-53F41A17C0AB"}
 */
function BTN_saveToFile(event) {
	ParseText();
	var vFile = plugins.file.showFileSaveDialog("wordstudy_conversion.txt", "Selecteerd pad om bestand op te slaan");
	if(vFile) {
		plugins.file.writeTXTFile(vFile, fv_plaintext, 'UTF-16');
		plugins.dialogs.showInfoDialog("Gelukt!", "Het bestand is opgeslagen op de volgende locatie: " + vFile);
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"595093EC-1595-4955-B987-A4BEB4AD8835"}
 */
function BTN_closeTextScreen(event) {
	elements.btn_close_text.visible = false;
	elements.plaintext_pane.visible = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C86E80E3-3B7B-47C5-B786-1C08D8624FF5"}
 */
function BTN_showPlainText(event) {
	ParseText();
	elements.btn_close_text.visible = true;
	elements.plaintext_pane.visible = true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"3B2D0159-51EB-4DAB-9FC9-B7AB5F386D23"}
 */
function BTN_saveClipboard(event) {
	ParseText();
	application.setClipboardContent(fv_plaintext);
}
