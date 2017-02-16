/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C62B9953-86D5-431D-8B8A-C4841700C81A",variableType:4}
 */
var fv_selected = 0;

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C0F94C7D-862A-4BDC-B115-E26B00D67F85"}
 */
function EVENT_onRecordSelection(event) {
	
	if(fv_selected == 1)
	{
		return false;
	}
	
	var callback = plugins.WebClientUtils.generateCallbackScript(EVENT_getVersesByChapter, ['chapter_id', 'chapter_no']);
	var callback2 = plugins.WebClientUtils.generateCallbackScript(EVENT_done);
	
	var script = 'function EVENT_getVersesByChapter(chapter_id, chapter_no){' + callback + '}; function  EVENT_done() {' + callback2 + '}';
	//plugins.WebClientUtils.executeClientSideJS(script);
	
	// we need to get all the chapters first
	var vSQL = "SELECT pk, chapter_no FROM chapters WHERE book_id = ? ORDER BY chapter_no ASC";
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, [pk], -1);
	var vArray = [];
	for(var i = 0; i < vDS.getMaxRowIndex(); i++)
	{
		var vRec = vDS[i];
		vArray.push(vRec['pk'] + ': \'' + i18n.getI18NMessage('cvb.lbl.chapter') + ' ' + vRec['chapter_no'] + '\'');
	}
	
	fv_selected = 1;
	
	plugins.WebClientUtils.executeClientSideJS("\
	var numbers = { " + vArray.join(',') + " }; \
	SpinningWheel.addSlot(numbers, 'right'); \
 \
	SpinningWheel.setDoneAction(done); \
	SpinningWheel.setCancelAction(EVENT_done);\
 \
	SpinningWheel.open(); \
 \
function done() { \
	var results = SpinningWheel.getSelectedValues(); \
	EVENT_getVersesByChapter(results.keys.join(', '), results.values.join(', ')) \
} \
 \
function cancel() { \
	alert('cancelled!'); \
} " + script);
	
	return true;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"62ADABAF-8078-44F0-8BCE-7ED6B34636B2"}
 */
function EVENT_onShow(firstShow, event) {
	if(firstShow)
	{
		var callback = plugins.WebClientUtils.generateCallbackScript(EVENT_getVersesByChapter, ['chapter_id', 'chapter_no']);
		var script = 'function EVENT_getVersesByChapter(chapter_id, chapter_no){' + callback + '}';
		plugins.WebClientUtils.executeClientSideJS(script);
	}
}

/**
 * @properties={typeid:24,uuid:"BDE8E285-840E-41E0-BC18-DF1385CEB8E4"}
 */
function EVENT_getVersesByChapter(chapter_id, chapter_no)
{
	scopes.tools.output("ID: " + arguments[0]);
	scopes.tools.output("Chapter: " + arguments[1]);
	
	chapter_no = utils.stringReplace(chapter_no,i18n.getI18NMessage('cvb.lbl.chapter'),'');
	
	// we need to get all the chapters first
	var vSQL = "SELECT pk, verse_number FROM verses WHERE chapter_id = ? ORDER BY verse_number ASC";
	var vDS = databaseManager.getDataSetByQuery('sb', vSQL, [parseInt(chapter_id)], -1);
	var vArray = [];
	for(var i = 0; i < vDS.getMaxRowIndex(); i++)
	{
		var vRec = vDS[i];
		vArray.push(vRec['pk'] + ': \'' + i18n.getI18NMessage('cvb.lbl.verse') + " " + utils.stringTrim(chapter_no) +":" + vRec['verse_number'] + '\'');
	}
	
	var callback = plugins.WebClientUtils.generateCallbackScript(EVENT_getVersesByChapter, ['chapter_id', 'chapter_no']);
	var callback2 = plugins.WebClientUtils.generateCallbackScript(EVENT_done);
	var callback3 = plugins.WebClientUtils.generateCallbackScript(EVENT_selected, ['verse_id', 'verse_number']);
	
	var script = 'function EVENT_getVersesByChapter(chapter_id, chapter_no){' + callback + '}; function EVENT_selected(verse_id, verse_number) {' + callback3 + '}; function  EVENT_done() {' + callback2 + '}';

	application.sleep(1000);
	plugins.WebClientUtils.executeClientSideJS("\
		var numbers = { " + vArray.join(',') + " }; \
		SpinningWheel.addSlot(numbers, 'right'); \
	 \
		SpinningWheel.setDoneAction(done); \
		SpinningWheel.setCancelAction(EVENT_done);\
	 \
		SpinningWheel.open(); \
	 \
	function done() { \
		var results = SpinningWheel.getSelectedValues(); \
		EVENT_selected(results.keys.join(', '), results.values.join(', ')) \
	} \
	 \
	function cancel() { \
		alert('cancelled!'); \
	} " + script);
}

/**
 * @properties={typeid:24,uuid:"37D78524-4F32-451F-9A37-6EA6E0661220"}
 */
function EVENT_done()
{
	fv_selected = 0;
	scopes.tools.output('Cancel triggered')
}

/**
 * // TODO generated, please specify type and doc for the params
 * @param {Object} verse_id
 * @param {Object} verse_number
 *
 * @properties={typeid:24,uuid:"0F3BD72C-7E11-4836-8A73-FD846F536316"}
 * @AllowToRunInFind
 */
function EVENT_selected(verse_id, verse_number)
{
	if(verse_number)
	{
		EVENT_done();
	}
	
	if(forms.study_words_frm.foundset.find())
	{
		forms.study_words_frm.foundset.pk = verse_id
		var vCount = forms.study_words_frm.foundset.search();
	}
	
	if(vCount == 1)
	{
		if(globals.gHistory.length < 1)
		{
			// always add a first record
			var vTempObj = {};
				vTempObj.do_search = false;
				vTempObj.form = 'search_book_frm'
			globals.gHistory.push(vTempObj);
			vTempObj = null;
		}		
		forms.study_words_frm.controller.show();
	}
}
