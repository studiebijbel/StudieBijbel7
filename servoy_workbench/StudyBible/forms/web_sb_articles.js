/**
 * @properties={typeid:35,uuid:"430BF009-E88C-4FA6-A614-6B451A6575D4",variableType:-4}
 */
var ARTICLE_TYPES = {LINKED:1, ALL:2};

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"290F0DD4-9343-4131-A65C-0B8B000A132C",variableType:4}
 */
var fv_show_type = ARTICLE_TYPES.LINKED;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D1F3F0C7-9C92-40E9-843D-CD945E060EAC"}
 */
var fv_html = null;


/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 * @param {Number} [book_id]
 * @properties={typeid:24,uuid:"F3CBCA93-E336-4C0A-B439-E3D4A52935A0"}
 */
function EVENT_onShow(firstShow, event, book_id) {
	var temp;
	if(fv_show_type === ARTICLE_TYPES.LINKED) {
		temp = getLinkedInleidingen(book_id);
		temp += getLinkedArticles(book_id);
		fv_html = '<html><body><table cellpadding=\"0\" cellspacing=\"0\">' + temp + '</table></body></html>'
	} else if (fv_show_type === ARTICLE_TYPES.ALL) {
		temp = getAll();
		fv_html = '<html><body><table cellpadding=\"0\" cellspacing=\"0\">' + temp + '</table></body></html>'
	}
	
	// CHange valuelist
	application.setValueListItems('article_types',[i18n.getI18NMessage('cvb.lbl.articles') + " " + globals.book, i18n.getI18NMessage('cvb.lbl.all_articles')], [1,2]);
}


/**
 * @properties={typeid:24,uuid:"7E0C5375-D4C7-4F25-B832-7A0D6B821B5C"}
 * @param {Number} [book_id]
 */
function getLinkedArticles(book_id) {
	/*var query = "select distinct article_id from book_article where book_id = ? order by article_id"
	var res1 = databaseManager.getDataSetByQuery("sb", query, [(book_id)?book_id:globals.book_id], -1)
	
	var temp = ""
	for(var i = 0; i < res1.getMaxRowIndex(); i++){
		var row = res1[i];
		var res = databaseManager.getDataSetByQuery('sb','select pk, filename from articles where pk = ?',[row['article_id']],1)
		res.rowIndex = 1	
		if( res.getValue(1,2) != null && res.getValue(1,2) != '')
		{	
			temp += '<tr><td><a href=\"javascript:forms.viewArticle.openArticle('
			temp += res.getValue(1,1)
			temp += ')\"><font color="#000000">'
			temp += res.getValue(1,2)
			temp += '</font></a></td></tr>'
		}
	}*/
	
	var temp = "";
	var vSQL = "SELECT pk, filename FROM articles WHERE pk IN (SELECT DISTINCT article_id FROM book_article WHERE book_id = ?) ORDER BY filename ASC";
	var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [(book_id)?book_id:globals.book_id], -1);
	var vRec;
	for(var i = 0; i< vResult.getMaxRowIndex(); i++) {
		vRec = vResult[i];
		if(vRec['filename'] != null && vRec['filename'] != '') {
			temp += '<tr><td><a href=\"javascript:forms.viewArticle.openArticle('
			temp += vRec['pk']
			temp += ')\"><font color="#000000">'
			temp += vRec['filename']
			temp += '</font></a></td></tr>'
		}
	}
	
	return temp;
}

/**
 * TODO generated, please specify type and doc for the params
 * @param book_id
 *
 * @properties={typeid:24,uuid:"3963313C-C0AB-45F1-820A-16493D491F60"}
 */
function getLinkedInleidingen(book_id) {
//	var query = "select distinct article_id from book_inleiding where book_id = ? order by article_id"
//	var res1 = databaseManager.getDataSetByQuery("sb", query, [(book_id)?book_id:globals.book_id], -1)
//	
//	var temp = ""
//	for(var i = 0; i < res1.getMaxRowIndex(); i++){
//		var row = res1[i];
//		var res = databaseManager.getDataSetByQuery('sb','select pk, filename from articles where pk = ?  ORDER BY filename ASC',[row['article_id']],1)
//		res.rowIndex = 1	
//		if( res.getValue(1,2) != null && res.getValue(1,2) != '')
//		{	
//			temp += '<tr><td><a href=\"javascript:forms.viewArticle.openArticle('
//			temp += res.getValue(1,1)
//			temp += ')\"><font color="#000000">'
//			temp += res.getValue(1,2)
//			temp += '</font></a></td></tr>'
//		}
//	}

	var temp = "";
	var vSQL = "SELECT pk, filename FROM articles WHERE pk IN (select distinct article_id from book_inleiding where book_id = ?) ORDER BY filename ASC";
	var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [(book_id)?book_id:globals.book_id], -1);
	var vRec;
	for(var i = 0; i< vResult.getMaxRowIndex(); i++) {
		vRec = vResult[i];
		if(vRec['filename'] != null && vRec['filename'] != '') {
			temp += '<tr><td><a href=\"javascript:forms.viewArticle.openArticle('
			temp += vRec['pk']
			temp += ')\"><font color="#000000">'
			temp += vRec['filename']
			temp += '</font></a></td></tr>'
		}
	}
	
	return temp;
}

/**
 * @properties={typeid:24,uuid:"AD890C95-9707-40EB-ABC1-6EECE539A3D3"}
 */
function getAll() {
	var temp = "";
	var res = databaseManager.getDataSetByQuery('sb','select pk, filename from articles ORDER BY filename ASC',[],-1)
	for(var i = 0; i < res.getMaxRowIndex(); i++){
		var row = res[i];
		if(res.getValue(1,2) != null && res.getValue(1,2) != '')
		{	
			temp += '<tr><td><a href=\"javascript:forms.viewArticle.openArticle('
			temp += row['pk'];
			temp += ')\"><font color="#000000">'
			temp += row['filename'];
			temp += '</font></a></td></tr>'
		}
	}
	
	return temp;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {String} type
 * @private
 *
 * @properties={typeid:24,uuid:"94143176-C8AE-4ABE-A4DD-C7D7FCF061FB"}
 */
function setType(event, type) {
	fv_show_type = ARTICLE_TYPES[type];
	EVENT_onShow(false, event);
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
 * @properties={typeid:24,uuid:"D92246AB-497F-4DA4-B15C-A32663421ED6"}
 */
function EVENT_onDataChange(oldValue, newValue, event) {
	EVENT_onShow(false, event);
	return true
}
