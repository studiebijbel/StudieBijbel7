/**
 * @properties={typeid:24,uuid:"1e9c5a80-401c-4c11-9675-d99543afad5b"}
 */
function detailsForWordStudy()
{

var arg = ''
arg = arg.concat(arguments[0].toString())
globals.selectedWordStudy = arg
forms.word_study.viewWordStudy()
}

/**
 * @properties={typeid:24,uuid:"8463007e-d598-4e21-a39f-f9783e0601dd"}
 * @AllowToRunInFind
 * @param {Number} inx
 */
function display(inx)
{

application.setStatusText('Even geduld...')
application.updateUI()

var j = globals.index
var end = globals.index + 10
var res = databaseManager.getDataSetByQuery('sb',globals.select, null, 10000)
globals.search_results = '<html><body><table><tr><td colspan="3">'
globals.search_results = globals.search_results.concat('Zoekresultaten  ')
globals.search_results = globals.search_results.concat(res.getMaxRowIndex().toString())
globals.search_results = globals.search_results.concat('</td></tr>')

var temp = ""

while (j < end && j <= res.getMaxRowIndex()){
		
		res.rowIndex = j
		temp += '<tr><td>'
		temp += res.getValue(j,4)/*record.word_strong*/
		temp += '</td><td><a href=\"javascript:forms.search_results.detailsForWordStudy(\''
		temp += res.getValue(j,4)
		temp += '\')\"><font face=\"GreekSB\" color="#000000">'
		//temp += res.getValue(j,2)/*record.original*/
		var query2 = "select word_original from words where word_strong='"+res.getValue(j,4)+"' or word_strong='"+res.getValue(j,4)+".1'"
		temp += databaseManager.getDataSetByQuery("sb",query2, null, 1).getValue(1,1)
		temp += '</font></a></td><td>'
		temp += res.getValue(j,3)/*record.transliteration*/
		temp += '</td></tr>'
		j++
}
globals.search_results = globals.search_results + temp + '<tr><td>'
if(globals.index > 10) {
	globals.search_results = globals.search_results.concat('<a href=\"javascript:forms.search_results.previous()\">Vorige</a>')
}
globals.search_results = globals.search_results.concat('</td><td>')
if(globals.index <= (res.getMaxRowIndex()-10)){
	globals.search_results = globals.search_results.concat('<a href=\"javascript:forms.search_results.next()\">Volgende</a>')
}
globals.search_results = globals.search_results.concat('</td></tr>')	
globals.search_results = globals.search_results.concat('</table></body></html>')

//var divider = forms.sb_form.elements.bean_321.dividerLocation
forms.search_results.controller.show()
forms.sb_form.controller.show()
if(arguments[0] != 1){
//	forms.sb_form.elements.bean_321.dividerLocation = divider
//	forms.sb_form.elements.bean_321.bottomComponent = forms.search_results
//	forms.sb_form.elements.bean_321.bottomComponent =forms.sb_form.elements.tabs_search_results
}
application.setStatusText('gereed')
application.updateUI()
}

/**
 * @properties={typeid:24,uuid:"19f92ed9-43eb-43db-bdbe-17cf6e53b83f"}
 */
function init()
{
//foundset.clearFoundSet()
}

/**
 * @properties={typeid:24,uuid:"687592ca-9c7b-4c4d-8592-a3749b2224d6"}
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
//vForm.title = 'i18n:cvb.etc';
vForm.setInitialBounds(10,10,1000,700)
vForm.show(forms.d_search_results);

}

/**
 * @properties={typeid:24,uuid:"5b67755f-c4d1-4b89-a454-b0ffd7493f1b"}
 * @AllowToRunInFind
 */
function next()
{
globals.index = globals.index + 10
forms.search_results.display(1)


}

/**
 * @properties={typeid:24,uuid:"febba2b4-d363-4ec0-8805-96cab07e7983"}
 * @AllowToRunInFind
 */
function previous()
{
globals.index = globals.index - 10
forms.search_results.display(1)
}

/**
 * @properties={typeid:24,uuid:"844b9b6f-7800-45af-9657-c6b245ad6ca7"}
 * @AllowToRunInFind
 */
function print()
{
application.setStatusText('Even geduld...')
application.updateUI()
var res = databaseManager.getDataSetByQuery('sb',globals.select, null, 10000)
globals.tot_search_results = '<html><body><table><tr><td colspan="3">'
globals.tot_search_results = globals.tot_search_results.concat('Zoekresultaten  ')
globals.tot_search_results = globals.tot_search_results.concat(res.getMaxRowIndex().toString())
globals.tot_search_results = globals.tot_search_results.concat('</td></tr>')
	
for (var j=1;j <= res.getMaxRowIndex();j++){
		res.rowIndex = j
		globals.tot_search_results = globals.tot_search_results.concat('<tr><td>')
		globals.tot_search_results = globals.tot_search_results.concat(res.getValue(j,4))
		globals.tot_search_results = globals.tot_search_results.concat('</td><td><a href=\"javascript:forms.search_results.detailsForWordStudy(')
		globals.tot_search_results = globals.tot_search_results.concat(res.getValue(j,4))
		globals.tot_search_results = globals.tot_search_results.concat(')\"><font face=\"GreekSB\" color="#000000">')
		
		var query2 = "select word_original from words where word_strong='"+res.getValue(j,4)+"' or word_strong='"+res.getValue(j,4)+".1'"
		globals.tot_search_results += databaseManager.getDataSetByQuery("sb",query2, null, 1).getValue(1,1)
		//globals.tot_search_results = globals.tot_search_results.concat(res.getValue(j,2))
		
		globals.tot_search_results = globals.tot_search_results.concat('</font></a></td><td>')
		globals.tot_search_results = globals.tot_search_results.concat(res.getValue(j,3))
		globals.tot_search_results = globals.tot_search_results.concat('</td></tr>')
		
}
globals.tot_search_results = globals.tot_search_results.concat('</table></body></html>')
application.setStatusText('gereed')
application.updateUI()
forms.search_results.printForm()

}

/**
 * @properties={typeid:24,uuid:"76e648ec-aa99-4df6-a4df-478156b31c42"}
 */
function printForm()
{
globals.print1 = ''
globals.print2 = ''
globals.print3 = ''
globals.print4 = ''
globals.print5 = 'Zoekresultaten'
globals.print6 = ''
globals.print7 = ''
globals.print8 = ''
globals.print_abrev = ''
globals.print_AlleenGrieks = ''
globals.print_versions = ''
globals.print_WordStudy = ''

//globals.printForm()
}

/**
 * @properties={typeid:24,uuid:"fa0c01af-ca80-4a31-8ea0-a1e305017b95"}
 * @AllowToRunInFind
 */
function searchInWordStudy()
{
//application.closeFormDialog(false)
var win = controller.getWindow()
if (win) {
	win.hide()
}

//forms.fill_in_words_study.foundset.clearFoundSet()
globals.search_results = ''
var signs = new Array(	/*new Array("% "," %"),*/
						/*new Array("% [","] %"),*/
						new Array("%&#8216","&#8217%"),
						new Array("% ",";%"),
						new Array("% ",":%"),
						new Array("% ",".%"),
						new Array("% ",",%"),
						new Array("% ","?%"),
						new Array("% ","!%"),
						new Array("% ","’%"),
						new Array("% ",""),
						new Array(""," %"),
						new Array("%(",")%"),
						new Array("% ","(%"),
						new Array("%)"," %"),
						new Array(""," %"),
						new Array("",".%"),
						new Array("",",%"),
						new Array("",";%"),
						new Array("",":%"),
						new Array("%>","<%"),
						new Array("% ","<%"),
						new Array("%>"," %")
						/*new Array("%."," %"),
						new Array("%,"," %"),
						new Array("%;"," %"),
						new Array("%:"," %"),
						new Array("%?"," %"),
						new Array("%!"," %")*/
					)
					
					
if( globals.search_term2 != '' ){
	if( globals.search_type2 == 'Woord(en)' ){
	//	globals.select = 'select w.pk,ww.original,w.transliteration,w.word_strong from word_study w, word_study_analyze ww where w.pk=ww.word_study_id and w.transliteration=ww.transliteration and (w.first_line like '+ '\'% ' + globals.search_term2 + ' %\''
	//  globals.select = 'select distinct w.pk,ww.original,w.transliteration,w.word_strong from word_study w, word_study_analyze ww where w.pk=ww.word_study_id and (w.first_line like '+ '\'% ' + globals.search_term2 + ' %\''
		globals.select = 'select w.pk,w.original,w.transliteration, w.word_strong from word_study w where (w.first_line like '+ '\'% ' + globals.search_term2 + ' %\''
		for(var i=0; i<signs.length;i++){
			var search_term = ''
			search_term = search_term.concat(signs[i][0])
			search_term = search_term.concat(globals.search_term2)
			search_term = search_term.concat(signs[i][1])
			globals.select = globals.select.concat(' or w.first_line like \'')
			globals.select = globals.select.concat(search_term)
			globals.select = globals.select.concat('\'')
		}
		globals.select+=')'
		//var res = databaseManager.getDataSetByQuery('sb',globals.select, null, 10000)
	}
	else if( globals.search_type2 == 'Deel van woord'){
	//	globals.select = 'select distinct w.pk,ww.original,w.transliteration,w.word_strong from word_study w, word_study_analyze ww where w.pk=ww.word_study_id and w.first_line like '+ '\'%' + globals.search_term2 + '%\''

		globals.select = 'select w.pk,w.original,w.transliteration, w.word_strong from word_study w where w.first_line like '+ '\'%' + globals.search_term2 + '%\''
		//var res = databaseManager.getDataSetByQuery('sb',globals.select, null, 10000)
	}
	globals.index = 1
	display(0)
}					

	
}
