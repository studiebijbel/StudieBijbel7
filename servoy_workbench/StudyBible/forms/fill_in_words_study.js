/**
 * @properties={typeid:24,uuid:"113527ac-7bf7-4a1f-a30c-5e01b10a451c"}
 * @AllowToRunInFind
 */
function updateWordStudy()
{
controller.find()
transliteration = '%I^%'
controller.search()
var count = databaseManager.getFoundSetCount(foundset);
application.setStatusText(count.toString());
application.updateUI();
for(var i=1;i<=count;i++){
databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if(transliteration != null){
	var temp = transliteration
				var temp2
				do {
					temp2 = temp
					temp = temp.replace('E^','&#274;')
					temp = temp.replace('A^','&#256;')
					temp = temp.replace('I^','&#298;')
					temp = temp.replace('O^','&#332;')
					
				} 
				while ( temp != temp2)
	transliteration = temp
	}
}
/*var count = databaseManager.getTableCount(foundset);
	application.setStatusText(''+count);
	application.updateUI();

for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	
	if( first_line != null) {
		var text= first_line

		var index1 = text.indexOf('<wlink>')
		while(index1 >= 0){
			var index2 = text.indexOf('\=',index1)
			var index3 = text.indexOf('</wlink>',index1)
			var aux = text.substring(0,index1)
			if(index2 >= 0){
				aux = aux.concat(text.substring(index1+7,index2))
			}
			else {
				aux = aux.concat(text.substring(index1+7,index3))
			}
			aux = aux.concat(text.substring(index3+8))
			aux = aux.concat()
			text = aux
			index1 = text.indexOf('<wlink>',index1+1)
		}
		var index1 = text.indexOf('<tlink>')
		while(index1 >= 0){
			var index2 = text.indexOf('\=',index1)
			var index3 = text.indexOf('</tlink>',index1)
			var aux = text.substring(0,index1)
			if(index2 >= 0){
				aux = aux.concat(text.substring(index1+7,index2))
			}
			else {
				aux = aux.concat(text.substring(index1+7,index3))
			}
			aux = aux.concat(text.substring(index3+8))
			aux = aux.concat()
			text = aux
			index1 = text.indexOf('<tlink>',index1+1)
		}
		var temp = text
		do {
			aux = temp
			temp = temp.replace('e^','&#275;')
			temp = temp.replace('a^','&#257;')
			temp = temp.replace('i^','&#299;')
			temp = temp.replace('o^','&#333;')
			temp = temp.replace('u^','&#363;')
			temp = temp.replace(">Q<",">&#8216<");
			temp = temp.replace(">W<",">&#8217<");
			temp = temp.replace("</I>W","</I>&#8217");	
			temp = temp.replace("#91","&#8216")
			temp = temp.replace("#92","&#8217")
			//temp = temp.replace("^","-")
		} while( temp != aux )
		do {
			aux = temp
			temp = temp.replace("^","-")
		} while( temp != aux )
		
		first_line = temp
	
	}
	if( word_text != null){
		var text = word_text
		var index1 = text.indexOf('<wlink>')
		while(index1 >= 0){
			var index2 = text.indexOf('\=',index1)
			var index3 = text.indexOf('</wlink>',index1)
			var aux = text.substring(0,index1)
			if(index2 >= 0){
				aux = aux.concat(text.substring(index1+7,index2))
			}
			else {
				aux = aux.concat(text.substring(index1+7,index3))
			}
			aux = aux.concat(text.substring(index3+8))
			aux = aux.concat()
			text = aux
			index1 = text.indexOf('<wlink>',index1+1)
		}
		var index1 = text.indexOf('<tlink>')
		while(index1 >= 0){
			var index2 = text.indexOf('\=',index1)
			var index3 = text.indexOf('</tlink>',index1)
			var aux = text.substring(0,index1)
			if(index2 >= 0){
				aux = aux.concat(text.substring(index1+7,index2))
			}
			else {
				aux = aux.concat(text.substring(index1+7,index3))
			}
			aux = aux.concat(text.substring(index3+8))
			aux = aux.concat()
			text = aux
			index1 = text.indexOf('<tlink>',index1+1)
		}
		var temp = text
		do {
			aux = temp
			temp = temp.replace('e^','&#275;')
			temp = temp.replace('a^','&#257;')
			temp = temp.replace('i^','&#299;')
			temp = temp.replace('o^','&#333;')
			temp = temp.replace('u^','&#363;')
			temp = temp.replace(">Q<",">&#8216<");
			temp = temp.replace(">W<",">&#8217<");
			temp = temp.replace("</I>W","</I>&#8217");	
			//temp = temp.replace("^","-")
		} while( temp != aux )
		do {
			aux = temp
			temp = temp.replace("^","-")
		} while( temp != aux )
			
	 	word_text = temp
	}
	
	if(original != null){
		var index1 = original.indexOf('<pct>')
		var index2 = original.indexOf('</pct>')
		if(index1 > 0){
				var newOriginal = original.substring(0,index1)
				
		}  else if(index1 == 0) {
				var newOriginal = original.substring(index2+6)
		}
		else
				var newOriginal = original
		var greek = plugins.SB_NT.getGreek(newOriginal)
		if(index1 > 0) {
				greek = greek.concat(original.substring(index1+5,index2))
		}
		else if(index1 == 0){
			 	var aux = greek
				greek = original.substring(index1+5,index2)
				greek = greek.concat(aux)
				
		}	
		original = greek
	}
	
	if(transliteration != null){
	var temp = transliteration
				var temp2
				do {
					temp2 = temp
					temp = temp.replace('e^','&#275;')
					temp = temp.replace('a^','&#257;')
					temp = temp.replace('i^','&#299;')
					temp = temp.replace('o^','&#333;')
					temp = temp.replace('u^','&#363;')
					temp = temp.replace(">Q<",">&#8216<");
					temp = temp.replace(">W<",">&#8217<");
					temp = temp.replace("</I>W","</I>&#8217");	
					temp = temp.replace("#91","&#8216")
					temp = temp.replace("#92","&#8217")
				} 
				while ( temp != temp2)
	transliteration = temp
	}
	
}
*/
}

/**
 * @properties={typeid:24,uuid:"6a1ba58a-f135-4ad3-9cac-776e7a59ae7a"}
 * @AllowToRunInFind
 */
function updateWordStudy2()
{
var text
controller.loadAllRecords()
var count = databaseManager.getFoundSetCount(foundset);
application.setStatusText(count.toString());
application.updateUI();
for(var i=5172;i<=5172;i++)
{
	try
	{
		databaseManager.refreshRecordFromDatabase(foundset, i)
		controller.setSelectedIndex(i);
		//Set the status area value
		application.setStatusText(''+i + ' (' + transliteration +') of '+count);
		application.updateUI();
		
		if(transliteration != null)
		{
			transliteration = globals.TextReplaceSpecialChars(transliteration)
		}
		
		if( first_line != null) 
		{
			text= first_line
			text = globals.TextWlinkClear(text)
			text = globals.TextTlinkFill(text)
			text = globals.TextReplaceSpecialChars(text)
			first_line = text
		}
		
		if( word_text != null)
		{
			text = word_text
			text = globals.TextWlinkFill(text)
			text = globals.TextTlinkFill(text)
			text = globals.TextReplaceSpecialChars(text)
			word_text = text
		}
		
		original = globals.TextChangeToGreek(original);
	}
	catch(e)
	{
		//scopes.tools.output(e)
		//scopes.tools.output("Error at record "+i)
	}
}
	

}
