/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BFD3DAB0-7608-4CAC-BBEE-25ECCC819123"}
 */
var sb_gVersion = "1.0.6";

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BB24FEA3-19BA-471B-A5D9-8323DAF1EC13"}
 */
var sb_gCurrentUserID = "0";

/**
 * @properties={typeid:24,uuid:"20DB4953-2BB8-4A8C-A4DA-A71B7E646281"}
 */
function sb_APP_getServerLang() {
	var vSQL = "SELECT * FROM sb_servers WHERE lower(server_host) = ?";
	var vDS = databaseManager.getDataSetByQuery('sb_data', vSQL, [application.getServerURL().toLowerCase()], 1);
	
	if(vDS.getMaxRowIndex() > 0) {
		return vDS[0]["server_lang"];
	} else {
		return "NL";
	}
	
}