/**
 * @properties={typeid:24,uuid:"4c576979-a03b-49b5-ab68-b4f9570595af"}
 * @AllowToRunInFind
 */
function fillNullEntries()
{
var query = "select pk from word_study_concordance  where verse_id is null"
//scopes.tools.output(query)
var res = databaseManager.getDataSetByQuery("sb_web", query, null, 1000)
var size = res.getMaxRowIndex()
//scopes.tools.output("Size: " + size)
for (var j=1; j<=size;j++){
    res.rowIndex = j
	var pkey =  res.getValue(j, 1)
	//scopes.tools.output(pkey)
	
	forms.fill_word_study_concordance.controller.loadAllRecords()
	forms.fill_word_study_concordance.controller.find()
	forms.fill_word_study_concordance.pk = pkey
	forms.fill_word_study_concordance.controller.search()
	//scopes.tools.output("Size:"+forms.fill_word_study_concordance.foundset.getSize())
	if(	forms.fill_word_study_concordance.foundset.getSize()==1)
	{
		forms.fill_word_study_concordance.verse_id = null		
	}
}
//scopes.tools.output("Modifications: "+i)


}
