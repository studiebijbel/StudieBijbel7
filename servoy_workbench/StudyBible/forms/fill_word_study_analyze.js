/**
 * @properties={typeid:24,uuid:"f6255d5a-2624-487c-baad-e05b03b1559e"}
 */
function updateWSAnalyze()
{
var newOriginal,nr
var count = databaseManager.getTableCount(foundset);
for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if(original != null){
		var index1 = original.indexOf('<pct>')
		var index2 = original.indexOf('</pct>')
		if(index1 > 0){
				newOriginal = original.substring(0,index1)
				
		}  else if(index1 == 0) {
				newOriginal = original.substring(index2+6)
		}
		else
				newOriginal = original
		var greek = (newOriginal)
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
	var newText = word_translation
	if(newText != null){
					
					var indexHex = newText.indexOf('#E')
					if( indexHex >= 0) {
						var hex = newText.substring(indexHex+1, indexHex+3)
						nr = 0
						
						for(var k=0; k<hex.length;k++) {
							switch( hex.charAt(k) ){
								case 'A' : nr = nr*16 + 10
											break
								case 'B' : nr = nr*16 + 11
											break
								case 'C' : nr = nr*16 + 12
											break
								case 'D' : nr = nr*16 + 13
											break
								case 'E' : nr = nr*16 + 14
											break		
								case 'F' : nr = nr*16 + 15
											break
								default: var str = '' + hex.charAt(k)
										nr = nr*16 + parseInt(str)		
							}
						}
						nr = '&#' + nr + ';'
						var newText2 = newText.substring(0,indexHex)
						newText2 = newText2.concat(nr.toString())
						newText2 = newText2.concat(newText.substring(indexHex+hex.length+1))
						newText = newText2
					}
		word_translation = newText
	}
	
}
}
