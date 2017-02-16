/**
 * @properties={typeid:24,uuid:"97061546-4c68-4009-9aaf-944e8fd3cd36"}
 * @AllowToRunInFind
 */
function updateParagraphs()
{
var string
forms.fill_paragraphs.controller.loadAllRecords()
var count = databaseManager.getFoundSetCount(foundset);
var code,k,newstr
for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	forms.fill_paragraphs.controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if(forms.fill_paragraphs.paragraph_text != null ){
		string = forms.fill_paragraphs.paragraph_text
		newstr = ''
		for(k=0;k < string.length;k++){
			code = string.charCodeAt(k)
			if(code == 146 || code == 145){
	   			newstr = newstr.concat('\'')
			}
			else {
			   newstr = newstr.concat(string.charAt(k))
			}
		}
		forms.fill_paragraphs.paragraph_text = newstr
	}
	
	
	if(forms.fill_paragraphs.title != null ){
		string = forms.fill_paragraphs.title
		newstr = ''
		for(k=0;k < string.length;k++){
			code = string.charCodeAt(k)
			if(code == 146 || code == 145){
	   			newstr = newstr.concat('\'')
			}
			else {
			   newstr = newstr.concat(string.charAt(k))
			}
		}
		forms.fill_paragraphs.title = newstr
	}
	
	databaseManager.saveData(forms.fill_paragraphs.foundset)
	
}
}
