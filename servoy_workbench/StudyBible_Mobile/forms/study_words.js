/**
 * // TODO generated, please specify type and doc for the params
 * @param {Object} word_study_id
 *
 * @properties={typeid:24,uuid:"BCC6FF63-7B9B-4251-8DCF-C8249E711977"}
 * @AllowToRunInFind
 */
function searchWord(word_study_id)
{
	scopes.tools.output(word_study_id);
	
	if(forms.word_study_frm.foundset.find())
	{
		forms.word_study_frm.word_strong = word_study_id;
		var vCount = forms.word_study_frm.foundset.search();
	}
	
	if(vCount == 1)
	{
		forms.word_study_frm.controller.show();
		return true;
	}
	
	return false;
	
}
