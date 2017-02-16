/**
 * @properties={typeid:24,uuid:"f94fa2cc-909d-44ee-b3e1-f8127c93c833"}
 * @AllowToRunInFind
 */
function getWords()
{
globals.x = ''
forms.words_fill_in.controller.find()
forms.words_fill_in.verse_id = 1000054
forms.words_fill_in.controller.search()
/** @type JSRecord<db:/sb/words> */
var record
for(var i=1;i<= forms.words_fill_in.foundset.getSize();i++) {
		record = forms.words_fill_in.foundset.getRecord(i);
		globals.x = globals.x.concat(record.word_original)
		globals.x = globals.x.concat(' ')
		globals.x = globals.x.concat(record.word_translation)
		globals.x = globals.x.concat(' ')
		globals.x = globals.x.concat(record.word_transliteration)
		globals.x = globals.x.concat('\n')
}
forms.test_greek.controller.show()
}

/**
 * @properties={typeid:24,uuid:"d7bbd4d0-2117-410b-9bd4-16b20863b0af"}
 */
function show()
{
controller.show()
}
