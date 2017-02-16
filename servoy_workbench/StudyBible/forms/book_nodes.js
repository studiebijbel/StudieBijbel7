/**
 * @properties={typeid:24,uuid:"e1cd02f1-4897-4cf7-b089-47ab16311ffb"}
 */
function createTable()
{
/*var count = databaseManager.getFoundSetCount(forms.test_nodes.foundset)
application.setStatusText(count);
application.updateUI();
for(var i=1;i<=count;i++){
	databaseManager.refreshRecordFromDatabase(forms.test_nodes.foundset, i)
	forms.test_nodes.foundset.setSelectedIndex(i)
	application.setStatusText(i+' of '+count);
	application.updateUI();
	forms.book_nodes.controller.newRecord()	
	node_id = forms.test_nodes.node_id
	node_name = forms.test_nodes.label_text 
	parent_id = forms.test_nodes.parent_id
	verse_id = forms.test_nodes.verse_id
	forms.book_nodes.controller.saveData()
}*/
forms.book_nodes.controller.newRecord()	
node_id = 1
//var node_name = 'node1'
parent_id = 0
//forms.book_nodes.controller.saveData()
databaseManager.saveData();
for(var i=2;i<=62;i++){
	forms.book_nodes.controller.newRecord()	
	node_id = i
//	node_name = 'node1'+i
	parent_id = 1
//	forms.book_nodes.controller.saveData()
	databaseManager.saveData();
}
}

/**
 * @properties={typeid:24,uuid:"faef8bc8-4018-4f3e-b072-d8f08c85adaa"}
 */
function treeInitFromTable()
{
// Get the Tree Array
//var vServer 					= 'sb';   // named datasource connection
//var Table					= 'nodes';  // table name
//var NodeForeignKeyColumn	= 'parent_id'; // relation name parent-child record
//var NodelabelColumn			= 'node_name'; 				// label column name
//var NodeIconColumn			= ''; 					// icon column name(optional)

//globals.TreeArray   = globals.RSS_TreeInit(vServer, Table, NodelabelColumn, NodeForeignKeyColumn, NodeIconColumn,null,'node_id');


// Fill the global (HTML) field

// Arguments are: treeArray, nodeClick Methodname, nodeToggle Methodname, lafcode
// LAF code 1 = Mac OS X
// LAF code 2 = Linux (kunstof)
// LAF code 3 = Windows

//globals.TreeHTML = globals.RSS_TreeHTML(globals.TreeArray,'treeNodeClick','treeNodeToggle',globals.TreeLAF);
}

/**
 * @properties={typeid:24,uuid:"f6c669f4-0572-47a7-b3e0-558252e98c0f"}
 */
function treeNodeClick()
{
var nodePK 		= arguments[0]; // Primary Key of the corresponding node record
//var LAFcode		= arguments[1]; // LAF code (Mac OS X/Linux/Windows)
var nodeCoord	= arguments[2]; // tree coordinate of the node

// ============================================================
// Do something with the provided PK
// ============================================================


// 						...something...



globals.Treedemo_showclicked = 'You clicked on: PK = ' + nodePK + ', node coordinate = ' + nodeCoord;


// ============================================================
// Rebuild the tree (with this node selected)
//globals.TreeArray = globals.RSS_TreeNodeClick(LAFcode,nodeCoord,'TreeNodeSelected',globals.TreeArray);
//globals.TreeHTML = globals.RSS_TreeHTML(globals.TreeArray,'treeNodeClick','treeNodeToggle',LAFcode);
}

/**
 * @properties={typeid:24,uuid:"66354990-e291-4971-8999-d42c94861a83"}
 */
function treeNodeToggle()
{
//var coord 			= arguments;
//globals.TreeArray 	= globals.RSS_TreeNodeToggle(globals.TreeArray, coord);
//globals.TreeHTML 	= globals.RSS_TreeHTML(globals.TreeArray,'treeNodeClick','treeNodeToggle',globals.TreeLAF);

}
