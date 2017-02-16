/**
 * @properties={typeid:24,uuid:"9461d744-ccf7-4d1f-b2fc-9645eab69188"}
 */
function updateArticles()
{
var count = databaseManager.getTableCount(foundset)
for(var i=1; i<=count; i++){
	
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if(filename != null ){
		var string = filename
		var newstr = ''
		for(var k=0;k < string.length;k++){
			var code = string.charCodeAt(k)
			if(code == 146 || code == 145){
	   			newstr = newstr.concat('\'')
			}
			else {
			   newstr = newstr.concat(string.charAt(k))
			}
		}
		filename = newstr
	}
	
}
}
