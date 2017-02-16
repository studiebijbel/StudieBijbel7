/**
 * @properties={typeid:24,uuid:"9D3393CA-AE5C-4E64-8CD0-3E85A4F92384"}
 */
function BTN_showDetails()
{

//if( calc_book_chap_verse() )
//{	
//	globals.wlink( calc_book_chap_verse )
	globals.viewVerse( verse_id )
//}
}

/**
 * @properties={typeid:24,uuid:"91DF8A5A-C165-46B3-B8CB-E6E36B3FC11F"}
 */
function string_ToUnicode()
{
/*
 *	String to Unicode
 *	(C) 2009 Ambitius BV
 *	http://www.ambitius.com
 */
 /** @type JSRecord<db:/sb/words> */
var vRecord
application.setStatusText('Updating records')

var vTotal = databaseManager.getFoundSetCount(foundset)

for(var sdf = 1; sdf <= foundset.getSize(); sdf++)
{
	vRecord = foundset.getRecord(sdf);
	vRecord.word_orginal_unicode = globals.stringToCharNo(vRecord.word_original);
	if(sdf%10==0)
	{
		application.setStatusText('Updating records | ' + sdf + ' of ' + vTotal)
		databaseManager.saveData()
		application.updateUI()
	}
}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"8C5B36FF-1EEB-44D4-83F1-91F59C7AA697"}
 */
function FORM_onShow(firstShow, event) {
//	foundset.sort("verse_translations_to_books.order_number asc");
	foundset.sort("words_to_verses.verses_to_books.order_number asc");
}
