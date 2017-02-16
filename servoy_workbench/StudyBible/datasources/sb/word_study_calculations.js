/**
 * @properties={type:12,typeid:36,uuid:"12DDCE8B-0904-4956-B710-D44A6A38633C"}
 */
function c_display()
{
	return '<html><body><font style="font-family: \'' + c_font + '\';">' + original + '</font></html></body>';
}

/**
 * @properties={type:12,typeid:36,uuid:"9ED6BC42-16FA-4AE2-859F-579A771AB8B4"}
 */
function c_font()
{
	var vReturn;
	
	if(word_strong.match(/OT/))
	{
		vReturn = 'SIL Ezra'
	} else {
		vReturn = 'GreekSB';
	}
	
	return vReturn;
}

/**
 * @properties={type:12,typeid:36,uuid:"86EA1E8D-9E70-4B1E-9589-56691F4035CE"}
 */
function search_first_line()
{
	var vFirstLine = first_line
	if (globals.sb_search_criteria){
		vFirstLine = globals.cvb_doHighlight(vFirstLine, globals.sb_search_criteria, null, null) //SMM - 17-06-2011
	}
	return vFirstLine
	
}
