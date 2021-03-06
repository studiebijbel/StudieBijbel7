/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"48433ED3-8636-43AB-A75C-391D1552CB57"}
 */
var _HOST = "http://studiebijbel.directdev.nl";
/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"7928A62B-47AF-47C0-A721-A4BD48B65929"}
 */
var _EMAIL = "rick@directict.nl";

/**
 * @properties={typeid:35,uuid:"DE454061-6327-4D9D-BDA3-D1D3016EC5B8",variableType:-4}
 */
var StudieBijbel = (function() {
	
	/**
	 * @param {String} event
	 * @param {Number} contact_id
	 * @param {Number} [subscription_id]
	 */
	function AddStat(event, contact_id, subscription_id) {
		/** @type {JSFoundSet<db:/sb_data/sb_stats>} */
		var vFS = databaseManager.getFoundSet("sb_data", "sb_stats");
		/** @type {JSRecord<db:/sb_data/sb_stats>} */
		var vRec = vFS.getRecord(vFS.newRecord());
		
		vRec.event = event;
		vRec.sb_contact_id = contact_id;
		vRec.sb_subscription_id = subscription_id;
		
	}
	
	function SendNotification(userid, content) {
		//SendMail("registatie_welkom", _rec.sb_contact_id, {Password:_password, ExpireDate:_DisplayDate}, null);
		SendMail("admin_notification", userid, {Content:content}, _EMAIL, false);
	}
	
	if(!globals.sb_gVersion.match(/test/gi) && !globals.sb_gVersion.match(/accept/gi)) {
		if(globals.sb_APP_getServerLang() == "NL") {
			_HOST = "https://www.studiebijbel.nl";
			_EMAIL = "info@studiebijbel.nl";
		} else {
			_HOST = "http://www.bibliadeestudio.org";
			_EMAIL = "info@bibliadeestudio.org";
		}
	} 
	
	var _loginData;
	
	/**
	 * @param {Number} userid
	 * @return {Boolean|Number}
	 */
	function GetUser(userid) {
		var _SQL = "SELECT * \
			FROM sb_contact c \
			LEFT JOIN sb_group g ON c.sb_group_code = g.group_code \
			WHERE c.sb_contact_id = ? \
			AND (c.sb_end_date IS NULL OR c.sb_end_date > NOW())";
		
		var _DS = databaseManager.getDataSetByQuery("sb_data", _SQL, [userid], 1);
		
		if(_DS.getMaxRowIndex() == 1) {
			return _DS[0];
		} else {
			return false;
		}
	}
	
	/**
	 * @param {Number} userid
	 * @param {Object} fields
	 * @return {Boolean}
	 */
	function UpdateUser(userid, fields) {
		
		if(!userid || typeof userid !== "number") {
			return false;
		}
		
		var _FS = databaseManager.getFoundSet("sb_data", "sb_contact");
		var _SQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?";
		_FS.loadRecords(_SQL, [userid]);
		
		if(_FS.getSize() == 0) {
			return false;
		}
		
		/** @type {JSRecord<db:/sb_data/sb_contact>} */
		var _REC = _FS.getRecord(1);
		
		for(var i in fields) {
			if(fields.hasOwnProperty(i)) {
				_REC[i] = fields[i];
			}
		}
		
		AddStat('update_user', _REC['sb_contact_id'], null);
		
		return databaseManager.saveData(_REC);
	}
	
	/**
	 * @param {String} identifier - The Identifier of the template
	 * @param {Number} userid - The StudyBible User ID
	 * @param {Object} fields - Extra fields to fill
	 * @param {String} [emailaddress] - An override Emailaddress
	 * @param {Boolean} [dontsend]
	 * @return {Boolean|String}
	 */
	function SendMail(identifier, userid, fields, emailaddress, dontsend) {
		var _SQL = "SELECT content, name FROM mail_templates WHERE identifier = ?";
		var _DS = databaseManager.getDataSetByQuery("sb_data", _SQL, [identifier], 1);
		
		var _User = GetUser(userid);
		
		if(!_User) { 
			return false;
		}
		
		// Check if there is an template found, else throw error!
		if(_DS.getMaxRowIndex() == 1) {
			// There is an template found.
			var _Record = _DS[0];
			var _Content = _Record['content'];
			
			for(var key in fields) {
				if(fields.hasOwnProperty(key)) {
					_Content = utils.stringReplace(_Content, "{" + key + "}", fields[key].toString());
				}
			}
			
			_Content = utils.stringReplace(_Content, "{FirstName}", _User['name_first']);
			_Content = utils.stringReplace(_Content, "{LastName}", _User['name_last']);
			_Content = utils.stringReplace(_Content, "{EmailAddress}", _User['contact_email']);
			_Content = utils.stringReplace(_Content, "{SiteUrl}", _HOST);
			_Content = utils.stringReplace(_Content, "{Now}", utils.dateFormat(new Date(), "dd-MM-yyyy"));
			
			// CSS stuff, so inline it will transfer :-)
			_Content = utils.stringReplace(_Content, "class=\"button\"", 'style="margin-bottom: 25px;padding: 10px 30px; background: transparent linear-gradient(to bottom, #6EC2DE 0%, #75BDD1 50%, #3EB3D6 100%) repeat scroll 0% 0%; color: #FFF;border-radius: 10px;"');
			
			var _From;
			if(globals.sb_APP_getServerLang() == 'ESP')
			{
				_From = 'info@bibliadeestudio.org';
			} else {
				_From = 'info@studiebijbel.nl';
			}
			
			var emailSubject = _Record['name'];				
			
			if(dontsend){
				return _Content;
			} 
			var vMailOK = plugins.mail.sendMail(((emailaddress)?emailaddress:_User['contact_email']), _From+","+_From, emailSubject, _Content, null, null, null, null );
			application.output(vMailOK);

		} else {
			application.output('Can\'t find the given template!');
			return false;
		}
	}
	
	/**
	 * @param {String} email
	 * @param {String} password
	 * @param {Boolean} [hashed]
	 * @return {Boolean|JSDataSet}
	 */
	function Login(email, password, hashed) {
		var vSQL = "SELECT c.sb_contact_id, c.sb_organisation_id, c.sb_group_code, c.sb_user_uuid, g.group_name, c.demo_user_chk, c.name_first, c.name_last \
			FROM sb_contact c \
			LEFT JOIN sb_group g ON c.sb_group_code = g.group_code \
			WHERE lower(c.login_name) = ? \
			AND (c.login_pw) = ? \
			AND (c.sb_end_date IS NULL OR c.sb_end_date > NOW())"
		var vDS = databaseManager.getDataSetByQuery('sb_data', vSQL, [email.toLowerCase(), ((hashed)?password:scopes.php.sha1(password))], 1);
		
		if(vDS.getMaxRowIndex() == 0) {
			_loginData = false;
			return false
		} else {
			_loginData = vDS;
			return vDS;
		}
		
	}
		
	/**
	 * @param {*} vObject
	 * @return {Boolean|Number}
	 */
	function Register(vObject) {
		var _password = Math.random().toString(36).slice(-8);
		var _orgid = 28;
		var _content = "Nieuwe gebruikers registratie!<br /><br />";
		// First check if the user already exists or not!
		var _email = vObject.User.Email;
		var _SQL = "SELECT c.contact_email FROM sb_contact AS c WHERE c.contact_email = ?";
		var _DS = databaseManager.getDataSetByQuery("sb_data", _SQL, [_email],  -1);
		
		// Check if there is any record found, if so return false!
		if(_DS.getMaxRowIndex() >= 1) {
			return false;
		}
		
		// The record doesn't exists yet!
		// Lets create it :-)
		var _uuid = application.getUUID();
		
		var _fs = databaseManager.getFoundSet("sb_data", "sb_contact");
		/** @type {JSRecord<db:/sb_data/sb_contact>} */
		var _rec = _fs.getRecord(_fs.newRecord());
		
		if(_rec) {
			_rec.sb_organisation_id = _orgid;
			_rec.sb_user_uuid = _uuid;
			_rec.contact_email = _email;
			_content += "<strong>Emailadres</strong>: "+_rec.contact_email;
			_rec.login_name = _email;
			_rec.login_pw = scopes.php.sha1(_password);
			_rec.name_first = vObject.User.FirstName;
			_content += "<br /><strong>Voornaam</strong>: "+_rec.name_first;
			_rec.name_last = vObject.User.SurName;
			_content += "<br /><strong>Achternaam</strong>: "+_rec.name_last;
			_rec.notes = vObject.User.Notes;
			_rec.marketing = vObject.User.Marketing;
			_rec.sb_group_code = 3;
			_rec.creator = "StudyBible WebSerivce";
			// Save so we got a ID!
			databaseManager.saveData(_rec);
			
			AddStat('register_user', _rec.sb_contact_id, null);
			
			// Now we should create the related records
			
			// Address
			if(vObject.Address) {
				/** @type {JSRecord<db:/sb_data/sb_contact_address>} */
				var _addrRec = _rec.sb_contact_to_sb_contact_address.getRecord(_rec.sb_contact_to_sb_contact_address.newRecord());
				if(_addrRec) {
					_addrRec.street = vObject.Address.Street;
					_content += "<br /><strong>Straat</strong>: "+_addrRec.street;
					_addrRec.house_nr = vObject.Address.HouseNR;
					_content += "<br /><strong>Huisnummer</strong>: "+_addrRec.house_nr;
					_addrRec.house_nr_addition = vObject.Address.HouseNRAdd;
					_addrRec.city = vObject.Address.City;
					_content += "<br /><strong>Woonplaats</strong>: "+_addrRec.city;
					_addrRec.zipcode = vObject.Address.Zipcode;
					_content += "<br /><strong>Postcode</strong>: "+_addrRec.zipcode;
					_addrRec.country = vObject.Address.Country;
					_content += "<br /><strong>Land</strong>: "+_addrRec.country;
					_addrRec.phone = vObject.Address.Phone;
					_content += "<br /><strong>Telefoonnummer</strong>: "+_addrRec.phone;
					_addrRec.is_active = true;
					databaseManager.saveData();
				}
			}
			
			// Education
			if(vObject.Education) {
				/** @type {JSRecord<db:/sb_data/sb_contact_education>} */
				var _eduRec = _rec.sb_contact_to_sb_contact_education.getRecord(_rec.sb_contact_to_sb_contact_education.newRecord());
				if(_eduRec) {
					_eduRec.studentnr = vObject.Education.StudentNR;
					_content += "<br /><strong>StudentNR</strong>: "+_eduRec.studentnr;
					_eduRec.institute = vObject.Education.Institute;
					_content += "<br /><strong>Instituut</strong>: "+_eduRec.institute;
					_eduRec.name_education = vObject.Education.EducationName;
					_content += "<br /><strong>Opleiding</strong>: "+_eduRec.name_education;
					
					// Date format, incoming, should always be Y-m-d
					var vStrDate = vObject.Education.StartsOn.split('-');
					_eduRec.study_started_on = new Date(vStrDate[0], vStrDate[1], vStrDate[2]);
					
					vStrDate = vObject.Education.StopsOn.split('-');
					_eduRec.study_stops_on = new Date(vStrDate[0], vStrDate[1], vStrDate[2]);
					_eduRec.is_active = true;
					databaseManager.saveData();
				}
			}
			
			// Payment Details
			if(vObject.Payment) {
				/** @type {JSRecord<db:/sb_data/sb_contact_payment>} */
				var _payRec = _rec.sb_contact_to_sb_contact_payment.getRecord(_rec.sb_contact_to_sb_contact_payment.newRecord());
				if(_payRec) {
					_payRec.iban = vObject.Payment.IBAN;
					_content += "<br /><strong>IBAN</strong>: "+_payRec.iban;
					_payRec.cardholder = vObject.Payment.CardHolder;
					_content += "<br /><strong>Rekeninghouder</strong>: "+_payRec.cardholder;
					_payRec.is_active = true;
					databaseManager.saveData();
				}
			}
			
			if(vObject.Subscription) 
			{
				// We also need to create a 'trail' account
				/** @type {JSRecord<db:/sb_data/sb_subscriptions>} */
				var _Subscription = GetSubscriptions('sb_trail');
				
				/** @type {JSRecord<db:/sb_data/sb_subscription_to_contact>} */
				var _subRec = _rec.sb_contact_to_sb_subscription_to_contact.getRecord(_rec.sb_contact_to_sb_subscription_to_contact.newRecord());
				_subRec.activated = 1;
				_subRec.amount = 1;
				var _ExpireDate = new Date();
				_ExpireDate.setDate(_ExpireDate.getDate() +  _Subscription.valid_for);
				_subRec.valid_till  = _ExpireDate;
				_subRec.sb_subscription_id = _Subscription.sb_subscription_id;
				AddStat('new_subscription', _rec.sb_contact_id,  _Subscription.sb_subscription_id);
				_content += "<br /><br />Gebruiker heeft een 30 dagen proefaccount afgenomen.";
				databaseManager.saveData(_subRec);
			}
		}
				
		// Also create it in the back-end of Servoy!
		security.createUser(_orgid + '_' + _email, _password, _uuid)
		
		var _Month = utils.dateFormat(_ExpireDate, "M");
		var _DisplayDate = utils.dateFormat(_ExpireDate, 'dd-MM-yyyy');
		_DisplayDate = utils.stringReplace(_DisplayDate, utils.dateFormat(_ExpireDate, "-MM-"), " "+GetDisplayMonth(_Month)+" ");
		
		SendMail("registatie_welkom", _rec.sb_contact_id, {Password:_password, ExpireDate:_DisplayDate}, null);
		SendNotification(_rec.sb_contact_id, _content);
		
		return _rec.sb_contact_id;
	}
	
	/**
	 * @return {Boolean}
	 * @param {String} email
	 */
	function LostPassword(email) {
		var _FS = databaseManager.getFoundSet("sb_data", "sb_contact");
		var _SQL = "SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?";
		_FS.loadRecords(_SQL, [email]);
		
		if(_FS.getSize() > 1) {
			// We have a issue, duplicate detected... What to do?!
		} else if(_FS.getSize() == 1) {
			// Only one record
			/** @type {JSRecord<db:/sb_data/sb_contact>} */
			var _Rec = _FS.getRecord(1);
			var _Token = application.getUUID();
			
			_Rec.reset_token = _Token;
			databaseManager.saveData(_Rec);
			
			AddStat('forgot_password', _Rec.sb_contact_id, null);

			SendMail("lost_password", _Rec.sb_contact_id, {ResetToken:_Token});
			return true;
		} else {
			return false;
		}
		return false;
	}
	
	/**
	 * @return {Boolean}
	 * @param {String|Number} userid - Can be a Token or the userid
	 * @param {String} password - The new password in SHA1 hash
	 * @SuppressWarnings(wrongparameters)
 */
	function UpdatePassword(userid, password) {
		// First we need to detect if its a userid of a token.
		if(typeof userid == "string") {
			// We need to retrieve the user ID
			var _SQL = "SELECT sb_contact_id FROM sb_contact WHERE reset_token = ?";
			var _DS = databaseManager.getDataSetByQuery("sb_data", _SQL, [userid], -1);
			
			if(_DS.getMaxRowIndex() != 1) {
				return false;
			}
			
			userid = _DS[0]['sb_contact_id'];
		}
		
		/** @type{JSRecord<db:/sb_data/sb_contact>} */
		var _User = GetUser(userid);
	
		if(_User) {
			_User.reset_token = null;
			_User.login_pw = password;
		//	databaseManager.saveData(_User);
			
			UpdateUser(_User.sb_contact_id, {reset_token: null, login_pw: password});
			
			return true;
		}
				
		return false;
	}
	
	/**
	 * @param {String} token
	 * @return {Boolean}
	 */
	function CheckPasswordToken(token) {
		// We need to retrieve the user ID
		var _SQL = "SELECT sb_contact_id FROM sb_contact WHERE reset_token = ?";
		var _DS = databaseManager.getDataSetByQuery("sb_data", _SQL, [token], -1);
		
		if(_DS.getMaxRowIndex() != 1) {
			return false;
		}
				
		return true;
	}
	
	/**
	 * Gets all the subscriptions or by token
	 * @param {String} [token]
	 * @return {JSRecord|JSDataSet|Boolean} 
	 */
	function GetSubscriptions(token) {
		var _SQL;
		
		_SQL = "SELECT * FROM sb_subscriptions "
		if(token) {
			_SQL += " WHERE token = ?";
		}
		
		var _DS = databaseManager.getDataSetByQuery("sb_data", _SQL, ((token)?[token]:null), -1);
		if(_DS.getMaxRowIndex() > 1) {
			return _DS;
		} else if(_DS.getMaxRowIndex() == 1) {
			return _DS[0];
		} else {
			return false;
		}
	}
	
	/**
	 * @param {String|Number} [userid]
	 */
	function GetAllSubscriptions(userid) {
		var _SQL;

		_SQL = "SELECT * FROM sb_subscriptions";
		var _DS = databaseManager.getDataSetByQuery("sb_data", _SQL, null, -1);

		var _SUBS = [];
		var _REC, _OBJ;
		for(var i = 0; i < _DS.getMaxRowIndex(); i++) {
			_REC = _DS[i];
			_OBJ = GetSubscription(_REC['token'], userid);
			_SUBS.push(_OBJ);
		}
		
		delete _REC;
		delete _OBJ;
		
		return _SUBS;
	}
	
	/**
	 * @param {String} token
	 * @param {String|Number} [userid]
	 * @return {Object|Boolean} 
	 */
	function GetSubscription(token, userid) {
		var _SQL, _USQL;
		_SQL = "SELECT * FROM sb_subscriptions WHERE token = ?";

		// First check if the user_id is filled
		if(userid) {
			var _FS = databaseManager.getFoundSet("sb_data", "sb_subscription_to_contact");
			if(typeof userid === "string") {
				_USQL = "SELECT sb_subscription_to_contact_id from sb_subscription_to_contact WHERE sb_contact_id IN (SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?) AND sb_subscription_id = ?";
			} else {
				_USQL = "SELECT sb_subscription_to_contact_id from sb_subscription_to_contact WHERE sb_contact_id = ? AND sb_subscription_id = ?";
			} 
			
		}
		
		var _DS = databaseManager.getDataSetByQuery("sb_data", _SQL, [token], 1);
		if(_DS.getMaxRowIndex() == 1) {
			var _REC = _DS[0];
			var _OBJ = {};
			_OBJ.validFor = _REC['valid_for'];
			_OBJ.name = _REC['name'];
			_OBJ.token = _REC['token'];
			_OBJ.price = _REC['price'];
			_OBJ.price_recurring = _REC['price_recurring'];
			_OBJ.price_per = _REC['price_per'];
			
			if(userid) {
				_FS.loadRecords(_USQL, [userid, _REC['sb_subscription_id']]);
				_OBJ.hasSubscription = _FS.getSize();
			}
			
			return _OBJ;
		} else {
			return false;
		}
	}
	
	/**
	 * @param {Number|String} userid
	 * @param {Boolean} [onlyActive]
	 * @return {Array|Boolean}
	 */
	function GetUserSubscriptions(userid, onlyActive) {
		/** @type {JSFoundSet<db:/sb_data/sb_subscription_to_contact>} */
		var _FS = databaseManager.getFoundSet("sb_data", "sb_subscription_to_contact");
		var _SQL;
		if(typeof userid === "string") {
			_SQL = "SELECT sb_subscription_to_contact_id from sb_subscription_to_contact WHERE sb_contact_id IN (SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?)";
		} else {
			_SQL = "SELECT sb_subscription_to_contact_id from sb_subscription_to_contact WHERE sb_contact_id = ?";
		} 
		_FS.loadRecords(_SQL, [userid]);
		
		var _SUBS = [];
		
		if(_FS.getSize() >= 1) {
			for(var i = 1; i <= _FS.getSize(); i++) {
				/** @typ {JSRecord<db:/sb_data/sb_subscription_to_contact>} */
				var _REC = _FS.getRecord(i);
				var _OBJ = {};
				// We need to check if there are subscription lines for the person!
				if(utils.hasRecords(_REC, 'sb_subscription_to_contact_to_sb_subscriptions')) {
					if(onlyActive != undefined && onlyActive === true) {
						// First check if it is activated at all!
						if(_REC.activated != 1) {
							delete _OBJ;
							continue;
						}
						// Now check if the validTill date is good
						_REC.valid_till.setHours(23,59,59)
						if(_REC.valid_till != "0000-00-00" && _REC.valid_till < new Date())	{
							// Verlopen
							delete _OBJ;
							continue
						}
					}
					
					_OBJ = {};
					_OBJ.validTill = utils.dateFormat(_REC.valid_till, 'yyyy-MM-dd');
					_OBJ.amount = _REC.amount;
					_OBJ.active = _REC.activated;
					_OBJ.name = _REC.sb_subscription_to_contact_to_sb_subscriptions.name;
					_OBJ.token = _REC.sb_subscription_to_contact_to_sb_subscriptions.token;
					_OBJ.renew = _REC.renew;
					_OBJ.iteration = _REC.iteration;
					_OBJ.price = (_REC.iteration==1)?_REC.sb_subscription_to_contact_to_sb_subscriptions.price:(_REC.sb_subscription_to_contact_to_sb_subscriptions.price_recurring)?_REC.sb_subscription_to_contact_to_sb_subscriptions.price_recurring:_REC.sb_subscription_to_contact_to_sb_subscriptions.price;
					_OBJ.pricePer = _REC.sb_subscription_to_contact_to_sb_subscriptions.price_per;
					
					_SUBS.push(_OBJ);
					// Remove from memory
					delete _OBJ;
				}
			}
		}
		
		return (_SUBS.length >= 1)?_SUBS:false;
	}
	
	/**
	 * @param {Number|String} userid
	 * @param {Object} vObject
	 * @return {Boolean}
	 */
	function UpdateUserSet(userid, vObject) {
		var _SQL;
		if(typeof userid === "string") {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?";
		} else {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?";
		}
		/** @type{JSFoundSet<db:/sb_data/sb_contact>} */
		var _FS = databaseManager.getFoundSet("sb_data", "sb_contact");
		_FS.loadRecords(_SQL, [userid]);
		
		if(_FS.getSize() != 1) {
			return false;
		}
		
		var _content = "Gebruiker heeft een wijziging doorgevoerd:<br /><br />";
		
		/** @type {JSRecord<db:/sb_data/sb_contact>} */
		var _rec = _FS.getRecord(1);
		var _selrec;
		if(_rec) {
			_content += "<strong>Emailadres</strong>: "+_rec.contact_email
			
			if(vObject.User) {
				if(vObject.User.Password)	_rec.login_pw = vObject.User.Password;
				if(vObject.User.FirstName)	_rec.name_first = vObject.User.FirstName; _content += "<br /><strong>Voornaam</strong>: "+_rec.name_first;
				if(vObject.User.SurName)	_rec.name_last = vObject.User.SurName; _content += "<br /><strong>Achternaam</strong>: "+_rec.name_last;			
			}
			// Save so we got a ID!
			databaseManager.saveData(_rec);
			
			AddStat('update_user', _rec.sb_contact_id,  null);
			
			// Now we should create the related records
			
			// Address
			if(vObject.Address) {
				if(utils.hasRecords(_rec.sb_contact_to_sb_contact_address)) {
					_selrec = 1
				} else {
					_selrec = _rec.sb_contact_to_sb_contact_address.newRecord()
				}
				/** @type {JSRecord<db:/sb_data/sb_contact_address>} */
				var _addrRec = _rec.sb_contact_to_sb_contact_address.getRecord(_selrec);
				if(_addrRec) {
					if(vObject.Address.Street)		_addrRec.street = vObject.Address.Street;  _content += "<br /><strong>Straat</strong>: "+_addrRec.street;
					if(vObject.Address.HouseNR)		_addrRec.house_nr = vObject.Address.HouseNR; _content += "<br /><strong>Huisnummer</strong>: "+_addrRec.house_nr;
					if(vObject.Address.HouseNRAdd)	_addrRec.house_nr_addition = vObject.Address.HouseNRAdd;
					if(vObject.Address.City)		_addrRec.city = vObject.Address.City; _content += "<br /><strong>Woonplaats</strong>: "+_addrRec.city;
					if(vObject.Address.Zipcode)		_addrRec.zipcode = vObject.Address.Zipcode; _content += "<br /><strong>Postcode</strong>: "+_addrRec.zipcode;
					if(vObject.Address.Country)		_addrRec.country = vObject.Address.Country; _content += "<br /><strong>Land</strong>: "+_addrRec.country;
					if(vObject.Address.Phone)		_addrRec.phone = vObject.Address.Phone; _content += "<br /><strong>Telefoonnummer</strong>: "+_addrRec.phone;
					_addrRec.is_active = true;
					databaseManager.saveData();
				}
			}
			
			// Education
			if(vObject.Education) {
				if(utils.hasRecords(_rec.sb_contact_to_sb_contact_education)) {
					_selrec = 1
				} else {
					_selrec = _rec.sb_contact_to_sb_contact_education.newRecord()
				}
				/** @type {JSRecord<db:/sb_data/sb_contact_education>} */
				var _eduRec = _rec.sb_contact_to_sb_contact_education.getRecord(_selrec);
				if(_eduRec) {
					if(vObject.Education.StudentNR)			_eduRec.studentnr = vObject.Education.StudentNR; _content += "<br /><strong>StudentNR</strong>: "+_eduRec.studentnr;
					if(vObject.Education.Institute)			_eduRec.institute = vObject.Education.Institute; _content += "<br /><strong>Instituut</strong>: "+_eduRec.institute;
					if(vObject.Education.EducationName)		_eduRec.name_education = vObject.Education.EducationName; _content += "<br /><strong>Opleiding</strong>: "+_eduRec.name_education;
					
					// Date format, incoming, should always be Y-m-d
					if(vObject.Education.StartsOn) {
						var vStrDate = vObject.Education.StartsOn.split('-');
						_eduRec.study_started_on = new Date(vStrDate[0], vStrDate[1], vStrDate[2]);
					}
					
					if(vObject.Education.StopsOn) {
						vStrDate = vObject.Education.StopsOn.split('-');
						_eduRec.study_stops_on = new Date(vStrDate[0], vStrDate[1], vStrDate[2]);
					}
					_eduRec.is_active = true;
					databaseManager.saveData();
				}
			}
			
			// Payment Details
			if(vObject.Payment) {
				if(utils.hasRecords(_rec.sb_contact_to_sb_contact_payment)) {
					_selrec = 1
				} else {
					_selrec = _rec.sb_contact_to_sb_contact_payment.newRecord()
				}
				/** @type {JSRecord<db:/sb_data/sb_contact_payment>} */
				var _payRec = _rec.sb_contact_to_sb_contact_payment.getRecord(_selrec);
				if(_payRec) { 
					if(vObject.Payment.IBAN) _payRec.iban = vObject.Payment.IBAN; _content += "<br /><strong>IBAN</strong>: "+_payRec.iban;
					if(vObject.Payment.CardHolder) _payRec.cardholder = vObject.Payment.CardHolder; _content += "<br /><strong>Rekeninghouder</strong>: "+_payRec.cardholder;
					_payRec.is_active = true;
					databaseManager.saveData();
				}
			}
		}
		SendNotification(_rec.sb_contact_id, _content);
	}
	
	/**
	 * @param {String|Number} userid
	 * @return {Object|Boolean}
	 */
	function GetUserDetails(userid) {
		var _SQL;
		if(typeof userid === "string") {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?";
		} else {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?";
		}
		
		/** @type{JSFoundSet<db:/sb_data/sb_contact>} */
		var _FS = databaseManager.getFoundSet("sb_data", "sb_contact");
		_FS.loadRecords(_SQL, [userid]);
		
		if(_FS.getSize() != 1) {
			return false;
		}
		var _RETURN = {};		
		
		/** @type{JSRecord<db:/sb_data/sb_contact>} */
		var _REC = _FS.getRecord(1);
		
		_RETURN.User = {
			FirstName: _REC.name_first,
			SurName: _REC.name_last,
			Email: _REC.contact_email
		};
		
		if(utils.hasRecords(_REC.sb_contact_to_sb_contact_address)) {
			var _ADDR = _REC.sb_contact_to_sb_contact_address.getRecord(1);
			_RETURN.Address = {
				Street: _ADDR.street,
				HouseNR: _ADDR.house_nr,
				City: _ADDR.city,
				Zipcode: _ADDR.zipcode,
				Country: _ADDR.country,
				Phone: _ADDR.phone
			};
		}
		
		if(utils.hasRecords(_REC.sb_contact_to_sb_contact_education)) {
			var _EDU = _REC.sb_contact_to_sb_contact_education.getRecord(1);
			_RETURN.Education = {
				StudentNR: _EDU.studentnr,
				Institute: _EDU.institute,
				EducationName: _EDU.name_education,
				StartsOn: utils.dateFormat(_EDU.study_started_on, 'yyyy-MM-dd'),
				StopsOn: utils.dateFormat(_EDU.study_stops_on, 'yyyy-MM-dd')
			};
		}
		
		if(utils.hasRecords(_REC.sb_contact_to_sb_contact_payment)) {
			var _PAY = _REC.sb_contact_to_sb_contact_payment.getRecord(1);
			_RETURN.Payment = {
				IBAN: _PAY.iban,
				CardHolder: _PAY.cardholder
			};
		}
		
		return _RETURN;
	}
	
	/**
	 * @param {Number|String} userid
	 * @param {String} subscription
	 * @param {Number} [amount]
	 * @param {Boolean} [migrated]
	 */
	function AddSubscriptionToUser(userid, subscription, amount, migrated) {
		var _SQL;
		if(typeof userid === "string") {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?";
		} else {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?";
		}
		
		/** @type{JSFoundSet<db:/sb_data/sb_contact>} */
		var _FS = databaseManager.getFoundSet("sb_data", "sb_contact");
		_FS.loadRecords(_SQL, [userid]);
		
		if(_FS.getSize() != 1) {
			return false;
		}
		
		var _REC = _FS.getRecord(1);
		
		// We also need to create a 'trail' account
		/** @type {JSRecord<db:/sb_data/sb_subscriptions>} */
		var _Subscription = GetSubscriptions(subscription);
		// First we should check if the token is already linked to the user!
		if(utils.hasRecords(_REC.sb_contact_to_sb_subscription_to_contact)) {
			// There should be linked stuff already!
			if(_REC.sb_contact_to_sb_subscription_to_contact.find()) {
				_REC.sb_contact_to_sb_subscription_to_contact.sb_subscription_id = _Subscription.sb_subscription_id;
				var _COUNT = _REC.sb_contact_to_sb_subscription_to_contact.search();
			}
			
			if(_COUNT >= 1) {
				// Same subscription is already linked!
				// TODO hier moet nog even controlle als het wel active is... ZO NIET dan opnieuw activeren met juiste data.
				return false;
			}
		}
		
		// Ok still save... not linked yet :)
		
		/** @type {JSRecord<db:/sb_data/sb_subscription_to_contact>} */
		var _subRec = _REC.sb_contact_to_sb_subscription_to_contact.getRecord(_REC.sb_contact_to_sb_subscription_to_contact.newRecord());
		_subRec.activated = 1;
		_subRec.amount = (amount)?amount:0;
		var _ExpireDate = new Date();
		_ExpireDate.setDate(_ExpireDate.getDate() +  _Subscription.valid_for);
		_subRec.valid_till  = _ExpireDate;
		_subRec.renew = _Subscription.is_recurring;
		_subRec.sb_subscription_id = _Subscription.sb_subscription_id;
		AddStat('new_subscription', _REC.sb_contact_id,  _Subscription.sb_subscription_id);
		if(migrated) {
			_subRec.is_migrated = 1;
		}
		
		// Add some stuff, we need to verify if the user has already a 'sb_trail' or not!
		_Subscription = GetSubscriptions('sb_trail');
		if(utils.hasRecords(_REC.sb_contact_to_sb_subscription_to_contact) && subscription == "sb_abonnement") {
			// There should be linked stuff already!
			if(_REC.sb_contact_to_sb_subscription_to_contact.find()) {
				_REC.sb_contact_to_sb_subscription_to_contact.sb_subscription_id = _Subscription.sb_subscription_id;
				_REC.sb_contact_to_sb_subscription_to_contact.activated = 1;
				_COUNT = _REC.sb_contact_to_sb_subscription_to_contact.search();
			}
			
			if(_COUNT == 1) {
				// The current user HAS a active trail liscense
				var _TrailREC = _REC.sb_contact_to_sb_subscription_to_contact.getRecord(1);
				
				// Current valid till
				var _validTill = _TrailREC.valid_till;
				var _dateDiff = DiffDays(new Date(), _validTill);
				
				_ExpireDate.setDate(_ExpireDate.getDate() +  _dateDiff);
				_subRec.valid_till  = _ExpireDate;
				
				_TrailREC.activated = 0;
				_TrailREC.renew = 0;
				_TrailREC.valid_till = new Date();
			}
		}
		
		var _content;
		if(_TrailREC) {
			_content = "Gebruiker heeft een nieuw "+_Subscription.name+" afgesloten welke nog "+_dateDiff+"-dagen proefdagen bevat. Eerste verlenging vind plaats op " + utils.dateFormat(_subRec.valid_till, "dd-MM-yyyy");
		} else {
			_content = "Gebruiker heeft een nieuw "+_Subscription.name+" afgesloten. Eerste verlenging vind plaats op " + utils.dateFormat(_subRec.valid_till, "dd-MM-yyyy");
		}
		
		SendNotification(_REC.sb_contact_id, _content);
		
		databaseManager.saveData(_subRec);
		return true;
	}
	
	function DiffDays(d1, d2)
	{
	  var ndays;
	  var tv1 = d1.valueOf();  // msec since 1970
	  var tv2 = d2.valueOf();

	  ndays = (tv2 - tv1) / 1000 / 86400;
	  ndays = Math.round(ndays);
	  return ndays;
	}
	
	/**
	 * @param {Number|String} userid
	 * @param {String} subscription
	 * @param {Number} [amount]
	 */
	function CancelSubscriptionFromUser(userid, subscription, amount) {
		var _SQL;
		if(typeof userid === "string") {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?";
		} else {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?";
		}
		
		/** @type{JSFoundSet<db:/sb_data/sb_contact>} */
		var _FS = databaseManager.getFoundSet("sb_data", "sb_contact");
		_FS.loadRecords(_SQL, [userid]);
		
		if(_FS.getSize() != 1) {
			return false;
		}
		
		var _REC = _FS.getRecord(1);
		// We also need to create a 'trail' account
		/** @type {JSRecord<db:/sb_data/sb_subscriptions>} */
		var _Subscription = GetSubscriptions(subscription);
		AddStat('cancel_subscription', _REC.sb_contact_id,  _Subscription.sb_subscription_id);
		// First we should check if the token is already linked to the user!
		if(utils.hasRecords(_REC.sb_contact_to_sb_subscription_to_contact)) {
			// There should be linked stuff already!
			if(_REC.sb_contact_to_sb_subscription_to_contact.find()) {
				_REC.sb_contact_to_sb_subscription_to_contact.sb_subscription_id = _Subscription.sb_subscription_id;
				var _COUNT = _REC.sb_contact_to_sb_subscription_to_contact.search();
			}
			
			if(_COUNT != 1) {
				// Same subscription is already linked!
				return false;
			}
			
			var _SREC = _REC.sb_contact_to_sb_subscription_to_contact.getSelectedRecord();
			if(amount != 0 && _SREC.amount < amount) {
				// We should degrate the amount of active licenses
				_SREC.amount -= amount;
			} else {
				// We should check the date, maybe add extra days?...
				_SREC.renew = 0;
			}
			var _content = "Gebruiker heeft abonnement " + _SREC.sb_subscription_to_contact_to_sb_subscriptions.name + " opgezegt per " + utils.dateFormat(_SREC.valid_till, "dd-MM-yyyy");
			SendNotification(_REC.sb_contact_id, _content);
			
			databaseManager.saveData(_SREC);
		}
		return true;
	}
	
	/**
	 * @param {Number|String} userid
	 */
	function UpgradeSubscription(userid) {
		var _SQL;
		if(typeof userid === "string") {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE contact_email = ?";
		} else {
			_SQL = "SELECT sb_contact_id FROM sb_contact WHERE sb_contact_id = ?";
		}
		
		/** @type{JSFoundSet<db:/sb_data/sb_contact>} */
		var _FS = databaseManager.getFoundSet("sb_data", "sb_contact");
		_FS.loadRecords(_SQL, [userid]);
		
		if(_FS.getSize() != 1) {
			return false;
		}
			
		var _REC = _FS.getRecord(1);
		var _SREC;
		if(utils.hasRecords(_REC.sb_contact_to_sb_subscription_to_contact)) {
			for(var i = 1; i <= _REC.sb_contact_to_sb_subscription_to_contact.getSize(); i++) {
				_SREC = _REC.sb_contact_to_sb_subscription_to_contact.getRecord(i);
				
				if(_SREC.sb_subscription_to_contact_to_sb_subscriptions.token == "sb_trail") {
					_SREC.renew = 1;
				}
			}
		}
	}
	
	/**
	 * @param {String} month
	 * @return {String}
	 */
	function GetDisplayMonth(month) {
		switch(month) {
			case "1": return "januari";	break;
			case "2": return "februari"; break;
			case "3": return "maart"; break;
			case "4": return "april"; break;
			case "5": return "mei"; break;
			case "6": return "juni"; break;
			case "7": return "juli"; break;
			case "8": return "augustus"; break;
			case "9": return "september"; break;
			case "10": return "oktober"; break;
			case "11": return "november"; break;
			case "12": return "december"; break;
		}
	}
	
	return function() {
		/**
		 * @param {String} identifier - The Identifier of the template
		 * @param {Object} userid - The StudyBible User ID
		 * @param {Object} fields - Extra fields to fill
		 * @param {String} [emailaddress] - An override Emailaddress
		 */
		this.SendMail = SendMail;
		
		/**
		 * @param {Number} userid
		 * @param {Object} fields
		 * @return {Boolean}
		 */
		this.UpdateUser = UpdateUser;
		
		/**
		 * @param {Number|String} userid
		 * @param {Object} vObject
		 * @return {Boolean}
		 */
		this.UpdateUserSet = UpdateUserSet;
		
		/**
		 * @param {String} email
		 * @param {String} password
		 */
		this.Login = Login;
		
		/**
		 * @param {*} vObject
		 */
		this.Register = Register;
		
		/**
		 * @return {Boolean}
		 * @param {String} email
		 */
		this.LostPassword = LostPassword;
	
		/**
		 * @return {Boolean}
		 * @param {String} user - Can be a Token or the userid
		 * @param {String} password - The new password in SHA1 hash
		 */
		this.UpdatePassword = UpdatePassword;
	
		/**
		 * @return {Boolean}
		 * @param {String} token - The Token
		 */
		this.CheckPasswordToken = CheckPasswordToken;
		
		/**
		 * @param {Number|String} userid
		 * @return {Array|Boolean}
		 */
		this.GetUserSubscriptions = GetUserSubscriptions;
		
		this.GetUserDetails = GetUserDetails;
		
		/**
		 * @param {Number|String} userid
		 * @param {String} subscription
		 * @param {Number} [amount]
		 * @param {Boolean} [migrated]
		 */
		this.AddSubscriptionToUser = AddSubscriptionToUser;
	
		/**
		 * @param {Number|String} userid
		 * @param {String} subscription
		 * @param {Number} [amount]
		 */
		this.CancelSubscriptionFromUser = CancelSubscriptionFromUser;
		
		/**
		 * @param {Number|String} userid
		 */
		this.UpgradeSubscription = UpgradeSubscription;
		
		/**
		 * @param {String} token
		 * @return {Object|Boolean} 
		 */
		this.GetSubscription = GetSubscription;
		
		/**
		 * @param {String|Number} userid
		 */
		this.GetAllSubscriptions = GetAllSubscriptions;
		
	}
	
})();
/**
 * @properties={typeid:24,uuid:"D64FFC24-BA10-40EF-9574-32306433D497"}
 */
function Testert() {
	// Clear variable from memory
	delete SB;
	var SB = new scopes.StudyBible.StudieBijbel;
	
	//var LP = SB.CancelSubscriptionFromUser('rick.bonkestoter@directict.nl', 'sb_abonnement');
	//var LP = SB.SendNotification()
	application.output(LP);
}
