/**
 * @properties={typeid:24,uuid:"6a23f1ef-aaf1-4968-a50a-4d3492fd1b4c"}
 * @param {Number} inx
 * @AllowToRunInFind
 */
function display(inx)
{

application.setStatusText('Even geduld...')
application.updateUI()

var j = globals.index
var end = globals.index + 10
var res = databaseManager.getDataSetByQuery('sb',globals.select, null, 10000)
globals.search_results = '<html><body><table><tr><td colspan="2">'
globals.search_results = globals.search_results.concat('Zoekresultaten  ')
globals.search_results = globals.search_results.concat(res.getMaxRowIndex().toString())
globals.search_results = globals.search_results.concat('</td></tr>')
while (j < end && j<= res.getMaxRowIndex()){
		res.rowIndex = j
		globals.search_results = globals.search_results.concat('<tr><td nowrap valign="top"><a href=\"javascript:globals.viewVerse(')
		globals.search_results = globals.search_results.concat(res.getValue(j,1)/*record.verse_id*/)
		globals.search_results = globals.search_results.concat(')\"><font color="#000000">')
		globals.setVersePath(res.getValue(j,1))
		globals.search_results = globals.search_results.concat(globals.verse_path)
		var index = res.getValue(j,2).toLowerCase().indexOf(globals.search_term1.toLowerCase()) 
		var string = res.getValue(j,2).substring(0,index)
		string = string.concat('<B>')
		string = string.concat(res.getValue(j,2).substring(index,index+globals.search_term1.length))
		string = string.concat('</B>')
		string = string.concat(res.getValue(j,2).substring(index+globals.search_term1.length))
		globals.search_results = globals.search_results.concat('</font></a></td><td>')
		globals.search_results = globals.search_results.concat(string)
		globals.search_results = globals.search_results.concat('</td></tr>')
		j++
}
globals.search_results = globals.search_results.concat('<tr><td>')

if(globals.index > 10) {
	globals.search_results = globals.search_results.concat('<a href=\"javascript:forms.search_results2.previous()\">Vorige</a>')
}
globals.search_results = globals.search_results.concat('</td><td>')
if(globals.index <= (res.getMaxRowIndex() - 10)){
	globals.search_results = globals.search_results.concat('<a href=\"javascript:forms.search_results2.next()\">Volgende</a>')
}

globals.search_results = globals.search_results.concat('</td></tr>')
globals.search_results = globals.search_results.concat('</table></body></html>')

//var divider = forms.sb_form.elements.bean_321.dividerLocation
forms.search_results2.controller.show()
forms.sb_form.controller.show()
if(arguments[0] != 1){
//	forms.sb_form.elements.bean_321.dividerLocation = divider
//	forms.sb_form.elements.bean_321.bottomComponent = forms.search_results2
//	forms.sb_form.elements.bean_321.bottomComponent =forms.sb_form.elements.tabs_search_results2
}
application.setStatusText('gereed')
application.updateUI()
}

/**
 * @properties={typeid:24,uuid:"5fc5c3a1-ac4f-47e4-aa9c-cf275d9c5135"}
 * @AllowToRunInFind
 */
function newWindow()
{

globals.d_search_results = globals.search_results
globals.d_search_results = globals.d_search_results.replace('<PP>','')
globals.d_search_results = globals.d_search_results.replace('</PP>','')

//application.showFormInDialog(forms.d_search_results,10,10,1000,700)
//SMM 20-05-2011
var vForm = application.createWindow('SearchResultsForm', JSWindow.MODAL_DIALOG, null);
//vForm.title = '';
vForm.setInitialBounds(10,10,1000,700)
vForm.show(forms.d_search_results);

}

/**
 * @properties={typeid:24,uuid:"47938384-eeae-45f1-8b29-da5046b76b63"}
 * @AllowToRunInFind
 */
function next()
{
globals.index = globals.index + 10
forms.search_results2.display(1)

}

/**
 * @properties={typeid:24,uuid:"d0cfb482-d66a-4460-bd54-4013b589ed32"}
 * @AllowToRunInFind
 */
function previous()
{
globals.index = globals.index - 10
forms.search_results2.display(1)
}

/**
 * @properties={typeid:24,uuid:"d557f03e-94c5-4081-81f6-22caf7f6e41c"}
 * @AllowToRunInFind
 */
function printForm()
{
application.setStatusText('Even geduld...')
application.updateUI()
var res = databaseManager.getDataSetByQuery('sb',globals.select, null, 10000)
globals.tot_search_results = '<html><body><table><tr><td colspan="2">'
globals.tot_search_results = globals.tot_search_results.concat('Zoekresultaten  ')
globals.tot_search_results = globals.tot_search_results.concat(res.getMaxRowIndex().toString())
globals.tot_search_results = globals.tot_search_results.concat('</td></tr>')
for (var j=1; j<= res.getMaxRowIndex();j++){
		res.rowIndex = j
		globals.tot_search_results = globals.tot_search_results.concat('<tr><td nowrap valign="top"><a href=\"javascript:globals.viewVerse(')
		globals.tot_search_results = globals.tot_search_results.concat(res.getValue(j,1))
		globals.tot_search_results = globals.tot_search_results.concat(')\"><font color="#000000">')
		globals.setVersePath(res.getValue(j,1))
		globals.tot_search_results = globals.tot_search_results.concat(globals.verse_path)
		var index = res.getValue(j,2).toLowerCase().indexOf(globals.search_term1.toLowerCase()) 
		var string = res.getValue(j,2).substring(0,index)
		string = string.concat('<B>')
		string = string.concat(res.getValue(j,2).substring(index,index+globals.search_term1.length))
		string = string.concat('</B>')
		string = string.concat(res.getValue(j,2).substring(index+globals.search_term1.length))
		globals.tot_search_results = globals.tot_search_results.concat('</font></a></td><td>')
		globals.tot_search_results = globals.tot_search_results.concat(string)
		globals.tot_search_results = globals.tot_search_results.concat('</td></tr>')	
}
globals.tot_search_results = globals.tot_search_results.concat('</table></body></html>')
application.setStatusText('gereed')
application.updateUI()
forms.search_results.printForm();
}

/**
 * @properties={typeid:24,uuid:"9e458e69-1c0d-4acf-9e46-3f8d5daefda7"}
 * @AllowToRunInFind
 */
function searchWordTranslation()
{
application.setStatusText('Even geduld...')
application.updateUI()

var signs = new Array(	/*new Array("",""),*/
						new Array("[","]"),
						new Array("&#8216","&#8217"),
						new Array("",";"),
						new Array("",":"),
						new Array("","."),
						new Array("",","),
						new Array("","?"),
						new Array("","!"),
						new Array("","’%"),
						new Array("van ",","),
						new Array("van ",""),
						new Array("van ","."),
						new Array("(",")%")
					)
if( globals.search_term1 != '' ){
	if( globals.search_type1 == 'Woord(en)' ){
		globals.select = 'select verse_id,word_translation from words where (word_translation = '+ '\'' + globals.search_term1 + '\''
		for(var i=0; i<signs.length;i++){
			var search_term = ''
			search_term = search_term.concat(signs[i][0])
			search_term = search_term.concat(globals.search_term1)
			search_term = search_term.concat(signs[i][1])
			globals.select = globals.select.concat(' or word_translation = \'')
			globals.select = globals.select.concat(search_term)
			globals.select = globals.select.concat('\'')
		}
		globals.select = globals.select.concat(' ) ')
		if( globals.search_book != "Alle boeken..."){
			globals.select = globals.select.concat(' and calc_book_name=\'')
			globals.select = globals.select.concat(globals.search_book)
			globals.select = globals.select.concat('\'')
		}
		globals.select = globals.select.concat(' order by book_order,chapter_order,verse_order')
		//var res = databaseManager.getDataSetByQuery('sb',select, null, 10000)
	}
	else if( globals.search_type1 == 'Deel van woord'){
			globals.select = 'select verse_id,word_translation from words where word_translation like '+ '\'%' + globals.search_term1 + '%\''
			if( globals.search_book != "Alle boeken..."){
				globals.select = globals.select.concat(' and calc_book_name=\'')
				globals.select = globals.select.concat(globals.search_book)
				globals.select = globals.select.concat('\'')
			}
			globals.select = globals.select.concat(' order by book_order,chapter_order,verse_order')
			//var res = databaseManager.getDataSetByQuery('sb',select, null, 10000)
	}
	globals.index = 1
	display(0)
}


}
