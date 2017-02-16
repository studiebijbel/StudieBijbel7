/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"2AFDE2F6-0058-4A7E-9050-3ED6F68FE0D0"}
 */
var fv_html = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F0F221CA-A204-4FE6-9BB8-1B70E8DB94E0",variableType:4}
 */
var verse_id = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C23D401F-4FD0-4AD4-8FA2-5C1DF744EDCA",variableType:4}
 */
var commentary_id = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1C46AE85-FD80-478A-8E3E-D6B21758D414"}
 */
var footnotes = null;

/**
 * @properties={typeid:24,uuid:"df95d5dd-6666-465d-81ee-d30b9e601b23"}
 */
function init() {
	//foundset.clearFoundSet()
}

/**
 * @properties={typeid:24,uuid:"a168f837-4eb2-4596-b21f-dd54160072b8"}
 */
function newWindow() {
	globals.setVersePath(globals.selected_verse_id)
	var index = globals.notes.indexOf('<html><body>')

	globals.d_notes = ''
	globals.d_notes = '<html><body><br>'
	globals.d_notes = globals.d_notes.concat(globals.verse_path)
	globals.d_notes = globals.d_notes.concat('<br>')
	globals.d_notes = globals.d_notes.concat(globals.notes.substring(index + 12))
	globals.d_notes = globals.d_notes.replace('<PP>', '')
	globals.d_notes = globals.d_notes.replace('</PP>', '')

	//application.showFormInDialog(forms.d_book_notes,10,10,1000,700)
	//SMM 20-05-2011
	var vForm = application.createWindow('BookNotesForm', JSWindow.MODAL_DIALOG, null);
	//vForm.title = 'i18n:cvb.etc';
	vForm.setInitialBounds(0, 10, 1000, 700)
	vForm.show(forms.d_book_notes);

}

/**
 * @properties={typeid:24,uuid:"0af796af-3415-421c-a970-d64316ff157d"}
 */
function printForm() {
	/*globals.print4 = 'Notitie'
	 globals.print2 = ''
	 globals.print3 = ''
	 globals.print1 = ''
	 globals.print5 = ''
	 globals.print6 = ''
	 globals.print7 = ''
	 globals.print8 = 'Noten'
	 globals.print_abrev = ''
	 globals.print_AlleenGrieks = ''
	 globals.print_versions = ''
	 globals.print_WordStudy = ''
	 globals.printForm()*/

	globals.sb_print_bibleTranslations = 1
	//application.showFormInDialog( forms.print_commentary_dlg,  -1, -1, -1, -1, 'i18n:cvb.lbl.print', false, false, 'printDLG', true)
	//SMM 20-05-2011
	var vForm = application.createWindow('printDLG', JSWindow.MODAL_DIALOG, null);
	vForm.title = 'i18n:cvb.lbl.print';
	vForm.show(forms.print_commentary_dlg);

}

/**
 * @properties={typeid:24,uuid:"744b44ec-0c40-44a2-b51c-795b6deafc43"}
 * @AllowToRunInFind
 */
function viewNotesForSelectedVerse() {
	if (globals.isOT()) {
		return;
	}
	
	var record
	globals.notes = ''
	
	
	if (globals.selected_verse_id > 0) {
		var string1 = '<='
		string1 = string1.concat(globals.selected_verse_id.toString())
		var string2 = '>='
		string2 = string2.concat(globals.selected_verse_id.toString())
		forms.synopsis_form.foundset.clear()
		if (forms.synopsis_form.controller.find()) {
			forms.synopsis_form.verse_from = string1
			forms.synopsis_form.verse_top = string2
			forms.synopsis_form.controller.search()
		}

		globals.notes = '<html><body><table><tr><td><table cellpadding=\"0\" cellspacing=\"0\">'
		/*for (var i = 1; i <= forms.synopsis_form.foundset.getSize(); i++) {
			record = forms.synopsis_form.foundset.getRecord(i)
			var res = databaseManager.getDataSetByQuery('sb', 'select pk,syn_number,text_mt,text_mk,text_lk,text_jh from synopsis_text where pk=' + record.text_id, null, 10000)
			for (var j = 1; j <= res.getMaxRowIndex(); j++) {
				res.rowIndex = j
				globals.notes = globals.notes.concat('<tr><td><a href=\"javascript:forms.synopsis_form.openPdf(\'' + res.getValue(j, 2) + '\')\"><font color="#000000">Synopsis ')
				globals.notes = globals.notes.concat(res.getValue(j, 2))
				globals.notes = globals.notes.concat('</font></a></td><td>')
				globals.notes = globals.notes.concat(i18n.getI18NMessage('cvb.lbl.space')+ i18n.getI18NMessage('cvb.lbl.space')+res.getValue(j, 3)) //SMM 03-11-2011 SPACE IS NECESSARY
				globals.notes = globals.notes.concat('</td><td>')
				globals.notes = globals.notes.concat(i18n.getI18NMessage('cvb.lbl.space')+ i18n.getI18NMessage('cvb.lbl.space')+ res.getValue(j, 4))
				globals.notes = globals.notes.concat('</td><td>')
				globals.notes = globals.notes.concat(i18n.getI18NMessage('cvb.lbl.space')+ i18n.getI18NMessage('cvb.lbl.space')+ res.getValue(j, 5))
				globals.notes = globals.notes.concat('</td><td>')
				globals.notes = globals.notes.concat(i18n.getI18NMessage('cvb.lbl.space')+ i18n.getI18NMessage('cvb.lbl.space')+ res.getValue(j, 6))
				globals.notes = globals.notes.concat('</td></tr>')
			}
		}*/
		
		if (forms.synopsis_form.foundset.getSize() > 0) {
			for (var i = 1; i <= forms.synopsis_form.foundset.getSize(); i++) {
				record = forms.synopsis_form.foundset.getRecord(i)
				var res = databaseManager.getDataSetByQuery('sb', 'select pk,syn_number,text_mt,text_mk,text_lk,text_jh from synopsis_text where pk=' + record.text_id, null, 10000)
				for (var j = 1; j <= res.getMaxRowIndex(); j++) {
					res.rowIndex = j
					globals.notes += "<tr><td>";
					
					globals.notes += '<a href=\"javascript:forms.synopsis_form.openPdf(\'' + res.getValue(j, 2) + '\')\"><font color="#000000">Synopsis ' + res.getValue(j, 2) + "</font></a> &nbsp; ";
					globals.notes += res.getValue(j, 3) + "&nbsp;&nbsp;&nbsp;" + res.getValue(j, 4) + "&nbsp;&nbsp;&nbsp;" + res.getValue(j, 5) + "&nbsp;&nbsp;&nbsp;" + res.getValue(j, 6);
					
					globals.notes += "</td></tr>";
					
				}
			}
		}

		globals.setVersePath(globals.selected_verse_id)
		var index = globals.verse_path.indexOf(' ')
		var book = globals.verse_path.substring(0, index)

		if (book == 'Matteüs' || book == 'Marcus' || book == 'Lucas' || book == 'Johannes') {
			if (forms.synopsis_form.foundset.getSize() <= 0) {
				globals.notes = globals.notes.concat('<tr><td>' + i18n.getI18NMessage('cvb.lbl.noparallelverses') + '</td></tr>')
			}
			//	var vUrl = application.getServerURL()
			//	if(vUrl != "http://217.114.108.59:80/")
			if (globals.sb_APP_getServerLang() != "NL") {
				globals.notes = globals.notes.concat('<tr><td><br><a href=\"javascript:globals.openSynopsisIn()\"><font color="#000000">Inleiding op de synopsis</font></a></td></tr>')
				globals.notes = globals.notes.concat('<tr><td><a href=\"javascript:forms.synopsis_form.openPdf()\"><font color="#000000">Synopsis</font></a></td></tr>')
				globals.notes = globals.notes.concat('<tr><td><a href=\"javascript:globals.openPdf()\"><font color="#000000">Grammatica</font><br></a></td></tr>')
			}
		}
		globals.notes = globals.notes.concat('</table></td></tr>')
		//forms.book_notes.foundset.clearFoundSet()
		if (globals.selected_verse_id > 0) {
			if (forms.book_notes.controller.find()) {
				forms.book_notes.verse_id = globals.selected_verse_id
				forms.book_notes.controller.search()
			}
			if (forms.book_notes.foundset.getSize() > 0) {
				record = forms.book_notes.foundset.getRecord(1)
				if (record['note'] != null) {
					var str = record['note'].toString();
					/** @type {String} */
					var temp
					do {
						temp = str
						str = temp.replace('\n', '<br>')
					} while (temp != str)
					globals.notes = globals.notes.concat('<tr><td><table><tr><td><b>Notitie</b></td></tr><tr><td>')
					globals.notes = globals.notes.concat(str)
					globals.notes = globals.notes.concat('</td></tr></table></td></tr>')
				}
			}

		}
	}
	

	
	globals.notes += "</table></body></html>";
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7814086B-B920-44D2-B0A8-81CE65599788"}
 */
function put(event) {
	// TODO Auto-generated method stub

	//scopes.tools.output(showFootnotes);
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9609DB11-CB29-4272-A543-510BF713C23A"}
 */
function EVENT_onRecordSelection(event) {
	// New test function by Rick!
	if(commentary_id == undefined || !commentary_id) {
		return false;
	}

	//var commentary_id
	//Migratie: SQL aanpassen list werkt niet op PostgreSQL
	/*var query = "SELECT list('<f><b>' || f.footnote_number || '</b></f>&nbsp;' || f.htmltext, '<br>'  ORDER BY f.footnote_number) as footnote FROM footnotes AS f" +
	 " WHERE f.commentary_block_id = ?"*/
	var query = "SELECT array['<b>' || f.footnote_number || '</b>&nbsp;' || f.htmltext || '<br>'] as footnote FROM footnotes AS f" + " WHERE f.commentary_block_id = ? ORDER BY f.footnote_number"
//	var query = "SELECT array['<f><b>' || f.footnote_number || '</b></f>&nbsp;' || f.htmltext || '<br>'] as footnote FROM footnotes AS f" + " WHERE f.commentary_block_id = ? ORDER BY f.footnote_number"
		//var res = databaseManager.getDataSetByQuery(forms.articles.controller.getServerName(),query,[commentary_id], -1)
	//Migratie: aanpassen; je mag geen databaseManager meer gebruiken in een calculatie!
	var res = databaseManager.getDataSetByQuery('sb', query, [commentary_id], -1)

	//Migratie: loop maken ter vervanging van de list functie
	var vFootnoteValue = ""
	for (var i = 1; i <= res.getMaxRowIndex(); i++) {
		vFootnoteValue += res.getValue(i, 1).substring(2, res.getValue(i, 1).length - 2)
	}
	var vExtraHTML = ""
	if (globals.sb_gSelectedFootNoteNo > 0) {
		var vSQL = "SELECT footnote_number, htmltext FROM footnotes WHERE commentary_block_id = ? AND footnote_number = ?"
		var vResult = databaseManager.getDataSetByQuery('sb', vSQL, [commentary_id, globals.sb_gSelectedFootNoteNo], 1);
		vExtraHTML = "<strong>" + vResult.getValue(1, 1) + "</strong> " + vResult.getValue(1, 2) + "<br /><br />";
		//	globals.sb_gSelectedFootNoteNo = null;
	}

	var vHTML = vExtraHTML + vFootnoteValue;
//	var vHTML = "<html><body>" + vExtraHTML + vFootnoteValue + "</body></html>";
	footnotes = vHTML
	//SMM 15-07-2011
	globals.notes = footnotes
	
	forms.book_notes.fv_html = vHTML;
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"F5F0374F-4632-4D7A-ACDA-EE9D4D447028"}
 */
function EVENT_loadNotes(inp) {
	scopes.tools.output("EVENT_loadNotes fired!");
	globals.notes = inp;
	forms.book_notes.fv_html = inp;
	
	forms.web_sb_commentary.elements.tabs.tabIndex = 2;
	forms.web_sb_commentary.elements.tabs.tabIndex = 1;
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"EC76262B-2EA8-46BC-BE1E-9A209545FB8F"}
 */
function BTN_readWindow(event) {
	if(foundset.getSize() > 0) {
		forms.web_sb_form.elements.tab_notes.tabIndex = 3;
		forms.web_sb_form.elements.tab_notes.visible = true;
	}
}

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6EE89D90-D270-459E-8208-4848E5E6925E"}
 */
function EVENT_onRecordSelection2(event) {
	scopes.tools.output('oRS Fired');
}
