/**
 * @properties={typeid:24,uuid:"f1301fe8-1615-4758-a4d0-54d3d424d8d5"}
 */
function addOTArticlesToBooks()
{
	var articles = new Array(1000298,
			1000317,
			1000318,
			1000320,
			1000312,
			1000308,
			1000316,
			1000309,
			1000321,
			1000314,
			1000313,
			1000319,
			1000326,
			1000329,
			1000330,
			1000333,
			1000332,
			1000325,
			1000327,
			1000328,
			1000331,
			1000338,
			1000340,
			1000341,
			1000342,
			1000344,
			1000339,
			1000343,
			1000345,
			1000346
		)

	//insert in book_article
	for (var i = 1; i <= 9; i++)
		for (var j = 0; j < articles.length; j++) {
			forms.fill_book_article.controller.newRecord()
			forms.fill_book_article.article_id = articles[j]
			forms.fill_book_article.book_id = i	
		}
	databaseManager.saveData();
}

/**
 * @properties={typeid:24,uuid:"78401eea-653c-4959-8c31-ec4b3398adfe"}
 */
function addOTInleidingToBooks()
{
	var inleiding = new Array(
		1000310,
		1000311,
		1000322,
		1000323,
		1000324,
		1000334,
		1000335,
		1000336,
		1000337
	)

	for(var i = 0; i<9; i++)
	{
		forms.book_inleiding.controller.newRecord()
		forms.book_inleiding.book_id = i+1
		forms.book_inleiding.article_id = inleiding[i]
//		forms.book_inleiding.controller.saveData()
		databaseManager.saveData();
	}
}

/**
 * @properties={typeid:24,uuid:"09cc14bf-06b1-4a13-9237-5845e0827768"}
 * @param {*} bk_id
 */
function getArticlesForBook(bk_id)
{

	var query = "select distinct article_id from book_article where book_id = ? order by article_id"
	var res1 = databaseManager.getDataSetByQuery("sb", query, [bk_id], -1)
	//globals.article_names = '<html><body><table cellpadding=\"0\" cellspacing=\"0\">'
	
	var temp = ""
	//scopes.tools.output(res1);
	for(var i = 0; i < res1.getMaxRowIndex(); i++){
		var row = res1[i];
	//	scopes.tools.output(row);
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
	}
	globals.article_names = '<html><body><table cellpadding=\"0\" cellspacing=\"0\">' + temp + '</table></body></html>'
	
	showArticlesTab({});

}

/**
 * @properties={typeid:24,uuid:"2867508f-51f9-4e41-87c5-4f4031c090ae"}
 */
function getGeneralArticles(event)
{

	if (globals.sb_demo_chk != 1) {
		var query = "select pk, filename from articles where is_general=1 order by filename"
		var res = databaseManager.getDataSetByQuery("sb", query, null, 1000)

		//globals.article_names = '<html><body><table cellpadding="0" cellspacing="0">'

		var size = res.getMaxRowIndex()
		var temp = ""
		for (var i = 0; i < size; i++) {
			var row = res.getRowAsArray(i + 1)

			temp += '<tr><td><a href=\"javascript:forms.viewArticle.openArticle('
			temp += row[0]
			temp += ')"><font color="#000000">'
			temp += row[1]
			temp += '</font></a></td></tr>'
		}

		globals.article_names = '<html><body><table cellpadding="0" cellspacing="0">' + temp + '</table></body></html>'
	} else {
		globals.article_names = "<html><body><font color=\"red\">" + i18n.getI18NMessage('i18n:cvb.lbl.demo_articles') + "</font></body></html>";
	}

	forms.sb_form.resizeSplitTab(event,'articles')

}

/**
 * @properties={typeid:24,uuid:"48d01f8f-7926-449a-83e4-a03fcf5137cf"}
 * @AllowToRunInFind
 * @param {Number|*} bk_id
 */
function getInleidingForBook(bk_id)
{


	if (forms.book_inleiding.controller.find()) {
		forms.book_inleiding.book_id = bk_id
		forms.book_inleiding.controller.search()
	}
	forms.book_inleiding.foundset.sort('filename asc')

	globals.article_names = '<html><body><table cellpadding=\"0\" cellspacing=\"0\">'

	/** @type JSRecord<db:/sb/book_inleiding> */
	var record
	for (var i = 1; i <= forms.book_inleiding.foundset.getSize(); i++) {
		record = forms.book_inleiding.foundset.getRecord(i)
		var res = databaseManager.getDataSetByQuery('sb', 'select pk,filename,author from articles where pk=' + record.article_id, null, 10000)
		res.rowIndex = 1
		if (res.getValue(1, 2) != null && res.getValue(1, 2) != '') {
			globals.article_names += '<tr><td><a href=\"javascript:forms.viewArticle.openArticle(';
			globals.article_names += res.getValue(1, 1);
			globals.article_names += ')\"><font color="#000000">';
			globals.article_names += res.getValue(1, 2);
			globals.article_names += '</font></a></td></tr>';
		}
	}
	globals.article_names = globals.article_names.concat('</table></body></html>')

	showArticlesTab({});
}

/**
 * @properties={typeid:24,uuid:"988d2e86-5e0f-45d1-8196-462cfdfdc3f6"}
 */
function newWindow()
{

	globals.d_article_names = globals.article_names

	//application.showFormInDialog(forms.d_articles,10,10,1000,700)
	//SMM 20-05-2011
	var vForm = application.createWindow('ArticleForm', JSWindow.DIALOG, null);
	//vForm.title = 'i18n:cvb.etc';
	vForm.setInitialBounds(10, 10, 1000, 700)
	vForm.show(forms.d_articles);


}

/**
 * @properties={typeid:24,uuid:"c09c095a-3cd4-4e47-b0c8-fadb95be246b"}
 * @param {*} pk
 * @param {*} str1
 * @param {*} str2
 */
function openArticle(pk, str1, str2)
{

	forms.viewArticle.openArticle(pk)
	
}

/**
 * @properties={typeid:24,uuid:"2cac2ba0-a889-43ca-a864-97c20b75e66a"}
 */
function showArticlesTab(event)
{
	forms.sb_form.resizeSplitTab(event,'articles')

}
