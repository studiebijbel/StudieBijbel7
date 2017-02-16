/**
 * @properties={type:12,typeid:36,uuid:"2EE75072-7654-4F6E-AA55-56D748164A77"}
 */
function cal_show_label_text_version()
{
	var vTextVersion = ''
	if(globals.sb_gTestament == "Old"){
		vTextVersion = (globals.heb_version)?globals.heb_version:i18n.getI18NMessage("cvb.lbl.plustranslation");
	}
	else {
		if (globals.griek_version){
			vTextVersion = globals.griek_version + ' ' + globals.text_version
		}
		else {
			vTextVersion = globals.text_version
		}		
		
	}
//	if (vTextVersion)  vTextVersion = utils.stringTrim(vTextVersion)

	scopes.tools.output("vTextVersion =: "+ vTextVersion);
	
	return vTextVersion
}

/**
 * @properties={type:12,typeid:36,uuid:"8c9346ff-f288-40df-b5ec-22759ca88afe"}
 */
function calc_book_name()
{
return verses_to_chapters.calc_book_name;
}

/**
 * @properties={type:12,typeid:36,uuid:"72a9c12f-3b8e-46f1-be0e-3410d08d1b2c"}
 */
function calc_study_words()
{

var vWordsToReturn;
if(globals.sb_gTestament == "Old")
{
	if(globals.heb_version)
	{
		vWordsToReturn = words_html_tr_gr;
	} else { 
		vWordsToReturn = words_html_tr;
	}
} else if(globals.sb_gTestament == "New" && globals.griek_version != i18n.getI18NMessage('onlyGreek'))
{
	switch(globals.text_version)
	{
	case "TR": vWordsToReturn = words_html_tr;
		break;
	case "H-F": vWordsToReturn = words_html_hf;
		break;
	case "N25": vWordsToReturn = words_html_n25;
		break;
	case "N27": vWordsToReturn = words_html_n27;
		break;
	}
} else if (globals.sb_gTestament == "New" && globals.griek_version == i18n.getI18NMessage('onlyGreek'))
{
	switch(globals.text_version)
	{
	case "TR": vWordsToReturn = words_html_tr_gr;
		break;
	case "H-F": vWordsToReturn = words_html_hf_gr;
		break;
	case "N25": vWordsToReturn = words_html_n25_gr;
		break;
	case "N27": vWordsToReturn = words_html_n27_gr;
		break;
	}
}
return vWordsToReturn;
}

/**
 * @properties={type:4,typeid:36,uuid:"55729d48-1740-47dd-a92f-707018c9324c"}
 */
function chapter_number()
{
return verses_to_chapters.chapter_no;
}

/**
 * @properties={type:12,typeid:36,uuid:"3ee96c6f-685f-4258-bb94-4be292cf064e"}
 */
function code_no()
{
return verses_to_manuscript_info.code_no;
}

/**
 * @properties={type:12,typeid:36,uuid:"d39140c5-9f98-4c32-b7cf-3258ce998301"}
 */
function showTestament()
{
	if (globals.sb_gTestament == "Old") {
		if (globals.sb_APP_getServerLang() == "NL") {
			globals.sb_gTestamentReal = "OT";
			return "OT"
			
		} else {
			globals.sb_gTestamentReal = "AT";
			return "AT"
		}
	} else {
		globals.sb_gTestamentReal = "NT";
		return "NT"
	}
}
