/**
 * @private 
 *
 * @properties={typeid:35,uuid:"CB850A67-F8C0-4C1A-A55B-302810E36FA9",variableType:-4}
 */
var log = scopes.svyLogManager.getLogger('com.servoy.bap.utils.exceptions');

/**
 * General exception holding exception message, i18n key and arguments
 *
 * Subclassed by specific exceptions
 *
 * @param {String} errorMessage
 *
 * @constructor
 * @extends {Error}
 *
 * @properties={typeid:24,uuid:"8D4DBBD3-4162-4F23-A61E-5875936E8AAB"}
 */
function SvyException(errorMessage) {
	if (!(this instanceof SvyException)) {
		log.error('SvyException subclass called without the \'new\' keyword')
	}
	this.message = errorMessage
	this.name = this.constructor['name']
}

/**
 * Raised when an argument is not legal
 *
 * @param {String} errorMessage
 *
 * @constructor
 * @extends {SvyException}
 *
 * @author Sean
 *
 * @properties={typeid:24,uuid:"8E3EBB8D-1397-4444-8E0C-3F9D3E036CC7"}
 */
function IllegalArgumentException(errorMessage) {
	if (!(this instanceof IllegalArgumentException)) {
		return new IllegalArgumentException(errorMessage)
	}
	SvyException.call(this, errorMessage);
}

/**
 * Raised when performing an operation that is not supported
 *
 * @param {String} errorMessage
 *
 * @constructor
 * @extends {SvyException}
 *
 * @properties={typeid:24,uuid:"4B19C306-E4D7-40F2-BE89-DF369F489094"}
 */
function UnsupportedOperationException(errorMessage) {
	if (!(this instanceof UnsupportedOperationException)) {
		return new UnsupportedOperationException(errorMessage)
	}
	SvyException.call(this, errorMessage);
}

/**
 * Raised when a runtime state is not legal
 *
 * @param {String} errorMessage
 *
 * @constructor
 * @extends {SvyException}
 *
 * @author Sean
 *
 * @properties={typeid:24,uuid:"04C9606C-70C0-4C03-854F-7BE2B09FF44C"}
 */
function IllegalStateException(errorMessage) {
	if (!(this instanceof IllegalStateException)) {
		return new IllegalStateException(errorMessage)
	}
	SvyException.call(this, errorMessage);
}

/**
 * Raised when a method marked as @abstract is called
 *
 * @param {String} errorMessage
 *
 * @constructor
 * @extends {IllegalStateException}
 *
 * @properties={typeid:24,uuid:"1B51ABB6-289A-4CCB-A029-73B7D7B9660E"}
 */
function AbstractMethodInvocationException(errorMessage) {
	if (!(this instanceof AbstractMethodInvocationException)) {
		return new AbstractMethodInvocationException(errorMessage)
	}
	IllegalStateException.call(this, errorMessage);
}

/**
 * Wrapper around ServoyException to make it a JavaScript Error instance
 * @constructor 
 * @extends {SvyException}
 * @param {ServoyException} servoyException
 *
 * @properties={typeid:24,uuid:"6A71126C-BFF3-422A-ADB4-2574AB0BFEF2"}
 */
function ServoyError(servoyException) {
	if (!(this instanceof ServoyError)) {
		return new ServoyError(servoyException)
	}
	/**
	 * @protected 
	 */
	this.ex = servoyException
	SvyException.call(this, servoyException.getMessage());
	this.name = servoyException instanceof DataException ? 'DataException' : 'ServoyException'
}

/**
  * @properties={typeid:35,uuid:"36364157-A05A-4806-B13E-DA08DD8C27D6",variableType:-4}
  */
var init = function() {
	SvyException.prototype = Object.create(Error.prototype);
	SvyException.prototype.constructor = SvyException
	
	/**
	 * Returns the exception message
	 *
	 * @return {String}
	 */
	SvyException.prototype.getMessage = function() {
		return this.message
	}
	
	IllegalArgumentException.prototype = Object.create(SvyException.prototype)
	IllegalArgumentException.prototype.constructor = IllegalArgumentException
	
	IllegalStateException.prototype = Object.create(SvyException.prototype)
	IllegalStateException.prototype.constructor = IllegalStateException
		
	UnsupportedOperationException.prototype = Object.create(SvyException.prototype)
	UnsupportedOperationException.prototype.constructor = UnsupportedOperationException
		
	AbstractMethodInvocationException.prototype = Object.create(IllegalStateException.prototype)
	AbstractMethodInvocationException.prototype.constructor = AbstractMethodInvocationException
	
	ServoyError.prototype = Object.create(SvyException.prototype)
	ServoyError.prototype.constructor = ServoyError
	
	Object.defineProperty(ServoyError.prototype, 'stack', {
		get: function() {
			return this.ex.getScriptStackTrace()
		}
	})
	ServoyError.prototype.unwrap = function() {
		return this.ex
	}
}();
