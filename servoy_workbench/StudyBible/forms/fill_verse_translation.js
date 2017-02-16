/**
 * @properties={typeid:24,uuid:"528bbffe-401a-4d66-859d-120405eba2a8"}
 */
function order()
{
var count = databaseManager.getTableCount(foundset);
for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	if(i%100==0)
	{
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	}
	if(foundset.subscr_id != null){
		var bIndex = subscr_id.indexOf('n')
		var cIndex = subscr_id.indexOf('c')
		var vIndex = subscr_id.indexOf('v')
		var oIndex = subscr_id.indexOf('o')
		var str = subscr_id.substring(bIndex+1,cIndex)
		var nr = parseInt(str)
		book_order = nr
		str = subscr_id.substring(cIndex+1,vIndex)
		nr = parseInt(str)
		chapter_order = nr
		str = subscr_id.substring(vIndex+1,oIndex)
		nr = parseInt(str)
		verse_order = nr
	}
	else
		book_order = 67
		chapter_order = 100
		verse_order =100
}

}

/**
 * @properties={typeid:24,uuid:"603a3795-8f5d-498d-bfbc-85e4a32f7ff7"}
 * @AllowToRunInFind
 */
function updateTranslation()
{
//controller.find()
//transl_text = '%#E8%'
//controller.search()
controller.loadAllRecords()
controller.find()
translation_book_id = 1000005
controller.search()
var count = databaseManager.getFoundSetCount(foundset);
//var count = controller.getMaxRecordIndex()
application.setStatusText(count.toString());
application.updateUI();

for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	if(i%10==0)
	{
		application.setStatusText(''+i +' of '+count);
		application.updateUI();
	}
	if(forms.fill_verse_translation.transl_text != null){
/*		var str = transl_text
		var temp
		do {
			temp = str
			str = str.replace('#E8','&#232;')
			str = str.replace('&&#130;16','&#8216')
			str = str.replace('&&#130;17','&#8217')
		} while ( str != temp)
*/
	var temp = transl_text
	temp = globals.TextReplaceSpecialChars(temp);
	forms.fill_verse_translation.transl_text = temp
	}
}
}
