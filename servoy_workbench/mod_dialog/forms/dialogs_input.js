/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"97109D98-5F78-4A9E-97AF-B402668422CB"}
 */
var retVal = '';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3B06D392-0811-453F-A67D-1E8070EA7434"}
 */
function handleButtonAction(event) {
	if (event.getElementName() == 'fldValue' || (elements[event.getElementName()] ? elements[event.getElementName()].text : '') == i18n.getI18NMessage('servoy.button.ok')) {
		returnValue = retVal;
	}
	// closing of the window is done by the inherited base form (dialogs_base)
}

/**
 * @param {Array} _aArguments
 * @param {String} _sIconStyle
 * @param {String} _initialValue
 * @param {Number} _nDialogWidth
 * @param {Number} _nDialogHeight
 *
 * @properties={typeid:24,uuid:"2693E5DA-09D0-4081-AB5E-4F4354D3CF6D"}
 */
function setupForm(_aArguments, _sIconStyle, _initialValue, _nDialogWidth, _nDialogHeight) {
	var _aBtn = _aArguments.slice(1, _aArguments.length),
		_oForm = setupButtons(_aBtn, false, _nDialogWidth, _nDialogHeight),
		_oLabel = _oForm.newLabel("", 15, 15, 60, 60),
		_oField;

	_oLabel.imageMedia = solutionModel.getMedia(_sIconStyle + ".png");
	_oLabel.mediaOptions = SM_MEDIAOPTION.REDUCE | SM_MEDIAOPTION.KEEPASPECT;

	// create a message field that has the height of the dialog (just above the input field)
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
	if (utils.stringLeft(_aArguments[0].toLocaleString(), 5) == 'i18n:') {
		_aArguments[0] = i18n.getI18NMessage(_aArguments[0].toString());
	}
	msgText = _aArguments[0];

	controller.recreateUI();
	elements.fldValue.setLocation(85, _nDialogHeight - 71);
	elements.fldValue.setSize(_nDialogWidth - 120, 20);
	retVal = _initialValue;
	callbackMethod = handleButtonAction;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"337193E1-6AC6-44F6-B81D-47443EDC2283"}
 */
function onInputAction(event) {
	_super.onButtonAction(event);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"A01D6297-D3B3-47C0-AAFA-23CAF1CAFF8E"}
 */
function onShow(firstShow, event) {
	elements.fldValue.requestFocus();
}
