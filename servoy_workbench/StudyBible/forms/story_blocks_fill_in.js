/**
 * @properties={typeid:24,uuid:"65bbc189-4644-4f5f-ab93-1d989acb9cc3"}
 */
function updateFont1()
{
//not working

var query = "select footnote, story_text from story_blocks where footnote like '%<font1>%' or story_text like '%<font1>%' order by pk"
var res = databaseManager.getDataSetByQuery("sb", query, null, 1000)
for(var i=5; i<6; i++)
{
	var row = res.getRowAsArray(i)
	
	var vfootnote = row[0]
	var text = row[1]
	
	vfootnote = globals.TextChangeFont1ToCaps(vfootnote);
	text = globals.TextChangeFont1ToCaps(text);
	
	databaseManager.saveData()
}
}

/**
 * @properties={typeid:24,uuid:"a085c29b-9e65-4224-9d3a-2dfae1d2695a"}
 * @AllowToRunInFind
 */
function updateStoryBlocks()
{
var temp
var count = databaseManager.getTableCount(foundset);
controller.loadAllRecords();//to make param(s) effective
count = databaseManager.getFoundSetCount(foundset)
controller.sort('pk asc');

for(var i=1; i<=count; i++){
	databaseManager.refreshRecordFromDatabase(foundset, i)

	controller.setSelectedIndex(i);
	//Set the status area value
	application.setStatusText(''+i + ', pk ' + pk +', of '+count);
	application.updateUI();

	try
	{
		if(story_text != null){
			temp = globals.TextChangeFReferenceToSuper(story_text);
			if(temp!=null)
			{
				story_text = temp;
			}
			temp = globals.TextFlinkFillIn(story_text);
			if(temp!=null)
			{
					story_text = temp;
			}
			temp = globals.TextReplaceHebrewInFootnotes(temp);
			if(temp!=null)
			{
					story_text = temp;
			}

		}
		
		if(footnote != null)
		{
			temp = footnote
			temp = temp.replace(/<f>([\d]+)<\/f>/gi, "<br><f><b>$1</b></f>");
			temp = globals.TextReplaceHebrewInFootnotes(temp);
			footnote = temp
		}
	}
	catch(e)
	{
		//scopes.tools.output(e)
		//scopes.tools.output("Error at record "+pk)
	}
}
}
