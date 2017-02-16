/**
 * @properties={typeid:24,uuid:"2FEAE5F1-FB49-4DD9-A649-70D523DA1A1A"}
 */
function BTN_showDetails(event) {
//	if (calc_book_chap_verse) {
		//	globals.wlink( calc_book_chap_verse )
		
	    //SMM - 03-06-2011    
		var win = application.getWindow("search_results1")
		//var win = controller.getWindow()
		if ( win!=null ) {
			win.hide()
		}
	    
		globals.selected_verse_id = verse_id;
		globals.viewVerse(verse_id)
		//globals.setUserSetting('verse_id',verse_id)
		//scopes.tools.output('verse_id is '+ globals.getUserSetting('verse_id'))
		
//	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"93C16D85-FDE4-4300-A59B-B5548403E313"}
 */
function EVENT_onShow(firstShow, event) {
	foundset.sort("verse_translations_to_books.order_number asc");
}
