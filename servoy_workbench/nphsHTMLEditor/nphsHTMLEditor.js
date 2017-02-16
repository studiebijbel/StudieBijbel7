/**
 * @private
 * @properties={typeid:35,uuid:"5519DC78-C9A3-44DA-B4A4-A489CE29E9FC",variableType:-4}
 */
var log = scopes.svyLogManager.getLogger('co.uk.nephos-solutions.htmleditor');

/**
 * @private
 * @properties={typeid:35,uuid:"C1CA6C70-0DF5-48F5-B4AE-2445245CCF6E",variableType:-4}
 */
var jfxAvailable = false;

/**
 * @constructor
 *
 * @param {RuntimeTabPanel} container
 *
 * @properties={typeid:24,uuid:"DB13A98F-E934-4C3C-AFFC-D0F0393BA0AD"}
 */
function htmlEditor(container) {
	if (!jfxAvailable) {
		log.warn('Attempting to use nphsHTMLEditor when JavaFX is not available (Java version: ' + Packages.java.lang.System.getProperty("java.version") + ')');
		var dummy = function() {
			log.warn('Attempting to use nphsHTMLEditor when JavaFX is not available (Java version: ' + Packages.java.lang.System.getProperty("java.version") + ')');
		}
		return {
			setContent: dummy,
			getContent: dummy
		}
	}

	var formName = application.getUUID().toString();
	application.createNewFormInstance("htmlEditorPanel", formName);

	container.removeAllTabs();
	container.addTab(forms[formName]);

	/**
	 * @param {String} _content
	 */
	this.setContent = function(_content) {
		forms[formName].setContent(_content);
	}

	this.getContent = function() {
		return forms[formName].getContent();
	}
}

/**
 * Returns <code>true</code> if JavaFX is available for use in the smart client<br>
 *
 * In the web client, this always returns <code>true</code>.
 *
 * @properties={typeid:24,uuid:"26F7B357-071A-4FF8-AB4F-81099E6BDBEC"}
 */
function isJavaFxAvailable() {
	if (scopes.svySystem.isSwingClient()) {
		return jfxAvailable;
	} else {
		return true;
	}
}

/**
 * @private
 * @SuppressWarnings(unused)
 * @properties={typeid:35,uuid:"3033F02C-70BE-43F6-B226-723016DFB0CB",variableType:-4}
 */
var init = (function() {
		if (scopes.svySystem.isSwingClient()) {
			/* Getting ClientPluginAccess needed for at least registerURLStreamHandler
			 * Using inlined code from scopes.svySmartClientUtils.getSmartClientPluginAccess as to not have to make registerURLStreamHandler a public method, since too dangerous:
			 * using registerURLStreamHandler with a Java Class that has a (partial) JavaScript implementation causes mem-leaks and errors after switching solution
			 * */
			var x = new Packages.org.mozilla.javascript.NativeJavaObject(globals, plugins.window, new Packages.org.mozilla.javascript.JavaMembers(globals, Packages.com.servoy.extensions.plugins.window.WindowProvider));
			/** @type {Packages.com.servoy.j2db.plugins.IClientPluginAccess} */
			var clientPluginAccess = x['getClientPluginAccess']()

			jfxAvailable = typeof Packages.scene.Node === 'function'

			if (!jfxAvailable) {
				/* In developer or the testrunner client JavaFX is loaded only when a instance of the JFXPanel bean is instantiated
				 * It can happen that this code is executed before a JFXPanel instance is created
				 * Therefore this code forces such instance creation, so JavaFX gets loaded if available
				 */
				log.trace('Trying forced JavaFX load')
				var jfxPanel = new Packages.com.servoy.extensions.beans.jfxpanel.JFXPanel();
				/** @type {Packages.com.servoy.extensions.beans.jfxpanel.ServoyJFXPanel} */
				var svyJFXPanel = jfxPanel.getBeanInstance(2, clientPluginAccess, null)
				jfxAvailable = svyJFXPanel.isJavaFXAvailable()
			}

		}
	}());
