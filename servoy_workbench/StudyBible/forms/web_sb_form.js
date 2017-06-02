/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"16F5E079-6BC6-4205-A7AC-27CACDCD75FA",variableType:4}
 */
var fv_savePassword = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9D61DA07-DC27-45F5-9FD1-CD94164FE6AF"}
 */
var fv_synopsis = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8A95660A-9D5C-4DFA-A1AC-C23511F39236"}
 */
var fv_scripts = null;

/**
 * @properties={typeid:35,uuid:"A7599C6D-FDAF-48E9-B6E4-FB084BDA6A87",variableType:-4}
 */
var fv_version = {code:'NBG', pk:'1000002', book:'Nederlands Bijbel Genootschap 1951'};

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5001B1D2-CA42-4B64-8775-EDB8A33468CB"}
 */
var fv_version_display = 'NBG';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BBA03A28-7C37-4345-9FC0-48BFF23EC0A8"}
 */
var fv_versions = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BE127E4D-B5BD-4AB7-B811-C24B8EB3FACE"}
 */
var fv_menu = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9691D126-83F5-4338-B5EF-D24E26DF6F1E"}
 */
var fv_current_host = "";

/**
 * @properties={typeid:35,uuid:"B94204EA-8810-446A-8CB2-0A0472D22AED",variableType:-4}
 * @type {JSEvent}
 */
var fv_trigger_event = null;

/**
 * @properties={typeid:35,uuid:"5374F9DC-D3B1-4004-84E4-31B682783712",variableType:-4}
 */
var fv_chapter_id = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AAF4F68B-AEC0-4718-A8C1-DF13BD5A2783"}
 */
function previousVerse(event) {
	forms.sb_form.previousVerse();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8C5620F0-0735-4607-AB7F-FCD08C5F7DCE"}
 */
function nextVerse(event) {
	forms.sb_form.nextVerse();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C165A301-5F2D-4CF0-9879-320783592B4B"}
 */
function onShow(firstShow, event) {

	// Get default booktranslation
	var vSQL = "SELECT * FROM translation_books WHERE default_book = ?";
	var vDS = databaseManager.getDataSetByQuery("sb", vSQL, [1], 1);
	
	if(vDS.getMaxRowIndex() > 0) {
		/** @type {*} */
		var vRec = vDS[0];
		
		fv_version = {code:vRec.code, pk:vRec.pk, book:vRec.book};
		fv_version_display = vRec.code;
	} else {
		// Fallback, just in case!
		if(globals.sb_APP_getServerLang()== "nl")
		{
			fv_version = {code:'NBG', pk:'1000002', book:'Nederlands Bijbel Genootschap 1951'};
			fv_version_display = 'NBG';
		} else {
			fv_version = {code:'RVR1960', pk:'1000025', book:'Reina Valera 1960'};
			fv_version_display = 'RVR1960';
		}
	}
	
	forms.sb_form.onShow(event);

	styleButtons();
	hideButtons();
	
	var version = globals.getUserSetting('translation_version', JSON.stringify(fv_version)); //"{code:'NBG', pk:'1000002', book:'Nederlands Bijbel Genootschap 1951'}");
	/** @type {*} */
	var vVersion = eval('('+version+')');
	fv_version = version;
	fv_version_display = vVersion.code;
	
	if (!globals.testamentFirstTime) {
		
		var vTextVersion = globals.getUserSetting('text_version', null);
		
		if(vTextVersion)
		{
			globals.text_version = vTextVersion;
			
		}
		
		globals.selected_verse_id =  globals.getUserSetting('verse_id', null) //SMM - 10-06-2011
		if (globals.selected_verse_id) {					
			globals.viewVerse(globals.selected_verse_id)
		}
		else {		
			globals.selected_verse_id = 1
			forms.sb_form.selectVerseId();
		}
		globals.testamentFirstTime = true;	
	}
		
	// Try to reload the chapter information so not the "NBG"-default is loaded
	EVENT_reloadChapter();
	
	globals.sb_gSelectedVersion = vVersion.pk;
	
	//SMM - 16-06-2011
	globals.griek_version = globals.getUserSetting('griek_version', null)
	globals.heb_version = globals.getUserSetting('hebrew_version', null)
	globals.text_version = globals.getUserSetting('text_version', 'TR')

	// RB - 18-03-2013
	globals.SET_wordStudyVerion(globals.sb_gTestament);
	
	
}

/**
 * @properties={typeid:24,uuid:"A121EBD0-3767-42CB-A584-B469117D4943"}
 * @private
 */
function styleButtons() {
	
	// Default buttons
	var vButtonsToStyle = {
		//  'btn_user', 'btn_search', 'btn_notes'
		study_words:['btn_edit', 'btn_print', 'btn_version', 'btn_read'],
		verse_translation:['btn_print', 'btn_choose', 'btn_edit', 'btn_read'],
		book_comment:['btn_edit', 'btn_print', 'btn_read'],
		word_study:['btn_edit', 'btn_version', 'btn_section', 'btn_print', 'btn_read'],
		web_sb_articles:['btn_print'],
		book_notes:['btn_print', 'btn_read'],
		web_sb_usernotes_tab:['btn_home'],
		web_sb_usernotes_detail:['btn_delete'],
		viewArticle:['btn_print', 'btn_home'],
		web_sb_book_notes:['btn_print', 'btn_home'],
		web_sb_read:['btn_print', 'btn_home'],
		web_sb_search:['btn_home', 'btn_cancel'],
		web_user_notes:['btn_new', 'btn_open'],
		web_sb_chapter:['btn_read'],
		web_sb_my_account:['btn_home', 'btn_save'],
		web_sb_webbrowser:['btn_home'],
	}
	
	for(var key in vButtonsToStyle) {
		/** @type {*} */
		var obj = vButtonsToStyle[key];
		for (var prop in obj) {
			if(obj.hasOwnProperty(prop)){
				plugins.WebClientUtils.setExtraCssClass(forms[key].elements[obj[prop]], 'btn btn-default-cvb btn-default ' + obj[prop]);
			}
		}
	}
	
	// Non bordered buttons
	vButtonsToStyle = {
		web_sb_form:[ 'btn_prev', 'btn_next', 'btn_user', 'btn_search', 'btn_notes']
	}
	
	for(key in vButtonsToStyle) {
		/** @type {*} */
		obj = vButtonsToStyle[key];
		for (prop in obj) {
			if(obj.hasOwnProperty(prop)){
				plugins.WebClientUtils.setExtraCssClass(forms[key].elements[obj[prop]], 'btn btn-noborder  ' + obj[prop]);
			}
		}
	}

	// The topbarbuttons
	vButtonsToStyle = {
		web_sb_form:['btn_version', 'btn_book', 'btn_chapter', 'btn_verse', 'btn_prevverse', 'btn_nextverse']
	};
	
	for(key in vButtonsToStyle) {
		/** @type {*} */
		obj = vButtonsToStyle[key];
		for (prop in obj) {
			if(obj.hasOwnProperty(prop)){
				plugins.WebClientUtils.setExtraCssClass(forms[key].elements[obj[prop]], 'btn btn-cvb-header ' + obj[prop]);
			}
		}
	}
		
	var vReadBetter = {
		book_comment:['commentary'],
		word_study:['commentary']
	}
	
	for(key in vReadBetter) {
		/** @type {*} */
		obj = vReadBetter[key];
		for (prop in obj) {
			if(obj.hasOwnProperty(prop)){
				plugins.WebClientUtils.setExtraCssClass(forms[key].elements[obj[prop]], 'cvb-read-better ' + obj[prop]);
			}
		}
	}
//
	
	plugins.WebClientUtils.setExtraCssClass(elements.html_usermenu, "cvb-usermenu");
	plugins.WebClientUtils.setExtraCssClass(elements.html_version, "cvb-menu");
	plugins.WebClientUtils.setExtraCssClass(elements.lbl_top_hdr, "cvb-top-header");
	plugins.WebClientUtils.setExtraCssClass(elements.tabber, "cvb-tab-container");
	
	// 
	plugins.WebClientUtils.setExtraCssClass(forms.viewArticle.elements.article_html,"cvb-size-font");
	plugins.WebClientUtils.setExtraCssClass(forms.web_sb_book_notes.elements.hmtl,"cvb-size-font");
	plugins.WebClientUtils.setExtraCssClass(forms.web_sb_read.elements.html,"cvb-size-font");
}

/**
 * @properties={typeid:24,uuid:"4D782BC4-B858-4109-B846-F126C54D781C"}
 * @private 
 * 
 */
function hideButtons() {
	
	// Default buttons
	var vButtonsToStyle = {
		study_words:['btn_edit'],
		verse_translation:['btn_edit'],
		book_comment:['btn_edit', 'btn_notes'],
		word_study:['btn_edit'],
		web_sb_articles:['btn_print']
	}
	
	for(var key in vButtonsToStyle) {
		/** @type {*} */
		var obj = vButtonsToStyle[key];
		for (var prop in obj) {
			if(obj.hasOwnProperty(prop)){
				forms[key].elements[obj[prop]].visible = false
			}
		}
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @private
 *
 * @properties={typeid:24,uuid:"E9B19C5D-5A76-47A9-AD18-522F724427FA"}
 */
function BTN_myNotes(event) {
	var vSQL = "SELECT usernote_id FROM usernotes WHERE user_id = ?";
	forms.web_sb_usernotes_tab.foundset.loadRecords(vSQL, [globals.sb_gCurrentUserID]);
	
	elements.tab_notes.tabIndex = 1;
	elements.tab_notes.visible = true;

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5D31BDA5-5982-449C-8981-F0D36B76C65C"}
 */
function BTN_showVersions(event) {
	if(elements.html_version.visible == true && fv_current_host == event.getElementName())
	{
		elements.backdrop.visible = false;
		elements.html_version.visible = false;
		return true;
	}
	var vRec;
//	var vPartial = "";
	var vIntegral = "";	
	// We need to get the integral and partial translations
	var vSQL = "SELECT pk, book, code, copyrights FROM translation_books WHERE show_online = 1 AND nt_scope = ? ORDER BY nt_order ASC";
	
//	var vCallBack = plugins.WebClientUtils.
	
	// Integral = 
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, [1], 100);
	//scopes.tools.output("Integrale boeken: "+ vDS.getMaxRowIndex());
	for(var i = 0; i < vDS.getMaxRowIndex(); i++) {
		vRec = vDS[i];
				
		vIntegral += '<div class="btn-chooser">\
			<div onclick="SelectVersion(\'{code:\\\'' + vRec['code'] + '\\\', pk:\\\'' + vRec['pk'] + '\\\', book:\\\'' + vRec['book'] + '\\\'}\')" class="version-item '+((vRec['code'] == fv_version_display)?"active":"")+'">\
			<p class="abbr">' + vRec['code'] + '</p>\
			<p class="book">' + vRec['book'] + '</p>\
			' + ((vRec['copyrights'])?"<span class=\"copyrights\">" + vRec['copyrights'] + "</span>":"") +' \
			</div></div>';
	}
	/*
	vDS = databaseManager.getDataSetByQuery('sb', vSQL, [2], 100);
	//scopes.tools.output("Partiele boeken: "+ vDS.getMaxRowIndex());
	for(i = 0; i < vDS.getMaxRowIndex(); i++) {
		vRec = vDS[i];
	
		vPartial += '<div class="btn-chooser"><div onclick="SelectVersion(\'{code:\\\'' + vRec['code'] + '\\\', pk:\\\'' + vRec['pk'] + '\\\', book:\\\'' + vRec['book'] + '\\\'}\')" class="version-item '+((vRec['code'] == fv_version_display)?"active":"")+'"><p class="abbr">' + vRec['code'] + '</p><p class="book">' + vRec['book'] + '</p></div></div>';
	}*/
	
	fv_versions = '<div class="bg-info">' + i18n.getI18NMessage('CVB.lbl.integralTrans') + '</div><div class="books translation">'+vIntegral+'</div>';
	
//	fv_versions = '<div class="bg-info">' + i18n.getI18NMessage('CVB.lbl.integralTrans') + '</div><div class="books translation">'+vIntegral+'</div><br />\
//	<div class="bg-info">' + i18n.getI18NMessage('cvb.lbl.partialtranslation') + '</div><div class="books translation">'+vPartial+'</div>';

	
	elements.html_version.setSize(445, 355);
	showHtmlPopup(event);return true;
}

/**
 * @properties={typeid:24,uuid:"6BD4184D-7B6C-4A43-B486-7DE895D8B1E0"}
 * @param {JSEvent} event
 * @param {String} [type]
 */
function showHtmlPopup(event, type) {
	fv_trigger_event = event;
	// Calculate the place where it should be!
	// My position
	var vElement = elements[event.getElementName()];
	
	fv_current_host = event.getElementName();
	elements.backdrop.visible = true;
	
	if(!type) {
		elements.html_version.setLocation((vElement.getLocationX()-120), 55);
		if(elements.html_usermenu.visible == true) {
			elements.html_usermenu.visible = false;
		}
		elements.html_version.visible = true;
	} else {
		if(globals.sb_APP_getServerLang()=="NL") {
			elements.html_usermenu.setLocation(vElement.getLocationX()-185, 55);
		} else {
			elements.html_usermenu.setLocation(vElement.getLocationX()-250, 55);
		}
		if(elements.html_version.visible == true) {
			elements.html_version.visible = false;
		}
		elements.html_usermenu.visible = true;
	}
}

/**
 * @param version
 *
 * @properties={typeid:24,uuid:"6F592722-9D02-4DD3-A4B2-0AE187984A30"}
 */
function EVENT_selectVersion(version) {
	
	/** @type {*} */
	var vVersion = eval('('+version+')');
	fv_version = version;
	
	fv_version_display = vVersion.code;
	globals.sb_gSelectedVersion = vVersion.pk;
	
	globals.setUserSetting('translation_version', version);
	
	EVENT_reloadChapter();
	elements.html_version.visible = false;
}

/**
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6ED1A61E-7888-4C44-B2B3-9AD587568A7D"}
 */
function onLoad(event) {
	if(globals.sb_APP_getServerLang()=="ESP") {
		elements.cvb_logo_nl.visible = false;
		elements.cvb_logo_esp.visible = true;
	}
	
	plugins.WebClientUtils.addJsReference('https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');
	plugins.WebClientUtils.addJsReference("/bootstrap/StudyBible.js");
	history.clear();
	plugins.WebClientUtils.executeClientSideJS("var ret = DetectViewPort()", EVENT_jsCallback, ['ret']);
	plugins.WebClientUtils.executeClientSideJS("var MobDev = DetectMobileDevice()", EVENT_mobileCallback, ['MobDev']);

//<meta name="viewport" content="width=device-width, user-scalable=no" />
// <meta name="viewport" content="width=device-width, initial-scale=0.9, user-scalable=yes"> << GHOEIE
}

/**
 * TODO generated, please specify type and doc for the params
 * @param inp
 *
 *
 * @properties={typeid:24,uuid:"4598AE15-095A-496F-A408-65D6B216B6BE"}
 */
function EVENT_mobileCallback(inp) {
	var a = 0;
	globals.is_mobile_device = (inp=="true")?true:false;
	
	if(globals.is_mobile_device) {
		
		// Hide all the print buttons for the default shown forms
		var vForms = ["book_comment", "book_notes", "verse_translation", "viewArticle"];
		for(var i in vForms) {
			if(forms[vForms[i]].elements['btn_print']) {
				forms[vForms[i]].elements['btn_print'].enabled = false;
				plugins.WebClientUtils.setExtraCssClass(forms[vForms[i]].elements['btn_print'], "btn btn-default-cvb btn-default disabled");
				//forms[vForms[i]].elements['btn_print'].visible = false;
			}

			
		}
		
		var vForms = ["study_words","word_study"];
		for(var i in vForms) {
			if(forms[vForms[i]].elements['btn_print']) {
				forms[vForms[i]].elements['btn_print'].visible = false;
			}
			
			// Move some elements
			if(forms[vForms[i]].elements['group_buttons']) {
				var x = forms[vForms[i]].elements['group_buttons'].getLocationX();
				var y = forms[vForms[i]].elements['group_buttons'].getLocationY();
				forms[vForms[i]].elements['group_buttons'].setLocation(((x)+105),y)
			}
			
		}
	}
}

/**
 * TODO generated, please specify type and doc for the params
 * @param inp
 *
 * @properties={typeid:24,uuid:"6E085F54-3B35-4787-8EF0-4031FB5723E2"}
 */
function EVENT_jsCallback(inp) {
	scopes.tools.output("jsCallback method called!");
	inp = JSON.parse(inp);
	
	var vSelectVersion = plugins.WebClientUtils.generateCallbackScript(EVENT_selectVersion, ['arg1'], true);
	var vSelectBook = plugins.WebClientUtils.generateCallbackScript(EVENT_selectBook, ['book'], true);
	var vSelectChapter = plugins.WebClientUtils.generateCallbackScript(EVENT_selectChapter, ['chapter'], true);
	var vSelectVerse = plugins.WebClientUtils.generateCallbackScript(EVENT_selectVerse, ['verse'], true);
	var vChangeSelector = plugins.WebClientUtils.generateCallbackScript(EVENT_changeSelector, ['selector'], true);
	var script = 'function ChangeSelector(selector){' + vChangeSelector + '}; function SelectVersion(arg1){' + vSelectVersion + '}; function SelectBook(book){' + vSelectBook + '} function SelectChapter(chapter){' + vSelectChapter + '}  function SelectVerse(verse){' + vSelectVerse + '}';
	fv_scripts = '<html><head><script type="text/javascript">' + script + '</script><meta id="Viewport" name="viewport" content="width=' + inp.width + ', initial-scale=' + inp.scale + ', user-scalable=yes"></head></html>' // <link rel="icon" type="image/png" href="/favicon.png">
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} [visible]
 *
 * @properties={typeid:24,uuid:"A33080AA-01A3-44A6-A429-3BA1D87298D0"}
 */
function BTN_showBooks(event, visible) {
	if(elements.html_version.visible == true && fv_current_host == event.getElementName() && !visible)
	{
		elements.backdrop.visible = false;
		elements.html_version.visible = false;
		return true;
	}
	
	//setBookIdNew
	var vRec;
	var vOT = "";
	var vNT = "";
	
	var vSQL = "SELECT abbreviation, book_name, pk FROM books WHERE testament = ? AND show_in_nav = 1 ORDER BY order_number ASC";
	
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, ['Old'], 100);
	//scopes.tools.output("Integrale boeken: "+ vDS.getMaxRowIndex());
	for(var i = 0; i < vDS.getMaxRowIndex(); i++) {
		vRec = vDS[i];
		vRec['abbreviation'] = utils.stringReplace(vRec['abbreviation'], '.','');
		vOT += '<div class="btn-chooser"><span onclick="SelectBook(\'' + vRec['book_name'] + '\')" class="btn btn-default btn-cvb ' + ((globals.book == vRec['book_name'])?"btn-active":"") + ' col-xs-12">' + vRec['abbreviation'] + '</span></div>';
	}
	
	vDS = databaseManager.getDataSetByQuery('sb', vSQL, ['New'], 100);
	//scopes.tools.output("Integrale boeken: "+ vDS.getMaxRowIndex());
	for(i = 0; i < vDS.getMaxRowIndex(); i++) {
		vRec = vDS[i];
		vRec['abbreviation'] = utils.stringReplace(vRec['abbreviation'], '.','');
		vNT += '<div class="btn-chooser"><span onclick="SelectBook(\'' + vRec['book_name'] + '\')" class="btn btn-default btn-cvb ' + ((globals.book == vRec['book_name'])?"btn-active":"") + ' col-xs-12">' + vRec['abbreviation'] + '</span></div>';
	}
	
	fv_versions = '<div class="bg-header"><div class="bg-info">' + i18n.getI18NMessage('cvb.lbl.chooseverse') + '</div>\
	<div class="row">\
		<div class="col-xs-12">\
			<span class="btn btn-active btn-cvb-top col-xs-4"><strong>' + i18n.getI18NMessage('cvb.lbl.book') + '</strong><br />' + globals.book + '</span>\
			<span class="btn btn-default btn-cvb-top col-xs-3"  onclick="ChangeSelector(\'chapter\');"><strong>' + i18n.getI18NMessage('cvb.lbl.chapter') + '</strong><br />' + globals.chapter + '</span>&nbsp;\
			<span class="btn btn-default btn-cvb-top col-xs-3"  onclick="ChangeSelector(\'verse\');"><strong>' + i18n.getI18NMessage('cvb.lbl.verse') + '</strong><br />' + globals.verse + '</span><br />\
		</div>\
	</div></div>';
	if(vOT) {
		fv_versions += '<div class="bg-label">' + i18n.getI18NMessage('cvb.lbl.ot') + '</div><div class="row books">'+vOT+'</div>';
	} 
	if(vNT) {
		fv_versions += '<div class="bg-label">' + i18n.getI18NMessage('cvb.lbl.nt') + '</div><div class="row books">'+vNT+'</div><br />';
	}
	elements.html_version.setSize(540, 535);
	showHtmlPopup(event)
	return true;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param book
 *
 * @properties={typeid:24,uuid:"E2624DD0-EB31-4FEA-BD38-6009FE8A5A5A"}
 */
function EVENT_selectBook(book) {
	forms.sb_form.setBookIdNew(null, null, null, null, null, {text: book});
	
	BTN_showChapters(fv_trigger_event, true);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} [visible]
 *
 * @properties={typeid:24,uuid:"1F05D716-256C-487F-B056-51A533725A39"}
 */
function BTN_showChapters(event, visible) {
	if(elements.html_version.visible == true && fv_current_host == event.getElementName() && !visible)
	{
		elements.html_version.visible = false;
		return true;
	}
	
	var vChapters = ""; var vRec;
	var vSQL = "SELECT chapter_no, pk FROM chapters WHERE book_id = ? ORDER BY chapter_no ASC";	
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, [globals.book_id], 10000);
	for(var i = 0; i < vDS.getMaxRowIndex(); i++) {
		vRec = vDS[i];
				
		vChapters += '<div class="btn-chooser"><span onclick="SelectChapter(\'' + vRec['chapter_no'] + '\')" class="btn btn-default  btn-cvb ' + ((globals.chapter == vRec['chapter_no'])?"btn-primary":"") + ' col-xs-12">' + vRec['chapter_no'] + '</span></div>';
	}
	
	fv_versions = '<div class="bg-header"><div class="bg-info">' + i18n.getI18NMessage('cvb.lbl.chooseverse') + '</div>\
	<div class="row">\
	<div class="col-xs-12">\
			<span class="btn btn-default btn-cvb-top col-xs-4" onclick="ChangeSelector(\'book\');"><strong>' + i18n.getI18NMessage('cvb.lbl.book') + '</strong><br />' + globals.book + '</span>\
			<span class="btn btn-active btn-cvb-top col-xs-3"><strong>' + i18n.getI18NMessage('cvb.lbl.chapter') + '</strong><br />' + globals.chapter + '</span>&nbsp;\
			<span class="btn btn-default btn-cvb-top col-xs-3"  onclick="ChangeSelector(\'verse\');"><strong>' + i18n.getI18NMessage('cvb.lbl.verse') + '</strong><br />' + globals.verse + '</span><br />\
		</div>\
	</div></div>\
	<br /><div class="row books">'+vChapters+'</div><br />';
	
	elements.html_version.setSize(540, 535);
	showHtmlPopup(event);
	return true;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param chapter
 *
 * @properties={typeid:24,uuid:"39C94080-CAAD-41BC-B4B5-64B57D3251C4"}
 */
function EVENT_selectChapter(chapter) {
	forms.sb_form.setChapterIdNew(null, null, null, null, null, {text: chapter});
	BTN_showVerses(fv_trigger_event, true);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param verse
 *
 * @properties={typeid:24,uuid:"77DD48B9-FEC8-4D87-B78F-F0FAB90F6BA9"}
 */
function EVENT_selectVerse(verse) {
	forms.sb_form.setVerseIdNew(null, null, null, null, null, {text: verse});
	BTN_closeBackdrop(new JSEvent);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} [visible]
 *
 * @properties={typeid:24,uuid:"7191A258-5B69-4A43-B458-8A78A7CA8B79"}
 */
function BTN_showVerses(event, visible) {
	if(elements.html_version.visible == true && fv_current_host == event.getElementName() && !visible)
	{
		elements.html_version.visible = false;
		return true;
	}
	
	var vChapters = ""; var vRec;
	var vSQL = "SELECT verse_number, pk FROM verses WHERE chapter_id = ? ORDER BY verse_number ASC";	
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, [globals.chapter_id], 10000);
	for(var i = 0; i < vDS.getMaxRowIndex(); i++) {
		vRec = vDS[i];
				
		vChapters += '<div class="btn-chooser"><span onclick="SelectVerse(\'' + vRec['verse_number'] + '\')" class="btn btn-default btn-cvb ' + ((globals.verse == vRec['verse_number'])?"btn-primary":"") + ' col-xs-12">' + vRec['verse_number'] + '</span></div>';
	}
		
	fv_versions = '<div class="bg-header"><div class="bg-info">' + i18n.getI18NMessage('cvb.lbl.chooseverse') + '</div>\
	<div class="row">\
	<div class="col-xs-12">\
			<span class="btn btn-default btn-cvb-top col-xs-4" onclick="ChangeSelector(\'book\');"><strong>' + i18n.getI18NMessage('cvb.lbl.book') + '</strong><br />' + globals.book + '</span>\
			<span class="btn btn-default btn-cvb-top col-xs-3" onclick="ChangeSelector(\'chapter\');"><strong>' + i18n.getI18NMessage('cvb.lbl.chapter') + '</strong><br />' + globals.chapter + '</span>&nbsp;\
			<span class="btn btn-active btn-cvb-top col-xs-3" ><strong>' + i18n.getI18NMessage('cvb.lbl.verse') + '</strong><br />' + globals.verse + '</span><br />\
		</div>\
	</div></div>\
	<br /><div class="row books">'+vChapters+'</div><br />';
	
	elements.html_version.setSize(540, 535);
	showHtmlPopup(event);
	return true;
}

/**
 * @param selector
 *
 * @properties={typeid:24,uuid:"D37E2BC9-72A8-4149-A92E-CC8FDE3CA9E6"}
 */
function EVENT_changeSelector(selector) {
	switch(selector) {
		case "book":
			BTN_showBooks(fv_trigger_event, true);
		break;
			
		case "chapter":
			BTN_showChapters(fv_trigger_event, true);
		break;
			
		case "verse":
			BTN_showVerses(fv_trigger_event, true);
		break;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2D3F4D00-79E4-4A9D-8615-03682FB61750"}
 */
function BTN_prev(event) {
	forms.sb_form.BTN_back();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1F0C45CF-E0ED-44A1-BA96-47389BF4697F"}
 */
function BTN_next(event) {
	forms.sb_form.BTN_forward();
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9A006462-5A36-4237-8AF9-D6E4707935DA"}
 */
function EVENT_onRecordSelection(event) {
	forms.synopsis_form.getSynopsis();

	if(fv_chapter_id != chapter_id && fv_chapter_id != null) {
		EVENT_reloadChapter();
	}

	// We need to do some stuff to get all the verses in one chapter!
	if(fv_chapter_id == null) {
		fv_chapter_id = chapter_id;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F45D463B-5EF9-43D1-A1C3-747586656C5A"}
 */
function BTN_search(event) {
	elements.tab_notes.tabIndex = 5;
	elements.tab_notes.visible = true;
}

/**
 * @properties={typeid:24,uuid:"22FCD5BC-ACE1-4CBF-B6AA-45951CB6F731"}
 */
function EVENT_reloadChapter()
{
	
	/** @type {*} */
	var vVersion = null;
	try {
		vVersion = eval('(' + fv_version + ')');
	} catch(e) {
		vVersion = fv_version;
	}
	
	
	// We have to change the information now!
	//vt.translation_book_id = ? \
	var vSQL = "SELECT\
	    bt.book, v.verse_number, vt.*\
	FROM\
	    verse_translations AS vt\
	RIGHT JOIN verses AS v ON vt.verse_id = v.pk\
	RIGHT JOIN translation_books AS bt ON vt.translation_book_id = bt.pk\
	WHERE\
	    vt.translation_book_id = ? \
	AND\
	        vt.verse_id IN (SELECT pk FROM verses AS v WHERE (v.calc_book_name = ? AND v.chapter_number = ? AND (v.verse_number BETWEEN ? AND ?)) ORDER BY v.verse_number ASC)\
	ORDER BY v.verse_number ASC";
	
	var vDS = databaseManager.getDataSetByQuery('sb',vSQL, [parseInt(vVersion.pk), globals.book, globals.chapter, 1, 999], -1);
	
	var vPrintArray = [], vRecord;
	var vBook = "";
	for(var i = 0; i < vDS.getMaxRowIndex(); i++)
	{
		vRecord = vDS[i];
		if(i == 0) { vBook = vRecord["book"]; }
			vPrintArray.push("<strong>Vers " + vRecord["verse_number"] + "</strong>&nbsp;&nbsp;" + vRecord["transl_text"]);
	}
	
	var vPrintText = "<html><body>" + i18n.getI18NMessage('cvb.lbl.bible_translation') + " <em>"+vBook+"</em><br /><br />" +vPrintArray.join('<br />')+"</body></html>";
	vPrintArray = null;
	
	forms.web_sb_chapter.fv_html = vPrintText;
	vPrintText = null;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} [visible]
 * @properties={typeid:24,uuid:"0D7E3637-48DE-477B-AA53-85BCA5AC7B56"}
 */
function BTN_userMenu(event, visible) {
	if(elements.html_usermenu.visible == true && fv_current_host == event.getElementName() && !visible)
	{
		elements.html_usermenu.visible = false;
		return true;
	}
	
	//if(!Packages.org.apache.wicket.RequestCycle.get().getClientInfo().getUserAgent().match(/Android/)) {
		var vHTML = '<div class="">';
		
		vHTML += '<div class="col-xs-12"><a href="javascript:globals.openHelpURL()" class="user-menu-btn"><img src="media:///newui/SB-icn-help-64x64.png" width="29" style="margin-left:5px; margin-right: 10px;" />' + i18n.getI18NMessage('CVB.lbl.help') + '</a></div>';	
		if(globals.sb_APP_getServerLang() != "ESP") {
			vHTML += '<div class="col-xs-12"><a href="javascript:globals.openPdf()" class="user-menu-btn"><img src="media:///newui/download62.png" width="40"/> Grammatica NT</a></div>';
		}
		vHTML += '<div class="col-xs-12"><a href="javascript:forms.sb_form.openMail()" class="user-menu-btn"><img src="media:///newui/exclamation8.png" width="40"/> ' + i18n.getI18NMessage('cvb.title.suggestionForImprovement') + '</a></div>\
		<div class="col-xs-12"><a href="javascript:globals.openAbout()" class="user-menu-btn"><img src="media:///newui/information35.png" width="40"/> ' + i18n.getI18NMessage('cvb.lbl.about_studybible') + '</a></div>\
		<div class="col-xs-12"><a href="javascript:forms.web_sb_form.MyAccount()" class="user-menu-btn"><img src="media:///newui/mijn_account.png" width="40"/> ' + i18n.getI18NMessage('cvb.lbl.my_account') + '</a></div>\
		<div class="col-xs-12"><a href="javascript:globals.exitApp()" class="user-menu-btn"><img src="media:///newui/power27.png" width="40"/> ' + i18n.getI18NMessage('cvb.lbl.logout') + '</a></div>\
		<div class="col-xs-12 user-menu-copy">Versie ' + globals.sb_gVersion + ' &copy; 2016</div>\
		</div>';
//	} else {
//		var vHTML = '<div class="menu-items">\
//			<div class="col-xs-12"><a href="javascript:forms.sb_form.openMail()" class="btn btn-default btn-align-left">Meld een probleem</a></div>\
//			<div class="col-xs-12"><a href="javascript:globals.openAbout()" class="btn btn-default btn-align-left">Over StudieBijbel</a></div>\
//			<hr />\
//			<div class="col-xs-12"><a href="javascript:globals.exitApp()" class="btn btn-default btn-align-left">Afmelden</a></div>\
//			</div>';
//	}
	
	fv_menu = "<html><body>" + vHTML + "</body></html>";
	
	if(globals.sb_APP_getServerLang()=="NL") {
		elements.html_usermenu.setSize(260, 325);
	} else {
		elements.html_usermenu.setSize(310, 325);
	}
	showHtmlPopup(event, "menu");
	return true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"981C988C-96A0-4083-BC16-F73F8258C44D"}
 */
function BTN_closeBackdrop(event) {
	elements.html_usermenu.visible = false;
	elements.html_version.visible = false
	elements.backdrop.visible = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"5AC53388-E52D-4095-B0F4-87B2007A9433"}
 */
function BTN_loadSynopsis(event) {
	if(!fv_synopsis) {
		fv_synopsis = plugins.http.getPageData("https://web.bibliadeestudio.org/synopsis/index.html");
		//fv_synopsis = plugins.http.getPageData(application.getServerURL()+"/synopsis/index.html");
	}
	
	forms.web_sb_read.fv_title = "Synopsis";
	forms.web_sb_read.fv_html = fv_synopsis;
	forms.web_sb_read.fv_print = null;
	
	forms.web_sb_form.elements.tab_notes.tabIndex = 4;
	forms.web_sb_form.elements.tab_notes.visible = true;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"35A9A645-FD5C-419F-8810-20C5FA477847"}
 */
function onAction(event) {
	
	var script = 'DetectViewPort()';
	plugins.WebClientUtils.executeClientSideJS(script);
}

/**
 * @properties={typeid:24,uuid:"D4DBC2EB-77FB-4858-96AA-308F21958AD1"}
 */
function MyAccount() {
	scopes.tools.output("MyAccount called!");
	forms.web_sb_form.elements.tab_notes.tabIndex = 6;
	forms.web_sb_form.elements.tab_notes.visible = true;
}
