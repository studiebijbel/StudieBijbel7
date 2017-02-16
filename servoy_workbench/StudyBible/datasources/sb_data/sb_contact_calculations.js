/**
 * @properties={type:12,typeid:36,uuid:"9ABC3781-AC0B-4274-A83F-01202DD506DA"}
 */
function c_reset_url()
{
	return "https://www.studiebijbel.nl/wachtwoord-vergeten/?token="+reset_token;
}

/**
 * @properties={type:12,typeid:36,uuid:"CB3C28CD-B73B-4675-965C-A18821724B9A"}
 */
function display_search()
{
	return  name_first + " " + name_last + ((organisation_name!=null)?" (" + organisation_name + ")": "");
}

/**
 * @properties={type:12,typeid:36,uuid:"33C8AB24-DC1A-4D10-8646-9260B65E3307"}
 */
function fullname()
{
	return name_first + " " + name_last;
}

/**
 * @properties={type:12,typeid:36,uuid:"5473AFCA-BAA5-4E3E-A1A7-FF9E61CFDC04"}
 */
function organisation_name()
 {
 if(utils.hasRecords(sb_contact_to_sb_organisation)){
 	return sb_contact_to_sb_organisation.organisation_name
 }
 else {
 	return null
 }
 }

/**
 * @properties={type:12,typeid:36,uuid:"DDA6393B-2C26-425D-861C-80B23B69281D"}
 */
function sb_user_uuid()
 {
 if(!sb_user_uuid){
 	return application.getUUID();
 }
 return true;
 }
