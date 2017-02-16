
/**
 * @type Object
 * @properties={typeid:35,uuid:"C9C58704-3A51-462A-ACD3-9876D02E2A9F",variableType:-4}
 */
var fv_action = {};

/**
 * TODO generated, please specify type and doc for the params
 * @param _args
 *
 * @properties={typeid:24,uuid:"B87053EF-D5B1-4044-ABBD-6566C3FFF054"}
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
					_params[key] = _args[i][key][0];
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
 * @properties={typeid:24,uuid:"6C6077F4-F13C-4036-B6F0-BC8E01512DA0"}
 */
function ws_read()
{
	getActionClass(arguments);
	fv_action.actionClass = "GET::"+fv_action.actionClass;
	return Run();
}

/**
 * @properties={typeid:24,uuid:"308EE2EF-DBC6-45E4-95C3-069CDFD52556"}
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
 * @properties={typeid:24,uuid:"DE71D557-C779-4A43-837A-F08FB68EAFBD"}
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
	return Run()
}

/**
 * @properties={typeid:24,uuid:"66674E6A-AF0C-4EDF-8AEF-4F9CB603259E"}
 * @return {*}
 */
function Run() {
	application.output("ActionClass => " + fv_action.actionClass);
	
	var SB = new scopes.StudyBible.StudieBijbel();
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
			var vRegister = SB.Register(fv_action.params);
			if(!vRegister) {
				return {Status:"500", Message: "The emailaddress is already in use!"};
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
			var vResponse = SB.CheckPasswordToken(fv_action.params.Token);
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
			var vResult = SB.AddSubscriptionToUser(fv_action.params.Email, fv_action.params.SubscriptionToken, (fv_action.params.Amount)?fv_action.params.Amount:1);
			return {Status:(vResult)?200:500};
		break;
		
		case "PUT::account::upgradeSubscription":
			vResult = SB.UpgradeSubscription(fv_action.params.Email);
			return {Status:(vResult)?200:500};
		break;
		
		case "PUT::account::cancelSubscription":
			vResult = SB.CancelSubscriptionFromUser(fv_action.params.Email, fv_action.params.SubscriptionToken, null);
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
	}
	
}