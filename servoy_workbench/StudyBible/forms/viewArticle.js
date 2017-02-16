/**
 * @properties={typeid:24,uuid:"82866977-a66c-42f1-ab22-9cfa23a605b7"}
 */
function BTN_print() {
	var $ParametersMap = new java.util.HashMap()
		//var vParameters = new Object()
		//vParameters.articles_pk = pk
	//vParameters.VIRTUALIZER_TYPE = "gZip"
 
	$ParametersMap.put('articles_pk', pk)// globals.verse_id)

//	plugins.jasperPluginRMI.reportDirectory = globals.SETTINGS.jasper.report_directory;

	//plugins.jasperPluginRMI.jasperCompile('CVB_articles.jrxml',true)
//	plugins.jasperPluginRMI.ru
//	nReport('sb', 'CVB_articles.jasper', null, 'view', $ParametersMap, true);

	plugins.jasperPluginRMI.runReport('sb', 'CVB_articles.jrxml', null, plugins.jasperPluginRMI.OUTPUT_FORMAT.VIEW, $ParametersMap);
	$ParametersMap.clear()
}

/**
 * @properties={typeid:24,uuid:"42c7983c-364f-4fb8-a78f-c7c25ae5a2ab"}
 * @AllowToRunInFind
 * @param {*} inx
 */
function openArticle(inx) {
	/**************************************************************************************
	 Method:         openArticle

	 Creator         : Adrian Doroiman
	 Modifier        : Karel Broer,  13-10-2008 //set path dynamicly using .servoy/CVB folder

	 Purpose         : Save article html data to article.html and open it in browser

	 Arguments:      -

	 **************************************************************************************/
	if (application.getApplicationType() == APPLICATION_TYPES.SMART_CLIENT) {
		// RB 04-11-2011
		// We have to open multiple article displays!
		if (!globals.pinkenelis) {
			globals.pinkenelis = 1;
		} else {
			globals.pinkenelis++;
		}

		application.createNewFormInstance('viewArticle', 'viewArticle_' + globals.pinkenelis)

		if (utils.stringLeft(currentcontroller.getName(), 8) == "sb_edit_") {
			return
		}

		// The new style :-)
		var vSQL = "SELECT pk FROM articles WHERE pk = ?"
		forms['viewArticle_' + globals.pinkenelis].foundset.loadRecords(vSQL, [arguments[0]])

		var vForm = application.createWindow('viewArticle_' + globals.pinkenelis, JSWindow.DIALOG, null);
		vForm.title = 'i18n:cvb.lbl.articles';

		if (globals.getUserSetting('form_viewArticle_height') && globals.getUserSetting('form_viewArticle_width')) {
			vForm.setInitialBounds(-1, -1, parseInt(globals.getUserSetting('form_viewArticle_width')), parseInt(globals.getUserSetting('form_viewArticle_height')))
		}

		vForm.show(forms['viewArticle_' + globals.pinkenelis]);
	} else if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		// The new style :-)
		vSQL = "SELECT pk FROM articles WHERE pk = ?"
		forms['viewArticle'].foundset.loadRecords(vSQL, [arguments[0]])
		
		forms.viewArticle.elements.article_html.caretPosition = 0;
		forms.viewArticle.elements.article_html.setScroll(0,0);
		
		forms.web_sb_form.elements.tab_notes.tabIndex = 2;
		forms.web_sb_form.elements.tab_notes.visible = true;
	}
}


/**
 * @properties={typeid:24,uuid:"9a3c9e82-d4ee-4be8-a973-1e366f371344"}
 */
function printen() {
	forms.viewArticle.controller.print()
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FC227B17-DC0C-458D-9A94-E9E886E05135"}
 */
function onHide(event) {
	var v_win = application.getWindow(event.getFormName());
	// store size.
	//globals.setUserSetting('form_viewArticle_width',v_win.getWidth());
	//globals.setUserSetting('form_viewArticle_height',v_win.getHeight());
	elements.article_html.setScroll(0, 0);
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9D5A4D28-2671-4384-98F8-C3C8CE1CECF1"}
 */
function BTN_home(event) {
	if(application.getApplicationType() == APPLICATION_TYPES.WEB_CLIENT) {
		forms.web_sb_form.elements.tab_notes.visible = false;
	} else {
		controller.getWindow().hide();
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"ED30DBD3-DFE8-4341-A20B-AAFEF29676AB"}
 */
function onShow(firstShow, event) {
	elements.article_html.caretPosition = 0;
	elements.article_html.setScroll(0, 0);
}
