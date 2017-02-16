/**
 * @properties={typeid:24,uuid:"06dc5f24-6952-4be4-bc7d-13a1b8bf188c"}
 * @AllowToRunInFind
 */
function viewWordConcordance()
{
forms.word_concordance.controller.find()
calc_word_study_id = globals.selectedWordStudy
forms.word_concordance.controller.search()
}
