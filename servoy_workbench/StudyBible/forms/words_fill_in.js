/**
 * @properties={typeid:24,uuid:"3fa09723-b792-456e-bfe6-aaed384a6bbe"}
 */
function order()
{
/** @type {String} */
//var subscr_id
var count = databaseManager.getTableCount(foundset);
for(var i=48805; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if(subscr_id != null){
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
}
}

/**
 * @properties={typeid:24,uuid:"fcd7db65-48e7-4669-8412-d06412339be4"}
 * @AllowToRunInFind
 */
function test()
{

controller.find();
pk = 1034560
controller.search()

foundset.setSelectedIndex(1)
//globals.x = plugins.SB_NT.getGreek(word_original)
forms.words_fill_in.controller.show()

}

/**
 * @properties={typeid:24,uuid:"64c623ae-ed80-4730-b010-ae2a65c5ab18"}
 * @AllowToRunInFind
 */
function updateWords()
{
//var count = databaseManager.getTableCount(foundset);
//Start a find request
var nr
forms.words_fill_in.controller.find()
forms.words_fill_in.word_transliteration = '%#F%'
forms.words_fill_in.controller.search()
var count = databaseManager.getFoundSetCount(foundset);
application.setStatusText(count.toString());
application.updateUI();

/*for(var i=1;i<=count;i++){
databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if(forms.words_fill_in.word_transliteration != null){
	var temp = forms.words_fill_in.word_transliteration
				var temp2
				do {
					temp2 = temp
					temp = temp.replace('E^','&#274;')
					temp = temp.replace('A^','&#256;')
					temp = temp.replace('I^','&#298;')
					temp = temp.replace('O^','&#332;')
					
				} 
				while ( temp != temp2)
	forms.words_fill_in.word_transliteration = temp
	}
}*/
for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if(word_transliteration != null){
		var newText = word_transliteration
		var indexHex = newText.indexOf('#F')
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
		forms.words_fill_in.word_transliteration = newText
	}
}	
/*
for(var i=86587; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if( forms.words_fill_in.word_original != null){
			var index1 = forms.words_fill_in.word_original.indexOf('<pct>')
			var index2 = forms.words_fill_in.word_original.indexOf('</pct>')
			var index3 = forms.words_fill_in.word_original.indexOf('.')
			var index4 = forms.words_fill_in.word_original.indexOf(';')
			var index5 = forms.words_fill_in.word_original.indexOf(',')
			var index6 = forms.words_fill_in.word_original.indexOf('|')
			if(index1 > 0){
				var newOriginal = forms.words_fill_in.word_original.substring(0,index1)
			} else if(index1 == 0) {
				var newOriginal = forms.words_fill_in.word_original.substring(index2+6)
			}
			else if(index3 > 0) {
				var newOriginal = forms.words_fill_in.word_original.substring(0,index3)
			}
			else if(index4 > 0){
				var newOriginal = forms.words_fill_in.word_original.substring(0,index4)
			}
			else if(index5 > 0){
				var newOriginal = forms.words_fill_in.word_original.substring(0,index5)
			}
			else if(index6 > 0){
				var newOriginal = forms.words_fill_in.word_original.substring(0,index6)
			}
			else
				var newOriginal = forms.words_fill_in.word_original
		
			var greek = plugins.SB_NT.getGreek(newOriginal)
			
			if(index1 > 0) {
				greek = greek.concat(forms.words_fill_in.word_original.substring(index1+5,index2))
			}
			else if(index1 == 0){
			 	var aux = greek
				greek = forms.words_fill_in.word_original.substring(index1+5,index2)
				greek = greek.concat(aux)
				
			}	
			else if(index3 > 0) {
				greek = greek.concat(forms.words_fill_in.word_original.substring(index3))
			}
			else if(index4 > 0){
				greek = greek.concat(forms.words_fill_in.word_original.substring(index4))
			}
			else if(index5 > 0){
				greek = greek.concat(forms.words_fill_in.word_original.substring(index5))
			}
			else if(index6 > 0){
				greek = greek.concat(forms.words_fill_in.word_original.substring(index6))
			}
	 forms.words_fill_in.word_original = greek
	}
	if(forms.words_fill_in.word_transliteration != null){
	var temp = forms.words_fill_in.word_transliteration
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
	forms.words_fill_in.word_transliteration = temp
	}
	newText = forms.words_fill_in.word_translation
	if(newText != null){
					
					var indexHex = newText.indexOf('#E')
					if( indexHex >= 0) {
						var hex = newText.substring(indexHex+1, indexHex+3)
						var nr = 0
						
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
						var nr = '&#' + nr + ';'
						var newText2 = newText.substring(0,indexHex)
						newText2 = newText2.concat(nr)
						newText2 = newText2.concat(newText.substring(indexHex+hex.length+1))
						newText = newText2
					}
		forms.words_fill_in.word_translation = newText
	}
}
*/
/*
for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	var text = word_translation
	var newText = ''
	index1 = text.indexOf('[')
	
	if(index1>=0){
			newText = text.substring(0,index1)
			newText = newText.concat(text.substring(index1+1))
			//newText = newText.concat(text.substring(index2+1))
	}
	else {
			newText = forms.words_fill_in.word_translation
	}
	text = newText
	index2 = text.indexOf(']')
	if( index2 >=0){
		newText = text.substring(0,index2)
		newText = newText.concat(text.substring(index2+1))
	}
	else {
			newText = forms.words_fill_in.word_translation
	}
	forms.words_fill_in.word_translation = newText
}
*/

}
