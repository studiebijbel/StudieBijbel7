
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5B0D76CE-1674-4185-A11F-44C0ADF50AF7"}
 */
 function BTN_changeBook(event) {
		if(!book_id)
		{
			forms.import_articleWizard_select_book.fv_form_to = "import_articleWizard_step2_introbooks";
			forms.import_articleWizard_select_book.fv_form_index = foundset.getSelectedIndex();
			
			var vWin = application.createWindow('selectBook', JSWindow.MODAL_DIALOG);
			vWin.setInitialBounds(-1, -1, -1, -1);
			vWin.title = "Select book";
			vWin.show(forms.import_articleWizard_select_book);
			
		}
	}
