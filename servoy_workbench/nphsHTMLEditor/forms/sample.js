/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1F7338DD-3001-4ACA-8A24-8630915A74B5"}
 */
var content = '';

/**
 * @properties={typeid:35,uuid:"CEDEE3FD-2B8C-4DCE-9FE1-3F5161B7CB3A",variableType:-4}
 */
var htmlEditor = null;

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"71CBACEB-B1D9-4375-A5FA-81D00E985CF1"}
 */
function onLoad(event) {
	htmlEditor = new scopes.nphsHTMLEditor.htmlEditor(elements.htmlEditor);

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A68CF77B-38F2-4BEA-AB12-FD76B95C0B87"}
 */
function cmdShowContent_onAction(event) {
	var _content = htmlEditor.getContent();
	//scopes.tools.output(_content);
	//plugins.dialogs.showInfoDialog('HTML Content', _content);
	content = _content;
}
