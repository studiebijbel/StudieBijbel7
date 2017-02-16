/**
 * @properties={type:4,typeid:36,uuid:"2a69527d-57d8-4b23-b179-db63721fbf34"}
 */
function totalUsers()
{
	try {
		if(utils.hasRecords(sb_organisation_to_sb_organisation))
		{
			return scopes.calcs.calc_total_users();
		}
	} catch (e) {
		//
	}return true;
}