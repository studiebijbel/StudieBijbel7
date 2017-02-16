/**
 * @properties={typeid:24,uuid:"0753f74f-a779-4bd8-a573-ec512dfe6777"}
 */
function BTN_Execure()
{
if(utils.stringLeftWords(globals.sql_input, 1) == "SELECT")
{
	var vQuery = databaseManager.getDataSetByQuery('sb', globals.sql_input, null, -1);
	globals.sql_output = vQuery.getAsHTML()
} else {
	
}
}
