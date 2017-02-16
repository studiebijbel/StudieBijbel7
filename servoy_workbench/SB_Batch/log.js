/**
 * @properties={typeid:35,uuid:"66D5486B-E347-41CA-9D94-BEC6295A47BB",variableType:-4}
 */
var LOG_LEVEL = {DEBUG:1, INFO:2, WARNING:3, ERROR:4};

/**
 * @properties={typeid:35,uuid:"3763B118-F2EB-44E4-B598-6FA0DDABE7EC",variableType:-4}
 */
var INSTANCE = (function() {
	var vFile = plugins.UserManager.Server().servoyDirectory + "/cvb-log.txt";
	
	/**
	 * @param {String} text
	 */
	var Write = function(text) {		
		plugins.file.appendToTXTFile(vFile,text+"\n");
	}
	
	return function() {
		this.Write = Write;
	}
})();