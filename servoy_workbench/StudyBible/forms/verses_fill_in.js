/**
 * @properties={typeid:24,uuid:"7a872bb7-1968-4743-ae71-b18539c0fdf2"}
 * @AllowToRunInFind
 */
function fillHtmlWords()
{
//controller.addFoundSetFilterParam('pk', '<', 1013448)
//controller.addFoundSetFilterParam('pk', '>', 1013427)
controller.loadAllRecords()
var rowSize = 4
var cont = Array(rowSize)
var cont_gr = Array(rowSize)
var k
var count = databaseManager.getFoundSetCount(foundset);

//scopes.tools.output(count)

for(var i=1; i<=count; i++){
	controller.setSelectedIndex(i);	
	
	if(i%50==0)
	{
		//Set the status area value
		application.setStatusText('Verse ' + i + ' ( ' + pk + ' - chapter ' + chapter_id + ') of '+count);
		application.updateUI();
	}
	if(!pk){
		continue;
	}
	var query="select word_original, word_transliteration, word_translation, word_strong from words where verse_id=" + pk + " and word_strong is not null and word_strong!='' order by word_order"
	var res = databaseManager.getDataSetByQuery('sb',query, null, 1000)
	var size = res.getMaxRowIndex()
	//scopes.tools.output('Size is ' + size + ' for verse ' + pk +'\n')
	if(size!=0)
	{
		var header = '<html><body><table><tr><td><table cellpadding="4" cellspacing="4">'
		var content = ''
		var content_gr = ''
		var footer = '</table></td></tr></table></body></html>'
		for ( var j=1; j<=size; j++ )
		{
			res.rowIndex = j
			//Set the status area value
			//application.setStatusText('Verse ' + i + ' ( ' + pk + ' - chapter ' + chapter_id + ') of '+count+", word "+j+" of "+size);
			//application.updateUI();
		
			if((j-1)%rowSize==0)
			{
				content+='<tr>'
				content_gr+='<tr>'
			}
			
			if(res[4])
			{
				/** @type {String} */
				var strong = res[4]
				var index=strong.indexOf('.', 0)
				if(index>0)
					strong = strong.substring(0, index)
				
			//	cont[rowSize-(j-1)%rowSize-1] ='<td valign="top"><B><a href="javascript:globals.wlink(\'' + strong + '\')" style="color:black;text-decoration:none"><font face="SIL Ezra" color="#000000">' + plugins.SILEzraToUnicode.convertToEzra(res[1]) + '</font></a></B><br><font face="SIL Heb Trans">'+plugins.SILEzraToUnicode.convertToEzra(res[2])+'</font><br>' + res[3] + '</td>'				
			//	cont_gr[rowSize-(j-1)%rowSize-1] ='<td valign="top"><B><a href="javascript:globals.wlink(\'' + strong + '\')" style="color:black;text-decoration:none"><font face="SIL Ezra" color="#000000">' + plugins.SILEzraToUnicode.convertToEzra(res[1]) + '</font></a></B></td>'
				cont[rowSize-(j-1)%rowSize-1] ='<td valign="top"><B><font face="SIL Ezra" color="#000000">' + globals.stringToCharNo(res[1]) + '</font></B><br><font face="SIL Heb Trans">'+(res[2])+'</font><br>' + res[3] + '</td>'				
				cont_gr[rowSize-(j-1)%rowSize-1] ='<td valign="top"><B><font face="SIL Ezra" color="#000000">' + globals.stringToCharNo(res[1]) + '</font></B></td>'
		}
			else
			{
				cont[rowSize-(j-1)%rowSize-1]=''
				cont_gr[rowSize-(j-1)%rowSize-1]=''
			}
			
			if(j%rowSize==0)
			{
				for(k=0; k<rowSize;k++)
				{
					content+=cont[k]
					content_gr+=cont_gr[k]
				}
				content+='</tr>'
				content_gr+='</tr>'
			}
			
	/*		
			//fill word_study cache into concordance_lookup for OT
			var query2 = "SELECT v.pk FROM verses v where v.words_html_tr like '%wlink(''" + strong +"'')%' order by chapter_id, pk"
			var res2 = databaseManager.getDataSetByQuery("sb", query2, null, 5000)
			//scopes.tools.output("size of "+strong+":"+res2.getMaxRowIndex())
			words_concordance +="<w>" + strong + "<vs>" + res2.getColumnAsArray(1).join("<vs>") + "</w>"
			//scopes.tools.output(words_concordance)
		*/	
			
		}//j		
		//concordance_lookup = words_concordance
		
		
		if(size%rowSize!=0)
		{
			for(k=0; k<rowSize-size%rowSize; k++)
			{
				content += '<td valign="top">&nbsp;</td>'
				content_gr += '<td valign="top">&nbsp;</td>'
			}
			for(k=rowSize-size%rowSize; k<rowSize;k++)
			{
				content+=cont[k]
				content_gr+=cont_gr[k]
			}

			content+='</tr>'
			content_gr+='</tr>'
		}
		
		words_html_tr = header + content + footer
		words_html_tr_gr = header + content_gr + footer
		databaseManager.saveData(foundset)
	}//size not zero
}//i

controller.loadAllRecords()
}

/**
 * @properties={typeid:24,uuid:"a555ef04-3b01-42fa-bb1c-abf9fe76b4ba"}
 */
function order()
{
var count = databaseManager.getTableCount(foundset);
var nr,str
for(var i=1; i<=count; i++){
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
		str = subscr_id.substring(bIndex+1,cIndex)
		nr = parseInt(str)
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
 * @properties={typeid:24,uuid:"4cebb36d-3c1d-464a-b318-46bc0b72d057"}
 */
function updateComment()
{
var index1,index2,index3,number,aux
var count = databaseManager.getTableCount(foundset);
for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	if(commentary != null){
		var text = commentary
		index1 = text.indexOf('<wlink>')
		while(index1 >= 0){
			index2 = text.indexOf('\=',index1)
			index3 = text.indexOf('</wlink>',index1)
			if(index2 >= 0){
				number = text.substring(index2+1,index3)
			}
			else
			   number = ''
			aux = text.substring(0,index1)
			aux = aux.concat('<a href="javascript:wlink(\'')
			aux = aux.concat(number)
			aux = aux.concat('\')">')
			if(index2 >= 0){
				aux = aux.concat(text.substring(index1+7,index2))
			}
			else {
				aux = aux.concat(text.substring(index1+7,index3))
			}
			aux = aux.concat('</a>')
			aux = aux.concat(text.substring(index3+8))
			text = aux
			index1 = text.indexOf('<wlink>',index1+1)
		}
		
		index1 = text.indexOf('<tlink>')
		while(index1 >= 0){
			index2 = text.indexOf('\=',index1)
			index3 = text.indexOf('</tlink>',index1)
			aux = text.substring(0,index1)
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
		
		commentary = temp
	}
}
}

/**
 * @properties={typeid:24,uuid:"54ed067a-9f10-412a-84b9-bba3c5b3c5cd"}
 * @AllowToRunInFind
 */
function updateComment2()
{
controller.find()
commentary = '%wlink%'
controller.search()
var count = databaseManager.getFoundSetCount(foundset)
application.setStatusText(''+count);
application.updateUI();
for(var i=1; i<=1; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i +' of '+count);
	application.updateUI();
	var temp = commentary
	var aux = ''
	var index = temp.indexOf('wlink(')
	while(index >= 0 && temp.length>0){
			aux = aux.concat(temp.substring(0,index))
			var index2 = temp.indexOf(')',index)
			aux = aux.concat('wlink(')
			aux = aux.concat(temp.substring(index+6,index2))
			aux = aux.concat(')\"')
			temp = temp.substring(index2+1)
			index = temp.indexOf('wlink(')
	}
	if(temp.length>0)
			aux = aux.concat(temp)
	//scopes.tools.output(commentary)
	//scopes.tools.output(aux)
	commentary = aux
}
}

/**
 * @properties={typeid:24,uuid:"8c25e43f-25e3-486d-a94b-f29818cd967d"}
 * @AllowToRunInFind
 */
function updateVerses()
{
var count = databaseManager.getTableCount(foundset);
controller.loadAllRecords();//to make param(s) effective
count = databaseManager.getFoundSetCount(foundset)

for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)
	controller.setSelectedIndex(i);
	//Set the status area value
	if(i%20==0)
	{
		application.setStatusText(''+i + ' (' + pk + ' - chapter '+chapter_id + ') of '+count);
		application.updateUI();
	}
	try
	{
		if(commentary != null){
			var text = globals.TextWlinkFill(commentary);
			text = globals.TextTlinkFill(text);
			text = globals.TextReplaceSpecialChars(text);
			commentary = text
		}
	}
	catch(e)
	{
		//scopes.tools.output(e)
		//scopes.tools.output("Error at record "+pk)
	}
}
}
