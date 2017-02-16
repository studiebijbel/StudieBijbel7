
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AF11F568-CDDD-4387-8511-315636411B6C",variableType:12}
 */
var fv_dataset = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D29A9FA8-01C1-4AEC-889B-5A8CB3EF0A5E"}
 */
function BTN_changeBook(event) {
	if(!book_id)
	{
		forms.import_articleWizard_select_book.fv_form_to = "import_articleWizard_step2_books";
		forms.import_articleWizard_select_book.fv_form_index = foundset.getSelectedIndex();
		
		var vWin = application.createWindow('selectBook', JSWindow.MODAL_DIALOG);
		vWin.setInitialBounds(-1, -1, -1, -1);
		vWin.title = "Select book";
		vWin.show(forms.import_articleWizard_select_book);
		
	}
}
