/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A5ACB396-0C2A-4180-8E56-D989A828259E"}
 */
function handleButtonAction(event) {
	returnValue = elements[event.getElementName()] ? elements[event.getElementName()].text : ''; // button clicked (if any)
	// closing of the window is done by the inherited base form (dialogs_base)
}

/**
 * @param {Array} _aArguments
 * @param {String} _sIconStyle
 * @param {Number} _nDialogWidth
 * @param {Number} _nDialogHeight
 *
 * @properties={typeid:24,uuid:"A5DBD403-02D5-4764-8330-D885B4C3DFAA"}
 */
function setupForm(_aArguments, _sIconStyle, _nDialogWidth, _nDialogHeight) {
	var _aBtn = _aArguments.slice(2, _aArguments.length),
		_oForm = setupButtons(_aBtn, false, _nDialogWidth, _nDialogHeight),
		_oLabel = _oForm.newLabel("", 15, 15, 60, 60),
		_oField;

	_oLabel.imageMedia = solutionModel.getMedia(_sIconStyle + ".png");
	_oLabel.mediaOptions = SM_MEDIAOPTION.REDUCE | SM_MEDIAOPTION.KEEPASPECT;

	// create a message field that has the height of the dialog
	_oField = _oForm.newField('msgText', JSField.TEXT_AREA, 90, 15, _nDialogWidth - 100, _nDialogHeight - 70);
	_oField.borderType = "EmptyBorder,0,0,0,0";
	_oField.scrollbars = SM_SCROLLBAR.HORIZONTAL_SCROLLBAR_NEVER | SM_SCROLLBAR.VERTICAL_SCROLLBAR_NEVER;
	_oField.editable = false;
	_oField.tabSeq = SM_DEFAULTS.IGNORE;
	if (isMac() && !application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		_oField.fontType = solutionModel.createFont('Lucida Grande', SM_FONTSTYLE.PLAIN, 12);
	} else {
		_oField.fontType = solutionModel.createFont('Arial', SM_FONTSTYLE.PLAIN, 12);
	}
	if (utils.stringLeft(_aArguments[1].toString(), 5) == 'i18n:') {
		_aArguments[1] = i18n.getI18NMessage(_aArguments[1].toString());
	}
	msgText = _aArguments[1];

	controller.recreateUI();
	callbackMethod = handleButtonAction;
}
