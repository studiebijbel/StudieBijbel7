/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0A4D194E-EA72-4544-B959-1F7C76A28796",variableType:4}
 */
var fv_wordstudies = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DB6B06B6-32D8-49C7-979C-12BF101F7FCD",variableType:4}
 */
var fv_biblebooks = 1;


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9B9BE133-B9F8-4708-A767-1427E61DCAEE"}
 */
function BTN_home(event) {
	globals.sb_searchTransl_tabText = null 
	forms.web_sb_form.elements.tab_notes.visible = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"CF614E29-DD21-4DE0-A4D0-6FE591D33B69"}
 */
function BTN_Cancel(event) {
	// TODO Auto-generated method stub
	BTN_home(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1F06C681-1EAC-4773-AEB7-9F41C5B3DBDC"}
 */
function EVENT_preSearch(event) {
	// sb_gSearchType 1 = Old, 2 = New
	globals.sb_gSearchType = 2;
	
	return _super.EVENT_preSearch(event)
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"87E9427D-7FD3-4CEE-9559-C88E312C0253"}
 */
function EVENT_onLoad(event) {
	_super.BTN_onLoad();
	
	if(globals.sb_APP_getServerLang() == "ESP") {
		globals.sb_search_books_all_ot = 0;
	}
		
	linkStyles();
}

/**
 * @properties={typeid:24,uuid:"6FA9F97E-6617-4635-A713-BAD60786B149"}
 */
function linkStyles(){
	// Link styles
	plugins.WebClientUtils.setExtraCssClass(elements.sb_search_criteria, "cvb-search-bar");
	plugins.WebClientUtils.setExtraCssClass(elements.btn_search, "cvb-search-button");
	
	plugins.WebClientUtils.setExtraCssClass(elements.outline_1, "cvb-search-outline");
	plugins.WebClientUtils.setExtraCssClass(elements.outline_2, "cvb-search-outline");
	plugins.WebClientUtils.setExtraCssClass(elements.outline_2c, "cvb-search-outline");
	plugins.WebClientUtils.setExtraCssClass(elements.outline_2cc, "cvb-search-outline");
	plugins.WebClientUtils.setExtraCssClass(elements.outline_2ccc, "cvb-search-outline");
	plugins.WebClientUtils.setExtraCssClass(elements.outline_2cccc, "cvb-search-outline");
	
	plugins.WebClientUtils.setExtraCssClass(elements.title_1, "cvb-search-title");
	plugins.WebClientUtils.setExtraCssClass(elements.title_1c, "cvb-search-title");
	plugins.WebClientUtils.setExtraCssClass(elements.title_1cc, "cvb-search-title");
	plugins.WebClientUtils.setExtraCssClass(elements.title_2, "cvb-search-title");
	plugins.WebClientUtils.setExtraCssClass(elements.title_3, "cvb-search-title");

	plugins.WebClientUtils.setExtraCssClass(elements.biblebook, "cvb-seach-checkbox");
	plugins.WebClientUtils.setExtraCssClass(elements.wordstudies, "cvb-seach-checkbox");

	plugins.WebClientUtils.setExtraCssClass(elements.txt, "cvb-search-text");
}

/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A3CF7ECF-0EA0-4860-B45C-4C0A98DE8994"}
 */
function EVENT_changeType(oldValue, newValue, event) {
	if(event.getElementName() == "biblebook") {
		fv_biblebooks = 1;
		fv_wordstudies = 0;
		globals.sb_search_in_biblebooks = 1
		globals.sb_search_in_studywords = 0;
		elements.sb_search_books_all_ot.enabled = true;
		elements.sb_search_books_all_otc.enabled = true;
		elements.sb_search_search_translations.enabled = true;
		elements.sb_search_book_translations.enabled = true;
		elements.sb_search_search_spacing.enabled = true;
		elements.sb_search_search_commentary.enabled = true;
		
		
		elements.sb_search_search_footnotes.enabled = true;
		elements.sb_search_search_articles.enabled = true;
		elements.sb_search_commentaryNotes.enabled = true;
		
		if(!globals.sb_search_books_all_ot) {
			elements.sb_search_bible_books.enabled = true;
		}
		if(!globals.sb_search_books_all_nt) {
			elements.sb_search_bible_booksc.enabled = true;
		}
	} else {
		fv_biblebooks = 0;
		fv_wordstudies = 1;
		globals.sb_search_in_biblebooks = 0;
		globals.sb_search_in_studywords = 1;
		
		elements.sb_search_search_translations.enabled = false;
		elements.sb_search_book_translations.enabled = false;
		elements.sb_search_search_spacing.enabled = false;
		elements.sb_search_search_commentary.enabled = false;
		elements.sb_search_books_all_ot.enabled = false;
		elements.sb_search_bible_booksc.enabled = false;
		elements.sb_search_books_all_otc.enabled = false;
		elements.sb_search_bible_books.enabled = false;
		elements.sb_search_search_footnotes.enabled = false;
		elements.sb_search_search_articles.enabled = false;
		elements.sb_search_commentaryNotes.enabled = false;
	}
	return true
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B9B46BC6-E1AA-4D5F-BBA8-CE59120D612E"}
 */
function FORM_onShow(firstShow, event) {
	linkStyles();
	if(globals.sb_APP_getServerLang()=="ESP") { elements.box_ot.visible = false }
	return _super.FORM_onShow(firstShow, event)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2C41E200-FD2F-4F00-AA55-EB9098BB73A5"}
 */
function BTN_toggleNT(event) {
	if(globals.sb_search_books_all_nt == 1) {
		globals.sb_search_books_all_nt = 0;
	} else {
		globals.sb_search_books_all_nt = 1;
	}
	
	BTN_toggleBooks()
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"C0C89CE0-DAEF-420F-9B43-0605C5802901"}
 */
function BTN_toggleOT(event) {
	if(globals.sb_search_books_all_ot == 1) {
		globals.sb_search_books_all_ot = 0;
	} else {
		globals.sb_search_books_all_ot = 1;
	}
	
	BTN_toggleBooks()
}

