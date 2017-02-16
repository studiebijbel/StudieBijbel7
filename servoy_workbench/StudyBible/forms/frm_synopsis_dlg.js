/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"5124F540-7838-4BBB-9596-FD3AAAA332A6",variableType:12}
 */
var fv_html = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"895DB654-8BA4-44BA-8A72-869CDF129D17"}
 */
function BTN_openIntroSynopsis(event) {

	// get the Article
	var vSQL = "SELECT pk FROM articles WHERE article_small_title = ?";
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, ['Inleiding synopsis'], 1);
	
	if(vDS.getMaxRowIndex() == 1)
	{
		// open it
		forms.viewArticle.openArticle(vDS[0]["pk"]);
	} else {
		// What should we do now?
	}
	
//openArticle()
}
