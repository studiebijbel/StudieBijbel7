/**
 * @properties={typeid:24,uuid:"D8B0FC2C-00C7-4344-9614-9C3E24525236"}
 */
function BTN_cloe() {
//	application.closeFormDialog('replace')

	//SMM - 23-05-2010
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}
}

/**
 * @properties={typeid:24,uuid:"25AE8FEC-C7FF-4431-940D-31B0037167F5"}
 */
function BTN_next() {
	// next

	var vMatchWord = globals.far_searchText;
	vMatchWord = utils.stringReplace(vMatchWord, '-', '–');

	elements.textBean.requestFocus(true)

	for (var i = globals.far_indexes[(globals.far_indexes.length) - 1]; i < globals.far_text.length; i++) {
		if (globals.far_text.substring(i, (i) + vMatchWord.length).toLowerCase() == vMatchWord.toLowerCase()) {
			elements.btn_next.enabled = true;
			elements.btn_replace.enabled = true;
			elements.btn_replaceAll.enabled = true;

			elements.textBean.selectionStart = (i)
			elements.textBean.selectionEnd = (i + globals.far_searchText.length)
			globals.far_indexes.push( (i + globals.far_searchText.length));
			return true;
		} else {
			elements.btn_next.enabled = false;
			elements.btn_replace.enabled = false;
			elements.btn_replaceAll.enabled = false;

			elements.textBean.caretPosition = 0

			elements.textBean.selectionStart = 0
			elements.textBean.selectionEnd = 0

			continue;
			//	return false;
		}

	}
	return true
}

/**
 * @properties={typeid:24,uuid:"B0019A19-978A-466E-B397-FDCDB6BFB038"}
 */
function BTN_prev() {
	var vMatchWord = globals.far_searchText;
	elements.textBean.requestFocus(true)
	for (var i = globals.far_indexes[ (globals.far_indexes.length) - (globals.iets)]; i < globals.far_text.length; i++) {
		globals.iets = (globals.iets) + 1;
		if (globals.far_text.substring(i, (i) + vMatchWord.length) == vMatchWord) {
			elements.textBean.selectionStart = (i) + 1
			elements.textBean.selectionEnd = (i + globals.far_searchText.length) + 1
			globals.far_indexes.push( (i + globals.far_searchText.length) + 1);
			return;
		}
	}
}

/**
 * @properties={typeid:24,uuid:"80EC5FDF-1179-49B7-AA22-AA76A083DF5B"}
 */
function BTN_replace() {

	elements.textBean.replaceRange(globals.far_replaceText, (elements.textBean.selectionStart), (elements.textBean.selectionEnd))

	//elements.textBean.selectionStart = (globals.far_indexes.length)-1
	//elements.textBean.selectionEnd = (((globals.far_indexes.length)-1) + globals.far_replaceText.length)

	globals.far_text = elements.textBean.getText()

	elements.textBean.requestFocus(true)

	BTN_next();

}

/**
 * @properties={typeid:24,uuid:"4E7F5387-9B9D-446A-A289-77BC9D46DC34"}
 */
function BTN_replaceAll() {
	/**
	 * @author rbonkestoter
	 * Bug fixed
	 * Add the fucking variable.. Else it does not what is should do ;)
	 */
	globals.far_text = utils.stringReplace(globals.far_text, globals.far_searchText, globals.far_replaceText);

	elements.textBean.setText(globals.far_text)

	elements.textBean.caretPosition = 0

	elements.textBean.selectionStart = 0
	elements.textBean.selectionEnd = 0

	elements.textBean.requestFocus(true)

	elements.btn_next.enabled = false;
	elements.btn_replace.enabled = false;
	elements.btn_replaceAll.enabled = false;
}

/**
 * @properties={typeid:24,uuid:"3A5F171A-08B5-4A71-8283-05E77B637FCD"}
 */
function BTN_save() {
	// save it

	var vForm = globals.far_arguments.formname;
	var vColumn = globals.far_arguments.column;
	// RB && MME - 10-06-2011
	var vElement = globals.far_arguments.element;
	
	if (!vElement) {
		forms[vForm][vColumn] = globals.far_text;
	} else {
		// WARNING: THE ELEMENT MUST BE THE BROWSERSUITE!!!!!!
		forms[vForm].elements[vElement].html = globals.far_text;
	}

	//application.closeFormDialog('replace')
	//SMM - 23-05-2011
	var win = controller.getWindow()
	if (win) {
		win.hide()
	}
}

/**
 * @properties={typeid:24,uuid:"C6A1ED20-87D5-45F4-91A6-DBB8816F6AA0"}
 */
function BTN_search() {
	// zoeken :-)

	var vMatchWord = globals.far_searchText;

	vMatchWord = utils.stringReplace(vMatchWord, '-', '–');

	elements.textBean.requestFocus(true)

	globals.far_indexes = new Array();

	for (var i = 0; i < globals.far_text.length; i++) {
		if (globals.far_text.substring(i, (i) + vMatchWord.length).toLowerCase() == vMatchWord.toLowerCase()) {
			elements.btn_next.enabled = true;
			elements.btn_replace.enabled = true;
			elements.btn_replaceAll.enabled = true;

			elements.textBean.selectionStart = (i)
			elements.textBean.selectionEnd = (i + globals.far_searchText.length)
			globals.far_indexes.push( (i + globals.far_searchText.length));
			return true;
		} else {
			elements.btn_next.enabled = false;
			elements.btn_replace.enabled = false;
			elements.btn_replaceAll.enabled = false;

			elements.textBean.caretPosition = 0

			elements.textBean.selectionStart = 0
			elements.textBean.selectionEnd = 0

			continue;
			//	return false;
		}
	}
	return true
}

/**
 * @properties={typeid:24,uuid:"D91F616F-0EBF-4BF3-9687-925C85C69BC0"}
 */
function FORM_onShow() {
	elements.btn_next.enabled = false;
	elements.btn_replace.enabled = false;
	elements.btn_replaceAll.enabled = false;

	
	var vp = elements.scrollBean.viewport;
	vp.add(elements.textBean);

	elements.scrollBean.horizontalScrollBarPolicy = Packages.javax.swing.ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER

	elements.textBean.wrapStyleWord = true
	elements.textBean.lineWrap = true

	globals.far_text = globals.far_arguments.text
	//globals.far_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nisl lacus, tristique eu hendrerit at, imperdiet sed est. Aliquam erat volutpat. Nunc placerat eros in nisl dictum ut imperdiet diam tincidunt. Donec consequat vestibulum ultricies. Fusce porttitor nibh dictum eros rhoncus sed tempor erat feugiat. Sed hendrerit fringilla eros euismod scelerisque. Vestibulum elementum posuere risus sit amet faucibus. Mauris dapibus velit non ante pellentesque semper. Mauris fermentum lorem a nisi porttitor luctus et nec lacus. Aenean sit amet nisl ut ipsum hendrerit auctor a id elit. Phasellus lobortis, arcu sit amet suscipit facilisis, leo neque pharetra mauris, et tempus velit mauris ac nisl.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nisl lacus, tristique eu hendrerit at, imperdiet sed est. Aliquam erat volutpat. Nunc placerat eros in nisl dictum ut imperdiet diam tincidunt. Donec consequat vestibulum ultricies. Fusce porttitor nibh dictum eros rhoncus sed tempor erat feugiat. Sed hendrerit fringilla eros euismod scelerisque. Vestibulum elementum posuere risus sit amet faucibus. Mauris dapibus velit non ante pellentesque semper. Mauris fermentum lorem a nisi porttitor luctus et nec lacus. Aenean sit amet nisl ut ipsum hendrerit auctor a id elit. Phasellus lobortis, arcu sit amet suscipit facilisis, leo neque pharetra mauris, et tempus velit mauris ac nisl.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nisl lacus, tristique eu hendrerit at, imperdiet sed est. Aliquam erat volutpat. Nunc placerat eros in nisl dictum ut imperdiet diam tincidunt. Donec consequat vestibulum ultricies. Fusce porttitor nibh dictum eros rhoncus sed tempor erat feugiat. Sed hendrerit fringilla eros euismod scelerisque. Vestibulum elementum posuere risus sit amet faucibus. Mauris dapibus velit non ante pellentesque semper. Mauris fermentum lorem a nisi porttitor luctus et nec lacus. Aenean sit amet nisl ut ipsum hendrerit auctor a id elit. Phasellus lobortis, arcu sit amet suscipit facilisis, leo neque pharetra mauris, et tempus velit mauris ac nisl."

	elements.textBean.setText(globals.far_text)

	//scopes.tools.output(elements.textBean.getText(0, 4))

	elements.textBean.selectedTextColor = Packages.java.awt.Color.BLACK;
	elements.textBean.selectionColor = Packages.java.awt.Color.YELLOW;

	elements.textBean.editable = false

	elements.textBean.caretPosition = 0
	elements.textBean.requestFocus(true)

	/*
	 var vPainter = new Packages.java.awt.DefaultHighlighter.DefaultPainter;
	 vPainter = new Packages.java.awt.DefaultHighlighter.DefaultHighlightPainter( Packages.java.awt.Color.GREEN);

	 elements.textBean.Highligter = Packages.java.awt.addHighlighter(0, 4, vPainter)
	 */
}
