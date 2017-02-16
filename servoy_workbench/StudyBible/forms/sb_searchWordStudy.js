/**
 * @properties={typeid:24,uuid:"D26E43BE-C922-4129-9F4A-684B4A2092A9"}
 */
function BTN_showWordStudy()
{
	
	//SMM - 03-06-2011    
	var win = application.getWindow("search_results1")
	//var win = controller.getWindow()
	if ( win!=null ) {
		win.hide()
	}
	
	globals.myWordStudyID = word_strong
	
	// addition, we also need
	var vArgs = [];
	if(word_strong.match(/OT/))
	{
		vArgs.push('Old');
	} else {
		vArgs.push('New');
	}
	
	
	// we shouldn't use the default key!
	// var vSQL = "SELECT version_key, version_abbr FROM word_study_version WHERE version_testament = ? AND version_default = 1";
	
	// we need the word study version in-order to open the correct wordstudy
	vArgs.push(study_version);
	
	var vSQL = "SELECT version_key, version_abbr FROM word_study_version WHERE version_testament = ? AND version_key = ?";
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, vArgs, 1);
	
	globals.wlink( word_strong , null, vDS[0]['version_key'], vDS[0]['version_abbr']);
}
