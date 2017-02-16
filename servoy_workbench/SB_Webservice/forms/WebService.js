/**
 * @type {*}
 *
 * @properties={typeid:35,uuid:"B584A79D-2466-4ACA-BA01-B8688DE1DED8",variableType:-4}
 */
var fv_action = {};

/**
 * TODO generated, please specify type and doc for the params
 * @param _args
 *
 *
 * @properties={typeid:24,uuid:"6416CE0B-0313-4B50-B9C3-B11F30373DCB"}
 */
function getActionClass(_args) {
	var _array = [];
	var _params = {};
	for(var i in _args) {
		if(typeof _args[i] === "string") {
			_array.push(_args[i]);
		} else {
			for(var key in _args[i]) {
				if(_args[i].hasOwnProperty(key)) {
					if(_args[i][key] && _args[i][key][0] != undefined) {
						_params[key] = _args[i][key][0];
					}
				}
			}
		} 
	}
	
	fv_action.actionClass = _array.join('::');
	fv_action.params = _params;
	
	if(!fv_action.actionClass || fv_action.actionClass === undefined) {
		throw [404, "<?xml version=\"1.0\" encoding=\"UTF-8\"?><error><reason>parse error</reason><message>can't find the action method</message></error>"]

	}
}

/**
 *
 * @properties={typeid:24,uuid:"2593BCA1-F506-4961-816E-566BD0E1C029"}
 */
function ws_read()
{
	getActionClass(arguments);
	fv_action.actionClass = "GET::"+fv_action.actionClass;
	return Run();
}

/**
 * 
 * TODO generated, please specify type and doc for the params
 * @param content
 *
 * @properties={typeid:24,uuid:"C46BF99B-514B-4871-BF81-8B83AE95CCCC"}
 */
function ws_create(content) {
	// Evaluate the information which we got!
	if(typeof content !== "object") {
		content = eval('(' + content + ')');
	}
	
	getActionClass(arguments);
	// Remove the node from the Object
	delete fv_action.params;
	// The remaining info needs to be put into the params
	fv_action.params = content

	fv_action.actionClass = "POST::"+fv_action.actionClass;
	return Run();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param content
 *
 *
 * @properties={typeid:24,uuid:"93E21E08-320F-4EDA-B770-84A826EBB4D6"}
 */
function ws_update(content) {
	// Evaluate the information which we got!
	if(typeof content !== "object") {
		content = eval('(' + content + ')');
	}
	
	getActionClass(arguments);
	// Remove the node from the Object
	delete fv_action.params;
	// The remaining info needs to be put into the params
	fv_action.params = content

	fv_action.actionClass = "PUT::"+fv_action.actionClass;
	return Run();
}

/**
 * @return {*}
 *
 * @properties={typeid:24,uuid:"E2F1A1F7-FC57-4958-9878-2C5E008CF272"}
 */
function Run() {
//	application.output("ActionClass => " + fv_action.actionClass);
//	application.output("[WS_INFO] " + JSON.stringify(fv_action));
	var SB = new scopes.StudyBible.StudieBijbel();
	if(fv_action.params.apilang) {
		SB.SetLang(fv_action.params.apilang);
	}
	
	switch(fv_action.actionClass) {
		
		case "POST::account::login":
			// Run the RESTful login class
			var vLogin = SB.Login(fv_action.params.Email, fv_action.params.Password, true);
			
			if(vLogin === false) {
				return {Status: "500", Message: "Username and/or password incorrect"};
				//throw [403,"<?xml version=\"1.0\" encoding=\"UTF-8\"?><error><reason>access denied</reason><message>access token is expired</message></error>"];
			} else {
				var vRec = vLogin[0];
				
				var vSubscriptions = SB.GetUserSubscriptions(vRec['sb_contact_id'], true);
				
				return {
					User: {
						ID: scopes.php.base64_encode(vRec['sb_contact_id']),
						FirstName: vRec['name_first'],
						SurName: vRec['name_last']
					},
					Subscriptions: [
						vSubscriptions
					]
				};
			}
			
		break;
		
		case "POST::account::register":
			/** @type {*} */
			var vRegister = SB.Register(fv_action.params);
			if(vRegister.status == 500) {
				return {Status:500, Message: "The emailaddress is already in use!"};
			} else if(vRegister.status == 510) {
				return {Status:510, Message: "The voucher code is invalid!"} ;
			}
			return {Status:200};
		break;
		
		case "POST::account::lostPassword":
			return {Status:(SB.LostPassword(fv_action.params.Email))?"200":"500"};
		break;
		
		case "PUT::account::lostPassword":
			var vResponse = SB.UpdatePassword(fv_action.params.Token, fv_action.params.Password);
			return {Status:(vResponse)};
		break;
		
		case "POST::account::checkPasswordToken":
			vResponse = SB.CheckPasswordToken(fv_action.params.Token);
			return {Status:(vResponse)?true:false};
		break;
			
		case "PUT::account::updateUser":
			var vUpdate = SB.UpdateUserSet(fv_action.params.Email, fv_action.params);
			return vUpdate;
		break;
		
		case "POST::account::getSubscriptions":
			vSubscriptions = SB.GetUserSubscriptions(fv_action.params.Email);
			return (vSubscriptions)?vSubscriptions:{Status: 500};
		break;
		
		case "POST::account::getUserDetails": 
			var vUser = SB.GetUserDetails(fv_action.params.Email);
			return (vUser)?vUser:{Status: 500};
		break;
		
		case "PUT::account::addSubscription":
			var vResult = SB.AddSubscriptionToUser(fv_action.params.Email, fv_action.params.SubscriptionToken, ((fv_action.params.Amount)?fv_action.params.Amount:1), false, ((fv_action.params.Multiplier)?fv_action.params.Multiplier:1));
			return {Status:(vResult)?200:500};
		break;
		
		case "PUT::account::upgradeSubscription":
			vResult = SB.UpgradeSubscription(fv_action.params.Email);
			return {Status:(vResult)?200:500};
		break;
		
		case "PUT::account::cancelSubscription":
			vResult = SB.CancelSubscriptionFromUser(fv_action.params.Email, fv_action.params.SubscriptionToken, null, fv_action.params.Reason);
			return {Status:(vResult)?200:500};
		break;
		
		case "POST::subscription::getSubscriptions":
			vResult = SB.GetAllSubscriptions(fv_action.params.Email);
			return (vResult)?vResult:{Status: 500};
		break;
		
		case "POST::subscription::getSubscription":
			vResult = SB.GetSubscription(fv_action.params.Token, fv_action.params.Email);
			return (vResult)?vResult:{Status: 500};
		break;
		
		case "GET::info::getLanguage":
			vResult = SB.GetLang();
			return (vResult)?{Language:vResult}:{Status: 500};
		break;
	}
	return false;
}