/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"324A3E3B-5CB0-45E9-8E6B-1285BBA28770",variableType:4}
 */
var fv_selected = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B4EC8F46-E611-4FE5-A32A-FFE13BF0432F"}
 */
var fv_selectedVersion = "tr";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0C818B31-D1F6-44CA-9B99-E1C943596C39"}
 */
var fv_selectedVersionDisplay = "TR";

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"935BEC78-91D3-43E9-A871-BBFFBED596BB"}
 * @AllowToRunInFind
 */
function BTN_toSearchFrm(event) {
	forms.search_book_frm.EVENT_doSearch(null, '', event);
	forms.search_book_frm.controller.show();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7E79A39E-FD12-4F81-8AC8-20746C644D78"}
 * @AllowToRunInFind
 */
function BTN_back(event) {
	forms.search_book_frm.controller.show();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B545C3BD-0135-4166-A3FC-FADD6481B3E9"}
 * @AllowToRunInFind
 */
function EVENT_onShow(firstShow, event) {
	var vTempObj = {};
		vTempObj.do_search = true;
		vTempObj.search_column = 'pk';
		vTempObj.search_value = pk;
		vTempObj.form = event.getFormName();
	globals.gHistory.push(vTempObj);
	vTempObj = null;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"243DA200-E559-49F8-803D-68E301E53171"}
 */
function BTN_selectVersion(event) {
	if(fv_selected == 1)
	{
		return false;
	}
	
	var callback = plugins.WebClientUtils.generateCallbackScript(EVENT_setVersion, ['version', 'display']);
	var callback2 = plugins.WebClientUtils.generateCallbackScript(EVENT_done);
	
	var script = 'function EVENT_setVersion(version, display){' + callback + '}; function  EVENT_done() {' + callback2 + '}';
	//plugins.WebClientUtils.executeClientSideJS(script);


	fv_selected = 1;
	
	plugins.WebClientUtils.executeClientSideJS("\
	var numbers = { 'tr': 'TR', 'hf': 'H-F', 'n25': 'N25', 'n27':'N27' }; \
	SpinningWheel.addSlot(numbers, 'right', '" + fv_selectedVersion + "'); \
 \
	SpinningWheel.setDoneAction(done); \
	SpinningWheel.setCancelAction(EVENT_done);\
 \
	SpinningWheel.open(); \
 \
function done() { \
	var results = SpinningWheel.getSelectedValues(); \
	EVENT_setVersion(results.keys.join(', '), results.values.join(', ')) \
} \
 \
function cancel() { \
	alert('cancelled!'); \
} " + script);
	
	return true;
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {Object} version
 * @param {Object} display
 *
 * @properties={typeid:24,uuid:"8EDFC010-CA2E-443B-92A4-407A3C5E8F58"}
 */
function EVENT_setVersion(version, display)
{
	fv_selectedVersion = version;
	fv_selectedVersionDisplay = version.toString().toUpperCase();
	switch (version)
	{
		case 'tr':
			elements.tr.visible = true;
			elements.hf.visible = false;
			elements.n25.visible = false;
			elements.n27.visible = false;
		break;
		case 'hf':
			elements.tr.visible = false;
			elements.hf.visible = true;
			elements.n25.visible = false;
			elements.n27.visible = false;
		break;
		case 'n25':
			elements.tr.visible = false;
			elements.hf.visible = false;
			elements.n25.visible = true;
			elements.n27.visible = false;
		break;
		case 'n27':
			elements.tr.visible = false;
			elements.hf.visible = false;
			elements.n25.visible = false;
			elements.n27.visible = true;
		break;
	}
	
	EVENT_done();
}

/**
 * @properties={typeid:24,uuid:"AB22BF09-3EF9-4C83-9336-C7EBF789D5D0"}
 */
function EVENT_done(){
	fv_selected = 0;
}
