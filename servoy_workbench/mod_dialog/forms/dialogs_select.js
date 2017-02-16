/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"3ABD8DCE-2582-4300-AEFF-A4224EA7CBFD"}
 */
var retVal = '';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"79110A53-6384-4BE9-B69E-DD380D894D9E"}
 */
function handleButtonAction(event) {
	if ( (elements[event.getElementName()] ? elements[event.getElementName()].text : '') == i18n.getI18NMessage('servoy.button.ok')) {
		returnValue = retVal;
	}
}

/**
 * @param {Array<String>} _aArguments
 * @param {String} _sIconStyle
 * @param {Number} _nDialogWidth
 * @param {Number} _nDialogHeight
 *
 * @properties={typeid:24,uuid:"5A45A550-05F0-4C2B-AC29-B7736E5E6995"}
 */
function setupForm(_aArguments, _sIconStyle, _nDialogWidth, _nDialogHeight) {
	var _aBtn = _aArguments.slice(2, _aArguments.length),
		_oForm = setupButtons(_aBtn, false, _nDialogWidth, _nDialogHeight),
		_oLabel = _oForm.newLabel("", 15, 15, 60, 60),
		_oField;
	_oLabel.imageMedia = solutionModel.getMedia(_sIconStyle + ".png");
	_oLabel.mediaOptions = SM_MEDIAOPTION.REDUCE | SM_MEDIAOPTION.KEEPASPECT;

	// create a message field that has the height of the dialog (just above the combobox field)
	_oField = _oForm.newField('msgText', JSField.TEXT_AREA, 90, 15, _nDialogWidth - 100, _nDialogHeight - 100);
	_oField.borderType = "EmptyBorder,0,0,0,0";
	_oField.scrollbars = SM_SCROLLBAR.HORIZONTAL_SCROLLBAR_NEVER | SM_SCROLLBAR.VERTICAL_SCROLLBAR_NEVER;
	_oField.editable = false;
	_oField.tabSeq = SM_DEFAULTS.IGNORE;
	if (isMac() && !application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		_oField.fontType = solutionModel.createFont('Lucida Grande', SM_FONTSTYLE.PLAIN, 12);
	} else {
		_oField.fontType = solutionModel.createFont('Arial', SM_FONTSTYLE.PLAIN, 12);
	}
	if (utils.stringLeft(_aArguments[0], 5) == 'i18n:') {
		_aArguments[0] = i18n.getI18NMessage(_aArguments[0]);
	}
	msgText = _aArguments[0];
	
	controller.recreateUI();
	elements.fldValue.setLocation(85, _nDialogHeight - 71);
	elements.fldValue.setSize(_nDialogWidth - 120, 22);

	/** @type {Array<String>} */
	var _values = _aArguments[1];
	application.setValueListItems("dialogs_valuelist", _values);
	retVal = _aArguments[1][0];
	callbackMethod = handleButtonAction;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7B82CF74-2CFE-4BC7-B5B2-801E28F91A0F"}
 */
function onShow(firstShow, event) {
	elements.fldValue.requestFocus();
}
