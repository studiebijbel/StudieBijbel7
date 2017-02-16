/**
 * @properties={type:12,typeid:36,uuid:"3145894D-5DFA-4066-9C6C-68AE1094B3A7"}
 */
function search_filename()
{
	var vFilename = filename
	if (globals.sb_mode_search==1 && globals.sb_search_search_articles && globals.sb_search_criteria){
		vFilename = globals.cvb_doHighlight(vFilename, globals.sb_search_criteria, null, null) //SMM - 18-08-2011
	}
	return vFilename
	
}

/**
 * @properties={type:12,typeid:36,uuid:"4A10F252-760F-40B4-BC6A-D09A788BA477"}
 */
function article_search_html()
{
	//SMM 20-06-2011
	var vHtmlText 
	if (globals.sb_mode_search==1 && globals.sb_search_search_articles && globals.sb_search_criteria){
		vHtmlText = globals.cvb_doHighlight(article_html, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
	}
	else vHtmlText = article_html
	return '<html><body>' + vHtmlText + '</body></html>'
}

/**
 * @properties={type:12,typeid:36,uuid:"a32dd5ad-2edc-45e9-9a8b-40de091b08ac"}
 */
function FullHTml()
{
//var vHTML = article_html + "<br><br><strong>" + i18n.getI18NMessage('cvb.lbl.author') + "</strong><br>" + author
//return vHTML
}
